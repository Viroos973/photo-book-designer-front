import React, {useEffect, useRef, useState} from "react";
import {ContextMenuProps, minSizeShape, Shape, ShapeType, TransferProps} from "@/utils/shapes/shapeTypes";
import {
    createInitialDrawingShape,
    createShape,
    shouldFinalizeShape,
    updateShapePosition,
    updateShapeProps,
    updateShapeWhileDrawing
} from "@/utils/shapes/shapeUtils";
import {getShapeComponent, getSize, parseToolType} from "@/utils/shapes/shapeConfig";
import Konva from 'konva';
import {Vector2d} from "konva/lib/types";

export const useCustomCanvas = (selectedTool: string | null, setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, shapes: Shape[], setSelectedTools: (selectedTools: string | null) => void) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [tempShape, setTempShape] = useState<Shape | null>(null);
    const [selectedShapeIds, setSelectedShapeIds] = useState<string[]>([]);
    const transformerRef = useRef<Konva.Transformer | null>(null);
    const startPos = useRef<Vector2d | null>(null);
    const stageRef = useRef<Konva.Stage | null>(null);
    const clipboardRef = useRef<Shape | null>(null);
    const selectionRectRef = useRef<Konva.Rect | null>(null);
    const selectionStart = useRef<Vector2d | null>(null);
    const isSelecting = useRef(false);

    const [contextMenuState, setContextMenuState] = useState<ContextMenuProps>({
        visible: false,
        x: 0,
        y: 0,
        shapeId: null
    })
    const [contextMenuCanvasState, setContextMenuCanvasState] = useState<ContextMenuProps>({
        visible: false,
        x: 0,
        y: 0,
        canvasX: 0,
        canvasY: 0
    })

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!stage) return;

        stageRef.current = stage;

        if (e.evt.button === 2) {
            return;
        }

        if (!selectedTool && e.target === stage && e.evt.button === 0) {
            const pos = stage.getPointerPosition();
            if (!pos || !selectionRectRef.current) return;

            isSelecting.current = true;
            selectionStart.current = pos;

            selectionRectRef.current.visible(true);
            selectionRectRef.current.setAttrs({
                x: pos.x,
                y: pos.y,
                width: 0,
                height: 0
            });

            return;
        }

        if (e.target === stage && selectedTool) {
            const point = stage.getPointerPosition();
            if (!point) return;

            setIsDrawing(true);
            startPos.current = point;

            const newShape = createInitialDrawingShape(selectedTool, point);
            setTempShape(newShape);
        }
    };

    const handleMouseMove = () => {
        if (isSelecting.current && selectionStart.current && stageRef.current && selectionRectRef.current) {
            const pos = stageRef.current.getPointerPosition();
            if (!pos) return;

            const sx = selectionStart.current.x;
            const sy = selectionStart.current.y;

            selectionRectRef.current.setAttrs({
                x: Math.min(sx, pos.x),
                y: Math.min(sy, pos.y),
                width: Math.abs(pos.x - sx),
                height: Math.abs(pos.y - sy)
            });

            selectionRectRef.current.getLayer()?.batchDraw();
            return;
        }

        if (!isDrawing || !startPos.current || !tempShape || !stageRef.current || !selectedTool) return;

        const currentPos = stageRef.current.getPointerPosition();
        if (!currentPos) return;

        const distance = Math.sqrt(
            Math.pow(currentPos.x - startPos.current.x, 2) +
            Math.pow(currentPos.y - startPos.current.y, 2)
        );

        if (distance > minSizeShape) {
            const {shapeType} = parseToolType(selectedTool)
            const updatedShape = updateShapeWhileDrawing(
                shapeType,
                tempShape,
                startPos.current,
                currentPos
            );
            setTempShape(updatedShape);
        }
    };

    const handleMouseUp = (e?: Konva.KonvaEventObject<MouseEvent>) => {
        if (isSelecting.current && selectionRectRef.current && stageRef.current) {
            const box = selectionRectRef.current.getClientRect();
            const stage = stageRef.current;

            const ids = new Set<string>();

            stage.find('.selectable').forEach(node => {
                if (Konva.Util.haveIntersection(box, node.getClientRect())) {
                    ids.add(node.attrs.id);
                }
            });

            setSelectedShapeIds(prev => {
                if (e?.evt.shiftKey) {
                    return Array.from(new Set([...prev, ...ids]));
                }
                return Array.from(ids);
            });

            selectionRectRef.current.visible(false);
            isSelecting.current = false;
            selectionStart.current = null;

            return;
        }

        if (!isDrawing || !tempShape || !selectedTool) return;

        setIsDrawing(false);

        const currentPos = stageRef.current?.getPointerPosition();
        const distance = currentPos && startPos.current
            ? Math.sqrt(
                Math.pow(currentPos.x - startPos.current.x, 2) +
                Math.pow(currentPos.y - startPos.current.y, 2)
            )
            : 0;

        const {shapeType, isImageShape} = parseToolType(selectedTool)
        if (distance < minSizeShape) {
            const defaultShape = createShape(shapeType, startPos.current!.x, startPos.current!.y, isImageShape);
            setShapes(prev => [...prev, defaultShape]);
            setSelectedShapeIds([defaultShape.id])
        } else {
            const shouldAdd = shouldFinalizeShape(shapeType, tempShape);
            if (shouldAdd) {
                const finalShape = {
                    ...tempShape,
                    props: {
                        ...tempShape.props,
                        opacity: 1
                    }
                };
                setShapes(prev => [...prev, finalShape]);
                setSelectedShapeIds([finalShape.id])
            }
        }

        setSelectedTools(null)
        setTempShape(null);
        startPos.current = null;
    };

    const handleDragStart = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
        e.cancelBubble = true;

        if (!selectedShapeIds.includes(id)) {
            setSelectedShapeIds(prev => {
                if (e.evt.shiftKey) {
                    return prev.includes(id)
                        ? prev.filter(i => i !== id)
                        : [...prev, id];
                }
                return [id];
            });
        }

        setShapes(prev =>
            prev.map(shape =>
                shape.id === id ? { ...shape, isDragging: true } : shape
            )
        );
    };

    const handleDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
        setShapes(prev =>
            prev.map(shape =>
                shape.id === id
                    ? updateShapePosition(shape, e.target.attrs.x, e.target.attrs.y)
                    : shape
            )
        );
    };

    const handleOpenContextMenuCanvas = (e: Konva.KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();

        if (e.target !== e.target.getStage()) {
            return;
        }

        const stage = e.target.getStage();
        const pos = stage?.getPointerPosition();
        const stagePos = stage.getPointerPosition();

        if (pos && stagePos) {
            setContextMenuCanvasState({
                visible: true,
                x: e.evt.clientX,
                y: e.evt.clientY,
                canvasX: stagePos.x,
                canvasY: stagePos.y
            });
        }
    }

    const handleCloseContextMenuCanvas = () => {
        setContextMenuCanvasState({
            visible: false,
            x: 0,
            y: 0,
            canvasX: 0,
            canvasY: 0
        });
    }

    const handleOpenContextMenuShape = (e: Konva.KonvaEventObject<MouseEvent>, id: string) => {
        e.evt.preventDefault();

        const stage = e.target.getStage();
        const pos = stage?.getPointerPosition();

        if (pos) {
            setContextMenuState({
                visible: true,
                x: e.evt.clientX,
                y: e.evt.clientY,
                shapeId: id
            });
        }
    }

    const handleCloseContextMenu = () => {
        setContextMenuState({
            visible: false,
            x: 0,
            y: 0,
            shapeId: null
        });
    }

    const handleClickOnShape = (e: Konva.KonvaEventObject<MouseEvent>, id: string) => {
        e.cancelBubble = true;

        setSelectedShapeIds(prev => {
            if (e.evt.shiftKey) {
                return prev.includes(id)
                    ? prev.filter(i => i !== id)
                    : [...prev, id];
            }
            return [id];
        });
    };

    const renderShape = (shape: Shape) => {
        const ShapeComponent = getShapeComponent(shape.type);

        const shapeProps = {
            id: shape.id,
            x: shape.x,
            y: shape.y,
            name: 'selectable',
            draggable: true,
            onDragStart: (e: Konva.KonvaEventObject<DragEvent>) => handleDragStart(shape.id, e),
            onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(shape.id, e),
            ...shape.props
        };

        if (transformerRef.current) {
            const nodes = transformerRef.current.nodes();

            nodes.forEach(node => {
                node.scaleX(1);
                node.scaleY(1);
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (<ShapeComponent {...shapeProps as any} key={shape.id}
                                onClick={(e) => handleClickOnShape(e, shape.id)}
                                onContextMenu={(e) => handleOpenContextMenuShape(e, shape.id)} />);
    };

    const handleTransformEnd = () => {
        if (!transformerRef.current) return;

        const nodes = transformerRef.current.nodes();

        setShapes(prevShapes =>
            prevShapes.map(shape => {
                const node = nodes.find(n => n.id() === shape.id);
                if (!node) return shape;

                const scale = [node.attrs.scaleX, node.attrs.scaleY]
                    .reduce((prev, curr) => Math.abs(curr - 1) > Math.abs(prev - 1) ? curr : prev, 1);

                const newProps: Partial<TransferProps> = {}
                newProps.x = node.attrs.x
                newProps.y = node.attrs.y
                newProps.rotation = node.attrs.rotation
                if ('width' in node.attrs) {
                    newProps.width = node.attrs.width * node.attrs.scaleX
                }
                if ('height' in node.attrs) {
                    newProps.height = node.attrs.height * node.attrs.scaleY
                }
                if ('radius' in node.attrs) {
                    newProps.radius = node.attrs.radius * scale
                }
                if ('outerRadius' in node.attrs) {
                    newProps.outerRadius = node.attrs.outerRadius * scale
                }
                if ('innerRadius' in node.attrs) {
                    newProps.innerRadius = node.attrs.innerRadius * scale
                }
                if ('points' in node.attrs) {
                    newProps.points = node.attrs.points
                }

                return updateShapeProps(shape, newProps);
            })
        );
    };

    useEffect(() => {
        if (!transformerRef.current || !stageRef.current) return;

        const nodes = selectedShapeIds
            .map(id => stageRef.current?.findOne(`#${id}`))
            .filter(Boolean) as Konva.Node[];

        transformerRef.current.nodes(nodes);
        transformerRef.current.getLayer()?.batchDraw();
    }, [selectedShapeIds]);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        const container = stage.container();

        let lastHighlightedTarget: Konva.Shape | null = null;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();

            stage.setPointersPositions(e);
            const pos = stage.getPointerPosition();
            if (!pos) return;

            const target = stage.getIntersection(pos);

            if (lastHighlightedTarget !== target) {
                handleDragLeave()

                if (target) {
                    const targetId = target.attrs.id;
                    const targetShape = shapes.find(s => s.id === targetId);

                    if (targetShape && !targetShape.props.fill) {
                        target.stroke("#3B82F6");
                        target.strokeWidth(3);
                        target.getLayer()?.batchDraw();
                        lastHighlightedTarget = target;
                    }
                }
            }
        };

        const handleDragLeave = () => {
            if (lastHighlightedTarget) {
                const prevShape = shapes.find(s => s.id === lastHighlightedTarget?.attrs.id);
                lastHighlightedTarget.stroke(prevShape?.props.stroke || "black");
                lastHighlightedTarget.strokeWidth(prevShape?.props.strokeWidth || 2);
                lastHighlightedTarget.getLayer()?.batchDraw();
                lastHighlightedTarget = null;
            }
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            handleDragLeave()

            stage.setPointersPositions(e);
            const pos = stage.getPointerPosition();
            if (!pos) return;

            const target = stage.getIntersection(pos);
            if (!target) return;

            const targetId = target.attrs.id;
            const targetShape = shapes.find(s => s.id === targetId);

            if (targetShape && !targetShape.props.fill) {
                const imageUrl = e.dataTransfer?.getData('text/plain');
                if (imageUrl) {
                    const img = new window.Image();
                    img.crossOrigin = 'Anonymous';

                    img.onload = () => {
                        const {width: shapeWidth, height: shapeHeight} = getSize(targetShape)

                        const scaleX = shapeWidth / img.width;
                        const scaleY = shapeHeight / img.height;
                        const scale = Math.max(scaleX, scaleY);

                        const scaledWidth = img.width * scale;
                        const scaledHeight = img.height * scale;
                        let offsetX = (scaledWidth - shapeWidth) / 2 / scale;
                        let offsetY = (scaledHeight - shapeHeight) / 2 / scale;

                        if (targetShape.type != 'rect') {
                            offsetX += (shapeWidth / scale / 2);
                            offsetY += (shapeHeight / scale / 2);
                        }

                        target.fillPatternImage(img);
                        target.fillPatternScaleX(scale);
                        target.fillPatternScaleY(scale);
                        target.fillPatternOffsetX(offsetX);
                        target.fillPatternOffsetY(offsetY);
                        target.fillPatternRepeat('no-repeat');
                        target.dash(null)

                        target.getLayer()?.batchDraw();
                    }

                    img.src = imageUrl;
                }
            }
        }

        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('dragleave', handleDragLeave);
        container.addEventListener('drop', handleDrop);

        return () => {
            container.removeEventListener('dragover', handleDragOver);
            container.removeEventListener('dragleave', handleDragLeave);
            container.removeEventListener('drop', handleDrop);
        };
    }, [shapes, stageRef.current])

    return {
        state: { isDrawing, tempShape, contextMenuState, contextMenuCanvasState, clipboardRef },
        selectionRectRef,
        transformerRef,
        functions: {
            handleMouseDown,
            handleMouseMove,
            handleMouseUp,
            renderShape,
            handleCloseContextMenu,
            handleOpenContextMenuCanvas,
            handleCloseContextMenuCanvas,
            handleTransformEnd,
            setSelectedShapeIds
        }
    }
}
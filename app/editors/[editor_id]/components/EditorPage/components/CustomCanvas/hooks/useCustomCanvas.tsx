import {useRef, useState} from "react";
import {ContextMenuProps, minSizeShape, Shape, ShapeType} from "@/utils/shapes/shapeTypes";
import {
    createInitialDrawingShape,
    createShape, shouldFinalizeShape,
    updateShapePosition,
    updateShapeWhileDrawing
} from "@/utils/shapes/shapeUtils";
import {getShapeComponent} from "@/utils/shapes/shapeConfig";
import Konva from 'konva';
import {Vector2d} from "konva/lib/types";

export const useCustomCanvas = (selectedTool: ShapeType) => {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tempShape, setTempShape] = useState<Shape | null>(null);
    const startPos = useRef<Vector2d | null>(null);
    const stageRef = useRef<Konva.Stage | null>(null);
    const clipboardRef = useRef<Shape | null>(null);

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

        if (e.target === stage) {
            const point = stage.getPointerPosition();
            if (!point) return;

            setIsDrawing(true);
            startPos.current = point;

            const newShape = createInitialDrawingShape(selectedTool, point);
            setTempShape(newShape);
        }
    };

    const handleMouseMove = () => {
        if (!isDrawing || !startPos.current || !tempShape || !stageRef.current) return;

        const currentPos = stageRef.current.getPointerPosition();
        if (!currentPos) return;

        const distance = Math.sqrt(
            Math.pow(currentPos.x - startPos.current.x, 2) +
            Math.pow(currentPos.y - startPos.current.y, 2)
        );

        if (distance > minSizeShape) {
            const updatedShape = updateShapeWhileDrawing(
                selectedTool,
                tempShape,
                startPos.current,
                currentPos
            );
            setTempShape(updatedShape);
        }
    };

    const handleMouseUp = () => {
        if (!isDrawing || !tempShape) return;

        setIsDrawing(false);

        const currentPos = stageRef.current?.getPointerPosition();
        const distance = currentPos && startPos.current
            ? Math.sqrt(
                Math.pow(currentPos.x - startPos.current.x, 2) +
                Math.pow(currentPos.y - startPos.current.y, 2)
            )
            : 0;

        if (distance < minSizeShape) {
            const defaultShape = createShape(selectedTool, startPos.current!.x, startPos.current!.y);
            setShapes(prev => [...prev, defaultShape]);
        } else {
            const shouldAdd = shouldFinalizeShape(selectedTool, tempShape);
            if (shouldAdd) {
                const finalShape = {
                    ...tempShape,
                    props: {
                        ...tempShape.props,
                        opacity: 1
                    }
                };
                setShapes(prev => [...prev, finalShape]);
            }
        }

        setTempShape(null);
        startPos.current = null;
    };

    const handleDragStart = (id: string) => {
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

    const renderShape = (shape: Shape) => {
        const ShapeComponent = getShapeComponent(shape.type);

        const shapeProps = {
            x: shape.x,
            y: shape.y,
            draggable: true,
            onDragStart: () => handleDragStart(shape.id),
            onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(shape.id, e),
            ...shape.props
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (<ShapeComponent {...shapeProps as any} key={shape.id} onContextMenu={(e) => handleOpenContextMenuShape(e, shape.id)} />);
    };

    return {
        state: { shapes, isDrawing, tempShape, clipboardRef, contextMenuState, contextMenuCanvasState },
        functions: {
            handleMouseDown,
            handleMouseMove,
            handleMouseUp,
            renderShape,
            setShapes,
            handleCloseContextMenu,
            handleOpenContextMenuCanvas,
            handleCloseContextMenuCanvas
        }
    }
}
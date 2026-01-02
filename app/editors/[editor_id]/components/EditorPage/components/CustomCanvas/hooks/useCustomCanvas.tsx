import {useRef, useState} from "react";
import {minSizeShape, Shape, ShapeType} from "@/utils/shapes/shapeTypes";
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

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!stage) return;

        stageRef.current = stage;

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
        return <ShapeComponent {...shapeProps as any} key={shape.id} />;
    };

    /*const clearCanvas = () => {
        setShapes([]);
    };

    const removeLastShape = () => {
        setShapes(prev => prev.slice(0, -1));
    };*/

    return {
        state: { shapes, isDrawing, tempShape },
        functions: { handleMouseDown, handleMouseMove, handleMouseUp, renderShape }
    }
}
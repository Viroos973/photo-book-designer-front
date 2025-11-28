import {useState} from "react";
import {Shape, ShapeType} from "@/utils/shapes/shapeTypes";
import {createShape, updateShapePosition} from "@/utils/shapes/shapeUtils";
import {getShapeComponent} from "@/utils/shapes/shapeConfig";
import Konva from 'konva';

export const useCustomCanvas = (selectedTool: ShapeType) => {
    const [shapes, setShapes] = useState<Shape[]>([]);

    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();

        if (e.target === stage) {
            const point = stage.getPointerPosition();

            if (point) {
                const newShape = createShape(selectedTool, point.x, point.y);
                setShapes(prev => [...prev, newShape]);
            }
        }
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
        state: { shapes },
        functions: { handleStageClick, renderShape }
    }
}
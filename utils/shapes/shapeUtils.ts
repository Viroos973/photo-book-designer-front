import { Shape, ShapeType, ShapeProps } from '@/utils/shapes/shapeTypes';
import { getShapeProps } from '@/utils/shapes/shapeConfig';

export const createShape = (type: ShapeType, x: number, y: number): Shape => ({
    id: `${crypto.randomUUID()}`,
    type,
    x,
    y,
    isDragging: false,
    props: getShapeProps(type)
});

export const updateShapePosition = (shape: Shape, x: number, y: number): Shape => ({
    ...shape,
    x,
    y
});

export const updateShapeProps = (shape: Shape, newProps: Partial<ShapeProps>): Shape => ({
    ...shape,
    props: { ...shape.props, ...newProps }
});

export const bringShapeToFront = (shapes: Shape[], shapeId: string): Shape[] => {
    const shapeIndex = shapes.findIndex(shape => shape.id === shapeId);
    if (shapeIndex === -1) return shapes;

    const newShapes = [...shapes];
    const [shape] = newShapes.splice(shapeIndex, 1);
    newShapes.push(shape);

    return newShapes;
};

export const sendShapeToBack = (shapes: Shape[], shapeId: string): Shape[] => {
    const shapeIndex = shapes.findIndex(shape => shape.id === shapeId);
    if (shapeIndex === -1) return shapes;

    const newShapes = [...shapes];
    const [shape] = newShapes.splice(shapeIndex, 1);
    newShapes.unshift(shape);

    return newShapes;
};

export const bringShapeForward = (shapes: Shape[], shapeId: string): Shape[] => {
    const shapeIndex = shapes.findIndex(shape => shape.id === shapeId);
    if (shapeIndex === -1 || shapeIndex === shapes.length - 1) return shapes;

    const newShapes = [...shapes];
    [newShapes[shapeIndex], newShapes[shapeIndex + 1]] = [newShapes[shapeIndex + 1], newShapes[shapeIndex]];

    return newShapes;
};

export const sendShapeBackward = (shapes: Shape[], shapeId: string): Shape[] => {
    const shapeIndex = shapes.findIndex(shape => shape.id === shapeId);
    if (shapeIndex === -1 || shapeIndex === 0) return shapes;

    const newShapes = [...shapes];
    [newShapes[shapeIndex], newShapes[shapeIndex - 1]] = [newShapes[shapeIndex - 1], newShapes[shapeIndex]];

    return newShapes;
};

export const getShapeZIndex = (shapes: Shape[], shapeId: string): number => {
    return shapes.findIndex(shape => shape.id === shapeId);
};

export const getMaxZIndex = (shapes: Shape[]): number => {
    return shapes.length - 1;
};
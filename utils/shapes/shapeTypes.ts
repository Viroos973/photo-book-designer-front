import { Circle, Rect, Text, Line, Star, RegularPolygon } from 'react-konva';
import {ComponentProps} from "react";

export interface TransferProps {
    x: number,
    y: number,
    rotation: number,
    scaleX: number,
    scaleY: number,
    width: number,
    height: number,
    radius: number,
    outerRadius: number,
    innerRadius: number,
    points: number[]
}

export interface ContextMenuProps {
    visible: boolean;
    x: number;
    y: number;
    canvasX?: number;
    canvasY?: number;
    shapeId?: string | null;
}

export type ShapeType = 'circle' | 'rect' | 'text' | 'line' | 'star' | 'triangle';

export type CircleProps = ComponentProps<typeof Circle>;
export type RectProps = ComponentProps<typeof Rect>;
export type TextProps = ComponentProps<typeof Text>;
export type LineProps = ComponentProps<typeof Line>;
export type StarProps = ComponentProps<typeof Star>;
export type TriangleProps = ComponentProps<typeof RegularPolygon>;

export type ShapeProps =
    | ({ type: 'circle' } & CircleProps)
    | ({ type: 'rect' } & RectProps)
    | ({ type: 'text' } & TextProps)
    | ({ type: 'line' } & LineProps)
    | ({ type: 'star' } & StarProps)
    | ({ type: 'triangle' } & TriangleProps);

export interface Shape {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
    isDragging: boolean;
    props: Omit<ShapeProps, 'type'>;
}

export interface DrawingLogic {
    createInitialShape: (startPos: { x: number; y: number }) => Shape;
    updateShapeWhileDrawing: (
        shape: Shape,
        startPos: { x: number; y: number },
        currentPos: { x: number; y: number }
    ) => Shape;
    shouldFinalizeShape: (shape: Shape) => boolean;
}

export const minSizeShape: number = 4
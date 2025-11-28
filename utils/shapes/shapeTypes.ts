import { Circle, Rect, Text, Line, Star, RegularPolygon } from 'react-konva';
import {ComponentProps} from "react";

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
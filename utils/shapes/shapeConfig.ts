import {
    ShapeType,
    ShapeProps,
    CircleProps,
    RectProps,
    TextProps,
    LineProps,
    StarProps,
    TriangleProps
} from '@/utils/shapes/shapeTypes';
import { Circle, Square, Type, Minus, Star, Triangle } from 'lucide-react';
import { Circle as CircleKonva, Rect, Text as TextKonva, Line, Star as StarKonva, RegularPolygon } from 'react-konva';

export const SHAPES_CONFIG = {
    circle: {
        component: CircleKonva,
        defaultProps: {
            radius: 30,
            fill: "#45B7D1",
            stroke: "black",
            strokeWidth: 4
        } as Omit<CircleProps, 'type'>,
        displayName: 'Круг' as const,
        icon: Circle
    },
    rect: {
        component: Rect,
        defaultProps: {
            width: 80,
            height: 60,
            fill: "#45B7D1",
            cornerRadius: 1,
            stroke: "black",
            strokeWidth: 4
        } as Omit<RectProps, 'type'>,
        displayName: 'Квадрат' as const,
        icon: Square
    },
    text: {
        component: TextKonva,
        defaultProps: {
            text: 'Текст',
            fontSize: 18,
            fill: '#333',
            fontFamily: 'Arial, sans-serif',
            padding: 10
        } as Omit<TextProps, 'type'>,
        displayName: 'Текст' as const,
        icon: Type
    },
    line: {
        component: Line,
        defaultProps: {
            points: [0, 0, 80, 80],
            stroke: "#45B7D1",
            strokeWidth: 4,
            lineCap: 'round' as const,
            lineJoin: 'round' as const
        } as Omit<LineProps, 'type'>,
        displayName: 'Линия' as const,
        icon: Minus
    },
    star: {
        component: StarKonva,
        defaultProps: {
            numPoints: 5,
            innerRadius: 20,
            outerRadius: 35,
            fill: "#45B7D1",
            stroke: "black",
            strokeWidth: 4
        } as Omit<StarProps, 'type'>,
        displayName: 'Звезда' as const,
        icon: Star
    },
    triangle: {
        component: RegularPolygon,
        defaultProps: {
            sides: 3,
            radius: 35,
            fill: "#45B7D1",
            stroke: "black",
            strokeWidth: 4
        } as Omit<TriangleProps, 'type'>,
        displayName: 'Треугольник' as const,
        icon: Triangle
    }
} as const;

export const SHAPE_TYPES = Object.keys(SHAPES_CONFIG) as ShapeType[];

export const getShapeProps = (type: ShapeType): Omit<ShapeProps, 'type'> => {
    return SHAPES_CONFIG[type].defaultProps;
};

export const getShapeComponent = (type: ShapeType) => {
    return SHAPES_CONFIG[type].component;
};
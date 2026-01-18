import {
    CircleProps,
    DrawingLogic,
    LineProps,
    minSizeShape,
    RectProps, Shape,
    ShapeProps,
    ShapeType,
    StarProps,
    TextProps,
    TriangleProps
} from '@/utils/shapes/shapeTypes';
import {Circle, Minus, Square, Star, Triangle, Type} from 'lucide-react';
import {Circle as CircleKonva, Line, Rect, RegularPolygon, Star as StarKonva, Text as TextKonva} from 'react-konva';
import Konva from "konva";
import {ComponentProps} from "react";

const drawingLogic: Record<ShapeType, DrawingLogic> = {
    rect: {
        createInitialShape: (startPos) => ({
            id: `${crypto.randomUUID()}`,
            type: 'rect',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: {
                width: 0,
                height: 0,
                fill: "#45B7D1",
                cornerRadius: 1,
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }
        }),
        updateShapeWhileDrawing: (shape, startPos, currentPos) => {
            const dx = currentPos.x - startPos.x;
            const dy = currentPos.y - startPos.y;

            return {
                ...shape,
                x: Math.min(startPos.x, currentPos.x),
                y: Math.min(startPos.y, currentPos.y),
                props: {
                    ...shape.props,
                    width: Math.abs(dx),
                    height: Math.abs(dy)
                }
            };
        },
        shouldFinalizeShape: (shape) => {
            const props = shape.props as RectProps;
            return (props.width || 0) > minSizeShape && (props.height || 0) > minSizeShape;
        }
    },

    circle: {
        createInitialShape: (startPos) => ({
            id: `${crypto.randomUUID()}`,
            type: 'circle',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: {
                radius: 0,
                fill: "#45B7D1",
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }
        }),
        updateShapeWhileDrawing: (shape, startPos, currentPos) => {
            const dx = currentPos.x - startPos.x;
            const dy = currentPos.y - startPos.y;
            const radius = Math.sqrt(dx * dx + dy * dy) / 2;

            return {
                ...shape,
                x: startPos.x + dx / 2,
                y: startPos.y + dy / 2,
                props: {
                    ...shape.props,
                    radius
                }
            };
        },
        shouldFinalizeShape: (shape) => {
            const props = shape.props as CircleProps;
            return (props.radius || 0) > minSizeShape;
        }
    },

    line: {
        createInitialShape: (startPos) => ({
            id: `${crypto.randomUUID()}`,
            type: 'line',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: {
                points: [0, 0, 0, 0],
                stroke: "#45B7D1",
                strokeWidth: 2,
                lineCap: 'round' as const,
                lineJoin: 'round' as const,
                opacity: 0.5
            }
        }),
        updateShapeWhileDrawing: (shape, startPos, currentPos) => {
            const dx = currentPos.x - startPos.x;
            const dy = currentPos.y - startPos.y;

            return {
                ...shape,
                x: startPos.x,
                y: startPos.y,
                props: {
                    ...shape.props,
                    points: [0, 0, dx, dy]
                }
            };
        },
        shouldFinalizeShape: (shape) => {
            const props = shape.props as LineProps;
            const points = props.points || [0, 0, 0, 0];
            const lineLength = Math.sqrt(
                Math.pow(points[2] - points[0], 2) +
                Math.pow(points[3] - points[1], 2)
            );
            return lineLength > 10;
        }
    },

    star: {
        createInitialShape: (startPos) => ({
            id: `${crypto.randomUUID()}`,
            type: 'star',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: {
                numPoints: 5,
                innerRadius: 0,
                outerRadius: 0,
                fill: "#45B7D1",
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }
        }),
        updateShapeWhileDrawing: (shape, startPos, currentPos) => {
            const dx = currentPos.x - startPos.x;
            const dy = currentPos.y - startPos.y;
            const outerRadius = Math.max(Math.abs(dx/2), Math.abs(dy/2));
            const innerRadius = outerRadius * 0.5;

            return {
                ...shape,
                x: startPos.x + dx / 2,
                y: startPos.y + dy / 2,
                props: {
                    ...shape.props,
                    outerRadius,
                    innerRadius
                }
            };
        },
        shouldFinalizeShape: (shape) => {
            const props = shape.props as StarProps;
            return (props.outerRadius || 0) > minSizeShape;
        }
    },

    triangle: {
        createInitialShape: (startPos) => ({
            id: `${crypto.randomUUID()}`,
            type: 'triangle',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: {
                sides: 3,
                radius: 0,
                fill: "#45B7D1",
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }
        }),
        updateShapeWhileDrawing: (shape, startPos, currentPos) => {
            const dx = currentPos.x - startPos.x;
            const dy = currentPos.y - startPos.y;
            const radius = Math.max(Math.abs(dx/2), Math.abs(dy/2));

            return {
                ...shape,
                x: startPos.x + dx / 2,
                y: startPos.y + dy / 2,
                props: {
                    ...shape.props,
                    radius
                }
            };
        },
        shouldFinalizeShape: (shape) => {
            const props = shape.props as TriangleProps;
            return (props.radius || 0) > minSizeShape;
        }
    },

    text: {
        createInitialShape: (startPos) => ({
            id: `${crypto.randomUUID()}`,
            type: 'text',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: {
                text: 'Текст',
                fontSize: 18,
                fill: '#333',
                fontFamily: 'Arial, sans-serif',
                padding: 10,
                opacity: 0.5
            }
        }),
        updateShapeWhileDrawing: (shape) => shape,
        shouldFinalizeShape: () => true
    }
};

export const SHAPES_CONFIG = {
    circle: {
        component: CircleKonva,
        konvaComponent: (props: ComponentProps<typeof CircleKonva>) => new Konva.Circle(props),
        defaultProps: {
            radius: 30,
            fill: "#45B7D1",
            stroke: "black",
            strokeWidth: 2
        } as Omit<CircleProps, 'type'>,
        displayName: 'Круг' as const,
        icon: Circle,
        drawingLogic: drawingLogic.circle
    },
    rect: {
        component: Rect,
        konvaComponent: (props: ComponentProps<typeof Rect>) => new Konva.Rect(props),
        defaultProps: {
            width: 80,
            height: 60,
            fill: "#45B7D1",
            cornerRadius: 1,
            stroke: "black",
            strokeWidth: 2,
            offsetX: 40,
            offsetY: 30
        } as Omit<RectProps, 'type'>,
        displayName: 'Квадрат' as const,
        icon: Square,
        drawingLogic: drawingLogic.rect
    },
    text: {
        component: TextKonva,
        konvaComponent: (props: ComponentProps<typeof TextKonva>) => new Konva.Text(props),
        defaultProps: {
            text: 'Текст',
            fontSize: 18,
            fill: '#333',
            fontFamily: 'Arial, sans-serif',
            padding: 10
        } as Omit<TextProps, 'type'>,
        displayName: 'Текст' as const,
        icon: Type,
        drawingLogic: drawingLogic.text
    },
    line: {
        component: Line,
        konvaComponent: (props: ComponentProps<typeof Line>) => new Konva.Line(props),
        defaultProps: {
            points: [-40, -40, 40, 40],
            stroke: "#45B7D1",
            strokeWidth: 2,
            lineCap: 'round' as const,
            lineJoin: 'round' as const
        } as Omit<LineProps, 'type'>,
        displayName: 'Линия' as const,
        icon: Minus,
        drawingLogic: drawingLogic.line
    },
    star: {
        component: StarKonva,
        konvaComponent: (props: ComponentProps<typeof StarKonva>) => new Konva.Star(props),
        defaultProps: {
            numPoints: 5,
            innerRadius: 20,
            outerRadius: 35,
            fill: "#45B7D1",
            stroke: "black",
            strokeWidth: 2
        } as Omit<StarProps, 'type'>,
        displayName: 'Звезда' as const,
        icon: Star,
        drawingLogic: drawingLogic.star
    },
    triangle: {
        component: RegularPolygon,
        konvaComponent: (props: ComponentProps<typeof RegularPolygon>) => new Konva.RegularPolygon(props),
        defaultProps: {
            sides: 3,
            radius: 35,
            fill: "#45B7D1",
            stroke: "black",
            strokeWidth: 2
        } as Omit<TriangleProps, 'type'>,
        displayName: 'Треугольник' as const,
        icon: Triangle,
        drawingLogic: drawingLogic.triangle
    }
} as const;

export const SHAPE_TYPES = Object.keys(SHAPES_CONFIG) as ShapeType[];

export const getShapeProps = (type: ShapeType): Omit<ShapeProps, 'type'> => {
    return SHAPES_CONFIG[type].defaultProps;
};

export const getShapeComponent = (type: ShapeType) => {
    return SHAPES_CONFIG[type].component;
};

export const getShapeKonvaComponent = (props: Shape) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return SHAPES_CONFIG[props.type].konvaComponent({...props.props, x: props.x, y: props.y });
}

export const getDrawingLogic = (type: ShapeType) => {
    return SHAPES_CONFIG[type].drawingLogic;
};
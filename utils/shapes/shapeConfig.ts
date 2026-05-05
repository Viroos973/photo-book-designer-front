import {
    AssetMap,
    CircleProps,
    DrawingLogic,
    LineProps,
    minSizeShape,
    RectProps, Shape,
    ShapeProps,
    ShapeType,
    StarProps,
    TriangleProps
} from '@/utils/shapes/shapeTypes';
import {Circle, Minus, Square, Star, Triangle, Pentagon} from 'lucide-react';
import {Circle as CircleKonva, Line, Rect, RegularPolygon, Star as StarKonva} from 'react-konva';
import Konva from "konva";
import {ComponentProps} from "react";

export const generateShapeProps = (
    baseProps: Omit<ShapeProps, 'type'>,
    isImageShape: boolean = false
): Omit<ShapeProps, 'type'> => {
    if (isImageShape) {
        return {
            ...baseProps,
            fill: null,
            fillPatternImage: null,
            dash: [5, 5],
            fillPatternRepeat: 'no-repeat',
            fillPatternScaleX: 1,
            fillPatternScaleY: 1,
            fillPatternOffsetX: 0,
            fillPatternOffsetY: 0,
        };
    }

    return {
        ...baseProps,
        fill: "#45B7D1",
    };
};

const getStarPoints = (shape: Shape) => {
    const { props } = shape;

    const points = [];
    const step = Math.PI / props.numPoints;

    const rotation = -Math.PI / 2;

    for (let i = 0; i < 2 * props.numPoints; i++) {
        const r = i % 2 === 0 ? props.outerRadius : props.innerRadius;
        const angle = i * step + rotation;

        points.push(`${Math.cos(angle) * r},${Math.sin(angle) * r}`);
    }

    return points;
}

const getPoligonPoints = (shape: Shape) => {
    const { props } = shape;

    const points = [];
    const rotation = -Math.PI / 2;

    for (let i = 0; i < props.sides; i++) {
        const angle = (i / props.sides) * 2 * Math.PI + rotation;

        points.push(
            `${Math.cos(angle) * props.radius},${Math.sin(angle) * props.radius}`
        );
    }

    return points;
};

const polygonToClipPath = (shape: Shape) => {
    const points = getPoligonPoints(shape)

    return `
        <clipPath id="clip-${shape.id}">
          <polygon points="${points.join(' ')}" />
        </clipPath>`;
}

const polygonToHtml = (shape: Shape, assets: AssetMap) => {
    const { props } = shape;
    const url = props.fillPatternImage?.src;
    const asset = url ? assets.get(url) : null;
    const fill = asset || (props.fill || 'none');
    const points = getPoligonPoints(shape)

    return `
        <g transform="translate(${shape.x}, ${shape.y}) rotate(${props.rotation || 0})">
        ${url
            ? `
              <g clip-path="url(#clip-${shape.id})">
                <image
                  href="${fill}"
                  x="${-(shape.props.fillPatternOffsetX || 0)}"
                  y="${-(shape.props.fillPatternOffsetY || 0)}"
                  transform="scale(${shape.props.fillPatternScaleX || 1})"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            `
            : ''
        }
          <polygon 
            points="${points.join(' ')}"
            stroke="${props.stroke}" 
            stroke-width="${props.strokeWidth}" 
            fill="${url ? "none" : fill}"
            opacity="${props.opacity ?? 1}"
          />
        </g>`;
};

const drawingLogic: Record<ShapeType, DrawingLogic> = {
    rect: {
        createInitialShape: (startPos, isImageShape = false) => ({
            id: `${crypto.randomUUID()}`,
            type: 'rect',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: generateShapeProps({
                width: 0,
                height: 0,
                cornerRadius: 1,
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }, isImageShape)
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
        createInitialShape: (startPos, isImageShape = false) => ({
            id: `${crypto.randomUUID()}`,
            type: 'circle',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: generateShapeProps({
                radius: 0,
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }, isImageShape)
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
        createInitialShape: (startPos, isImageShape = false) => ({
            id: `${crypto.randomUUID()}`,
            type: 'star',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: generateShapeProps({
                numPoints: 5,
                innerRadius: 0,
                outerRadius: 0,
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }, isImageShape)
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
        createInitialShape: (startPos, isImageShape = false) => ({
            id: `${crypto.randomUUID()}`,
            type: 'triangle',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: generateShapeProps({
                sides: 3,
                radius: 0,
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }, isImageShape)
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

    pentagon: {
        createInitialShape: (startPos, isImageShape = false) => ({
            id: `${crypto.randomUUID()}`,
            type: 'pentagon',
            x: startPos.x,
            y: startPos.y,
            isDragging: false,
            props: generateShapeProps({
                sides: 5,
                radius: 0,
                stroke: "black",
                strokeWidth: 2,
                opacity: 0.5
            }, isImageShape)
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
    }
};

export const SHAPES_CONFIG = {
    circle: {
        component: CircleKonva,
        konvaComponent: (props: ComponentProps<typeof CircleKonva>) => new Konva.Circle(props),
        validationOnMiniPage: (shape: Shape, scale: number) => shape.props.radius * scale <= 2,
        getWidth: (shape: Shape) => shape.props.radius * 2,
        getHeight: (shape: Shape) => shape.props.radius * 2,
        getClipPath: (shape: Shape) => (`
          <clipPath id="clip-${shape.id}">
            <circle r="${shape.props.radius}" />
          </clipPath>
        `),
        toHtml: (shape: Shape, assets: AssetMap) => {
            const { props } = shape;
            const url = props.fillPatternImage?.src;
            const asset = url ? assets.get(url) : null;
            const fill = asset || (props.fill || 'none');

            return `
                <g transform="translate(${shape.x}, ${shape.y}) rotate(${props.rotation || 0})">
                ${url
                    ? `
                      <g clip-path="url(#clip-${shape.id})">
                        <image
                          href="${fill}"
                          x="${-(shape.props.fillPatternOffsetX || 0)}"
                          y="${-(shape.props.fillPatternOffsetY || 0)}"
                          transform="scale(${shape.props.fillPatternScaleX || 1})"
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </g>
                    `
                    : ''
                }
                  <circle 
                    cx="${0}" 
                    cy="${0}" 
                    r="${props.radius}" 
                    stroke="${props.stroke}" 
                    stroke-width="${props.strokeWidth}" 
                    fill="${url ? "none" : fill}"
                    opacity="${props.opacity ?? 1}"
                  />
                </g>`;
        },
        isImage: true,
        defaultProps: {
            radius: 30,
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
        validationOnMiniPage: (shape: Shape, scale: number) => shape.props.width * scale <= 4 && shape.props.height * scale <= 4,
        getWidth: (shape: Shape) => shape.props.width,
        getHeight: (shape: Shape) => shape.props.height,
        getClipPath: (shape: Shape) => (`
          <clipPath id="clip-${shape.id}">
            <rect width="${shape.props.width}" height="${shape.props.height}" rx="${shape.props.cornerRadius || 0}" />
          </clipPath>
        `),
        toHtml: (shape: Shape, assets: AssetMap) => {
            const { props } = shape;
            const url = props.fillPatternImage?.src;
            const asset = url ? assets.get(url) : null;
            const fill = asset || (props.fill || 'none');

            return `
                <g transform="translate(${shape.x}, ${shape.y}) rotate(${props.rotation || 0})">
                ${url
                    ? `
                      <g clip-path="url(#clip-${shape.id})">
                        <image
                          href="${fill}"
                          x="${-(shape.props.fillPatternOffsetX || 0)}"
                          y="${-(shape.props.fillPatternOffsetY || 0)}"
                          transform="scale(${shape.props.fillPatternScaleX || 1})"
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </g>
                    `
                    : ''
                }
                  <rect 
                    width="${props.width}" 
                    height="${props.height}" 
                    rx="${props.cornerRadius || 0}"
                    stroke="${props.stroke}" 
                    stroke-width="${props.strokeWidth}" 
                    fill="${url ? "none" : fill}"
                    opacity="${props.opacity ?? 1}"
                  />
                </g>`;
        },
        isImage: true,
        defaultProps: {
            width: 80,
            height: 60,
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
    line: {
        component: Line,
        konvaComponent: (props: ComponentProps<typeof Line>) => new Konva.Line(props),
        validationOnMiniPage: (shape: Shape, scale: number) => shape.props.strokeWidth * scale <= 1,
        getWidth: (shape: Shape) => Math.abs(shape.props.points[0].x - shape.props.points[1].x),
        getHeight: (shape: Shape) => Math.abs(shape.props.points[0].y - shape.props.points[1].y),
        getClipPath: () => (``),
        toHtml: (shape: Shape) => {
            const { props } = shape;
            const [x1, y1, x2, y2] = props.points;

            return `
                <g transform="translate(${shape.x}, ${shape.y}) rotate(${props.rotation || 0})">
                  <line 
                    x1="${x1}" 
                    y1="${y1}" 
                    x2="${x2}" 
                    y2="${y2}" 
                    stroke="${props.stroke}" 
                    stroke-width="${props.strokeWidth}" 
                    stroke-linecap="${props.lineCap}"
                    opacity="${props.opacity ?? 1}"
                  />
                </g>`;
        },
        isImage: false,
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
        validationOnMiniPage: (shape: Shape, scale: number) => shape.props.outerRadius * scale <= 2,
        getWidth: (shape: Shape) => shape.props.outerRadius * 2,
        getHeight: (shape: Shape) => shape.props.outerRadius * 2,
        getClipPath: (shape: Shape) => {
            const points = getStarPoints(shape);

            return `
              <clipPath id="clip-${shape.id}">
                <polygon points="${points.join(' ')}" />
              </clipPath>
            `;
        },
        toHtml: (shape: Shape, assets: AssetMap) => {
            const { props } = shape;
            const url = props.fillPatternImage?.src;
            const asset = url ? assets.get(url) : null;
            const fill = asset || (props.fill || 'none');
            const points = getStarPoints(shape)

            return `
                <g transform="translate(${shape.x}, ${shape.y}) rotate(${props.rotation || 0})">
                ${url
                    ? `
                      <g clip-path="url(#clip-${shape.id})">
                        <image
                          href="${fill}"
                          x="${-(shape.props.fillPatternOffsetX || 0)}"
                          y="${-(shape.props.fillPatternOffsetY || 0)}"
                          transform="scale(${shape.props.fillPatternScaleX || 1})"
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </g>
                    `
                    : ''
                }
                  <polygon 
                    points="${points.join(' ')}"
                    stroke="${props.stroke}" 
                    stroke-width="${props.strokeWidth}" 
                    fill="${url ? "none" : fill}"
                    opacity="${props.opacity ?? 1}"
                  />
                </g>`;
        },
        isImage: true,
        defaultProps: {
            numPoints: 5,
            innerRadius: 20,
            outerRadius: 35,
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
        validationOnMiniPage: (shape: Shape, scale: number) => shape.props.radius * scale <= 2,
        getWidth: (shape: Shape) => shape.props.radius * 2,
        getHeight: (shape: Shape) => shape.props.radius * 2,
        getClipPath: polygonToClipPath,
        toHtml: polygonToHtml,
        isImage: true,
        defaultProps: {
            sides: 3,
            radius: 35,
            stroke: "black",
            strokeWidth: 2
        } as Omit<TriangleProps, 'type'>,
        displayName: 'Треугольник' as const,
        icon: Triangle,
        drawingLogic: drawingLogic.triangle
    },
    pentagon: {
        component: RegularPolygon,
        konvaComponent: (props: ComponentProps<typeof RegularPolygon>) => new Konva.RegularPolygon(props),
        validationOnMiniPage: (shape: Shape, scale: number) => shape.props.radius * scale <= 2,
        getWidth: (shape: Shape) => shape.props.radius * 2,
        getHeight: (shape: Shape) => shape.props.radius * 2,
        getClipPath: polygonToClipPath,
        toHtml: polygonToHtml,
        isImage: true,
        defaultProps: {
            sides: 5,
            radius: 35,
            stroke: "black",
            strokeWidth: 2
        } as Omit<TriangleProps, 'type'>,
        displayName: 'Пятиугольник' as const,
        icon: Pentagon,
        drawingLogic: drawingLogic.pentagon
    }
} as const;

export const SHAPE_TYPES = Object.keys(SHAPES_CONFIG) as ShapeType[];
export const IMAGE_TYPES = Object.entries(SHAPES_CONFIG)
    .filter(([_, config]) => config.isImage)
    .map(([type]) => type) as ShapeType[];

export const getShapeProps = (type: ShapeType): Omit<ShapeProps, 'type'> => {
    return SHAPES_CONFIG[type].defaultProps;
};

export const getShapeComponent = (type: ShapeType) => {
    return SHAPES_CONFIG[type].component;
};

export const getIsImage = (type: ShapeType) => {
    return SHAPES_CONFIG[type].isImage;
}

export const getSize = (shape: Shape) => {
    return {
        width: SHAPES_CONFIG[shape.type].getWidth(shape),
        height: SHAPES_CONFIG[shape.type].getHeight(shape)
    };
}

export const getShapeKonvaComponent = (props: Shape) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return SHAPES_CONFIG[props.type].konvaComponent({...props.props, x: props.x, y: props.y });
}

export const shapeValidationOnMiniPage = (shape: Shape, scale: number) => {
    return SHAPES_CONFIG[shape.type].validationOnMiniPage(shape, scale);
}

export const getDrawingLogic = (type: ShapeType) => {
    return SHAPES_CONFIG[type].drawingLogic;
};

export const shapeToClipPath = (shape: Shape) => {
    return SHAPES_CONFIG[shape.type].getClipPath(shape);
};

export const shapeToHtml = (shape: Shape, assets: AssetMap) => {
    return SHAPES_CONFIG[shape.type].toHtml(shape, assets);
};

export const parseToolType = (tool: string): {
    shapeType: ShapeType;
    isImageShape: boolean;
} => {
    if (tool.startsWith('image_')) {
        const baseType = tool.replace('image_', '') as ShapeType;
        if (SHAPES_CONFIG[baseType]?.isImage) {
            return { shapeType: baseType, isImageShape: true };
        }
    }

    return { shapeType: tool as ShapeType, isImageShape: false };
};
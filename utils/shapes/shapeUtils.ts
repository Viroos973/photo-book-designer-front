import {Shape, ShapeType, ShapeProps, AssetMap} from '@/utils/shapes/shapeTypes';
import {
    generateShapeProps,
    getDrawingLogic,
    getIsImage,
    getShapeProps, getSize,
    parseToolType, shapeToClipPath, shapeToHtml
} from '@/utils/shapes/shapeConfig';
import React from "react";

export const createShape = (type: ShapeType, x: number, y: number, isImageShape: boolean): Shape => ({
    id: `${crypto.randomUUID()}`,
    type,
    x,
    y,
    isDragging: false,
    props: getIsImage(type) ? generateShapeProps(getShapeProps(type), isImageShape) : getShapeProps(type)
});

export const createInitialDrawingShape = (type: string, startPos: { x: number; y: number }): Shape => {
    const { shapeType, isImageShape } = parseToolType(type);

    const drawingLogic = getDrawingLogic(shapeType);
    return drawingLogic.createInitialShape(startPos, isImageShape);
};

export const updateShapeWhileDrawing = (
    type: ShapeType,
    shape: Shape,
    startPos: { x: number; y: number },
    currentPos: { x: number; y: number }
): Shape => {
    const drawingLogic = getDrawingLogic(type);
    return drawingLogic.updateShapeWhileDrawing(shape, startPos, currentPos);
};

export const shouldFinalizeShape = (type: ShapeType, shape: Shape): boolean => {
    const drawingLogic = getDrawingLogic(type);
    return drawingLogic.shouldFinalizeShape(shape);
};

export const updateShapePosition = (shape: Shape, x: number, y: number): Shape => ({
    ...shape,
    x,
    y
});

export const updateShapeProps = (shape: Shape, newProps: Partial<ShapeProps>): Shape => ({
    ...shape,
    x: newProps.x || shape.x,
    y: newProps.y || shape.y,
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

export const loadImage = (shape: Shape, imageUrl: string, setShapes: React.Dispatch<React.SetStateAction<Shape[]>>) => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
        const {width: shapeWidth, height: shapeHeight} = getSize(shape)

        const scaleX = shapeWidth / img.width;
        const scaleY = shapeHeight / img.height;
        const scale = Math.max(scaleX, scaleY);

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        let offsetX = (scaledWidth - shapeWidth) / 2 / scale;
        let offsetY = (scaledHeight - shapeHeight) / 2 / scale;

        if (shape.type != 'rect') {
            offsetX += (shapeWidth / scale / 2);
            offsetY += (shapeHeight / scale / 2);
        }

        setShapes(prev =>
            prev.map(s =>
                s.id === shape.id
                    ? {...s,
                        imageURL: imageUrl,
                        props: {
                            ...s.props,
                            fill: null,
                            fillPatternImage: img,
                            fillPatternScaleX: scale,
                            fillPatternScaleY: scale,
                            fillPatternOffsetX: offsetX,
                            fillPatternOffsetY: offsetY,
                            fillPatternRepeat: 'no-repeat',
                            dash: null
                        }
                    }
                    : s
            )
        );
    }

    img.src = imageUrl;
}

export const loadImageAsBase64 = async (url: string): Promise<string> => {
    const res = await fetch(url, { mode: 'cors' });
    const blob = await res.blob();

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });
};

const buildAssetMap = async (shapes: Shape[]): Promise<AssetMap> => {
    const map = new Map<string, string>();

    const uniqueUrls = [
        ...new Set(
            shapes
                .map(s => s.props.fillPatternImage?.src)
                .filter(Boolean)
        )
    ];

    await Promise.all(
        uniqueUrls.map(async (url) => {
            const base64 = await loadImageAsBase64(url);
            map.set(url, base64);
        })
    );

    return map;
};

const renderDefs = (shapes: Shape[]) => {
    return `
      <defs>
        ${shapes.filter(s => s.props.fillPatternImage?.src).map(s => shapeToClipPath(s)).join('')}
      </defs>
    `;
};

export const renderScene = async (shapes: Shape[], width: number, height: number) => {
    const assets = await buildAssetMap(shapes);

    return `
      <div>
        <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
          ${renderDefs(shapes)}
          ${shapes.map(s => shapeToHtml(s, assets)).join('')}
        </svg>
      </div>
    `;
};
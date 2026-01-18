import {RefObject, useEffect, useState} from "react";
import {Shape} from "@/utils/shapes/shapeTypes";
import Konva from "konva";
import {getShapeKonvaComponent} from "@/utils/shapes/shapeConfig";

export const useMiniPage = (shapes: Shape[], stageRef: RefObject<Konva.Stage | null>, scale: number, width: number, height: number) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const convertToBlobUrl = async (dataUrl: string) => {
        try {
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        } catch (error) {
            console.error('Failed to convert Data URL to Blob:', error);
            setImageUrl(dataUrl);
        }
    };

    useEffect(() => {
        const renderToCanvas = async () => {
            const stage = stageRef.current
            if (!stage) return

            stage.width(width);
            stage.height(height)

            stage.children?.forEach(layer => layer.destroy());
            stage.removeChildren();

            const layer = new Konva.Layer();
            stage.add(layer);

            shapes.forEach(originalShape => {
                const miniShape = {
                    ...originalShape,
                    x: originalShape.x * scale,
                    y: originalShape.y * scale,
                    props: {
                        ...originalShape.props,
                        scaleX: scale,
                        scaleY: scale,
                        strokeWidth: 0
                    }
                };

                const node = getShapeKonvaComponent(miniShape);
                if (node) layer.add(node);
            });

            const background = new Konva.Rect({
                x: 0,
                y: 0,
                width,
                height,
                fill: "#FFFFFF",
                listening: false
            });
            layer.add(background);
            background.moveToBottom();

            layer.batchDraw();

            const dataUrl = stage.toDataURL({
                mimeType: 'image/webp',
                quality: 0.9
            });

            stage.destroyChildren();

            await convertToBlobUrl(dataUrl)
        }

        renderToCanvas();
    }, [height, scale, shapes, stageRef, width])

    return {
        state: { imageUrl }
    }
}
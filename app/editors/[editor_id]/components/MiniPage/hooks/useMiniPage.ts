import {useEffect, useRef, useState} from "react";
import {Shape} from "@/utils/shapes/shapeTypes";
import Konva from "konva";
import {getShapeKonvaComponent, shapeValidationOnMiniPage} from "@/utils/shapes/shapeConfig";

export const useMiniPage = (shapes: Shape[], scale: number, width: number, height: number) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isRendering, setIsRendering] = useState(false);
    const imageUrlRef = useRef<string | null>(null);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { rootMargin: '50px' });

        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        imageUrlRef.current = imageUrl;
    }, [imageUrl]);

    useEffect(() => {
        let isCancelled = false;

        const renderThumbnail = async () => {
            if (isRendering || shapes.length === 0 || !isVisible) return;

            setIsRendering(true);

            try {
                const tempStage = new Konva.Stage({
                    container: document.createElement('div'),
                    width: width,
                    height: height
                });

                const layer = new Konva.Layer();
                tempStage.add(layer);

                const background = new Konva.Rect({
                    x: 0,
                    y: 0,
                    width,
                    height,
                    fill: "#FFFFFF",
                    listening: false
                });
                layer.add(background);

                shapes.forEach(originalShape => {
                    if (shapeValidationOnMiniPage(originalShape, scale)) return;

                    const miniShape = {
                        ...originalShape,
                        x: originalShape.x * scale,
                        y: originalShape.y * scale,
                        props: {
                            ...originalShape.props,
                            scaleX: scale,
                            scaleY: scale,
                            strokeWidth: 0.5
                        }
                    };

                    const node = getShapeKonvaComponent(miniShape);
                    if (node) layer.add(node);
                });

                background.moveToBottom();

                tempStage.batchDraw();

                const dataUrl = tempStage.toDataURL({
                    mimeType: 'image/webp',
                    quality: 0.9,
                    pixelRatio: 2
                });

                const response = await fetch(dataUrl);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);

                if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
                if (!isCancelled) {
                    setImageUrl(url);
                } else {
                    URL.revokeObjectURL(url);
                }

                tempStage.destroy();
            } catch (error) {
                if (!isCancelled) console.error('Ошибка рендеринга миниатюры:', error);
            } finally {
                if (!isCancelled) setIsRendering(false);
            }
        }

        const timeoutId = setTimeout(renderThumbnail, 100);

        return () => {
            isCancelled = true;
            clearTimeout(timeoutId);
            setIsRendering(false);
        };
    }, [height, scale, shapes, width])

    return {
        state: { imageUrl },
        containerRef
    }
}
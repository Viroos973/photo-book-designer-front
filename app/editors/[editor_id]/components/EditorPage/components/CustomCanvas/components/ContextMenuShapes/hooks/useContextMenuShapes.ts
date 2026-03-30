import {
    bringShapeForward,
    bringShapeToFront, getMaxZIndex,
    getShapeZIndex,
    sendShapeBackward,
    sendShapeToBack
} from "@/utils/shapes/shapeUtils";
import {Shape} from "@/utils/shapes/shapeTypes";
import {Dispatch, RefObject, SetStateAction, useCallback, useMemo} from "react";

export const useContextMenuShapes = (clipboardRef: RefObject<Shape | null>, shapes: Shape[], setShapes: Dispatch<SetStateAction<Shape[]>>, setSelectedShapeIds: (selectedShapeIds: string[]) => void, shapeId?: string | null) => {
    const canBringForward = useMemo(() => {
        if (!shapeId) return;

        const zIndex = getShapeZIndex(shapes, shapeId)
        const maxZIndex = getMaxZIndex(shapes)
        return zIndex < maxZIndex;
    }, [shapeId, shapes])
    
    const canSendBackward = useMemo(() => {
        if (!shapeId) return;

        const zIndex = getShapeZIndex(shapes, shapeId)
        return zIndex > 0;
    }, [shapeId, shapes])

    const bringToFront = useCallback(() => {
        if (!shapeId) return;

        setShapes((prev) => bringShapeToFront(prev, shapeId));
    }, [setShapes, shapeId])

    const sendToBack = useCallback(() => {
        if (!shapeId) return;

        setShapes(prev => sendShapeToBack(prev, shapeId));
    }, [setShapes, shapeId])

    const bringForward = useCallback(() => {
        if (!shapeId) return;

        setShapes(prev => bringShapeForward(prev, shapeId));
    }, [setShapes, shapeId])

    const sendBackward = useCallback(() => {
        if (!shapeId) return;

        setShapes(prev => sendShapeBackward(prev, shapeId));
    }, [setShapes, shapeId])

    const deleteShape = useCallback(() => {
        if (!shapeId) return;

        setShapes(prev => prev.filter(shape => shape.id !== shapeId));
        setSelectedShapeIds([])
    }, [setShapes, shapeId])

    const copyShape = useCallback(() => {
        if (!shapeId) return;

        const shape = shapes.find(s => s.id === shapeId);
        if (shape) {
            clipboardRef.current = shape;
        }
    }, [clipboardRef, shapeId, shapes]);

    const cutShape = useCallback(() => {
        copyShape();
        deleteShape();
    }, [copyShape, deleteShape]);

    return {
        state: { canBringForward, canSendBackward },
        functions: {
            bringToFront,
            sendToBack,
            bringForward,
            sendBackward,
            deleteShape,
            copyShape,
            cutShape
        }
    }
}
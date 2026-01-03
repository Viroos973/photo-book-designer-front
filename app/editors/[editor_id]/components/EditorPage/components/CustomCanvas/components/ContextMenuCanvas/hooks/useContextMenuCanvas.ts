import {Dispatch, RefObject, SetStateAction, useCallback} from "react";
import {ContextMenuProps, Shape} from "@/utils/shapes/shapeTypes";

export const useContextMenuCanvas = (contextMenuState: ContextMenuProps, clipboardRef: RefObject<Shape | null>, setShapes: Dispatch<SetStateAction<Shape[]>>) => {
    const pasteShape = useCallback(() => {
        if (clipboardRef.current) {
            const newShape: Shape = {
                ...clipboardRef.current,
                id: `${crypto.randomUUID()}`,
                x: contextMenuState.canvasX || 0,
                y: contextMenuState.canvasY || 0
            };
            setShapes(prev => [...prev, newShape]);
        }
    }, [clipboardRef, setShapes, contextMenuState]);

    const selectAll = useCallback(() => {
        console.log("Вы выбрали все элементы")
    }, [])

    const deleteAll = useCallback(() => {
        setShapes([])
    }, [setShapes])

    return {
        functions: {
            pasteShape,
            selectAll,
            deleteAll
        }
    }
}
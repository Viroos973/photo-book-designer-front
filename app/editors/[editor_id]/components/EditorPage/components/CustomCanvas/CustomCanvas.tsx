import {Shape} from "@/utils/shapes/shapeTypes";
import {useCustomCanvas} from "./hooks/useCustomCanvas";
import {Layer, Stage, Rect, Transformer} from "react-konva";
import ContextMenuShapes from "./components/ContextMenuShapes/ContextMenuShapes";
import ContextMenuCanvas from "./components/ContextMenuCanvas/ContextMenuCanvas";
import React from "react";

interface CustomCanvasProps {
    width: number,
    height: number,
    selectedTools: string | null,
    shapes: Shape[],
    setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
    setSelectedTools: (selectedTools: string | null) => void
}

export const CustomCanvas = ({width, height, selectedTools, shapes, setShapes, setSelectedTools}: CustomCanvasProps) => {
    const {state,
        selectionRectRef,
        transformerRef,
        functions} = useCustomCanvas(selectedTools, setShapes, shapes, setSelectedTools, width, height)

    return (
        <>
            <Stage
                width={state.newWidth}
                height={state.newHeight}
                onMouseDown={functions.handleMouseDown}
                onMouseMove={functions.handleMouseMove}
                onMouseUp={functions.handleMouseUp}
                onMouseLeave={functions.handleMouseUp}
                onContextMenu={functions.handleOpenContextMenuCanvas}
                className={`border border-gray-400 bg-white ${state.isDrawing ? 'cursor-crosshair' : ''}`}
            >
                <Layer>
                    {shapes.map(shape => functions.renderShape(shape))}
                    {state.tempShape && functions.renderShape(state.tempShape)}
                    <Rect
                        ref={selectionRectRef}
                        fill="rgba(0, 161, 255, 0.2)"
                        stroke="rgb(0, 161, 255)"
                        visible={false}
                    />
                    <Transformer
                        ref={transformerRef}
                        rotateEnabled
                        resizeEnabled
                        boundBoxFunc={(oldBox, newBox) => {
                            if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                        onTransformEnd={functions.handleTransformEnd}
                    />
                </Layer>
            </Stage>
            <ContextMenuCanvas contextMenuState={state.contextMenuCanvasState} clipboardRef={state.clipboardRef} setSelectedShapeIds={functions.setSelectedShapeIds}
                               shapes={shapes} setShapes={setShapes} onClose={functions.handleCloseContextMenuCanvas} />
            <ContextMenuShapes contextMenuState={state.contextMenuState} clipboardRef={state.clipboardRef} setSelectedShapeIds={functions.setSelectedShapeIds}
                               shapes={shapes} setShapes={setShapes} onClose={functions.handleCloseContextMenu}/>
        </>
    )
}
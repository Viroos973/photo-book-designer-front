import {ShapeType} from "@/utils/shapes/shapeTypes";
import {
    useCustomCanvas
} from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/hooks/useCustomCanvas";
import {Layer, Stage, Rect, Transformer} from "react-konva";
import ContextMenuShapes
    from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/components/ContextMenuShapes/ContextMenuShapes";
import ContextMenuCanvas
    from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/components/ContextMenuCanvas/ContextMenuCanvas";

interface CustomCanvasProps {
    width: number,
    height: number,
    selectedTools: ShapeType | null
}

export const CustomCanvas = ({width, height, selectedTools}: CustomCanvasProps) => {
    const {state,
        selectionRectRef,
        transformerRef,
        functions} = useCustomCanvas(selectedTools)

    return (
        <>
            <Stage
                width={width}
                height={height}
                onMouseDown={functions.handleMouseDown}
                onMouseMove={functions.handleMouseMove}
                onMouseUp={functions.handleMouseUp}
                onMouseLeave={functions.handleMouseUp}
                onContextMenu={functions.handleOpenContextMenuCanvas}
                className={`border border-black ${state.isDrawing ? 'cursor-crosshair' : ''}`}
            >
                <Layer>
                    {state.shapes.map(shape => functions.renderShape(shape))}
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
            <ContextMenuCanvas contextMenuState={state.contextMenuCanvasState} clipboardRef={state.clipboardRef}
                               setShapes={functions.setShapes} onClose={functions.handleCloseContextMenuCanvas} />
            <ContextMenuShapes contextMenuState={state.contextMenuState} clipboardRef={state.clipboardRef}
                               shapes={state.shapes} setShapes={functions.setShapes} onClose={functions.handleCloseContextMenu}/>
        </>
    )
}
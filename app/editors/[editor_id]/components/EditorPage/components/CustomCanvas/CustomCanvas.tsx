import {ShapeType} from "@/utils/shapes/shapeTypes";
import {
    useCustomCanvas
} from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/hooks/useCustomCanvas";
import {Layer, Stage} from "react-konva";

interface CustomCanvasProps {
    width: number,
    height: number,
    selectedTools: ShapeType
}

export const CustomCanvas = ({width, height, selectedTools}: CustomCanvasProps) => {
    const {state, functions} = useCustomCanvas(selectedTools)

    return (
        <Stage
            width={width}
            height={height}
            onMouseDown={functions.handleMouseDown}
            onMouseMove={functions.handleMouseMove}
            onMouseUp={functions.handleMouseUp}
            onMouseLeave={functions.handleMouseUp}
            className={`border border-black ${state.isDrawing ? 'cursor-crosshair' : ''}`}
        >
            <Layer>
                {state.shapes.map(shape => functions.renderShape(shape))}
                {state.tempShape && functions.renderShape(state.tempShape)}
            </Layer>
        </Stage>
    )
}
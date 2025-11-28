import {useState} from "react";
import {ShapeType} from "@/utils/shapes/shapeTypes";

export const useEditorPage = () => {
    const [selectedTool, setSelectedTool] = useState<ShapeType>('circle');

    return {
        state: { selectedTool },
        functions: { setSelectedTool }
    }
}
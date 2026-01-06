import {useState} from "react";
import {ShapeType} from "@/utils/shapes/shapeTypes";

export const useEditorPage = () => {
    const [selectedTool, setSelectedTool] = useState<ShapeType | null>(null);

    return {
        state: { selectedTool },
        functions: { setSelectedTool }
    }
}
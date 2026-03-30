import {useState} from "react";

export const useShapesSection = () => {
    const [isActiveShapeTools, setActiveShapeTools] = useState(true)
    const [isActiveImageTools, setActiveImageTools] = useState(true)

    return {
        state: { isActiveShapeTools, isActiveImageTools },
        functions: { setActiveShapeTools, setActiveImageTools }
    }
}
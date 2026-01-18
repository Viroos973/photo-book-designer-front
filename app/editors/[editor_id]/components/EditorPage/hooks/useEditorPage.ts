import {useRef, useState} from "react";
import {ShapeType, Shape} from "@/utils/shapes/shapeTypes";
import Konva from "konva";

export const useEditorPage = () => {
    const [selectedTool, setSelectedTool] = useState<ShapeType | null>(null);
    const stageRef = useRef<Konva.Stage | null>(null);
    const shapes = [
        {
            id: "648eacf2-5424-4caf-9c6c-41022addc7d7",
            isDragging: false,
            props: {
                fill: "#45B7D1",
                radius: 30,
                stroke: "black",
                strokeWidth: 2
            },
            type: "circle",
            x: 255,
            y: 219
        },
        {
            id: "1313a1ec-5b02-48ea-9049-597c85045ae2",
            isDragging: false,
            props: {
                fill: "#45B7D1",
                opacity: 1,
                radius: 145.85352241204188,
                stroke: "black",
                strokeWidth: 2
            },
            type: "circle",
            x: 263.5,
            y: 448
        }
    ] as Shape[];

    return {
        state: { selectedTool, shapes },
        stageRef,
        functions: { setSelectedTool }
    }
}
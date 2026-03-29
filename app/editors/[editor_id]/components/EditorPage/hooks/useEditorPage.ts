import {useEffect, useState} from "react";
import {Shape, ShapeType} from "@/utils/shapes/shapeTypes";
import {useParams} from "next/navigation";
import {useGetRoomByIdQuery} from "@/shared/api/hooks";
import {useAuth} from "@/shared/contexts";

export const useEditorPage = () => {
    const { editor_id } = useParams<{ editor_id: string }>();
    const {setProjectName} = useAuth();
    const [selectedTool, setSelectedTool] = useState<ShapeType | null>(null);
    const [shapes, setShapes] = useState<Shape[]>([]);

    const getRoomById = useGetRoomByIdQuery({
        roomId: editor_id
    })

    useEffect(() => {
        if (getRoomById.isSuccess && getRoomById.data?.data.name) {
            setProjectName(getRoomById.data.data.name);
        }
    }, [getRoomById.isSuccess, getRoomById.data, setProjectName]);

    return {
        state: { selectedTool, getRoomById, shapes },
        functions: { setSelectedTool, setShapes }
    }
}
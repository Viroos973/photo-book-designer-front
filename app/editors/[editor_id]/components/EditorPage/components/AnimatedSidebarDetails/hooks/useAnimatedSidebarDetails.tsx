import {useState} from "react";
import {Users, Shapes, Images, BookImage, LayoutTemplate, Type} from "lucide-react";
import {ShapesSection} from "../components/ShapesSection/ShapesSection";
import {PhotoSection} from "../components/PhotoSection/PhotoSection";
import {resizeToFit} from "@/utils/helpers/resizeToFit";

export const useAnimatedSidebarDetails = (selectedTools: string | null, setSelectedTools: (selectedTools: string | null) => void, roomId: string, width: number, height: number) => {
    const [activeItem, setActiveItem] = useState<string | null>('shapes');
    const {width: newWidth, height: newHeight} = resizeToFit(width, height, 700)

    const navigation = [
        { id: 'users', icon: Users },
        { id: 'templates', icon: LayoutTemplate},
        { id: 'photo', icon: Images },
        { id: 'background', icon: BookImage},
        { id: 'shapes', icon: Shapes },
        { id: 'text', icon: Type}
    ];

    const handleSelectType = (selectedTool: string) => {
        if (selectedTools === selectedTool) {
            setSelectedTools(null);
        } else {
            setSelectedTools(selectedTool);
        }
    }

    const detailContent = {
        users: {
            title: 'Управление пользователями',
            body: (<div></div>)
        },
        shapes: {
            title: 'Объекты шаблона',
            body: (<ShapesSection selectedTools={selectedTools} onClick={handleSelectType} />)
        },
        photo: {
            title: 'Фотографии',
            body: (<PhotoSection roomId={roomId} />)
        }
    };

    return {
        state: { detailContent, navigation, activeItem, newWidth, newHeight },
        functions: { setActiveItem }
    }
}
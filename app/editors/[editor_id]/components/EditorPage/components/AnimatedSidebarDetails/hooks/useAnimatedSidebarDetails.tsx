import {useState} from "react";
import {Home, Users, Shapes} from "lucide-react";
import {ShapesSection} from "../components/ShapesSection/ShapesSection";
import {ShapeType} from "@/utils/shapes/shapeTypes";

export const useAnimatedSidebarDetails = (selectedTools: ShapeType, setSelectedTools: (selectedTools: ShapeType) => void) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const navigation = [
        { id: 'home', icon: Home },
        { id: 'users', icon: Users },
        { id: 'shapes', icon: Shapes },
    ];

    const detailContent = {
        users: {
            title: 'Управление пользователями',
            body: (<div></div>)
        },
        shapes: {
            title: 'Объекты шаблона',
            body: (<ShapesSection selectedTools={selectedTools} onClick={setSelectedTools} />)
        }
    };

    return {
        state: { detailContent, navigation, activeItem },
        functions: { setActiveItem }
    }
}
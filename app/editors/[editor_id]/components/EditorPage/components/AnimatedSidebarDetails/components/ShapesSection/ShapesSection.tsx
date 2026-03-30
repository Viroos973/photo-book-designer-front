import {IMAGE_TYPES, SHAPE_TYPES} from "@/utils/shapes/shapeConfig";
import {ShapeButton} from "../../components/ShapeButton/ShapeButton";
import {
    useShapesSection
} from "@/app/editors/[editor_id]/components/EditorPage/components/AnimatedSidebarDetails/components/ShapesSection/hooks/useShapesSection";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";

interface ShapesSectionProps {
    selectedTools: string | null,
    onClick: (selectedTools: string) => void
}

export const ShapesSection = ({selectedTools, onClick}: ShapesSectionProps) => {
    const { state, functions } = useShapesSection()

    return (
        <div>
            <Button variant="ghost" className="rounded-none flex justify-between items-center w-full border-b"
                    onClick={() => functions.setActiveShapeTools(prev => !prev)}>
                <p className="font-semibold text-sm">{"Фигуры"}</p>
                <ChevronDown/>
            </Button>
            <div className={`flex items-center gap-2 flex-wrap border-b transition-all duration-300 ease-in-out 
            ${state.isActiveShapeTools ? "h-auto opacity-100 py-1" : "h-0 opacity-0 overflow-hidden py-0"}`}>
                {SHAPE_TYPES.map((type) => (
                    <ShapeButton key={type} type={type} isSelected={selectedTools === type}
                                 onClick={() => onClick(type)}/>
                ))}
            </div>
            <Button variant="ghost" className="rounded-none flex justify-between items-center w-full border-b mt-4"
                    onClick={() => functions.setActiveImageTools(prev => !prev)}>
                <p className="font-semibold text-sm">{"Поля для фотографий"}</p>
                <ChevronDown/>
            </Button>
            <div className={`flex items-center gap-2 flex-wrap border-b transition-all duration-300 ease-in-out 
            ${state.isActiveImageTools ? "h-auto opacity-100 py-1" : "h-0 opacity-0 overflow-hidden py-0"}`}>
                {IMAGE_TYPES.filter(type => type).map((type) => (
                    <ShapeButton key={type} type={type} isSelected={selectedTools === `image_${type}`}
                                 onClick={() => onClick(`image_${type}`)} isImage={true}/>
                ))}
            </div>
        </div>
    )
}
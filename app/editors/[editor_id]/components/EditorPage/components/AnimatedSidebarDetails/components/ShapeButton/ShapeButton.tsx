import {ShapeType} from "@/utils/shapes/shapeTypes";
import {Button} from "@/components/ui/button";
import {SHAPES_CONFIG} from "@/utils/shapes/shapeConfig";

interface ShapeButtonProps {
    type: ShapeType;
    isSelected: boolean;
    onClick: () => void;
    isImage?: boolean;
}

export const ShapeButton = ({ type, isSelected, onClick, isImage = false }: ShapeButtonProps) => {
    const IconComponent = SHAPES_CONFIG[type].icon;

    return (
        <Button variant={isSelected ? "default" : "ghost"} title={SHAPES_CONFIG[type].displayName} onClick={onClick}>
            <IconComponent size={20} className={`${isImage && "text-blue-500"}`} />
        </Button>
    )
}
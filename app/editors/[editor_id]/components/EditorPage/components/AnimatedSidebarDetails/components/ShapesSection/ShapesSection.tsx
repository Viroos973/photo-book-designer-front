import {SHAPE_TYPES} from "@/utils/shapes/shapeConfig";
import {ShapeButton} from "@/app/editors/[editor_id]/components/EditorPage/components/AnimatedSidebarDetails/components/ShapeButton/ShapeButton";
import {ShapeType} from "@/utils/shapes/shapeTypes";

interface ShapesSectionProps {
    selectedTools: ShapeType,
    onClick: (selectedTools: ShapeType) => void
}

export const ShapesSection = ({selectedTools, onClick}: ShapesSectionProps) => (
    <div className="flex items-center gap-2 flex-wrap">
        {SHAPE_TYPES.map((type) => (
            <ShapeButton key={type} type={type} isSelected={selectedTools === type} onClick={() => onClick(type)} />
        ))}
    </div>
)
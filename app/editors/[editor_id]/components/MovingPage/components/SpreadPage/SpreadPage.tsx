import {Shape} from "@/utils/shapes/shapeTypes";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import MiniPage from "../../../MiniPage/MiniPage";

interface SpreadPageProps {
    id: string,
    shapes: Shape[] | null,
    scale: number,
    width: number,
    height: number,
    pageNumber: number,
    isDraggable?: boolean,
    isLast?: boolean
}

export const SpreadPage = ({id, shapes, scale, width, height, pageNumber, isDraggable = true, isLast = false}: SpreadPageProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, over } = useSortable({
        id: id,
        disabled: !isDraggable
    });

    return (
        <div
            ref={setNodeRef}
            {...(isDraggable ? { ...attributes, ...listeners } : {})}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                opacity: isDragging ? 0.5 : 1
            }}
            className={`transition-all duration-150 ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
        >
            <MiniPage className="border-0" scale={scale} width={width} height={height} shapes={shapes} pageNumber={pageNumber} isLast={isLast} isActive={true} />
        </div>
    );
}
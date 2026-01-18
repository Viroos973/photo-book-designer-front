import {Shape} from "@/utils/shapes/shapeTypes";
import {RefObject} from "react";
import Konva from "konva";
import {useMiniPage} from "@/app/editors/[editor_id]/components/MiniPage/hooks/useMiniPage";
import Image from "next/image";

interface MiniPageProps {
    shapes: Shape[],
    stageRef: RefObject<Konva.Stage | null>,
    scale?: number,
    width: number,
    height: number
}

const MiniPage = ({shapes, stageRef, width, height, scale = 0.02}: MiniPageProps) => {
    const { state } = useMiniPage(shapes, stageRef, scale, width, height);

    return state.imageUrl ? (
            <Image src={state.imageUrl}
                   width={width}
                   height={height}
                   alt="thumbnail"
                   loading="lazy"
                   className="border border-gray-300 rounded bg-white" />
        ) : (
            <div
                style={{
                    width,
                    height,
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '12px'
                }}
            >
                Loading...
            </div>
        )
}

export default MiniPage
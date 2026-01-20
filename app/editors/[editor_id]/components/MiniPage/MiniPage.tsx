import {Shape} from "@/utils/shapes/shapeTypes";
import {useMiniPage} from "@/app/editors/[editor_id]/components/MiniPage/hooks/useMiniPage";
import Image from "next/image";

interface MiniPageProps {
    shapes: Shape[],
    scale?: number,
    width: number,
    height: number
}

const MiniPage = ({shapes, width, height, scale = 0.02}: MiniPageProps) => {
    const { state, containerRef } = useMiniPage(shapes, scale, width, height);

    return (
        <div ref={containerRef} style={{ width, height }}>
            {state.imageUrl ? (
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
            )}
        </div>
    )
}

export default MiniPage
'use client';

import {AnimatedSidebarDetails} from "./components/AnimatedSidebarDetails/AnimatedSidebarDetails";
import {useEditorPage} from "@/app/editors/[editor_id]/components/EditorPage/hooks/useEditorPage";
import {CustomCanvas} from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/CustomCanvas";
import {Stage} from "react-konva";
import MiniPage from "@/app/editors/[editor_id]/components/MiniPage/MiniPage";

export function EditorPage() {
    const { state, stageRef, functions } = useEditorPage()

    return (
        <AnimatedSidebarDetails selectedTools={state.selectedTool} setSelectedTools={functions.setSelectedTool}>
            <div className="flex justify-center mt-8">
                <CustomCanvas width={600} height={700} selectedTools={state.selectedTool}/>
            </div>
            <div className="flex justify-center mt-8">
                <Stage className="hidden" ref={stageRef} />
                <MiniPage shapes={state.shapes} stageRef={stageRef} width={120} height={140} scale={0.2}/>
            </div>
        </AnimatedSidebarDetails>
    );
}
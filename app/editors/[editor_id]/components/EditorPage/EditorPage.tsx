'use client';

import {AnimatedSidebarDetails} from "./components/AnimatedSidebarDetails/AnimatedSidebarDetails";
import {useEditorPage} from "@/app/editors/[editor_id]/components/EditorPage/hooks/useEditorPage";
import {CustomCanvas} from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/CustomCanvas";

export function EditorPage() {
    const { state, functions } = useEditorPage()

    return (
        <AnimatedSidebarDetails selectedTools={state.selectedTool} setSelectedTools={functions.setSelectedTool}
                                width={state.getRoomById.data?.data.widthTemplate || 3000}
                                height={state.getRoomById.data?.data.heightTemplate || 3500}
                                pagesNum={state.getRoomById.data?.data.pagesNum || 10} shapes={state.shapes}>
            <CustomCanvas width={state.getRoomById.data?.data.widthTemplate || 3000}
                          height={state.getRoomById.data?.data.heightTemplate || 3500}
                          selectedTools={state.selectedTool} shapes={state.shapes} setShapes={functions.setShapes} />
        </AnimatedSidebarDetails>
    );
}
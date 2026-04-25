"use client";

import {useEditorPhotoBook} from "@/app/editors/[editor_id]/hooks/useEditorPhotoBook";
import {PROJECT_TYPES} from "@/utils/constants/projectTypes";
import {EditorPage} from "@/app/editors/[editor_id]/components/EditorPage/EditorPage";
import {MovingPage} from "@/app/editors/[editor_id]/components/MovingPage/MovingPage";
import {ResultPage} from "@/app/editors/[editor_id]/components/ResultPage/ResultPage";

const EditorPhotoBook = () => {
    const { state } = useEditorPhotoBook()

    return state.projectType === PROJECT_TYPES.MOVING_PAGES ? (
        <MovingPage />
    ) : state.projectType === PROJECT_TYPES.RESULT ? (
        <ResultPage />
    ) : (
        <EditorPage />
    )
}

export default EditorPhotoBook;
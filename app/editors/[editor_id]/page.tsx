"use client";

import {useEditorPhotoBook} from "@/app/editors/[editor_id]/hooks/useEditorPhotoBook";
import {PROJECT_TYPES} from "@/utils/constants/projectTypes";
import {EditorPage} from "@/app/editors/[editor_id]/components/EditorPage/EditorPage";
import {MovingPage} from "@/app/editors/[editor_id]/components/MovingPage/MovingPage";

const EditorPhotoBook = () => {
    const { state } = useEditorPhotoBook()

    return state.projectType === PROJECT_TYPES.MOVING_PAGES ? (
        <MovingPage />
    ) : state.projectType === PROJECT_TYPES.RESULT ? (
        <p className='text-2xl font-bold'>{"Ресультат"}</p>
    ) : (
        <EditorPage />
    )
}

export default EditorPhotoBook;
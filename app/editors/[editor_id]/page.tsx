"use client";

import {useEditorPhotoBook} from "@/app/editors/[editor_id]/hooks/useEditorPhotoBook";
import {PROJECT_TYPES} from "@/utils/constants/projectTypes";

const EditorPhotoBook = () => {
    const { state } = useEditorPhotoBook()

    return state.projectType === PROJECT_TYPES.MOVING_PAGES ? (
        <p className='text-2xl font-bold'>{"Страницы"}</p>
    ) : state.projectType === PROJECT_TYPES.RESULT ? (
        <p className='text-2xl font-bold'>{"Ресультат"}</p>
    ) : (
        <p className='text-2xl font-bold'>{"Редактор"}</p>
    )
}

export default EditorPhotoBook;
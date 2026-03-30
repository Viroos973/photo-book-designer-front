import {Button} from "@/components/ui/button";
import {
    usePhotoSection
} from "@/app/editors/[editor_id]/components/EditorPage/components/AnimatedSidebarDetails/components/PhotoSection/hooks/usePhotoSection";
import {X} from "lucide-react";

interface PhotoSectionProps {
    roomId: string
}

export const PhotoSection = ({roomId}: PhotoSectionProps) => {
    const { state, functions } = usePhotoSection(roomId)

    return (
        <div className="flex flex-col items-center gap-4">
            <input
                type='file'
                accept='image/*'
                className='hidden'
                ref={state.fileInputRef}
                onChange={functions.handleFileChange}
            />
            <Button className="w-full" onClick={functions.handleClick}>
                {"Загрузить фотографию"}
            </Button>
            {state.getPhotos.data?.data.roomPhotos.map((photo) => (
                <div key={photo.imageId} className="relative rounded-lg">
                    <img src={photo.imageUrl}
                         draggable="true"
                         alt="photoPreview"
                         className="w-full h-auto rounded-lg"
                         onDragStart={(e) => {
                             e.dataTransfer.setData('text/plain', photo.imageUrl);
                             e.dataTransfer.effectAllowed = 'copy';
                         }}
                         onDragEnd={() => {
                             console.log('Drag ended');
                         }}
                    />
                    <Button
                        variant='ghost'
                        type='button'
                        onClick={() => functions.handleDeletePhoto(photo.imageId)}
                        className='absolute right-0 top-0 h-4 w-4 rounded-tr-lg rounded-tl-none rounded-bl-lg
                        rounded-br-none bg-[#F87171] p-3 hover:bg-[#F87171] cursor-pointer remove-photo-into-order'
                    >
                        <X color='white'/>
                    </Button>
                </div>
            ))}
        </div>
    )
}
import {usePostUploadPhotoMutation} from "@/shared/api/hooks";
import React, {useRef} from "react";
import {useGetPhotosByRoomIdQuery} from "@/shared/api/hooks/useGetPhotoByRoomIdQuery";
import {useDeletePhotoByIdMutation} from "@/shared/api/hooks/useDeletePhotoByIdMutation";

export const usePhotoSection = (roomId: string) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const uploadPhoto = usePostUploadPhotoMutation()
    const deletePhoto = useDeletePhotoByIdMutation()
    const getPhotos = useGetPhotosByRoomIdQuery({
        roomId: roomId
    })

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            await uploadPhoto.mutateAsync({
                params: {
                    roomId: roomId,
                    file: file,
                },
            }, {
                onSuccess: () => {
                    getPhotos.refetch()
                }
            })
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDeletePhoto = async (photoId: string) => {
        await deletePhoto.mutateAsync({
            params: {
                photoId: photoId
            }
        }, {
            onSuccess: () => {
                getPhotos.refetch()
            }
        })
    }

    return {
        state: { fileInputRef, getPhotos },
        functions: { handleFileChange, handleClick, handleDeletePhoto }
    }
}
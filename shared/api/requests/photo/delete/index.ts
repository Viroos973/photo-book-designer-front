import {instance} from "@/shared/api/instance";

export interface DeletePhotoByIdParams {
    photoId: string;
}

export type DeletePhotoByIdConfig = RequestConfig<DeletePhotoByIdParams>;

export const deletePhotoById = async ({ config, params }: DeletePhotoByIdConfig) =>
    instance.delete(`roomPhotos/photos/${params.photoId}`, config);
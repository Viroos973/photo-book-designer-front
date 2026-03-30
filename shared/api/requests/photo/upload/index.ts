import { instance } from '@/shared/api/instance';

export type PostUploadPhotoParams = {
    roomId: string;
    file: File;
};

export type PostUploadPhotoConfig = RequestConfig<PostUploadPhotoParams>;

export const postUploadPhoto = async ({ config, params }: PostUploadPhotoConfig) => {
    const formData = new FormData();

    formData.append('RoomId', params.roomId);
    formData.append('File', params.file);

    return instance.post<RoomPhotoDTO>('roomPhotos/upload', formData, {
        ...config,
        headers: {
            ...config?.headers,
            'Content-Type': 'multipart/form-data',
        },
    });
};
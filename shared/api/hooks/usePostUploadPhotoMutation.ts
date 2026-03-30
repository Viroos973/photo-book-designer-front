import { useMutation } from '@tanstack/react-query';
import { postUploadPhoto, type PostUploadPhotoConfig } from '@/shared/api/requests/photo/upload';

export const usePostUploadPhotoMutation = (
    settings?: MutationSettings<PostUploadPhotoConfig, typeof postUploadPhoto>
) =>
    useMutation({
        mutationKey: ['postUploadPhoto'],
        mutationFn: ({ params, config }) =>
            postUploadPhoto({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });
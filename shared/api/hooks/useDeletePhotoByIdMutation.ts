import { useMutation } from '@tanstack/react-query';
import { deletePhotoById, type DeletePhotoByIdConfig } from '@/shared/api/requests/photo/delete';

export const useDeletePhotoByIdMutation = (
    settings?: MutationSettings<DeletePhotoByIdConfig, typeof deletePhotoById>
) =>
    useMutation({
        mutationKey: ['deletePhotoById'],
        mutationFn: ({ params, config }) =>
            deletePhotoById({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });
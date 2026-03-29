import { useMutation } from '@tanstack/react-query';
import {postCreateRoom, type PostCreateRoomConfig} from "@/shared/api/requests/room/create";

export const usePostCreateRoomMutation = (
    settings?: MutationSettings<PostCreateRoomConfig, typeof postCreateRoom>
) =>
    useMutation({
        mutationKey: ['postCreateRoom'],
        mutationFn: ({ params, config }) =>
            postCreateRoom({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });
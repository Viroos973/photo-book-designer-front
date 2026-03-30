import { useQuery } from '@tanstack/react-query';

import type { GetPhotosByRoomIdParams } from '@/shared/api/requests/photo/get';
import { getPhotosByRoomId } from '@/shared/api/requests/photo/get';

export const useGetPhotosByRoomIdQuery = (
    params: GetPhotosByRoomIdParams,
    settings?: QuerySettings<typeof getPhotosByRoomId>
) =>
    useQuery({
        queryKey: ['getPhotosByRoomId', params.roomId],
        queryFn: () => getPhotosByRoomId({ config: settings?.config, params }),
        ...settings?.options
    });
import { useQuery } from '@tanstack/react-query';

import type { GetRoomByIdParams } from '@/shared/api/requests/room/[room_id]/get';
import { getRoomById } from '@/shared/api/requests/room/[room_id]/get';

export const useGetRoomByIdQuery = (
    params: GetRoomByIdParams,
    settings?: QuerySettings<typeof getRoomById>
) =>
    useQuery({
        queryKey: ['getRoomById', params.roomId],
        queryFn: () => getRoomById({ config: settings?.config, params }),
        ...settings?.options
    });
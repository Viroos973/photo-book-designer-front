import { useQuery } from '@tanstack/react-query';

import type { GetPageByRoomIdParams } from '@/shared/api/requests/page/[room_id]';
import { getPageByRoomId } from '@/shared/api/requests/page/[room_id]';

export const useGetPageByRoomIdQuery = (
    params: GetPageByRoomIdParams,
    settings?: QuerySettings<typeof getPageByRoomId>
) =>
    useQuery({
        queryKey: ['getPageByRoomId', params.roomId],
        queryFn: () => getPageByRoomId({ config: settings?.config, params }),
        ...settings?.options
    });
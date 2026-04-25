import { useQuery } from '@tanstack/react-query';

import type { GetSpreadParams } from '@/shared/api/requests/page/[room_id]/[spread_number]';
import { getSpread } from '@/shared/api/requests/page/[room_id]/[spread_number]';

export const useGetSpreadQuery = (
    params: GetSpreadParams,
    settings?: QuerySettings<typeof getSpread>
) =>
    useQuery({
        queryKey: ['getSpread', params.roomId, params.spreadNumber],
        queryFn: () => getSpread({ config: settings?.config, params }),
        ...settings?.options
    });
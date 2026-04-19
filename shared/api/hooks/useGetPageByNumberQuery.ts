import { useQuery } from '@tanstack/react-query';

import type { GetPageByNumberParams } from '@/shared/api/requests/page/[room_id]/[page_number]';
import { getPageByNumber } from '@/shared/api/requests/page/[room_id]/[page_number]';

export const useGetPageByNumberQuery = (
    params: GetPageByNumberParams,
    settings?: QuerySettings<typeof getPageByNumber>
) =>
    useQuery({
        queryKey: ['getPageByNumber', params.roomId, params.pageNumber],
        queryFn: () => getPageByNumber({ config: settings?.config, params }),
        ...settings?.options
    });
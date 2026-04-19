import { useQuery } from '@tanstack/react-query';

import { getRooms } from '@/shared/api/requests/room/get';

export const useGetRoomsQuery = (settings?: QuerySettings<typeof getRooms>) =>
    useQuery({
        queryKey: ['getRooms'],
        queryFn: () => getRooms({ config: settings?.config }),
        ...settings?.options
    });
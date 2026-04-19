import { instance } from '../../../instance';

export type GetRoomsConfig = RequestConfig;

export const getRooms = async ({ config }: GetRoomsConfig) =>
    instance.get<RoomDTO[]>('room', config);
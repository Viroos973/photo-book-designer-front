import { instance } from '../../../instance';

export interface GetPhotosByRoomIdParams {
    roomId: string;
    page?: number;
    size?: number;
}

export type GetPhotosByRoomIdConfig = RequestConfig<GetPhotosByRoomIdParams>;

export const getPhotosByRoomId = async ({ config, params }: GetPhotosByRoomIdConfig) =>
    instance.get<RoomPhotos>(`roomPhotos/rooms/${params.roomId}/photos`, { params, ...config });
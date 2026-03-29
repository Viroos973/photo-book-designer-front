import { instance } from '@/shared/api/instance';

export type PostCreateRoomParams = {
    name: string,
    pagesNum: number,
    widthTemplate: number,
    heightTemplate: number
};

export type PostCreateRoomConfig = RequestConfig<PostCreateRoomParams>;

export const postCreateRoom = async ({ config, params }: PostCreateRoomConfig) =>
    instance.post<RoomDTO>(`room`, params, config);
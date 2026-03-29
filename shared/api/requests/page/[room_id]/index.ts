import {instance} from "@/shared/api/instance";

export interface GetPageByRoomIdParams {
    roomId: string;
}

export type GetPageByRoomIdConfig = RequestConfig<GetPageByRoomIdParams>;

export const getPageByRoomId = async ({ config, params }: GetPageByRoomIdConfig) =>
    instance.get<PageResponse[]>(`page/room/${params.roomId}`, { params, ...config });
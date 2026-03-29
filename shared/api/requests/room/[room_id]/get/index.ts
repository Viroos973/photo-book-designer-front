import {instance} from "@/shared/api/instance";

export interface GetRoomByIdParams {
    roomId: string;
}

export type GetRoomByIdConfig = RequestConfig<GetRoomByIdParams>;

export const getRoomById = async ({ config, params }: GetRoomByIdConfig) =>
    instance.get<CertainRoom>(`room/${params.roomId}`, { params, ...config });
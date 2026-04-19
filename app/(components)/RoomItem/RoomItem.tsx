import {resizeToFit} from "@/utils/helpers/resizeToFit";
import Link from "next/link";
import {ROUTES} from "@/utils/constants/routes";

interface RoomItemProps {
    room: RoomDTO
}

export const RoomItem = ({room}: RoomItemProps) => {
    const {width, height} = resizeToFit(room.widthTemplate, room.heightTemplate, 200)

    return (
        <div className="flex flex-col gap-2 items-center w-[200px]">
            <Link href={ROUTES.EDITORS.$ID(room.id)}>
                <div className="bg-white border border-gray-300" style={{width: `${width}px`, height: `${height}px`}}/>
            </Link>
            <div>
                <p className="font-semibold text-sm text-center">{room.name}</p>
                <p className="text-gray-500 text-xs text-center">{`стр. ${room.pagesNum}`}</p>
            </div>
        </div>
    )
}
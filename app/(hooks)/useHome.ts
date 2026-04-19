import {useState} from "react";
import { useRouter } from "next/navigation";
import {useGetRoomsQuery} from "@/shared/api/hooks";

export const useHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const router = useRouter();

    const getRooms = useGetRoomsQuery()

    const handleOpenCreate = () => {
        setIsCreate(true);
        setIsOpen(true);
    }

    const handleOpenConnect = () => {
        setIsCreate(false);
        setIsOpen(true);
    }

    return {
        state: { isOpen, isCreate, router, getRooms },
        functions: { setIsOpen, handleOpenCreate, handleOpenConnect }
    }
}
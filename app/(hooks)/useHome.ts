import {useState} from "react";
import { useRouter } from "next/navigation";

export const useHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const router = useRouter();

    const handleOpenCreate = () => {
        setIsCreate(true);
        setIsOpen(true);
    }

    const handleOpenConnect = () => {
        setIsCreate(false);
        setIsOpen(true);
    }

    return {
        state: { isOpen, isCreate, router },
        functions: { setIsOpen, handleOpenCreate, handleOpenConnect }
    }
}
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {RegisterForm} from "./components/RegisterForm/RegisterForm";
import {LoginForm} from "./components/LoginForm/LoginForm";

interface LoginOrRegisterModalProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    isRegister?: boolean,
    setIsRegister: (isRegister: boolean) => void
}

export const HeaderModal = ({ isOpen, setIsOpen, isRegister = false, setIsRegister } : LoginOrRegisterModalProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{isRegister ? "Регистрация" : "Авторизация"}</DialogTitle>
            </DialogHeader>
            {isRegister ? (
                <RegisterForm setIsOpen={setIsOpen} setIsRegister={setIsRegister} />
            ) : (
                <LoginForm setIsOpen={setIsOpen} setIsRegister={setIsRegister} />
            )}
        </DialogContent>
    </Dialog>
)
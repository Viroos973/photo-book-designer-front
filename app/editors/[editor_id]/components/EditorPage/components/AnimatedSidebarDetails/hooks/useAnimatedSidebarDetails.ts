import {useState} from "react";
import {Folder, Home, Settings, Users} from "lucide-react";

export const useAnimatedSidebarDetails = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const navigation = [
        { id: 'home', icon: Home },
        { id: 'settings', icon: Settings },
        { id: 'users', icon: Users },
        { id: 'projects', icon: Folder },
    ];

    const detailContent = {
        settings: {
            title: 'Настройки системы',
            sections: [
                { title: 'Общие', items: ['Профиль', 'Уведомления', 'Безопасность'] },
                { title: 'Внешний вид', items: ['Тема', 'Язык'] },
            ]
        },
        users: {
            title: 'Управление пользователями',
            sections: [
                { title: 'Пользователи', items: ['Все пользователи', 'Роли', 'Разрешения'] },
                { title: 'Активность', items: ['Логи', 'Статистика'] },
            ]
        },
        projects: {
            title: 'Проекты и задачи',
            sections: [
                { title: 'Проекты', items: ['Текущие', 'Завершенные', 'Архив'] },
                { title: 'Задачи', items: ['Мои задачи', 'Все задачи', 'Шаблоны'] },
            ]
        }
    };

    return {
        state: { detailContent, navigation, activeItem },
        functions: { setActiveItem }
    }
}
import React, {useMemo, useState} from 'react';
import {REFRESH_TOKEN, USER_TOKEN} from "@/utils/constants/token";
import {getDataJWT} from "@/utils/helpers/getDataJWT";
import {getUserToken} from "@/utils/helpers/getUserToken";
import {AuthContext} from "@/shared/contexts";
import {ROLES} from "@/utils/constants/roles";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projectName, setProjectName] = useState<string | null>(null);
    const [myRole, setMyRole] = useState(ROLES.USER)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = getUserToken();
        return !!token;
    });

    const login = (token: string, refreshToken: string) => {
        localStorage.setItem(USER_TOKEN, token);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(USER_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN)
        setIsAuthenticated(false);
        setMyRole(ROLES.USER)

        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }
    };

    const value = useMemo(
        () => {
            const token = getUserToken();
            const data = token ? getDataJWT(token) : { id: '' };

            return ({
                authenticated: isAuthenticated,
                role: myRole,
                userId: data?.sub || '',
                projectName: projectName,
                setProjectName,
                setMyRole,
                login,
                logout
            })
        },
        [isAuthenticated, myRole, projectName]
    );

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};
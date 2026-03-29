import React from 'react';

export const AuthContext = React.createContext({
    authenticated: false,
    role: '',
    userId: '',
    projectName: '' as string | null,
    setProjectName: (name: string) => { console.log(name); },
    setMyRole: (role: string) => { console.log(role); },
    login: (token: string, refreshToken: string) => { console.log(token, refreshToken) },
    logout: () => {},
});
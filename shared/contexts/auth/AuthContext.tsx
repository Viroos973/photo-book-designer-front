import React from 'react';

export const AuthContext = React.createContext({
    authenticated: false,
    role: '',
    userId: '',
    setMyRole: (role: string) => { console.log(role); },
    login: (token: string) => { console.log(token) },
    logout: () => {},
});
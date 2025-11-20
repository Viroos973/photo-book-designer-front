'use client';

import React from 'react';

import type { QueryProviderProps } from '@/shared/contexts';
import { QueryProvider } from '@/shared/contexts';
import { AuthProvider } from '@/shared/contexts';

interface ProvidersProps {
    children: React.ReactNode;
    query?: Omit<QueryProviderProps, 'children'>;
}

export const Providers = ({ children, query }: ProvidersProps) => (
    <QueryProvider {...query}>
        <AuthProvider>
            {children}
        </AuthProvider>
    </QueryProvider>
);
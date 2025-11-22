'use client';

import React from 'react';

import type { QueryProviderProps } from '@/shared/contexts';
import { QueryProvider } from '@/shared/contexts';
import { AuthProvider } from '@/shared/contexts';
import {ProjectProvider} from "@/shared/contexts/project";

interface ProvidersProps {
    children: React.ReactNode;
    query?: Omit<QueryProviderProps, 'children'>;
}

export const Providers = ({ children, query }: ProvidersProps) => (
    <QueryProvider {...query}>
        <AuthProvider>
            <ProjectProvider>
                {children}
            </ProjectProvider>
        </AuthProvider>
    </QueryProvider>
);
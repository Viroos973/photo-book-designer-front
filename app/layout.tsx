import { Golos_Text } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/utils/Provider/Provider';

import { Header } from './(components)/Header/Header';

import './globals.css';
import React from "react";

const TOASTER_DURATION = 4000;

export const dynamic = 'force-dynamic';
const golos = Golos_Text({ subsets: ['latin'] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <html lang='en'>
        <body className={golos.className}>
        <Toaster duration={TOASTER_DURATION} />
        <Providers>
            <div className='flex h-screen flex-col'>
                <Header />
                <main>
                    {children}
                </main>
            </div>
        </Providers>
        </body>
        </html>
    );
};

export default RootLayout;
'use client';

import { type ReactNode } from 'react';
import {
  CursorProvider,
  Cursor,
  CursorFollow,
} from '@/components/ui/shadcn-io/animated-cursor';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pl">
      <body className="bg-stone-100">
        <CursorProvider>
          {/* Ikona kursora – widoczna tylko na xl+ */}
          <Cursor className="hidden xl:block pointer-events-none z-100">
            <svg
              className="size-6 text-orange-500 drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
            >
              <path
                fill="currentColor"
                d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
              />
            </svg>
          </Cursor>

          {/* Etykieta podążająca – widoczna tylko na xl+ */}
          <CursorFollow className="hidden xl:block pointer-events-none z-50">
            <div className="px-3 py-1 bg-black text-white text-xs xl:text-sm rounded-lg shadow-md font-robert-medium">
              BRADOS
            </div>
          </CursorFollow>

          {children}
        </CursorProvider>
      </body>
    </html>
  );
};

export default Layout;

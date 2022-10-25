import React, { FC } from 'react';
import './Page.scss';

interface PageProps {
  theme: 'light' | 'dark',
  children: React.ReactNode
}

const Page: FC<PageProps> = ({
    theme,
    children
}) => {
    return (
        <div className={`page ${theme}`}>
            {children}
        </div>
    );
};

export default Page;
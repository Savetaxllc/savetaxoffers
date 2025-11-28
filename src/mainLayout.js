import React from 'react';
import Header from './headder/Header';


export default function MainLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
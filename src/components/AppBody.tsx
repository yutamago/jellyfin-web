import React, { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import viewContainer from './viewContainer';

interface AppBodyProps {
    className?: string
}

/**
 * A simple component that includes the correct structure for ViewManager pages
 * to exist alongside standard React pages.
 */
const AppBody: FC<PropsWithChildren<AppBodyProps>> = ({ children, className }) => {
    const legacyRef = useRef<HTMLDivElement>(null);

    useEffect(() => () => {
        // Reset view container state on unload
        viewContainer.reset();
    }, []);

    const combinedClass = ['skinBody', className].filter(Boolean).join(' ');

    return (
        <>
            <div ref={legacyRef} className='mainAnimatedPages skinBody' />
            <div className={combinedClass}>
                {children}
            </div>
        </>
    );
};

export default AppBody;

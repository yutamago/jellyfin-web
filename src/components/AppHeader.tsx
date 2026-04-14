import React, { FC, useEffect, useRef } from 'react';

interface AppHeaderParams {
    isHidden?: boolean
    onDrawerOpen?: () => void
}

const AppHeader: FC<AppHeaderParams> = ({
    isHidden = false,
    onDrawerOpen
}) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize the UI components after first render
        void import('../scripts/libraryMenu');
    }, []);

    useEffect(() => {
        const drawerEl = drawerRef.current;
        if (!drawerEl || !onDrawerOpen) return;

        const handleOpen = () => onDrawerOpen();
        drawerEl.addEventListener('drawer-open', handleOpen);
        return () => drawerEl.removeEventListener('drawer-open', handleOpen);
    }, [onDrawerOpen]);

    const containerStyle = isHidden ? { display: 'none' } : undefined;

    return (
        /**
         * NOTE: These components are not used with the new layouts, but legacy views interact with the elements
         * directly so they need to be present in the DOM. We use display: none to hide them and prevent errors.
         */
        <div ref={headerRef} style={containerStyle}>
            <div ref={drawerRef} className='mainDrawer hide'>
                <div className='mainDrawer-scrollContainer scrollContainer focuscontainer-y' />
            </div>
            <div className='skinHeader focuscontainer-x' />
            <div className='mainDrawerHandle' />
        </div>
    );
};

export default AppHeader;

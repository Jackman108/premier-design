import {MouseEvent as ReactMouseEvent, RefObject, useEffect, useState} from 'react';

export const useCollapsibleContainer = (containerRef: RefObject<HTMLDivElement | null>) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const containerNode = containerRef.current;
            if (!containerNode || !(event.target instanceof Node)) {
                return;
            }

            if (!containerNode.contains(event.target)) {
                setIsCollapsed(true);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [containerRef]);

    const handleToggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const handleSelectItem = (onItemClick: (type: string) => void, value: string) => (event: ReactMouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onItemClick(value);
        setIsCollapsed(true);
    };

    return {
        isCollapsed,
        handleToggleCollapse,
        handleSelectItem,
    };
};

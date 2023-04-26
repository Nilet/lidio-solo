import React, { useState, useRef, useEffect, useCallback } from 'react';


function createDragEventHandler<T extends HTMLElement>(
  handler: (e: React.DragEvent<T>) => void
): (e: DragEvent) => void {
  return (e: DragEvent) => handler(e as unknown as React.DragEvent<T>);
}

const DragAndDrop: React.FC<{ handleDrop: (files: FileList) => void; children: React.ReactNode }> = ({
    handleDrop,
    children,
}) => {
    const [drag, setDrag] = useState(false);
    const dropRef = useRef<HTMLDivElement | null>(null);
    let dragCounter = 0;

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDrag(true);
        }
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter--;
        if (dragCounter === 0) {
            setDrag(false);
        }
    }, []);

    const handleDropEvent = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            dragCounter = 0;
        }
    }, [handleDrop]);

    useEffect(() => {
        const div = dropRef.current;
        if (div) {
            const dragInHandler = createDragEventHandler(handleDragIn);
            const dragOutHandler = createDragEventHandler(handleDragOut);
            const dragHandler = createDragEventHandler(handleDrag);
            const dropEventHandler = createDragEventHandler(handleDropEvent);

            div.addEventListener('dragenter', dragInHandler);
            div.addEventListener('dragleave', dragOutHandler);
            div.addEventListener('dragover', dragHandler);
            div.addEventListener('drop', dropEventHandler);

            return () => {
                div.removeEventListener('dragenter', dragInHandler);
                div.removeEventListener('dragleave', dragOutHandler);
                div.removeEventListener('dragover', dragHandler);
                div.removeEventListener('drop', dropEventHandler);
            };
        }
    }, [handleDragIn, handleDragOut, handleDrag, handleDropEvent]);

    return (
        <div
            style={{ display: 'inline-block', position: 'relative' }}
            ref={dropRef}
        >
            {drag && (
                <div
                    style={{
                        border: 'dashed grey 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36,
                        }}
                    >
                        <div>drop here :)</div>
                    </div>
                </div>
            )}
            {children}
        </div>
    );
};

export default DragAndDrop;


import { useEffect, useRef } from "react";

/**
 * This hook will trap the focus within a modal when it is open.
 * Can be used for all modals to provide accessible navigation.
 *
 * @param modalRef - reference to the modal element
 * @param isOpen - boolean to determine if the modal
 * @param onClose - function to close the modal
 */
export function useFocusTrap(modalRef, isOpen, onClose) {
    const firstFocusableRef = useRef(null);
    const lastFocusableRef = useRef(null);

    useEffect(() => {
        if (!isOpen || !modalRef.current) return;

        // Get all focusable elements in the modal
        const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            firstFocusableRef.current = focusableElements[0];
            lastFocusableRef.current = focusableElements[focusableElements.length - 1];
            firstFocusableRef.current.focus();

            const handleKeyDown = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
                        e.preventDefault();
                        lastFocusableRef.current.focus();
                    } else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
                        e.preventDefault();
                        firstFocusableRef.current.focus();
                    }
                } else if (e.key === 'Escape') {
                    onClose();
                }
            };

            modalRef.current.addEventListener('keydown', handleKeyDown);
            return () => {
                modalRef.current?.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]);
}
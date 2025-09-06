import { useEffect, useRef } from 'react';

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef?: React.RefObject<HTMLElement>;
  finalFocusRef?: React.RefObject<HTMLElement>;
}

export function useKeyboardNavigation({
  isOpen,
  onClose,
  initialFocusRef,
  finalFocusRef
}: UseKeyboardNavigationProps) {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the initial element or first focusable element
    const focusElement = initialFocusRef?.current || 
      containerRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    
    if (focusElement) {
      focusElement.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        trapFocus(event);
      }
    };

    const trapFocus = (event: KeyboardEvent) => {
      if (!containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus to the previously active element
      const restoreFocus = finalFocusRef?.current || previousActiveElement.current;
      if (restoreFocus && typeof restoreFocus.focus === 'function') {
        restoreFocus.focus();
      }
    };
  }, [isOpen, onClose, initialFocusRef, finalFocusRef]);

  return containerRef;
}

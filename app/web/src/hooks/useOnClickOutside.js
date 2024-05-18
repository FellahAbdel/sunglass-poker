import { useEffect } from "react";

/**
 * Custom hook that triggers a handler when a click occurs outside the specified element.
 *
 * @param {Object} ref - The ref of the element to detect outside clicks for.
 * @param {Function} handler - The function to call when an outside click is detected.
 */
function useOnClickOutside(ref, handler) {
    useEffect(() => {
        /**
         * Listener that calls the handler if the click is outside the ref element.
         * @param {Event} event - The event object.
         */
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export default useOnClickOutside;

import { MutableRefObject, useEffect } from "react";

export function useOutsideAlerter(ref: MutableRefObject<any>) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
            return true;
        }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
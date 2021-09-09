import { MutableRefObject, useEffect, useRef } from "react";

function useOutsideAlerter(ref: MutableRefObject<any>) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: Event) {
            if (ref.current && !ref.current.contains(event.target)) {
                alert("You clicked outside of me!");
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

export default function WalletModal() {
    const wrapper = useRef(null);
    useOutsideAlerter(wrapper);

    return (
        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-20">
            <div ref={wrapper} className="w-72 h-36 flex items-center justify-center bg-white rounded-md">
                <span>Hello People</span>
            </div>
        </div>
    )

}
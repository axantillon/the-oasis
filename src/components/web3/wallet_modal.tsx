import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { FiChevronsRight, FiCreditCard } from "react-icons/fi";
import { injected } from "../../utils/web3/connectors/injected";
import { walletconnect } from "../../utils/web3/connectors/walletconnect";
import { allConnectors } from "../../utils/web3/types";

export default function WalletModal({handleClose, show}: {handleClose: MouseEventHandler, show: boolean}) {
    const wrapper = useRef<any>();
    
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (wrapper.current && !wrapper.current.contains(event.target)) {
                // @ts-ignore
                handleClose(event);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapper, handleClose]);

    const {activate, error, connector} = useWeb3React();
    const [activatingConnector, setActivatingConnector] = useState<any>();
    const isUserRejectedRequestError = error instanceof UserRejectedRequestError;

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector])

    async function connectWallet(connector: allConnectors): Promise<void> {
        setActivatingConnector(connector);
        await activate(connector, () => {}, true);
    }

    return (
        <>
        {show && 
            <div className="absolute z-50 top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-10">
                <div ref={wrapper} className="w-64 flex flex-col items-center justify-center p-4 sm:space-y-2 bg-white rounded-lg">
                    <div onClick={() => connectWallet(injected)} className="hidden sm:flex items-center w-full h-1/2  px-4 py-2 space-x-4 border border-black rounded-md cursor-pointer">
                        <FiChevronsRight/>
                        <span> Metamask </span>
                    </div>
                    <div onClick={() => connectWallet(walletconnect)} className="w-full h-1/2 flex items-center px-4 py-2 space-x-4 border border-black rounded-md cursor-pointer">
                        <FiCreditCard/>
                        <span> WalletConnect </span>
                    </div>
                </div>
            </div>
        }
        </>
    )

}

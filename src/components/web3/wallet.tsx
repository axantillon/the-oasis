import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { FiPower } from "react-icons/fi";
import { getErrorMessage } from "../../utils/web3/connectors/error";
import { truncate } from "../../utils/web3/tools";
import WalletModal from "./wallet_modal";

export default function Wallet() {

    const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);

    const {account, deactivate, active, error, library} = useWeb3React();

    const [ensName, setEnsName] = useState<string | null>();

    useEffect(() => {
        if (account !== null && active === true) {
            setEnsName(truncate(account));
            setWalletModalOpen(false);
        }
        async function setEns() {
            if (library !== undefined && await library.lookupAddress(account) !== '') {
                setEnsName(await library.lookupAddress(account));
            }
        }
        setEns();
    }, [account, library, active])

    return (
        <div className="z-40">
            <WalletModal show={walletModalOpen} handleClose={() => setWalletModalOpen(false)}/>
            <div className="flex flex-row items-center justify-center space-x-2">
                <div onClick={() => {setWalletModalOpen(true)}} className={'flex items-center justify-center h-12 border border-black bg-white rounded-full py-2 px-4 cursor-pointer transition duration-75 ease-in-out shadow-md hover:shadow-lg'}>
                    { active
                        ? <span> {ensName} </span>
                        : <span> Connect Wallet </span> 
                    }
                </div>
                { active &&
                    <div onClick={deactivate} className="flex items-center justify-center w-8 h-8 border border-black bg-white rounded-full cursor-pointer transition duration-75 ease-in-out shadow-md hover:shadow-lg text-red-400">
                        <FiPower/>
                    </div>
                }
                {(error) &&  
                    <span>{getErrorMessage(error)}</span>
                }
            </div>
        </div>
    )
}



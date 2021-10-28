import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { getErrorMessage } from "../../utils/web3/connectors";
import { truncate } from "../../utils/web3/tools";
import WalletModal from "./WalletModal";

export default function WalletConnect() {

    const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);

    const {account, deactivate, active, error, library} = useWeb3React();

    const [ensName, setEnsName] = useState<string | null>();

    useEffect(() => {
        if (account !== null && active === true) {
            setEnsName(truncate(account));
            setWalletModalOpen(false);
        }
        async function setEns() {
            const ens = await library.lookupAddress(account);
            if (library !== undefined && ens !== '') {
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
                        <FontAwesomeIcon icon={faPowerOff}/>
                    </div>
                }
                {(error) &&  
                    <span>{getErrorMessage(error)}</span>
                }
            </div>
        </div>
    )
}

import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector";
import { UserRejectedRequestError, WalletConnectConnector } from "@web3-react/walletconnect-connector";
import React, { useState, useEffect } from "react"
import { getErrorMessage, walletconnect } from "../../utils/web3/connectors"
import { truncate } from "../../utils/web3/tools";

export default function WalletConnect() {

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const {connector, activate, account, deactivate, active, error, setError, library} = useWeb3React();
    const isUserRejectedRequestError = error instanceof UserRejectedRequestError;

    const [activatingConnector, setActivatingConnector] = useState<any>();
    const [ensName, setEnsName] = useState<string | null>();

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector])

    useEffect(() => {
        if (account !== null) {
            setEnsName(truncate(account));
        }
        async function setEns() {
            if (library !== undefined) {
                setEnsName(await library.lookupAddress(account));
            }
        }
        setEns();
    }, [account, library])

    function openModal() {

    }

    
    async function connectWallet(): Promise<void> {
        setActivatingConnector(walletconnect);
        await activate(walletconnect, () => {}, true).catch((err) => {
            deactivate();
            return;
        })
    }

    return (
        <div className="flex flex-row items-center justify-center space-x-2">
            <div onClick={connectWallet} className={'flex items-center justify-center w-48 h-12 border border-black rounded-full py-2 px-4 cursor-pointer transition duration-75 ease-in-out shadow-md hover:shadow-lg'}>
                { active
                    ? <span> {ensName} </span>
                    : <span> Connect Wallet </span> 
                }
            </div>
            { active &&
                <div onClick={deactivate} className="flex items-center justify-center w-8 h-8 border border-black rounded-full cursor-pointer transition duration-75 ease-in-out shadow-md hover:shadow-lg text-red-400">
                    <FontAwesomeIcon icon={faPowerOff}/>
                </div>
            }
            {(error || isUserRejectedRequestError) &&  
                <span>{getErrorMessage(error)}</span>
            }
        </div>
    )
}

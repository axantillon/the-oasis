import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import WalletButton from '../components/web3/WalletButton'

const Home: NextPage = () => {

  const { active } = useWeb3React();

  const [loggedIn, setLogIn] = useState<boolean>(false);

  useEffect(() => {
    if (active === true) {
      setLogIn(true);
    } else {
      setLogIn(false);
    }
  }, [active])

  return (
    <div className="w-screen h-screen">
      <div 
        className={`w-full transition-all duration-1000 ease-in-out ${loggedIn ? 'h-64' : 'h-full'} flex flex-col justify-center items-center space-y-4`}
      >
        <div className="text-3xl">
            <span> The <b> Oasis </b> </span>
        </div>
        <WalletButton />
      </div>
    </div>
  )
}

export default Home;

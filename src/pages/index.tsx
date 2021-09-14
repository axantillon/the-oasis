import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Hub from '../components/three_d/Hub';
import WalletButton from '../components/web3/WalletButton';

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
    <div className="flex flex-col w-screen h-screen">
      <div 
        className={`w-full ${loggedIn ? 'h-40' : 'h-full -mt-16'} transition-all duration-1000 ease-in-out flex flex-col justify-center items-center space-y-4`}
      >
        <div className="text-3xl">
            <span> The <b> Oasis </b></span>
        </div>
        <WalletButton />
      </div>
      {loggedIn && 
        <Hub/>
      }
    </div>
  )
}

export default Home;

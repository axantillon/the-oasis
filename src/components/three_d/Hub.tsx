import { Environment, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import Avatar from "./Avatar";
import {create} from "ipfs-http-client"

export default function Hub() {
    const model_path = './models/b0e2958c-abb6-4409-885e-7698ea525f53.glb';
    useGLTF.preload(model_path)

    const client = create('https://ipfs.infura.io:5001/api/v0')

    const [ipfsUrl, setIpfs] = useState<string>();

    const avatar_name = "AxAntillon"

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, 500)
    })

    async function onChange() {
        try {
            const added = await client.add('/b0e2958c-abb6-4409-885e-7698ea525f53.glb')
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setIpfs(url);
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
  }

    return (
        <>
            {visible &&
                <div id="canvas-container" className="z-10 absolute top-0 left-0 w-full h-full">
                    <Canvas camera={{ position: [0, 1, 5]}}>
                        <Suspense fallback={null}>
                            {ipfsUrl &&
                                <Avatar modelURL={ipfsUrl}/>
                            }
                            <Environment preset="sunset" />
                        </Suspense>
                    </Canvas>
                    <div id="plain-hmtl-overlay" className="z-20 absolute top-0 left-0 w-full h-full">
                        <div id="avatar_name" className="flex items-end justify-center w-full h-full -mt-32">
                            <div onClick={onChange} className="flex items-center justify-center w-96 h-12 border border-black bg-white rounded-full py-2 px-4 transition duration-75 ease-in-out shadow-xl">
                                <span> {avatar_name} Upload </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

import { Environment, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import Avatar from "./Avatar";

export default function Hub() {
    const model_path = './models/b0e2958c-abb6-4409-885e-7698ea525f53.glb';
    useGLTF.preload(model_path)

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, 500)
    })

    return (
        <>
            {visible &&
                <div id="canvas-container" className="flex-grow">
                    <Canvas camera={{ position: [0, 1, 5]}}>
                        <Suspense fallback={null}>
                            <Avatar modelURL={model_path}/>
                            <Environment preset="sunset" />
                        </Suspense>
                    </Canvas>
                </div>
            }
        </>
    )
}

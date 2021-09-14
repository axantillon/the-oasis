import { useGLTF } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber'
import { useDrag, useGesture } from 'react-use-gesture';
import { useSpring, a } from "@react-spring/three"
import { useEffect, useState } from 'react';

export default function Avatar({modelURL}: {modelURL: string}) {
    const gltf = useGLTF(modelURL);
    
    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0], config: { friction: 50 } }))
    const bind = useDrag(({ offset: [x] }) => set({ rotation: [0, x / aspect, 0]}))

    return (
        <>
            <a.primitive {...spring} {...bind()} object={gltf.scene} position={[0,-3,0]} scale={3} />
        </>
    )
}

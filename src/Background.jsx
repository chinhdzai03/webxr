import { Box, GizmoHelper, GizmoViewport, Sphere, Text } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

function Background( {bgImg} ) {
    //const {number} = useControls({number: {value: 0 , min: 0, max: 20 , step :1}, myBarColor: { r: 200, b: 125, g: 106, a: 0.4 },})
    const texture1 = useLoader(THREE.TextureLoader , '13.jpg')
    const texture2 = useLoader(THREE.TextureLoader , 'bryan-goff-IuyhXAia8EA-unsplash.jpg')
    const [curr , setCurr] = useState(texture1)
    // console.log(bgImg)
    
    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(bgImg, (texture0) => {
            setCurr(texture0)
        })
    },[bgImg])

    const handleChange = () => {
        if (curr === texture1) {
            setCurr(texture2)
        } else {
            setCurr(texture1)   
        }
    }
  return (
    <group>
        <mesh position={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[500, 60, 40]}  />
            <meshBasicMaterial attach="material" map={curr} side={THREE.BackSide} />
        </mesh>
        <Sphere position={[25, 10, -10]} args={[2, 32, 32]} onPointerDown={handleChange}  >
            <meshStandardMaterial attach="material" color="red" />
            <Text position={[0, 0, 2.05]} fontSize={0.5} color="white">Change Background</Text>
        </Sphere>
        {/* <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
        <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper> */}
    </group>
    
  )
}

export default Background

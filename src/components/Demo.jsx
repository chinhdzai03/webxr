import * as THREE from 'three'
import React, { Suspense , useRef, useState } from 'react'
import {Canvas, extend, useFrame, useThree, useLoader} from '@react-three/fiber'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Billboard, Text, Html, Grid, FirstPersonControls, PointerLockControls } from '@react-three/drei'
import Hello from './Hello'
import { DragControls } from '@react-three/drei'
import { FlyControls } from "@react-three/drei";



function Controls(props) {
    const { camera, gl } = useThree()
    gl.setSize(window.innerWidth, window.innerHeight)
    const ref = useRef()
    useFrame(() => ref.current.update())
    return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}


// 
 function Dome() {
    const texture = useLoader(THREE.TextureLoader , '2294472375_24a3b8ef46_o.jpg')
    return (
        <mesh>
            <sphereGeometry attach="geometry" args={[500, 60, 40]} />
            {/* <boxGeometry attach="geometry" args={[500, 500, 500]} /> */}
            <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
         </mesh>
    )
}

function Cube() {
    const [isHover , setIsHover] = useState(false)
    return (
        <DragControls>
            <mesh rotation={[0, -Math.PI / 2, 0]} position={[30 , -20, -20]} onPointerEnter={() => setIsHover(true)} onPointerLeave={() => setIsHover(false)}>
                <boxGeometry attach="geometry" args={[3, 3, 3]} />
                <meshBasicMaterial attach="material" color={"white"} />
                {isHover && <Html scale={1} pointerEvents="none" transform distanceFactor={20}  rotation={[0, 0, 0]} position={[0, 2, 0]}>
                    <div style={{ padding: "10px", background: "red", borderRadius: "8px" }}>
                     Hộp 3D!
                    </div>
                    <Hello />
                </Html> }
                
            </mesh>
        </DragControls>
    )
}
 
 function Model() {
    const model = useLoader(GLTFLoader , 'Poimandres.gltf')
    return <primitive onPointerOver={() => {}} position={[0, 0, 0]} scale={[ 0.1 , 0.1 , 0.1 ]} object={model.scene}  />
 }

 function Demo() {
    
    return(
    <Canvas camera={{ position: [0, 1, 3] }} 
        onCreated={({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
      }} >
        {/* <ControlsTest /> */}
        {/* <Controls enableZoom={true} enablePan={false} enableDamping dampingFactor={0.2}  /> */}
        <PointerLockControls />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
            <Dome />
            <Model />
            <Cube />
            <Grid cellSize={0.7} position={[0, 0, 0]} cellColor={"red"} cellThickness={2} />
        </Suspense>
    </Canvas>
    )
}

export default Demo
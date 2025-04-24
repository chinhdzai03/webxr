import { Box, Html, Sphere } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { use, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { CameraControls } from '@react-three/drei'
import { button, folder, useControls } from 'leva'
import axios from 'axios'

function Scene2() {
    const grasstexture = useLoader(THREE.TextureLoader , 'grass.jpg')
    const texture = useLoader(THREE.TextureLoader , '13.jpg')
    const objRef = useRef()
    const cameraRef = useRef()

    
      const {} = useControls({
        'fitToBox(mesh)': button(() => cameraRef.current?.fitToBox(objRef.current, true)),
        setPosition: folder(
          {
            vec1: { value: [10, 10, 10], label: 'vec' },
            'setPosition(…vec)': button((get) => cameraRef.current?.setPosition(...get('setPosition.vec1'), true))
          },
          { collapsed: true }
        ),
        setTarget: folder(
          {
            vec2: { value: [0, 0, 0], label: 'vec' },
            'setTarget(…vec)': button((get) => cameraRef.current?.setTarget(...get('setTarget.vec2'), true))
          },
          { collapsed: true }
        ),
        zoom : {value: 2, min: 1, max: 10, step: 0.1},
        'setZoom': button((get) => cameraRef.current?.zoom(get('zoom'), true)),
        setBoxPosition: folder(
          {
            vec3: { value: [0, 0, 0], label: 'vec' },
            'setBoxPosition': button((get) => objRef.current?.position.set(...get('setBoxPosition.vec3'), true))
          },
          { collapsed: true }
        ),
        setBoxRotation: folder(
          {
            vec4: { value: [0, 0, 0], label: 'vec' },
            'setBoxRotation': button((get) => {
              const vec = new THREE.Vector3(...get('setBoxRotation.vec4'));
              const vecRad = vec.clone().multiplyScalar(Math.PI / 180);
              objRef.current?.rotation.setFromVector3(vecRad);
            })
          },
          { collapsed: true }
        ),
        setBoxSize: folder(
          {
            vec5: { value: [1, 1, 1], label: 'vec' },
            'setBoxSize': button((get) => objRef.current?.scale.set(...get('setBoxSize.vec5'), true))
          },
          { collapsed: true }
        ),
        speed : {value: 1, min: -10, max: 10, step: 0.1},
        'setSpeed': button((get) => setSpeed(get('speed'))),
        'reset': button(() => {
          setSpeed(0)
        }),
        camSpeed : {value: 1, min: -10, max: 10, step: 0.1},
        'setCamSpeed': button((get) => setCamSpeed(get('camSpeed'))),
        'stop': button(() => {
          setCamSpeed(0)
        }),

      });
      const [speed , setSpeed] = useState(0)
      const [camSpeed , setCamSpeed] = useState(0)
    
      useFrame((state, delta) => {
        objRef.current.position.x += 0.01* speed;
        cameraRef.current.azimuthAngle += delta*0.2 * camSpeed;
      });

      // useEffect(() => {
      //   if (cameraRef.current) {
      //     console.log(objRef.current.position)
      //   }
      // }, [objRef.current]);

  const handleSend = async () => {
    try {
      console.log(objRef.current.position)
      const response = await axios.post(
        "http://localhost:3000/post",
        objRef.current.position, 
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
     
  }
      
      
    
  return (
    <group>
      <mesh position={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[500, 60, 40]}  />
            <meshBasicMaterial attach="material"  map={texture} side={THREE.BackSide} />
      </mesh>
      <Box ref={objRef} position={[10, 10, 10]} args={[1, 1, 1]}>
        <meshBasicMaterial map={grasstexture} attach="material" color="green" />
      </Box>
      <Html position={[5, 5, 5]} distanceFactor={10} occlude="raycast" transform rotation={[0, 0, 0]} >
        <div onClick={handleSend} style={{ padding: "15px", background: "white", borderRadius: "8px", fontSize:"24px" ,color:"black"}}>Send</div>
      </Html>
      <CameraControls ref={cameraRef}/>
    </group>
  )
}

export default Scene2

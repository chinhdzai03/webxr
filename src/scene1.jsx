import { Physics } from '@react-three/rapier'
import React from 'react'
import PlayerControls from './components/PlayerControl'
import { Ground } from './components/Ground'
import CubeContent from './components/CubeContent'
import Background from './components/Background'
import { PointerLockControls } from '@react-three/drei'

function Scene1({bgImg}) {

  return (
    <group>
        {/* <PointerLockControls/> */}
        <Physics>
            {/* <PlayerControls/> */}
            {/* <Ground/> */}
            <CubeContent/>
        </Physics>
        <Background bgImg={bgImg}/>
    </group>
  )
}

export default Scene1

import { Physics } from '@react-three/rapier'
import React from 'react'
import PlayerControls from './PlayerControl'
import { Ground } from './Ground'
import CubeContent from './CubeContent'
import Background from './Background'
import PivotObj from './PivotObj'
import { PointerLockControls } from '@react-three/drei'

function Scene1({bgImg}) {

  return (
    <group>
        {/* <PointerLockControls/> */}
        {/* <Physics>
            <PlayerControls/>
            <Ground/>
            <CubeContent/>
        </Physics> */}
        <Background bgImg={bgImg}/>
        {/* <PivotObj/> */}
    </group>
  )
}

export default Scene1

import { Box, PivotControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

function PivotObj() {
    const boxRef =useRef()
    
    
  return (  
    <group>
      <PivotControls rotation={[0, -Math.PI / 2, 0]} anchor={[1, -1, -1]} scale={75} depthTest={false} fixed lineWidth={2} autoTransform>
        <Box castShadow receiveShadow ref={boxRef} position={[10,3,10]} args={[2,2,2]}>
            <meshBasicMaterial  attach="material" color="white" />
        </Box>  
      </PivotControls>    

    </group>
    
    
  )
}

export default PivotObj

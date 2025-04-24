import { Box, Html, Text } from '@react-three/drei'
import React from 'react'
import { Group } from 'three';
import Film from './Film';
import SelectBg from './SelectBg';

function CubeContent() {
    const [faceID , setFaceID] = React.useState(null);
    const handleClick = (event) => {
        const faceIndex = event.faceIndex;
        setFaceID((prev) => (prev === faceIndex ? null : faceIndex));
        console.log(faceIndex)
    }
  return (
    <group>
        <Box position={[0, 10, 0]} args={[5, 5, 5]} onPointerDown={handleClick}>
            <meshStandardMaterial attach="material-0" color="red" />   
            <meshStandardMaterial attach="material-1" color="blue" />  
            <meshStandardMaterial attach="material-2" color="green" /> 
            <meshStandardMaterial attach="material-3" color="yellow"/> 
            <meshStandardMaterial attach="material-4" color="purple"/> 
            <meshStandardMaterial attach="material-5" color="orange"/> 
            { faceID === 1 || faceID === 0 ? <Html position={[3,3,0]} distanceFactor={10} occlude="raycast" transform rotation={[0, +Math.PI / 2, 0]} >
                    <div style={{ padding: "10px", background: "white", borderRadius: "8px", fontSize:"16px" ,color:"black"}}>
                        Đây là giới thiệu về mặt đỏ của hộp 3D
                        <br/>
                        <img src="one-zen-MN6_yENUQOI-unsplash.jpg" alt="abc" style={{width : "100px", height : "100px" , display : "flex" , justifyContent : "center"}} />
                        {/* <SelectBg></SelectBg> */}
                    </div>
            </Html> : null}
        </Box>
        <Film/>
    </group>
  )
}

export default CubeContent

//one-zen-MN6_yENUQOI-unsplash.jpg


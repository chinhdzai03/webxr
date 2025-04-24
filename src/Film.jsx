import { Box, Plane, useTexture, useVideoTexture, Text, PositionalAudio } from '@react-three/drei'
import React, { Suspense, useRef, useState } from 'react'

function Film() {
    const soundRef = useRef()
    const texture = useVideoTexture("10.mp4")

    const [isPlaying , setIsPlaying] = useState(true) ;
    const [isHide , setIsHide] = useState(false)
    const [isMusic , setIsMusic] = useState(true)
    
    const handlePause =() => {
        if (texture.image) {
            if (isPlaying) {
              texture.image.pause();
            } else {
              texture.image.play();
            }
            setIsPlaying(!isPlaying);
          }
    }

    const handleHide = () => {
      setIsHide(!isHide)
    }
    
    const handlePlayMusic = () => {
        if(soundRef.current) {
          if (isMusic) {
            soundRef.current.pause();
          } else {
            soundRef.current.play();
          }
          setIsMusic(!isMusic)
        }
    }
    
  return (
        <group>
          <Plane args={[16,9]} rotation={[0, 0, 0]} position={[-10 , 10 , -10]}>
              <Suspense fallback={<FallbackMaterial url="10.jpg"/>}>
                  {/* <VideoMaterial src="10.mp4" ></VideoMaterial> */}
                  <meshBasicMaterial side={2} map={texture} toneMapped={false} transparent opacity={isHide ? 0 : 1} />
              </Suspense>
              <Box position={[-1,-6,0]} args={[1,1,1]} onPointerDown={handlePause}>
                  <meshBasicMaterial color="white"/>
                  <Text color="black" fontSize={0.5} position={[0,0,0.55]}>||</Text>
              </Box>
              <Box position={[1,-6,0]} args={[1,1,1]} onPointerDown={handleHide}>
                  <meshBasicMaterial color="white"/>
                  <Text color="black" fontSize={0.5} position={[0,0,0.55]}>{isHide ? "👁" : "🚫"}</Text>
              </Box>
          </Plane>
          <Box position={[10,4,-10]} args={[2,1,1]} onPointerDown={handlePlayMusic}>
                  <meshBasicMaterial color="white"/>
                  <Text color="black" fontSize={0.5} position={[0,0,0.55]}>🎵</Text>
          </Box>
          <PositionalAudio
            ref={soundRef}
            url="zapsplat_icecream.mp3"
            distance={3}
            loop
            autoplay
          />
        </group>
  )
}

function VideoMaterial ({src}) {
    const texture = useVideoTexture(src)

    const videoRef = useRef();
    const [isPlaying , setIsPlaying] = useState(true) ;
    
    texture.image.onload = () => {
        videoRef.current = texture.image;
    }

    const handleClick =() => {
        if (videoRef.current) {
            if (isPlaying) {
              videoRef.current.pause();
            } else {
              videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
          }
    }
    
  return <meshBasicMaterial side={2} map={texture} toneMapped={false} transparent opacity={0.9} />
}
function FallbackMaterial({ url }) {
    const texture = useTexture(url)
    return <meshBasicMaterial side={2} map={texture} toneMapped={false} transparent opacity={0.9} />
  }

export default Film


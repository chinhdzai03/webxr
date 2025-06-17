import { Box, Html, useVideoTexture, Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'
import CubeContent from './components/CubeContent'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SearchOutlined } from '@ant-design/icons';
import Hls from 'hls.js';
import { useSpring, a , useSpringValue } from '@react-spring/three'


function sphericalToCartesian(radius, azimuthDeg, elevationDeg) {
  const theta = THREE.MathUtils.degToRad(azimuthDeg);    
  const phi = THREE.MathUtils.degToRad(90 - elevationDeg); 

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
}

function Scene3( { videoRef, setShowInfoModal } ) {
  
  const [texture, setTexture] = useState(null);
  const [clock, setClock] = useState(0);

  const textRef = useRef();
  const searchRef = useRef();
  const lastVisibleTextRef = useRef(false);
  const lastVisibleSearchRef = useRef(false);

  const [isTextShowing, setIsTextShowing] = useState(false);
  const [isSearchShowing, setIsSearchShowing] = useState(false);

  // const { opacity, scale } = useSpring({
  //   opacity: isTextShowing ? 1 : 0,
  //   scale: isTextShowing ? 1 : 0.5,
  //   config: { tension: 100, friction: 15 },
  // })

  const blinkingOpacity = useSpringValue(0); 
  const scale = useSpringValue(0.5);


  useEffect(() => {
    const video = videoRef.current;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.autoplay = true;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      console.log("Apple HLS supported");
      video.src = "index.m3u8" ;
      video.play();
    } else if (Hls.isSupported()) {
      console.log("HLS.js supported");
      const hls = new Hls();
      hls.loadSource("index.m3u8");
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }

    const videoTexture = new THREE.VideoTexture(video);
    setTexture(videoTexture);

    
  }, []);

  useFrame(() => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      const isNowVisible = time >= 8 && time <= 20;

      if (isNowVisible !== lastVisibleTextRef.current) {
        textRef.current.visible = isNowVisible;
        lastVisibleTextRef.current = isNowVisible;
        setIsTextShowing(isNowVisible);

        scale.start(isNowVisible ? 1 : 0.1);
      }

      if (isNowVisible) {
        const blink = 0.75 + 0.25 * Math.sin(time * 3); 
        blinkingOpacity.set(blink);
      } else {
        blinkingOpacity.set(0);
      }

      const isNowVisibleSearch = time >= 25 && time <= 35;

      if (isNowVisibleSearch !== lastVisibleSearchRef.current) {
        
        lastVisibleSearchRef.current = isNowVisibleSearch;
        setIsSearchShowing(isNowVisibleSearch);
      }
    }
  });
  
 
    
  return (
    <group>
        {texture && (
        <Sphere args={[5, 256, 256]} scale={[-1, 1, 1]}>
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </Sphere>
        )}

     
        <a.group scale={scale}>
          {/* <a.meshBasicMaterial attach="material" transparent opacity={opacity} /> */}
          <Text
            rotation={[0, Math.PI/2, 0]}
            ref={textRef}
            position={[-4, 0, 0]}
            fontSize={0.5}
            anchorX="center"
            anchorY="middle"
            visible={false}
            
          >
            <a.meshBasicMaterial attach="material" color="red" transparent opacity={blinkingOpacity} />
            Xin chào 
          </Text>
        </a.group>
      
        {
          isSearchShowing && 
          <Html
            key="search-html"
            position={sphericalToCartesian(4.8, 120, 13)}
            rotation={[0, Math.PI*3/4, 0]}
            distanceFactor={8}
            transform
            occlude
            >
              <div 
              onClick={() => {
                console.log("clicked");
                setShowInfoModal(true);
                videoRef.current.pause();
              }}
              style={{
                padding: '2px',
                borderRadius: '4px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: 'white',
                cursor: 'pointer',
                zIndex: 10,}}>
                <SearchOutlined style={{ fontSize: '10px', color: 'black' }} />
              </div>
          </Html>
        }

    </group>
  )
}

export default Scene3







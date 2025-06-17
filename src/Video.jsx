import { OrbitControls } from "@react-three/drei";
import Scene3 from "./Scene3";
import {useRef, useState, useEffect  } from "react";
import { Canvas } from "@react-three/fiber";
import { LinearProgress , Box } from '@mui/material';
import InfoModal from "./components/InfoModal";

export default function Video() {
  const videoRef = useRef(document.createElement('video'));
  const progressContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const handlePause = () => {
    if (!videoRef.current) return;
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }
  const handleClickProgress = (event) => {
    if (!videoRef.current || !progressContainerRef.current) return;
    const containerWidth = progressContainerRef.current.clientWidth;
    const clickX = event.clientX - progressContainerRef.current.getBoundingClientRect().left;
    const percent = (clickX / containerWidth) * 100;
    setProgress(percent);
    
    const video = videoRef.current;
    if (video.duration) {
      video.currentTime = (percent / 100) * video.duration;
    }
  }


  useEffect(() => {
    const interval = setInterval(() => {
        const video = videoRef.current;
        if (video && video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
        setCurrentTime(video.currentTime);
        }
    }, 100); 

    return () => clearInterval(interval); 
    }, []);

  return (
    <>
        <Canvas
            shadows
            camera={{ fov: 75, position: [0, 0, 0.1] }}
            onCreated={({ gl }) => {
              gl.setSize(window.innerWidth, window.innerHeight);
            }}
        >
          <ambientLight intensity={0.4} />
          <pointLight intensity={1.5} position={[100, 100, 100]} />
          <Scene3 videoRef={videoRef} setShowInfoModal={setShowInfoModal} />
          <OrbitControls />
          {/* <axesHelper args={[10]} /> */}
        </Canvas>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", position: "absolute", bottom: 20, left: 0, right: 0, gap: 10 }}>
            <button style={{  }} onClick={handlePause}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <span style={{ color: 'white' }}>
                {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)}
            </span>
            <Box
                ref={progressContainerRef}
                onClick={handleClickProgress}
                sx={{
                width: '80vw',        
                mt: 2,
                cursor: 'pointer',
                }}
            >
                <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#ccc',
                    '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1976d2', 
                    }
                }}
                />
            </Box>
        </div>

        {showInfoModal && <InfoModal setShowInfoModal={setShowInfoModal} videoRef={videoRef} />}

    </>
  );
}
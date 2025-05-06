import { Canvas } from "@react-three/fiber";
import { Sky, Box } from "@react-three/drei";
import { XR, XROrigin, createXRStore} from "@react-three/xr";
import {useState } from "react";
import SelectBg from "./SelectBg";
import Scene1 from "./scene1";
import Scene2 from "./Scene2";
import Locomotion from "./Locomotion";
import { OrbitControls } from "@react-three/drei";

const store = createXRStore({
  controller: {
    teleportPointer: true,
    emulate: false, // Tắt mô phỏng controller nếu không cần
  },
});

export default function Play() {
  const [bgImg, setBgImg] = useState(null);
  const [scene, setScene] = useState(1);
//   const xrOriginRef = useRef();

  const handleToggleScene = () => {
    setScene(scene === 1 ? 2 : 1);
  };

  const handleEnterAR = async () => {
    const supported = await navigator.xr?.isSessionSupported?.("immersive-ar");
    if (supported) {
      store.enterAR();
    } else {
      alert("AR is not supported on this device.");
    }
  };

  return (
    <>
      <button
        style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
        onClick={handleEnterAR}
      >
        Enter AR
      </button>

      <Canvas
        shadows
        camera={{ fov: 60, position: [30, 30, 30] }}
        onCreated={({ gl }) => {
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <XR store={store}>
          {/* Lights */}
          <ambientLight intensity={0.4} />
          <pointLight intensity={1.5} position={[100, 100, 100]} />

          {/* XR Origin */}
          {/* <XROrigin ref={xrOriginRef} /> */}

          {/* Player Locomotion */}
          <Locomotion />

          {/* Scene Switching */}
          {scene === 1 ? <Scene1 bgImg={bgImg} /> : <Scene2 />}

          {/* Switch Scene Button (Box) */}
          <Box onClick={handleToggleScene} position={[-10, 10, 10]} args={[3, 3, 3]}>
            <meshLambertMaterial attach="material" color="blue" />
          </Box>

          {/* OrbitControls only when not in XR */}
          {!store.session && <OrbitControls makeDefault />}
        </XR>
      </Canvas>

      <SelectBg setBgImg={setBgImg} />
    </>
  );
}

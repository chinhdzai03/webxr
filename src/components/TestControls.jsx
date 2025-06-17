import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

const SPEED = 5; // Tốc độ di chuyển

const PlayerControls = () => {
  const controlsRef = useRef();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useFrame(({ camera, clock }) => {
    if (!controlsRef.current) return;

    const delta = clock.getDelta(); // Lấy thời gian trôi qua từ frame trước
    velocity.current.set(0, 0, 0); // Reset vận tốc mỗi frame

    // Kiểm tra phím được nhấn
    const keys = {
      forward: pressedKeys["KeyW"],
      backward: pressedKeys["KeyS"],
      left: pressedKeys["KeyA"],
      right: pressedKeys["KeyD"],
    };

    // Xác định hướng di chuyển
    direction.current.set(0, 0, 0);
    if (keys.forward) direction.current.z -= SPEED * delta;
    if (keys.backward) direction.current.z += SPEED * delta;
    if (keys.left) direction.current.x -= SPEED * delta;
    if (keys.right) direction.current.x += SPEED * delta;

    // Tính toán hướng theo góc nhìn hiện tại của camera
    camera.getWorldDirection(velocity.current);
    velocity.current.y = 0; // Không bay lên/xuống
    velocity.current.normalize();

    // Nhân với hướng di chuyển để có chuyển động WASD
    velocity.current.multiplyScalar(direction.current.length());
    camera.position.add(velocity.current);
  });

  return <PointerLockControls ref={controlsRef} />;
};

// Lưu trữ trạng thái phím nhấn
const pressedKeys = {};
document.addEventListener("keydown", (e) => (pressedKeys[e.code] = true));
document.addEventListener("keyup", (e) => (pressedKeys[e.code] = false));

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 75 }} onCreated={({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
      }}
        >
      <ambientLight />
      <PlayerControls />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </Canvas>
  );
}

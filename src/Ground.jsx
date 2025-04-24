import * as THREE from "three"
import { useTexture } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import grass from "./grass.jpg"
import { RepeatWrapping } from "three"

export function Ground() {
  const texture = useTexture(grass)
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(240, 240);


  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial map={texture} color="green" transparent opacity={0.0} />
      </mesh>
      <CuboidCollider args={[1000, 3, 1000]} position={[0, 0, 0]} />
    </RigidBody>
  )
}


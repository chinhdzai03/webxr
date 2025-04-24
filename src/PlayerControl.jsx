import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody } from "@react-three/rapier"

const SPEED = 20 ;
const direction = new THREE.Vector3() ;
const frontVector = new THREE.Vector3() ;
const sideVector = new THREE.Vector3() ;
const rotation = new THREE.Vector3() ;

export default function PlayerControls({ lerp = THREE.MathUtils.lerp }) {
    const ref = useRef();
    const [, get] = useKeyboardControls();

    useFrame((state) => {
        if (!ref.current) return;

        const { forward, backward, left, right } = get();

        const velocity = ref.current.linvel();
        const pos = ref.current.translation();

        state.camera.position.lerp(pos, 0.1);

        // console.log(velocity);
        // console.log(pos)
    

        frontVector.set(0, 0, backward - forward);
        sideVector.set(left - right, 0, 0);
        direction.subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(state.camera.rotation);
        
        ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);
        });


            return (
                <>
                  <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
                    <CapsuleCollider args={[0.75, 0.5]} />
                  </RigidBody>
                </>
              )
}
import { useFrame } from "@react-three/fiber"
import { useXRInputSourceState, XROrigin } from "@react-three/xr"
import { useRef } from "react"
import { Group } from "three"


export default function Locomotion() {
    const controller = useXRInputSourceState('controller', 'right')
    const ref = useRef(null) // Ensure the type is THREE.Group

    useFrame((_, delta) => {
        if (ref.current == null || controller == null) {
            return
        }
        const thumbstickState = controller.gamepad['xr-standard-thumbstick']
        if (thumbstickState == null) {
            return
        }
        ref.current.position.x += (thumbstickState.xAxis ?? 0) * delta
        ref.current.position.z += (thumbstickState.yAxis ?? 0) * delta
    })

    return (
        <group ref={ref}>
            <XROrigin />
        </group>
    )
}
import { useFrame , useThree } from "@react-three/fiber"
import { useXRInputSourceState, XROrigin } from "@react-three/xr"
import { useRef } from "react"


export default function Locomotion() {
    const controller = useXRInputSourceState('controller', 'right')
    const controller_left = useXRInputSourceState('controller', 'left')
    const ref = useRef(null) // Ensure the type is THREE.Group
    const SPEED = 3 ;
    const ZOOM_SPEED = 5; 
    

    useFrame((_, delta) => {
        if (ref.current == null || controller == null || controller_left == null) {
            return
        }
        const thumbstickState = controller.gamepad['xr-standard-thumbstick']
        if (thumbstickState == null) {
            return
        }
        ref.current.position.x += (thumbstickState.xAxis ?? 0) * delta * SPEED
        ref.current.position.z += (thumbstickState.yAxis ?? 0) * delta * SPEED

        // Opt1
       
        // console.log(controller)

        // const thumbstickState_left = controller_left.gamepad['xr-standard-thumbstick']

        
            // const thumbstickLeft = controller_left.gamepad["xr-standard-thumbstick"];
            // if (thumbstickLeft == null) {
            //     return;
            //     }
           
            //   const yAxis = thumbstickLeft.yAxis ?? 0;
            //   const fovStep = yAxis * delta * ZOOM_SPEED;
      
            //   // Zoom out (push stick down = yAxis > 0), Zoom in (stick up = yAxis < 0)
            //   camera.fov = Math.min(100, Math.max(10, camera.fov + fovStep));
            //   camera.updateProjectionMatrix();
            
        


        // if (controller?.gamepad?.buttons[0]?.pressed) {
        //     ref.current.position.z -= delta * ZOOM_SPEED;
        // }

        // if (controller?.gamepad?.buttons[1]?.pressed) {
        //     ref.current.position.z += delta * ZOOM_SPEED;
        // }

        // Opt2

        // const SCALE = 0.5 * delta ;
        // if (controller.gamepad.buttons[0]?.pressed) {
        //     ref.current.scale.multiplyScalar(1 + scaleStep);
        // } 
        // if (controller.gamepad.buttons[1]?.pressed) {
        //     ref.current.scale.multiplyScalar(1 - scaleStep);
        // }

        // Opt3

        // const fovStep = delta * 20;

        //     if (controller.gamepad.buttons[0]?.pressed) {
        //         camera.fov = Math.max(10, camera.fov - fovStep);
        //         camera.updateProjectionMatrix();
        //     }

        //     if (controller.gamepad.buttons[1]?.pressed) {
        //         camera.fov = Math.min(100, camera.fov + fovStep);
        //         camera.updateProjectionMatrix();
        //     }

    })

    return (
        <group ref={ref}>
            <XROrigin />
        </group>
    )
}
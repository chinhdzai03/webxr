import { useXR } from '@react-three/xr';
import { useFrame } from '@react-three/fiber';


import { Vector3 } from 'three';

import { useRef } from 'react';

// mapping
// 1: Trigger
// 2: Grip
// 4: Stick Buttons
// 5: A/X
// 6: B/Y

// axes
// 2: XStick
// 3: YStick

export default function MovementController({
	hand = 'right',
	zeroY = true,
	horizontalSensitivity = 0.05,
	forwardSensistivity = 0.05,
	rotationSensitivity = 0.05,
	deadzone = 0.05,
	horizontalAxis = 2,
	forwardAxis = 3,
	rotationAxis = 2,
	applyForward = true,
	applyHorizontal = false,
	applyRotation = true,
}) {

	const { player , controllers = [] } = useXR();
	const controller = controllers.find(c => c.inputSource.handedness === hand);
    if (!controller) return null;
	const forward = useRef(new Vector3());
	const horizontal = useRef(new Vector3());

	useFrame(() => {
        if (!controller?.inputSource?.gamepad || !player) return;

		if (controller && player) {
			const { axes } = controller.inputSource.gamepad;
			const camera = player.children[0];
			const cameraMatrix = camera.matrixWorld.elements;

			forward.current
				.set(-cameraMatrix[8], -cameraMatrix[9], -cameraMatrix[10])
				.normalize();

			if (zeroY) {
				forward.current.y = 0;
				horizontal.current.y = 0;
			}

			if (applyHorizontal) {
				horizontal.current.copy(forward.current);
				horizontal.current.cross(camera.up).normalize();
				player.position.add(
					horizontal.current.multiplyScalar(
						(Math.abs(axes[horizontalAxis]) > deadzone
							? axes[horizontalAxis]
							: 0) * horizontalSensitivity,
					),
				);
			}

			if (applyForward) {
				player.position.add(
					forward.current.multiplyScalar(
						(Math.abs(axes[forwardAxis]) > deadzone ? -axes[forwardAxis] : 0) *
							forwardSensistivity,
					),
				);
			}

			if (applyRotation) {
				player.rotation.y -=
					(Math.abs(axes[rotationAxis]) > deadzone ? axes[rotationAxis] : 0) *
					rotationSensitivity;
			}
		}
	});
	return <></>;
}

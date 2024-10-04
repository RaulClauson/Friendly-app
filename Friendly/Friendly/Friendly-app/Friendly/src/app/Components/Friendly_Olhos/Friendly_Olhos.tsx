import './Friendly_Olhos.css';
import { useRive, Layout, Fit, Alignment, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useRef, useState } from 'react';

const STATE_MACHINE_NAME = 'State Machine 1';  // Your state machine name
const NUM_X_INPUT = 'NumX';  // Input for the X coordinate
const NUM_Y_INPUT = 'NumY';  // Input for the Y coordinate
const EMOCAO_INPUT = 'Emocao'; // Input for emotional state
const CLICK_INPUT_NAME = 'Click'; // Input to trigger state change

const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

// O componente Friendly_Olhos agora recebe a prop emocao vinda do componente pai
const Friendly_Olhos = ({ emocao }: { emocao: number }) => {
  const { rive, RiveComponent } = useRive({
    src: '/Animations.riv',  // Path to your .riv file
    stateMachines: STATE_MACHINE_NAME,  // State machine name as shown in the image
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const [isFollowing, setIsFollowing] = useState(false); // Track whether it should follow
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Timer to stop following

  // Track current mouse position and target position for smooth interpolation
  const targetX = useRef(50); // Start at center (50%)
  const targetY = useRef(50); // Start at center (50%)
  const currentX = useRef(50); // Current interpolated X position
  const currentY = useRef(50); // Current interpolated Y position

  // Access the NumX, NumY, and Emocao inputs from the state machine
  const numXInput = useStateMachineInput(rive, STATE_MACHINE_NAME, NUM_X_INPUT);
  const numYInput = useStateMachineInput(rive, STATE_MACHINE_NAME, NUM_Y_INPUT);
  const emocaoInput = useStateMachineInput(rive, STATE_MACHINE_NAME, EMOCAO_INPUT); // Emocao input

  // Mouse move handler to update the target positions
  const handleMouseMove = (event: MouseEvent) => {
    if (isFollowing) {
      const friendlyOlhosDiv = document.getElementById('Friendly_Olhos');
      if (friendlyOlhosDiv) {
        const rect = friendlyOlhosDiv.getBoundingClientRect();

        // Check if mouse is within the bounds of the div
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {

          // Calculate the normalized mouse position within the div (range 0-100)
          targetX.current = ((event.clientX - rect.left) / rect.width) * 100;
          targetY.current = (1 - (event.clientY - rect.top) / rect.height) * 100;
        }
      }
    }
  };

  // Smoothly update currentX and currentY using linear interpolation
  const updatePosition = () => {
    if (numXInput && numYInput) {
      currentX.current = lerp(currentX.current, targetX.current, 0.1); // Smooth factor (0.1)
      currentY.current = lerp(currentY.current, targetY.current, 0.1);

      // Update Rive inputs
      numXInput.value = currentX.current;
      numYInput.value = currentY.current;

      // Update Emocao input to reflect the current state
      if (emocaoInput) {
        emocaoInput.value = emocao; // Set the Emocao input value to the prop received from the parent
      }
    }
  };

  // Add mouse move event listener and start smooth update loop
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    // Start the smooth update loop
    const intervalId = setInterval(updatePosition, 16); // 60 FPS update (1000ms / 60 ≈ 16ms)

    // Cleanup the event listener and the update loop when the component is unmounted
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(intervalId);
    };
  }, [isFollowing, numXInput, numYInput, emocaoInput, emocao]); // Add emocao as a dependency to update when it changes

  // Access the "Click" input from the state machine
  const clickInput = useStateMachineInput(rive, STATE_MACHINE_NAME, CLICK_INPUT_NAME);

  // Function to trigger animation state change and start following on click
  const handleClick = () => {
    if (clickInput) {
      clickInput.fire(); // Triggers the "Click" input in the Rive file
    }
    
    if (!isFollowing) {
      setIsFollowing(true); // Start following
      
      // Clear any existing timer before setting a new one
      if (timer) {
        clearTimeout(timer);
      }

      // Stop following after 10 seconds and reset to initial position (e.g., center)
      const newTimer = setTimeout(() => {
        setIsFollowing(false);
        targetX.current = 50; // Reset X to the center (50%)
        targetY.current = 50; // Reset Y to the center (50%)
      }, 10000);

      setTimer(newTimer);
    }
  };

  return (
    <div id="Friendly_Olhos" onClick={handleClick}>
      <RiveComponent />
    </div>
  );
};

export default Friendly_Olhos;

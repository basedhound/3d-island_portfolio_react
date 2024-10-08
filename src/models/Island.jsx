/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import islandScene from "../assets/3d/island.glb";
import { a } from "@react-spring/three";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree(); // Get access to the Three.js renderer and viewport
  const { nodes, materials } = useGLTF(islandScene);
  const lastX = useRef(0); // Use a ref for the last mouse x position
  const rotationSpeed = useRef(0); // Use a ref for rotation speed
  const dampingFactor = 0.95; // Define a damping factor to control rotation damping
  const rotationSensitivity = 0.005;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    startRotation(e.clientX);
  };
  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    moveRotation(e.clientX);
  };
  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    endRotation();
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    startRotation(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    moveRotation(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    endRotation();
  };

  // Handle keydown events
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += rotationSensitivity * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= rotationSensitivity * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  // Handle keyup events
  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  const startRotation = (clientX) => {
    setIsRotating(true);
    lastX.current = clientX;
  };

  const moveRotation = (clientX) => {
    if (isRotating) {
      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * rotationSensitivity * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * rotationSensitivity * Math.PI;
    }
  };

  const endRotation = () => {
    setIsRotating(false);
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  // Add event listeners for pointer and keyboard events
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("mousedown", handlePointerDown);
    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("mouseup", handlePointerUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

        // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("mousedown", handlePointerDown);
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("mouseup", handlePointerUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    gl,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
    handleKeyUp,
  ]);

  return (
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
}

export default Island;

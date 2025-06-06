import React, { Suspense, useMemo } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { memo } from "react";

import CanvasLoader from "../Loader";

const Earth = memo(() => {
  const { scene } = useGLTF("./planet/scene.gltf");

  const earthScene = useMemo(() => scene, [scene]); 
  return (
    <group>
      <primitive object={earthScene} scale={2.5} position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </group>
  );
});

const EarthCanvas = () => {
 
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;


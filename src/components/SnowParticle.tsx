import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import type { ShaderMaterial } from "three";
const SnowParticle = () => {
  const texture = useTexture("/texture/snowflake1.png");
  const shaderRef = useRef<null | ShaderMaterial>(null);
  const {
    size,
    scale,
    height,
    speedH,
    speedV,
    radiusX,
    radiusZ,
    particleSystemWidth,
    count,
  } = useControls({
    size: {
      value: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    scale: {
      value: 2.8,
      min: 0,
      max: 10,
      step: 0.1,
    },
    height: {
      value: 15,
      min: 0,
      max: 20,
      step: 0.1,
    },
    speedH: {
      value: 1.1,
      min: 0,
      max: 2,
      step: 0.1,
    },
    speedV: {
      value: 1,
      min: 0,
      max: 50,
      step: 1,
    },
    particleSystemWidth: {
      value: 38,
      min: 0,
      max: 100,
      step: 1,
    },
    radiusX: {
      value: 2.5,
      min: 0,
      max: 10,
      step: 0.1,
    },
    radiusZ: {
      value: 2.5,
      min: 0,
      max: 10,
      step: 0.1,
    },
    count: {
      value: 1000,
      min: 0,
      max: 5000,
      step: 100,
    },
  });
  const uniforms = useMemo(
    () => ({
      size: { type: "f", value: size },
      scale: { type: "f", value: scale },
      height: { type: "f", value: height },
      uTexture: { type: "t", value: texture },
      speedH: { type: "f", value: speedH },
      speedV: { type: "f", value: speedV },
      radiusX: { type: "f", value: radiusX },
      radiusZ: { type: "f", value: radiusZ },
      elapsedTime: { type: "f", value: 0 },
    }),
    []
  );

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * particleSystemWidth;
      const y = Math.random() * 100;
      const z = (Math.random() - 0.5) * particleSystemWidth;
      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count, particleSystemWidth]);
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.elapsedTime.value = clock.elapsedTime * 10;
      shaderRef.current.uniforms.size.value = size;
      shaderRef.current.uniforms.scale.value = scale;
      shaderRef.current.uniforms.height.value = height;
      shaderRef.current.uniforms.speedH.value = speedH;
      shaderRef.current.uniforms.speedV.value = speedV;
      shaderRef.current.uniforms.radiusX.value = radiusX;
      shaderRef.current.uniforms.radiusZ.value = radiusZ;
    }
  });
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent={true}
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={true}
        depthWrite={false}
      />
    </points>
  );
};

export default SnowParticle;

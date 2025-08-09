import { OrbitControls, Sphere } from "@react-three/drei";

const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Sphere position={[0,0,0]}/>
    </>
  );
};

export default Experience;
import { Environment, OrbitControls } from "@react-three/drei";
import SnowParticle from "./SnowParticle";

const Experience = () => {
  return (
    <>
      <Environment preset="night"/>
      <OrbitControls />
      <SnowParticle/>
    </>
  );
};

export default Experience;
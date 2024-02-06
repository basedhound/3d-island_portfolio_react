import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

// import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
// import { soundoff, soundon } from "../assets/icons";
// import { Bird, Island, Plane, Sky } from "../models";

const Home = () => {
  // const audioRef = useRef(new Audio(sakura));
  // audioRef.current.volume = 0.4;
  // audioRef.current.loop = true;

  // const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  // const [isPlayingMusic, setIsPlayingMusic] = useState(false);



  return (
    <section className="w-full h-screen relative">
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">POPUP
      </div> */}

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}>
        
        <Suspense fallback={<Loader />}></Suspense>
        




        </Canvas>
    </section>
  );
};

export default Home;

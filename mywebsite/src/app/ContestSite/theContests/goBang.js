import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshPhongMaterial, TextureLoader, MeshBasicMaterial } from "three";

function QueenModel() {
    const queenRef = React.useRef();

    React.useEffect(() => {
        const loader = new STLLoader();
        loader.load("/Contests_Modules/chess/Queen.stl", (geometry) => {
            queenRef.current.geometry = geometry;
            queenRef.current.material = new MeshPhongMaterial({
                color: "black",
                specular: "white",
                shininess: 10,
            });
            queenRef.current.scale.set(0.01, 0.01, 0.01);
        });
    }, []);

    return (
        <mesh ref={queenRef}/>
    );
}

function GoBang() {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Canvas>
                <OrbitControls />
                <ambientLight />
                <pointLight position={[100, 100, 100000]} />
                <QueenModel />
            </Canvas>
        </div>
    );}

export default GoBang;
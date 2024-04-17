import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

function Box() {
  const lines = [
    //现在是棋盘的边缘
    {
        start: new THREE.Vector3(-4, -4, 0.051),
        end: new THREE.Vector3(-4, 4, 0.051),
        color: "black",
    },
    {
        start: new THREE.Vector3(-4, 4, 0.051),
        end: new THREE.Vector3(4, 4, 0.051),
        color: "black",
    },
    {
        start: new THREE.Vector3(4, 4, 0.051),
        end: new THREE.Vector3(4, -4, 0.051),
        color: "black",
    },
    {
        start: new THREE.Vector3(4, -4, 0.051),
        end: new THREE.Vector3(-4, -4, 0.051),
        color: "black",
    },
    {
        start: new THREE.Vector3(-5, 5, 0.051),
        end: new THREE.Vector3(-5, -5, 0.051),
        color: "black",
    },
    {
        start: new THREE.Vector3(-5, -5, 0.051),
        end: new THREE.Vector3(5, -5, 0.051),
        color: "black",
    },
    {
        start: new THREE.Vector3(5, -5, 0.051),
        end: new THREE.Vector3(5, 5, 0.051),
        color: "black",
    },
    {
        start: new THREE.Vector3(5, 5, 0.051),
        end: new THREE.Vector3(-5, 5, 0.051),
        color: "black",
    },
  ];

  function Rectangle({ position , color}) {
    return (
      <mesh position={position}>
        <boxGeometry args={[1, 1, 0.001]} /> {/* 创建一个矩形 */}
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
  return (
    <mesh>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshStandardMaterial color={"gray"} />
        {lines.map((line, index) => (
            <Line
            key={index}
            points={[line.start, line.end]}
            color={line.color}
            />
        ))}
        {Array.from({ length: 8 }, (_, i) =>
            Array.from({ length: 8 }, (_, j) => (
            <Rectangle
                key={`${i}-${j}`}
                position={[
                i - 3.5,
                j - 3.5,
                0.051,
                ]}
                color={(i + j) % 2 === 0 ? "#000" : "#fff"}
            />
            ))
        )}


    </mesh>
  );
}

function Chess() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight color={"#ffffff"} intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <Box /> {/* 将 Box 组件放在 Canvas 组件内部 */}
      </Canvas>
    </div>
  );
}

export default Chess;
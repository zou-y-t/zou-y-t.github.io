import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshPhongMaterial } from "three";
import { Progress} from "antd";

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
                color={(i + j) % 2 === 0 ? "gray" : "silver"}
            />
            ))
        )}


    </mesh>
  );
}

function Piece(props){
  const pieceRef = useRef();
  const { x, y, name, color, onLoad } = props;

  const geometry=useLoader(STLLoader,"/Contests_Modules/chess/"+name+".stl");
  

  useEffect(() => {
    const material=new MeshPhongMaterial({
      color: color,
      specular: "white",
      shininess: 100,
    });
    if (pieceRef.current) {
        pieceRef.current.geometry = geometry;
        pieceRef.current.material = material;
        pieceRef.current.scale.set(0.02, 0.02, 0.02);
    }
  }
  , [geometry, color]);

  //位置应该是和棋盘上的格子对应的
  useFrame(() => {
      if (pieceRef.current) {
          pieceRef.current.position.x = x;
          pieceRef.current.position.y = y;
          pieceRef.current.position.z = 0.05;
      }
  });

  // 在模型加载完成后，调用onLoad函数
  useEffect(() => {
  if (geometry) {
      onLoad();
  }
  }, [onLoad]);

  return (
      <mesh ref={pieceRef}/>
  );
}


function Chess() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgression, setLoadingProgression] = useState(0);

  const [piecesLocation,setPiecesLocation]=useState([
    [["Rook","black"],["Knight","black"],["Bishop","black"],["Queen","black"],["King","black"],["Bishop","black"],["Knight","black"],["Rook","black"]],
    [["Pawn","black"],["Pawn","black"],["Pawn","black"],["Pawn","black"],["Pawn","black"],["Pawn","black"],["Pawn","black"],["Pawn","black"]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [["Pawn","white"],["Pawn","white"],["Pawn","white"],["Pawn","white"],["Pawn","white"],["Pawn","white"],["Pawn","white"],["Pawn","white"]],
    [["Rook","white"],["Knight","white"],["Bishop","white"],["Queen","white"],["King","white"],["Bishop","white"],["Knight","white"],["Rook","white"]],
  ]);


  return (
    <>
      <div style={{ width: "100%", height: "100vh", visibility:isLoaded ? 'visible' : 'hidden', position:'relative' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} intensity={15}/>
          <Box/>
          {piecesLocation.map((row, i) =>
            row.map((piece, j) => (
              piece.length > 0 ? (
                <Piece
                  key={`${i}-${j}`}
                  x={j - 3.5}
                  y={i - 3.5}
                  onLoad={() => {
                    if(isLoaded === false){
                      setLoadingProgression((loadingProgression) => loadingProgression + 1);
                      console.log(loadingProgression, isLoaded)
                      if (loadingProgression >= 31) {
                        setIsLoaded(true);
                        setLoadingProgression(0);
                      }
                    }
                  }}
                  name={piece[0]}
                  color={piece[1]}
                  castShadow
                />
              ) : null
            ))
          )}
        </Canvas>
      </div>

      {isLoaded === false && (
        <div height="100vh" width="100%" style={{position:'absolute', top:'50%', left:'50%'}}>
          <Progress
            type="circle"
            percent={Math.min(
              Math.round((loadingProgression / 31) * 100),
              100,
            )}
          />
        </div>
      )}
    </>
  );
}

export default Chess;
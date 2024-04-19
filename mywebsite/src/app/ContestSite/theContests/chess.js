import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshPhongMaterial } from "three";
import { Progress} from "antd";

function Piece(props){
  const pieceRef = useRef();
  const { x, y, name, color, onLoad, selectedPlace, hoveredPlace, moveState, player, setPlayer, board, setBoard, setHoveredPlace, setSelectedPlace, setSelectedPiece, selectedPiece, setMoveState } = props;
  const[theColor,setTheColor]=useState(color);
  const geometry=useLoader(STLLoader,"/Contests_Modules/chess/"+name+".stl");
  

  useEffect(() => {
    const material=new MeshPhongMaterial({
      color: theColor,
      specular: "white",
      shininess: 100,
    });
    if (pieceRef.current) {
        pieceRef.current.geometry = geometry;
        pieceRef.current.material = material;
        pieceRef.current.name = name;
        color === "black" ? pieceRef.current.scale.set(-0.02, -0.02, 0.02) : pieceRef.current.scale.set(0.02, 0.02, 0.02);
    }
  }
  , [geometry, theColor, color, name]);

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
  if(pieceRef.current){
    onLoad();
  }
  }, [onLoad, geometry]);

  // 当点击或者悬停在棋子上时，改变颜色
  useEffect(() => {
    if (pieceRef.current) {
      if (selectedPlace && selectedPlace[0] === x && selectedPlace[1] === y) {
        if(moveState === false){
          //若是起点
          if(player===color){
            setTheColor("red");
            setSelectedPiece(pieceRef.current);
            setMoveState(true);//改变状态，下一步为终点
          }
        }
        else if(moveState ===true && selectedPiece.position!==pieceRef.current.position){
          if(player===color){
            setTheColor("red");
            //设置上一步选择的棋子为未选择，颜色设置为player
            selectedPiece.material.color.setHex(player === "white" ? 0xffffff : 0x000000);

            setSelectedPiece(pieceRef.current);
            setMoveState(true);//改变状态，下一步为终点
          }
        }

      } else if(selectedPlace && moveState ===true){
          //若是终点
          //若board的对应位置没有棋子
          if(board[selectedPlace[1]+3.5][selectedPlace[0]+3.5].length === 0){
            setMoveState(false);
            setSelectedPiece(null);
            setPlayer(player === "white" ? "black" : "white");
            board[selectedPlace[1]+3.5][selectedPlace[0]+3.5] = [selectedPiece.name, player];
            board[selectedPiece.position.y+3.5][selectedPiece.position.x+3.5] = [];
            setBoard(board);
            setSelectedPlace(null);
          }
          //若board的对应位置有棋子
          else{
            if(board[selectedPlace[1]+3.5][selectedPlace[0]+3.5][1] !== player){
              setMoveState(false);
              setSelectedPiece(null);
              setPlayer(player === "white" ? "black" : "white");
              board[selectedPlace[1]+3.5][selectedPlace[0]+3.5] = [selectedPiece.name, player];
              board[selectedPiece.position.y+3.5][selectedPiece.position.x+3.5] = [];
              setBoard(board);
              setSelectedPlace(null);
            }
          }
          
      }else if (hoveredPlace && hoveredPlace[0] === x && hoveredPlace[1] === y) {
        color === "black" ? setTheColor("#87CEFF") : setTheColor("#E066FF");
      } else {
        setTheColor(color);
      }
    }
  }
  , [selectedPlace, setSelectedPlace, hoveredPlace, x, y, color, moveState, player, setMoveState, setHoveredPlace, selectedPiece, setSelectedPiece, board, setBoard, setPlayer]);


  return (
      <mesh 
        ref={pieceRef} 
        // onClick={()=> setTheColor("red")} 
        // onPointerOver={()=>setTheColor("blue")} 
        // onPointerOut={()=>setTheColor(color)} 
      />
  );
}


function Chess() {
  const [moveState, setMoveState] = useState(false);//false表示起点，true表示终点
  const [player, setPlayer] = useState("white");//white表示白方，black表示黑方
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);

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
        <mesh 
          position={position}
          onClick={()=>setSelectedPlace(position)}
          onPointerOver={()=>{setHoveredPlace(position)}}
          onPointerOut={()=>{setHoveredPlace(null)}} 
        >
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
                  id={`${i}-${j}`}
                  board={piecesLocation}
                  setBoard={setPiecesLocation}
                  x={j - 3.5}
                  y={i - 3.5}
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                  hoveredPlace={hoveredPlace}
                  setHoveredPlace={setHoveredPlace}
                  moveState={moveState}
                  setMoveState={setMoveState}
                  selectedPiece={selectedPiece}
                  setSelectedPiece={setSelectedPiece}
                  player={player}
                  setPlayer={setPlayer}
                  onLoad={() => {
                    if(isLoaded === false){
                      setLoadingProgression((loadingProgression) => loadingProgression + 1);
                      console.log(loadingProgression, isLoaded)
                      if (loadingProgression >= 32*2) {
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
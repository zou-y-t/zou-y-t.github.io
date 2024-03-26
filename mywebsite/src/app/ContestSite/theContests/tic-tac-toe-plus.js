import React, { useRef, useEffect, useState, useCallback } from 'react';
import {Link }from 'react-router-dom';
import {Button, Alert, Switch, Space} from'antd';
import { RedoOutlined, DownCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';

function TicTacToe() {
  const canvasRef = useRef(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [next, setNext] = useState('X');

  const [status,setStatus] = useState('PLACE');
  const [movingIndex,setMovingIndex] = useState(null);

  //设置剩余棋子数目
  const [Xleft,setXleft] = useState(3);
  const [Oleft,setOleft] = useState(3);
  const [visible,setVisible] = useState(false);

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setMovingIndex(null);
    setNext('X');
    setStatus('PLACE');
    setXleft(3);
    setOleft(3);
    setVisible(false);
  };

  const placePiece = () => {
    setStatus('PLACE');
    setMovingIndex(null);
  };

  const movePiece = () =>{
    setStatus('MOVE');
    setMovingIndex(null);
  };

  const handleInfoClose = () => {
    setVisible(false);
  };

  const checkWinner = useCallback(() => {
        const lines = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // 竖
          [0, 4, 8], [2, 4, 6] // 斜
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
          }
        }
        return null;
      },[board]
  );

  const handleClick = event => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const row = Math.floor(y / 100);
    const col = Math.floor(x / 100);
    const index = row * 3 + col;
    if(status === 'PLACE'){
        //判断还有没有棋子
        if(next === 'X' && Xleft === 0){
            setVisible(true);
            return;
        }
        if(next === 'O' && Oleft === 0){
            setVisible(true);
            return;
        }

        //有棋子的时候
        if (board[index]) return;
        setBoard(prev => {
            const newBoard = [...prev];
            newBoard[index] = next;
            return newBoard;
        });
        setNext(prev => prev === 'X' ? 'O' : 'X');
        //棋子数目减一
        if(next === 'X'){
            setXleft(prev => prev - 1);
        }
        else{
            setOleft(prev => prev - 1);
        }
    }
    else if(status === 'MOVE'){
        if(board[index] === next){
            setBoard(prev => {
                const newBoard = [...prev];
                return newBoard;
            });
            setMovingIndex(index);
        }else if(movingIndex !== null){
            //若在棋盘上移动的距离为1
            var canMove = false;
            const lines=[
                [0,1],[1,2],[3,4],[4,5],[6,7],[7,8],
                [0,3],[3,6],[1,4],[4,7],[2,5],[5,8],
                [0,4],[4,8],[2,4],[4,6],
                [1,3],[3,7],[7,5],[5,1]
            ];
            for(let i = 0; i < lines.length; i++){
                if((lines[i][0] === movingIndex && lines[i][1] === index)||(lines[i][1] === movingIndex && lines[i][0] === index)){
                    canMove = true;
                    break;
                }
            }

            if(canMove){
                if(board[index] === null){
                    setBoard(prev => {
                        const newBoard = [...prev];
                        newBoard[index] = prev[movingIndex];
                        newBoard[movingIndex] = null;
                        return newBoard;
                    });
                    setMovingIndex(null);

                    //移动成功了才会切换状态
                    setNext(prev => prev === 'X' ? 'O' : 'X');
                    setStatus('PLACE');
                }
            }
            else{
                //Do nothing
            }
        }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'lightblue';
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = j * 100;
        const y = i * 100;
        context.strokeRect(x, y, 100, 100);
        const symbol = board[i * 3 + j];
        if (symbol) {
            if(movingIndex!=null && i * 3 + j === movingIndex){
                context.font = '48px bold'; // Set the font size
                const textWidth = context.measureText(symbol).width;
                const textHeight = 48; // This is a rough estimate
                const xCenter = x + 50 - textWidth / 2;
                const yCenter = y + 50 + textHeight / 2;
                context.fillStyle = 'Gray';
                context.fillText(symbol, xCenter, yCenter);
            }
            else{
                context.font = '48px bold'; // Set the font size
                const textWidth = context.measureText(symbol).width;
                const textHeight = 48; // This is a rough estimate
                const xCenter = x + 50 - textWidth / 2;
                const yCenter = y + 50 + textHeight / 2;
                context.fillStyle = 'Black';
                context.fillText(symbol, xCenter, yCenter);
            }
        }
      }
    }

    //判断输赢
    const winner = checkWinner();
    if (winner) {
        alert(`Player ${winner} wins!`);
    }
  }, [board, checkWinner, movingIndex]);

return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <center>
                {visible&&<Alert message="You have no pieces" type="info" closable afterClose={handleInfoClose}/>}
            </center>
            <br/>
            <center>
                <canvas ref={canvasRef} width={300} height={300} onClick={handleClick} />
            </center>
            <br/>
            <center>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                            <Button onClick={placePiece} icon={<DownCircleOutlined />} >PLACE {next}</Button>
                            <Button onClick={movePiece} icon={<DoubleRightOutlined />} >MOVE {next}</Button>
                    </div>
            </center>
            <br/>
            <center>
                <Button onClick={resetBoard} icon={<RedoOutlined />} >RESET</Button>
            </center>
    </div>
);
}

export default TicTacToe;
import React from 'react';
import { useState, useEffect } from 'react';

/**
 * AnimalMovingDiv Component
 * 
 * 这个组件会渲染一个跟随鼠标移动的动物GIF，并且将鼠标替换成面包图片
 * 
 * @param {number} animalIndex - 动物的编号，控制显示哪种动物
 * @param {ReactNode} children - 子组件
 */

const AnimalMovingDiv = ({animalIndex, children}) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
    const [isFlipped, setIsFlipped] = useState(false);

    const imageWidth = 150; // 图片宽度
    const imageHeight = 150; // 图片高度
    const v=5;

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prevPosition) => {
                let dx = (targetPosition.x - prevPosition.x);
                let dy = (targetPosition.y - prevPosition.y);
                const length = Math.sqrt(dx * dx + dy * dy);

                // 归一化向量并乘以速度因子
                if (length >= 10) {
                    dx = (dx / length) * v;
                    dy = (dy / length) * v;
                }
                else{
                    dx=0;
                    dy=0;
                }

                return {
                    x: prevPosition.x + dx,
                    y: prevPosition.y + dy,
                };
            });
        }, 16); // 大约60帧每秒
        return () => clearInterval(interval);
    }, [targetPosition]);

    const handleMouseMove = (e) => {
        setTargetPosition({ x: e.clientX, y: e.clientY });
        setIsFlipped(e.clientX > position.x + imageWidth / 2);
    };

  return (
    <div 
      onMouseMove={handleMouseMove} 
      style={{ 
        height: '100vh', 
        position: 'relative',
        cursor: `url(/AnimalsMovingGIF/bread.png), auto`
      }}
    >
        {children}
        <img
            src={`/AnimalsMovingGIF/Animal_${animalIndex}.gif`}
            alt="Follow Mouse"
            style={{
            position: 'absolute',
            left: position.x -(isFlipped ? imageWidth-32 : 0), // 根据鼠标位置设置图片位置,32是鼠标图片的宽度
            top: position.y - imageHeight / 2 -16,
            transition: 'left 0.1s, top 0.1s',
            width: `${imageWidth}px`, // 设置图片宽度
            height: `${imageHeight}px`, // 设置图片高度
            transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)', // 根据鼠标位置反转图片
            transformOrigin: 'center', // 设置图片反转中心
            }}
        />
    </div>
  );
};

export default AnimalMovingDiv;
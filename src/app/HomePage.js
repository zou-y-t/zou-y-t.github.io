import React, { useState, useEffect } from 'react';

function HomePage({animalIndex, isMobile}) {

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
        !isMobile ? 
        (<div 
            onMouseMove={handleMouseMove} 
            style={{ 
                height: '100vh', 
                position: 'relative',
                cursor:`url(/AnimalsMovingGIF/bread.png), auto`
            }}
        >
            <h1>this is home page</h1>
            <img
                src={`/AnimalsMovingGIF/Animal_${animalIndex}.gif`}
                alt="Follow Mouse"
                style={{
                    position: 'absolute',
                    left: position.x - imageWidth / 2,
                    top: position.y - imageHeight,
                    transition: 'left 0.1s, top 0.1s',
                    width: `${imageWidth}px`, // 设置图片宽度
                    height: `${imageHeight}px`, // 设置图片高度
                    transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)', // 根据鼠标位置反转图片
                }}
            />
        </div>):
        (
            <div>
                <h1>this is home page</h1>
            </div>
        )
    );
}

export default HomePage;
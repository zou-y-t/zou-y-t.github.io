import React, { useState, useEffect, useRef } from 'react';
import '../css/Grass.css';

const flowerColors = ['red', 'pink', 'purple', 'blue', 'orange'];

const Grass = ({ numGrass, numFlower, children }) => {
    const [grasses, setGrasses] = useState([]);
    const [hoveredGrass, setHoveredGrass] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const newGrasses = [];
        for (let i = 0; i < numGrass; i++) {
            newGrasses.push({
                id: i,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                color:  Math.random()<0.5?'green':'#006400',
                hasFlower: false,
                flowerColor: ''
            });
        }

        // 随机选择一些草来添加花朵
        for (let i = 0; i < numFlower; i++) {
            const randomIndex = Math.floor(Math.random() * numGrass);
            newGrasses[randomIndex].hasFlower = true;
            newGrasses[randomIndex].flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        }

        setGrasses(newGrasses);
    }, [numGrass, numFlower]);

    const handleMouseMove = (e) => {
        setHoveredGrass({ x: e.clientX, y: e.clientY });
    };

    const isHovered = (hoveredGrass, grass) => {
        if (!containerRef.current) return false;
        const containerRect = containerRef.current.getBoundingClientRect();
        const grassLeft = parseFloat(grass.left) / 100 * containerRect.width + containerRect.left + 5; // 加上草宽度的一半
        const grassTop = parseFloat(grass.top) / 100 * containerRect.height + containerRect.top + 30; // 加上草高度的一半
        return Math.abs(hoveredGrass.x - grassLeft) < 50 && Math.abs(hoveredGrass.y - grassTop) < 50;
    };

    return (
        <div 
            className="grass-container" 
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            {children}
            {grasses.map(grass => (
                <div
                    key={grass.id}
                    className={`grass ${hoveredGrass && isHovered(hoveredGrass, grass) ? 'hovered' : ''}`}
                    style={{ left: grass.left, top: grass.top, borderBottom: `60px solid ${grass.color}` }}
                >
                    {grass.hasFlower && (
                        <div className="flower">
                            <div className='petal' style={{backgroundColor: grass.flowerColor}}></div>
                            <div className='petal' style={{backgroundColor: grass.flowerColor}}></div>
                            <div className='petal' style={{backgroundColor: grass.flowerColor}}></div>
                            <div className='petal' style={{backgroundColor: grass.flowerColor}}></div>
                            <div className='petal' style={{backgroundColor: grass.flowerColor}}></div>
                            <div className="center"></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Grass;
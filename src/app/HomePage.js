import React from 'react';

import AnimalMovingDiv from '../Component/AnimalMovingDiv';
import Grass from '../Component/Grass';

function HomePage({animalIndex, isMobile}) {

    return (
        !isMobile ? 
        (   <div style={{height:'100vh',position:'relative'}}>
                {/* <br/> */}
                <Grass numGrass={400} numFlower={50} >
                    <AnimalMovingDiv 
                        animalIndex={animalIndex}
                    />
                </Grass>
                <div 
                    style={{ 
                        position: 'absolute', 
                        top: '30%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        display: 'flex', // 使用 Flexbox 布局
                        alignItems: 'center', // 垂直居中对齐
                        padding: '0 20px' // 左右留空 20px
                    }}>

                    <img src='websiteIcon.png' alt='appIcon' style={{width:'60px'}}/>
                    <h1 style={{ marginLeft: '10px' }}>摸鱼咯</h1>
                </div>
            </div>
        ):
        (
            <div>
                <h1>摸鱼咯</h1>
            </div>
        )
    );
}

export default HomePage;
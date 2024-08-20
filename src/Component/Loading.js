import React from "react";
import {
    Loading3QuartersOutlined
}
from '@ant-design/icons';
import { Typography } from 'antd';

/**
 * @description Loading组件，显示加载中
 */

function Loading() {
    const bounceAnimation = {
        animation: 'bounce 1s infinite',
    }

    const bounceKeyframes = `
        @keyframes bounce {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
    `;

    return (
        <div style={{ width: '100%', height: '100%', textAlign: 'center'}}>
            <style>
                {bounceKeyframes}
            </style>
            <img 
                src="websiteIcon.png" 
                alt="loading" 
                style={{
                    width: '100px', 
                    height: '100px', 
                    marginTop: '10%',
                    ...bounceAnimation
                }}
            />
            <Typography.Title 
                level={5}  
            >
                <Loading3QuartersOutlined spin/>
                加载中
            </Typography.Title>
        </div>
    );
}

export default Loading;
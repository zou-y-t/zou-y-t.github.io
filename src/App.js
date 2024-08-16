import React, { useState } from 'react';
import { 
  SettingOutlined,
  HomeOutlined,
  DatabaseOutlined,
  CodeOutlined,
  UserOutlined,
  FunctionOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
//组件
import Home from './app/HomePage';
import Data from './app/DataPage';
import Code from './app/CodePage';
import Function from './app/FunctionPage';
import Settings from './app/SettingsPage';
import User from './app/UserPage';
const items = [
  {
    label: 'Home',
    icon: <HomeOutlined />,
    key: '/',
  },
  {
    label: 'Data',
    icon: <DatabaseOutlined />,
    key: '/data',
  },
  {
    label: 'Code',
    icon: <CodeOutlined />,
    key: '/code',
  },
  {
    label: 'Settings',
    icon: <SettingOutlined />,
    key: '/settings',
  },
  {
    label: 'function',
    icon: <FunctionOutlined />,
    key: '/function',
  },
  {
    label: 'User',
    icon: <UserOutlined />,
    key: '/user',
  },
];

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

const App = () => {
  const isMobile = isMobileDevice();
  const [animalIndex, setAnimalIndex] = useState(Math.floor(Math.random() * 7));
  const [current, setCurrent] = useState('/');
  const onClick = (e) => {
    console.log('click ', e);
    if (e.key === '/') {
      const timestamp = Date.now();
      setAnimalIndex((timestamp) %7);
    }
    setCurrent(e.key);
    navigate(e.key);
  };
  const navigate = useNavigate();
  return(
    <div style={{ position: 'relative' }}>
      <Menu 
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="horizontal" 
        items={items} 
        style={{backgroundColor: 'rgb(91,178,251)'}}
      />
      <img 
        src="/websiteIcon.png" 
        alt="Website Icon" 
        style={{ position: 'absolute', top: 3, right: 4, height: '40px' }} 
        onClick={() => {
          navigate('/');
          setCurrent('/');
          const timestamp = Date.now();
          setAnimalIndex((timestamp) %7);
        }}
      />
      <Routes>
          <Route path="/" element={<Home animalIndex={animalIndex} isMobile={isMobile}/>} />
          <Route path="/data" element={<Data />} />
          <Route path="/code" element={<Code />} />
          <Route path="/function" element={<Function />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
  
};
export default App;
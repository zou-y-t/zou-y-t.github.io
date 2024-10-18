import React, { useState, useEffect } from 'react';
import { 
  HomeOutlined,
  DatabaseOutlined,
  CodeOutlined,
  FunctionOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
//组件
import Home from './app/HomePage';
import Data from './app/DataPage';
import Code from './app/CodePage';
import Function from './app/FunctionPage';

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
    label: 'Notes',
    icon: <FunctionOutlined />,
    key: '/function',
  },
];

let pyodideInstance = null;
let pyodideLoadingPromise = null;

export async function loadPyodideInstance() {
  if (!pyodideInstance && !pyodideLoadingPromise) {
    pyodideLoadingPromise = window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/'
    }).then(instance => {
      pyodideInstance = instance;
      pyodideLoadingPromise = null;
      return pyodideInstance;
    });
  }
  return pyodideLoadingPromise || pyodideInstance;
}

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const App = () => {
  const isMobile = isMobileDevice();
  const [animalIndex, setAnimalIndex] = useState(Math.floor(Math.random() * 7));
  const [current, setCurrent] = useState('/');
  const [pyodide, setPyodide] = useState(null);

  useEffect(() => {
    const initializePyodide = async () => {
      const pyodideInstance = await loadPyodideInstance();
      setPyodide(pyodideInstance);
    };
    initializePyodide();
  }, []);

  const onClick = (e) => {
    console.log('click ', e);
    if (e.key === '/') {
      const timestamp = Date.now();
      setAnimalIndex((timestamp) % 7);
    }
    setCurrent(e.key);
    navigate(e.key);
  };

  const navigate = useNavigate();

  return (
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
          setAnimalIndex((timestamp) % 7);
        }}
      />
      <Routes>
        <Route path="/" element={<Home animalIndex={animalIndex} isMobile={isMobile} />} />
        <Route path="/data" element={<Data />} />
        <Route path="/code" element={<Code pyodide={pyodide} />} />
        <Route path="/function" element={<Function pyodide={pyodide} />} />
      </Routes>
    </div>
  );
};

export default App;
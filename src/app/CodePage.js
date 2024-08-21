import React, { useState, useEffect } from 'react';
// import logo from '../logo.svg';
import '../App.css';
import PythonRunnerInput from '../Component/PythonRunnerInput.js';
import PythonRunnerOutput from '../Component/PythonRunnerOutput.js';
import PythonRunnerStatus from '../Component/PythonRunnerStatus.js';
import PythonLib from '../Component/PythonLib.js';

let pyodideInstance = null;

export async function loadPyodideInstance() {
  if (!pyodideInstance) {
    pyodideInstance = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/'
    });
  }
  return pyodideInstance;
}

function CodePage() {
  const [output, setOutput] = useState('');
  const [outputImg, setOutputImg] = useState('');
  const [status, setStatus] = useState('');
  const [pyodide, setPyodide] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const initializePyodide = async () => {
      const pyodideInstance = await loadPyodideInstance();
      setPyodide(pyodideInstance);
    };
    initializePyodide();
  }, []);

  const handleOutputChange = (newOutput) => {
    setOutput(newOutput);
  };

  const handleOutputImgChange = (newOutputImg) => {
    setOutputImg(newOutputImg);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleIsError = (isError) => {
    setIsError(isError);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <br/>
        <img 
          src="websiteIcon.png"  
          alt="appIcon"
          style={{
              width: '100px', 
              height: '100px', 
          }}
        />
        <br/>
        <PythonRunnerInput 
          onOutputChange={handleOutputChange} 
          onOutputImgChange={handleOutputImgChange}
          onStatusChange={handleStatusChange} 
          onIsError={handleIsError} 
          thePyodide={pyodide}
        />
        <PythonRunnerOutput output={output} img={outputImg} />
        <PythonRunnerStatus status={status} isError={isError} />
        <PythonLib onStatusChange={handleStatusChange} pyodide={pyodide} handleIsError={handleIsError}/>
      </header>
    </div>
  );
}

export default CodePage;
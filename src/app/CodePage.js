import React, { useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import PythonRunnerInput from '../Component/PythonRunnerInput.js';
import PythonRunnerOutput from '../Component/PythonRunnerOutput.js';
import PythonRunnerStatus from '../Component/PythonRunnerStatus.js';
import PythonLib from '../Component/PythonLib.js';

function CodePage() {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [pyodide, setPyodide] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleOutputChange = (newOutput) => {
    setOutput(newOutput);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handlePyodideStatusChange = (newPyodide) => {
    setPyodide(newPyodide);
  };

  const handleIsError = (isError) => {
    setIsError(isError);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PythonRunnerInput 
          onOutputChange={handleOutputChange} 
          onStatusChange={handleStatusChange} 
          onIsError={handleIsError} 
          onPyodideStatusChange={handlePyodideStatusChange} 
        />
        <PythonRunnerOutput output={output}/>
        <PythonRunnerStatus status={status} isError={isError} />
        <PythonLib onStatusChange={handleStatusChange} pyodide={pyodide} handleIsError={handleIsError}/>
      </header>
    </div>
  );
}

export default CodePage;
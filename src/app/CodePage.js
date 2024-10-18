import React, { useState} from 'react';
import '../App.css';
import PythonRunnerInput from '../Component/PythonRunnerInput.js';
import PythonRunnerOutput from '../Component/PythonRunnerOutput.js';
import PythonRunnerStatus from '../Component/PythonRunnerStatus.js';
import PythonLib from '../Component/PythonLib.js';

function CodePage({ pyodide }) {
  const [output, setOutput] = useState('');
  const [outputImg, setOutputImg] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);

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
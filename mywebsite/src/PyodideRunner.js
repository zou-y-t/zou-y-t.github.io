import React, { useState, useEffect } from 'react';

let pyodideInstance = null;
let isLoadingPyodide = false;

function PyodideRunner() {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState('print("Hello, Pyodide!")');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPyodide = async () => {
      if (pyodideInstance) {
        setPyodide(pyodideInstance);
        return;
      }
      if (isLoadingPyodide) {
        return;
      }
      isLoadingPyodide = true;
      try {
        pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
        });
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        setError(error.toString());
      } finally {
        isLoadingPyodide = false;
      }
    };
    loadPyodide();
  }, []);

//   const loadPandas = async () => {
//     if (pyodide) {
//       try {
//         await pyodide.loadPackage('pandas');
//         setOutput('Pandas has been successfully loaded.');
//         setError('');
//       } catch (err) {
//         setOutput('');
//         setError(`Failed to load pandas: ${err.toString()}`);
//       }
//     }
//   };
    const loadPandas = async () => {
        if (pyodide) {
        try {
            await pyodide.loadPackage('pandas');
            // 检查 pandas 模块的属性
    //         const testCode = `
    // import pandas as pd
    // print(pd)
    // print(dir(pd))
    // assert hasattr(pd, 'DataFrame'), "pandas does not have attribute 'DataFrame'"
    //         `;
    //         await pyodide.runPythonAsync(testCode);
            setOutput('Pandas has been successfully loaded and tested.');
            setError('');
        } catch (err) {
            setOutput('');
            setError(`Failed to load pandas: ${err.toString()}`);
        }
        }
    };

  const runCode = async () => {
    if (pyodide) {
      try {
        // Define output and error arrays in Python
        pyodide.runPython(`
output = []
error = []
import sys
from js import console

class StdoutRedirector:
    def write(self, text):
        if text.strip():
            output.append(text)

class StderrRedirector:
    def write(self, text):
        if text.strip():
            error.append(text)

sys.stdout = StdoutRedirector()
sys.stderr = StderrRedirector()
        `);

        // Clear previous output and error
        setOutput('');
        setError('');

        // Run the user code
        await pyodide.runPythonAsync(code);

        // Get the output and error from the redirected streams
        const output = pyodide.globals.get('output').toJs();
        const error = pyodide.globals.get('error').toJs();

        setOutput(output.join('\n'));
        setError(error.join('\n'));
      } catch (err) {
        setOutput('');
        setError(err.toString());
      }
    }
  };

  return (
    <div>
      <h2>Python Runner</h2>
      <h3>Output</h3>
      <pre>{output}</pre>
      <h3>Error</h3>
      <pre style={{ color: 'red' }}>{error}</pre>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={runCode}>Run Python</button>
      <button onClick={loadPandas}>Load Pandas</button>
    </div>
  );
}

export default PyodideRunner;
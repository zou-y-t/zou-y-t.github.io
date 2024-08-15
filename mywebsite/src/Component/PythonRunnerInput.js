import React, { useState, useEffect, useRef } from 'react';
import { FloatButton } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/indent-fold.js';

/**
 * @description PythonRunnerInput 组件，输入 Python 代码并运行
 * @param {Object} props - 组件的属性
 * @param {function} props.onOutputChange - 处理输出变化的回调函数
 * @param {function} props.onStatusChange - 处理状态变化的回调函数
 * @param {function} props.onIsError - 处理错误状态的回调函数
 * @param {function} props.onPyodideStatusChange - 处理 Pyodide 状态变化的回调函数
 */

function PythonRunnerInput({ onOutputChange, onStatusChange, onIsError, onPyodideStatusChange }) {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState('print("Hello, Python!")');
  const pyodideInstanceRef = useRef(null);
  const isLoadingPyodideRef = useRef(false);
  const hasLoadedPyodide = useRef(false);

  useEffect(() => {
    const loadPyodide = async () => {
      if (hasLoadedPyodide.current) return;
      hasLoadedPyodide.current = true;

      if (pyodideInstanceRef.current) {
        setPyodide(pyodideInstanceRef.current);
        onPyodideStatusChange(pyodideInstanceRef.current);
        return;
      }
      if (isLoadingPyodideRef.current) {
        onStatusChange('');
        onIsError(false);
        return;
      }
      isLoadingPyodideRef.current = true;
      try {
        pyodideInstanceRef.current = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/'
        });
        setPyodide(pyodideInstanceRef.current);
        onPyodideStatusChange(pyodideInstanceRef.current);
      } catch (err) {
        onStatusChange(err.toString());
        onIsError(true);
      } finally {
        isLoadingPyodideRef.current = false;
      }
    };

    loadPyodide();
  }, [onStatusChange, onIsError, onPyodideStatusChange]);

  const runPythonCode = async () => {
    if (!pyodide) {
        onStatusChange('loading...');
        onIsError(false);
        return;
    }
    try {
        pyodide.runPython(`
            output = []
            status = []
            import sys
            from js import console
            
            class StdoutRedirector:
                def write(self, text):
                    if text.strip():
                        output.append(text)
            
            class StderrRedirector:
                def write(self, text):
                    if text.strip():
                        status.append(text)
            
            sys.stdout = StdoutRedirector()
            sys.stderr = StderrRedirector()
        `);
        onOutputChange('');
        onStatusChange('');
        onIsError(false);
        await pyodide.runPythonAsync(code);
        const output = pyodide.globals.get('output').toJs();
        const status = pyodide.globals.get('status').toJs();
        onOutputChange(output.join('\n'));
        onStatusChange(status.join('\n'));
        onIsError('error' in status || 'Error' in status);
    } catch (error) {
        onStatusChange(error.toString());
        onIsError(true);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', textAlign: 'left', position: 'relative' }}>
      <CodeMirror
        value={code}
        options={{
          mode: 'python',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        style={{ width: '100%', height: '200px' }}
      />
      <FloatButton 
        onClick={runPythonCode} 
        icon={<CaretRightOutlined />} 
        type='primary' 
        style={{ position: 'absolute', bottom: '10px', right: '10px' }} 
      />
    </div>
  );
}

export default PythonRunnerInput;
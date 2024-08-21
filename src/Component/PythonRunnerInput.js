import React, { useState, useEffect } from 'react';
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
 * @param {function} props.onOutputImgChange - 处理输出图片变化的回调函数
 * @param {function} props.onStatusChange - 处理状态变化的回调函数
 * @param {function} props.onIsError - 处理错误状态的回调函数
 * @param {Object} props.thePyodide - Pyodide 实例
 */

function PythonRunnerInput({ onOutputChange, onOutputImgChange, onStatusChange, onIsError, thePyodide }) {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState('print("Hello, Python!")');

  useEffect(() => {
    if(thePyodide) {
      setPyodide(thePyodide);
    }
  }, [thePyodide]);

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
            import io
            import base64
            
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

        if(code.includes('matplotlib')) {
          // 处理输出中的图片
          const imageCode = `
          import matplotlib.pyplot as plt
          buf = io.BytesIO()
          plt.savefig(buf, format='png')
          buf.seek(0)
          img = base64.b64encode(buf.getvalue()).decode('utf-8')
          plt.close()
          img
          `;
          const outputImg = await pyodide.runPythonAsync(imageCode);
          onOutputImgChange(outputImg);
        } else {
          onOutputImgChange('');
        }
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
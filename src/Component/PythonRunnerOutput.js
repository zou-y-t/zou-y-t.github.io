import React from 'react';
import { Card } from 'antd';

/**
 * @description PythonRunnerOutput 组件，输出 Python 代码的运行结果
 * @param {Object} props - 组件的 props
 * @param {Array} props.output - 输出的结果
 * @param {string} props.img - 输出的图片
 */
function PythonRunnerOutput(props) {
  return (
    <div style={{ width: '100%', height: '100%', textAlign: 'left'}}>
        <Card title="Output" style={{ width: '100%', height: '100%',backgroundColor: 'rgb(91,178,251)'}}>
            <pre style={{ fontFamily: 'Roboto, sans-seri', fontSize: '16px', color: '#000' }}>
                {props.output}
            </pre>
            {props.img && <img src={`data:image/png;base64,${props.img}`} alt="Matplotlib Output" />}
        </Card>
    </div>
  );
}

export default PythonRunnerOutput;
import React from 'react';
import { Card } from 'antd';

/**
 * @description PythonRunnerStatus component, displays the status of Python code execution
 * @param {Object} props - component props
 * @param {string} props.status - status message
 */
function PythonRunnerStatus(props) {
    return (
        <div style={{ width: '100%', height: '100%', textAlign: 'left'}}>
        <Card title="Status" style={{ width: '100%', height: '100%',backgroundColor: 'rgb(91,178,251)'}}>
            <pre style={{ fontFamily: 'Roboto, sans-seri', fontSize: '16px', color: (props.isError?'red':'green') }}>
                {props.status}
            </pre>
        </Card>
    </div>
    );
}

export default PythonRunnerStatus;

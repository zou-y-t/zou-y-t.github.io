import React from 'react';
import { Card, Button, Row, Col, Input } from 'antd';

/**
 * @description PythonLib component, loads Python packages
 * @param {Object} props - component props
 * @param {function} props.onStatusChange - callback function to handle status changes
 * @param {function} props.handleIsError - callback function to handle error changes
 * @param {Object} props.pyodide - Pyodide instance
 */
function PythonLib(props) {
    const [packageName, setPackageName] = React.useState('');
    return (
        <div style={{ width: '100%', height: '100%', textAlign: 'left'}}>
        <Card title="Python Packages" style={{ width: '100%', height: '100%',backgroundColor: 'rgb(91,178,251)'}}>
            <Row justify='start'>
                <Col span={3}> 
                    <Button 
                        type="primary"
                        style={{backgroundColor:(props.pyodide?'green':"red")}}
                        onClick={() => {
                            props.onStatusChange('Numpy loading...');
                            props.handleIsError(false);
                            props.pyodide.loadPackage(['numpy']).then(() => {
                                props.onStatusChange('Numpy loaded');
                            });
                        }} 
                        disabled={!props.pyodide}
                    >
                        Numpy
                    </Button>
                </Col>
                <Col span={3}>
                    <Button 
                        type="primary"
                        style={{backgroundColor:(props.pyodide?'green':"red")}}
                        onClick={() => {
                            props.onStatusChange('Pandas loading...');
                            props.handleIsError(false);
                            props.pyodide.loadPackage(['pandas']).then(() => {
                                props.onStatusChange('Pandas loaded');
                            });
                        }} 
                        disabled={!props.pyodide}
                    >
                        Pandas
                    </Button>
                </Col>
                <Col span={3}>
                    <Button 
                        type="primary"
                        style={{backgroundColor:(props.pyodide?'green':"red")}}
                        onClick={() => {
                            props.onStatusChange('Matplotlib loading...');
                            props.handleIsError(false);
                            props.pyodide.loadPackage(['matplotlib']).then(() => {
                                props.onStatusChange('Matplotlib loaded');
                            });
                        }} 
                        disabled={!props.pyodide}
                    >
                        Matplotlib
                    </Button>
                </Col>
            </Row>
            <br/>
            <Row justify='start'>
                <Col span={3}>
                    <Button 
                        type="primary"
                        style={{backgroundColor:(props.pyodide?'green':"red")}}
                        onClick={() => {
                            props.onStatusChange('Scipy loading...');
                            props.handleIsError(false);
                            props.pyodide.loadPackage(['scipy']).then(() => {
                                props.onStatusChange('Scipy loaded');
                            });
                        }} 
                        disabled={!props.pyodide}
                    >
                        Scipy
                    </Button>
                </Col>
                <Col span={3}>
                    <Button 
                        type="primary"
                        style={{backgroundColor:(props.pyodide?'green':"red")}}
                        onClick={() => {
                            props.onStatusChange('Scikit-learn loading...');
                            props.handleIsError(false);
                            props.pyodide.loadPackage(['sklearn']).then(() => {
                                props.onStatusChange('Scikit-learn loaded');
                            });
                        }} 
                        disabled={!props.pyodide}
                    >
                        Scikit-learn
                    </Button>
                </Col>
                <Col span={3}>
                    <Button
                        type="primary"
                        style={{backgroundColor:(props.pyodide?'green':"red")}}
                        onClick={() => {
                            props.onStatusChange('OpenCV loading...');
                            props.handleIsError(false);
                            props.pyodide.loadPackage(['opencv-python']).then(() => {
                                props.onStatusChange('OpenCV loaded');
                            });
                        }}
                        disabled={!props.pyodide}
                    >
                        OpenCV
                    </Button>
                </Col>
            </Row>
            <br/>
            <Row justify='start'>
                <Col span={3}>
                    <Input 
                        placeholder="Enter package name"
                        value={packageName}
                        onChange={(e) => {
                            setPackageName(e.target.value);
                        }}
                    />
                </Col>
                <Col span={1}/>
                <Col span={3}>
                    <Button 
                        type="primary"
                        onClick={() => {
                            // 检查包名是否有效
                            try{
                                const judge=props.pyodide.packages[packageName];
                                if (!judge) {
                                    props.onStatusChange(`Unknown package: ${packageName}`);
                                    props.handleIsError(true);
                                    return;
                                }
                            }
                            catch(err){
                                props.onStatusChange(`Unknown package: ${packageName}`);
                                props.handleIsError(true);
                                return;
                            };

                            props.onStatusChange(`${packageName} loading...`);
                            props.handleIsError(false);
                            props.pyodide.loadPackage([packageName]).then(() => {
                                props.onStatusChange(`${packageName} loaded`);
                            })
                            .catch((err) => {
                                props.onStatusChange(err.toString());
                                props.handleIsError(true);
                            });
                        }} 
                        disabled={!props.pyodide}
                    >
                        Load Package
                    </Button>
                </Col>
            </Row>
            <br/>
        </Card>
    </div>
    );
}

export default PythonLib;

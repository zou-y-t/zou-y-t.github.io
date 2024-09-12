import React, { useEffect, useState } from 'react';
import MyReactMarkdown from '../Component/MyReactMarkdown';
import { Card, Menu } from 'antd';

const { SubMenu } = Menu;

function FunctionPage() {
    const [markdown, setMarkdown] = useState('');
    const [noteUrl, setNoteUrl] = useState('Notes/Welcome/');
    const [fileName, setFileName] = useState('welcome.md');

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/`+noteUrl+fileName)
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, [setMarkdown, noteUrl, fileName]);

    const handleMenuClick = (e) => {
        //路径
        const url=e.key.toString().split('/').slice(0,-1).join('/');
        //文件名
        const fileName=e.key.toString().split('/')[1];
        setNoteUrl('Notes/'+url+'/');
        setFileName(fileName);
    }

    return (
        <div style={{display:'flex'}}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['']}
                style={{ lineHeight: '64px', width: '200px' }}
                onClick={handleMenuClick}
            >
                <SubMenu
                    title="Quant的一些笼统的笔记"
                >
                   <Menu.Item
                        key="MyFirstQuantNote/Quant_1.md" 
                    >
                        Quant_1
                    </Menu.Item>
                    <Menu.Item
                        key="MyFirstQuantNote/Quant_2.md" 
                    >
                        Quant_2
                    </Menu.Item>
                    <Menu.Item
                        key="MyFirstQuantNote/Quant_3.md" 
                    >
                        Quant_3
                    </Menu.Item>
                    <Menu.Item
                        key="MyFirstQuantNote/Quant_4.md" 
                    >
                        Quant_4
                    </Menu.Item>
                    <Menu.Item
                        key="MyFirstQuantNote/Quant_5.md"
                    >
                        Quant_5
                    </Menu.Item>
                    <Menu.Item
                        key="MyFirstQuantNote/Quant_6.md"
                    >
                        Quant_6
                    </Menu.Item>
                    <Menu.Item
                        key="MyFirstQuantNote/Quant_7.md"
                    >
                        Quant_7
                    </Menu.Item>
                    <Menu.Item
                        key="MyFirstQuantNote/Quant_8.md"
                    >
                        Quant_8
                    </Menu.Item>
                </SubMenu>
                <Menu.Item 
                    key="MyFirstQuantNote/Quant_1.md"
                >
                    FBDQA课程笔记
                </Menu.Item>
                <SubMenu
                    title='ML学习笔记'
                >
                    <Menu.Item
                        key="ML/KNN.md"
                    >
                        K-Nearest Neighbor(KNN)
                    </Menu.Item>
                    <Menu.Item
                        key="ML/LS.md"
                    >
                        Least Square(LS)
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    title='Stochastic Process'
                >
                    <Menu.Item
                        key="Stochastic_Process/Class1.md"
                    >
                        Class_1
                    </Menu.Item>
                    <Menu.Item
                        key="Stochastic_Process/Class2.md"
                    >
                        Class_2
                    </Menu.Item>
                </SubMenu>
            </Menu>
            <Card>
                <MyReactMarkdown markdown={markdown} noteUrl={noteUrl} />
            </Card>
            
        </div>
    );
}

export default FunctionPage;
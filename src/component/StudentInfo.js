import React from "react";
import {
    Form,
    Input,
    Button,
    Space,
} from 'antd';
import { BugFilled } from "@ant-design/icons";

const { TextArea } = Input;

const StudentInfo = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <Form
                layout='vertical'
                form={form}
            >
                <Form.Item
                    label='姓名'
                >
                    <Input 
                        placeholder='Alan'
                    />
                </Form.Item>
                <Form.Item
                    label='学校'
                >
                    <Input
                        placeholder='Tsinghua University'
                    />
                </Form.Item>
                <Form.Item
                    label='简介'
                >
                    <TextArea 
                        placeholder='I am a student at Tsinghua University, majoring in Electrical Engineering.'
                    />
                </Form.Item>
            </Form>
            <Space
                style={{alignContent: 'center'}}
            >
                <Button
                    type='primary'
                    onClick={
                        () => {
                            form.submit();
                        }
                    }
                >
                    提交修改
                </Button>
            </Space>
        </div>
    );
    }


export default StudentInfo;
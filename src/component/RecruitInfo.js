import React from "react";
import {
    Form,
    Input,
    Button,
    Space,
    Card,
    message,
} from 'antd';

const RecruitInfo = (props) => {
    const [form] = Form.useForm();
    const isSimple = props.isSimple;
    return (
        <>
        {isSimple===0 && <Card
            style={{stroke: 'black'}}
            onClick={
                () => {
                    message.info('点击查看详情');
                }
            }
        >
            <Form
                layout='horizontal'
                form={form}
            >
                <Form.Item
                    label='年级'
                >
                    高三
                </Form.Item>
                <Form.Item
                    label='科目'
                >
                    数学
                </Form.Item>
                <Form.Item
                    label='地点'
                    onClick={
                        () => {
                            message.info('接入高德api');
                        }
                    }
                >
                    北京市海淀区
                </Form.Item>
                <Form.Item
                    label='时间'
                >
                    每周一次
                </Form.Item>
                <Form.Item
                    label='薪资'
                >
                    1000元/小时
                </Form.Item>
                <Form.Item
                    label='需求'
                >
                    We need a powerful math teacher to help us prepare for the college entrance examination.
                </Form.Item>
            </Form>
        </Card>}

        {isSimple===1 && <Card
            style={{stroke: 'black'}}
            onClick={
                () => {
                    message.info('点击查看详情');
                }
            }
        >
            <Form
                layout='horizontal'
                form={form}
            >
                <Form.Item
                    label='科目'
                >
                    数学
                </Form.Item>
                <Form.Item
                    label='地点'
                    onClick={
                        () => {
                            message.info('接入高德api');
                        }
                    }
                >
                    北京市海淀区
                </Form.Item>
                <Form.Item
                    label='薪资'
                >
                    1000元/小时
                </Form.Item>
            </Form>
        </Card>}
        </>
    );
    }

export default RecruitInfo;
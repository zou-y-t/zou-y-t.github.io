import React from "react";
import {
    Form,
    Input,
    Button,
    Space,
    Row,
    Col,
} from 'antd';
import { BugFilled } from "@ant-design/icons";

const { TextArea } = Input;

const Filter = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <br/>
            <br/>
            <Form
                layout='horizontal'

                form={form}
            >
                <Row
                    justify='space-around'
                    align='middle'
                >
                    <Form.Item
                        label='年级'
                    >
                        111
                    </Form.Item>
                    <Form.Item
                        label='科目'
                    >
                        111
                    </Form.Item>
                    <Form.Item
                        label='地点'
                    >
                        111
                    </Form.Item>
                    <Form.Item
                        label='时间'
                    >
                        111
                    </Form.Item>
                    <Form.Item
                        label='薪资'
                    >
                        111
                    </Form.Item>
                </Row>
                <br/>
                <br/>
                <Row
                    justify='space-around'
                    align='middle'
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
                </Row>
            </Form>
        </div>
    );

}

export default Filter;
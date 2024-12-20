import React from "react";
import {
    Form,
    Input,
    Button,
    Space,
} from 'antd';

import RecruitInfo from "./RecruitInfo";

const StudentComments = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <br/>
            <RecruitInfo isSimple={1}/>
            <br/>
            <RecruitInfo isSimple={1}/>
            <br/>
            <RecruitInfo isSimple={1}/>
            <br/>
            <RecruitInfo isSimple={1}/>
            <br/>
            <RecruitInfo isSimple={1}/>
        </div>
    );
    }

export default StudentComments;
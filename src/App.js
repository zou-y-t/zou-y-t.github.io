import React, { useState, useEffect } from 'react';
import { 
  HomeOutlined,
  UserOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  FilterOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  FloatButton,
  Drawer,
  Row,
  Col,
  message,
  Typography,
} from 'antd';

import StudentInfo from './component/StudentInfo';
import StudentComments from './component/StudentComments';
import RecruitInfo from './component/RecruitInfo';
import Filter from './component/Filter';

const { Text } = Typography;

const App = () => {
  const [title, setTitle] = useState('Comments');
  const [visible, setVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  //年级，科目，地点，时间，薪资
  const [grade, setGrade] = useState('高三');
  const [subject, setSubject] = useState('数学');
  const [location, setLocation] = useState('北京市海淀区');
  const [time, setTime] = useState('每周一次');
  const [salary, setSalary] = useState('1000元/小时');

  const showDrawer = () => {
    setVisible(true);
  }

  const onClose = () => {
    setVisible(false);
  }

  const showFilterDrawer = () => {
    setFilterVisible(true);
  }

  const onFilterClose = () => {
    setFilterVisible(false);
  }

  return (
    <div 
      style={{
        backgroundColor: 'lightgray',
      }}
    >
      <FloatButton
        style={{
          position: 'fixed',
          top: '10vh',
          right: '2vh',
        }}
        icon={<FilterOutlined />}
        onClick={
          () => {
            message.info('设置筛选条件');
            showFilterDrawer();
          }
        }
        type='primary'
      />
      <FloatButton
        style={{
          position: 'fixed',
          top: '30vh',
          right: '2vh',
        }} 
        icon={<CommentOutlined />}
        badge={{count: 5, color: 'red'}}
        onClick={
          () => {
            setTitle('Comments');
            showDrawer();
          }
        }
        type='primary'
      />
      <FloatButton 
        style={{
          position: 'fixed',
          top: '40vh',
          right: '2vh',
        }}
        icon={<UserOutlined />} 
        badge={{count: 10, color: 'yellow'}}
        onClick={
          () => {
            setTitle('Users');
            showDrawer();
          }
        }
        type='primary'
      />
      <FloatButton
        style={{
          position: 'fixed',
          top: '50vh',
          right: '2vh',
        }} 
        icon={<CustomerServiceOutlined />}
        badge={{count: 5, color: 'red'}}
        onClick={
          () => {
            message.info('联系客服')
          }
        }
        type='primary'
      />
      <FloatButton
        style={{
          position: 'fixed',
          top: '20vh',
          right: '2vh',
        }} 
        icon={<ReloadOutlined />}
        onClick={
          () => {
            message.info('刷新')
          }
        }
        type='primary'
      />
      <Drawer
        title={title==='Comments' ? '消息' : '个人信息'}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        {title==='Comments' && <StudentComments />}
        {title==='Users' && <StudentInfo />}
      </Drawer>
      <Drawer
        title='设置筛选条件'
        placement="top"
        closable={false}
        onClose={onFilterClose}
        open={filterVisible}
      >
        <Filter />
      </Drawer>


      
      {/* <br />
      <Text>
        当前筛选条件：年级：{grade}，科目：{subject}，地点：{location}，时间：{time}，薪资：{salary}
      </Text>
      <br /> */}

      <br />
      <Row 
        justify='space-around'
        align='middle'
      >
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
      </Row>

      <br />
      <br />

      <Row 
        justify='space-around'
        align='middle'
      >
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
      </Row>

      <br />
      <br />

      <Row 
        justify='space-around'
        align='middle'
      >
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
        <Col span={7}>
          <RecruitInfo isSimple={0}/>
        </Col>
      </Row>

      <br />
      <br />
      


    </div>
  );
};

export default App;
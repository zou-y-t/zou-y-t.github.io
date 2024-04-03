import {React, useEffect, useState} from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {Menu} from 'antd';
import { AppstoreOutlined, CheckSquareOutlined, BorderOuterOutlined, BorderInnerOutlined, CloseSquareOutlined, HomeOutlined } from '@ant-design/icons';
import ContestHome from './contestHome';

const items = [
  // {
  //   label: "Contest Home",
  //   key: 'game_home',
  //   icon: <HomeOutlined />,
  //   to: '/contest/contestHome',
  // },
  {
    label: "Tic Tac Toe",
    key: 'game_tictactoe',
    icon: <CloseSquareOutlined />,
    to: '/contest/tictactoe',
  },
  {
    label: "Tic Tac Toe Plus",
    key: 'game_tictactoeplus',
    icon: <CheckSquareOutlined />,
    to: '/contest/tictactoeplus',
  },
  {
    label: "2048",
    key: 'game_2048',
    icon: <AppstoreOutlined />,
    to: '/contest/2048',
  },
  {
    label: "Gobang",
    key: 'game_gobang',
    icon: <BorderOuterOutlined />,
    to: '/contest/gobang',
  },
  {
    label:"Chess",
    key: 'game_chess',
    icon: <BorderInnerOutlined />,
    to: '/contest/chess',
  }
];

function Contest() {
  const [current, setCurrent] = useState('');
  const location=useLocation();
  
  useEffect(() => {
    setCurrent(location.pathname.split('/')[2]);
    //console.log(location.pathname.split('/')[2]?location.pathname.split('/')[2]:'home');
  }
  , [location]);

  const onClick = (e) => {
      setCurrent(e.key);
    };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px' }}>
        <Menu onClick={onClick} selectedKeys={["game_"+current]} mode="vertical">
        {items.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.to}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
      </div>

      <div style={{ flex: 1 }}>
        {!current ? <ContestHome />:<Outlet />}
      </div>
    </div>
  );
}

export default Contest;
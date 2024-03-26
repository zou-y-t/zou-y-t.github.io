import {React, useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import {Menu} from 'antd';
import { AppstoreOutlined, CheckSquareOutlined, BorderOuterOutlined, BorderInnerOutlined, CloseSquareOutlined } from '@ant-design/icons';

const items = [
  {
    label: (<Link to="/contest/tictactoe">Tic Tac Toe</Link>),
    key: 'game_tic_tac_toe',
    icon: <CloseSquareOutlined />,
  },
  {
    label: (<Link to="/contest/tictactoeplus">Tic Tac Toe Plus</Link>),
    key: 'game_tic_tac_toe_plus',
    icon: <CheckSquareOutlined />,
  },
  {
    label: (<Link to="/contest/2048">2048</Link>),
    key: 'game_2048',
    icon: <AppstoreOutlined />,
  },
  {
    label: (<Link to="/contest/gobang">Gobang</Link>),
    key: 'game_gobang',
    icon: <BorderOuterOutlined />,
  },
  {
    label:(<Link to="/contest/chess">Chess</Link>),
    key: 'game_chess',
    icon: <BorderInnerOutlined />,
  }
];

function Contest() {

  const [current, setCurrent] = useState('');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px' }}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />
      </div>

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Contest;
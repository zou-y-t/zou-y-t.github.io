import React, { useState} from 'react';
import { Table, Menu, Input } from 'antd';
import GetDataByUrl from '../Component/GetDataByUrl';
import '../css/DataPage.css';

const DataPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);
    const [url, setUrl] = useState('');
    const [startQuery, setStartQuery] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [menuName, setMenuName] = useState('');
    const [isSubInfo, setIsSubInfo] = useState(false);

    const handleMenuClick = (e) => {
        setSearchText('');
        setFilteredData([]);
        setColumns([]);
        setData([]);
        setLoading(true);
        setError(null);
        setStartQuery(true);
        setUrl("https://cloud.tsinghua.edu.cn/d/278a516b63444cf89b7c/files/?p=%2F"+e.key+"&dl=1");
        setMenuName(e.key);
        setIsSubInfo(false);
    };

    const handleRowClick = (record) => {
        console.log('Clicked row:', record);
        const symbol = record['symbol'];
        const symbolInt = parseInt(symbol);

        if(!isNaN(symbolInt)){
            setSearchText('');
            setFilteredData([]);
            setColumns([]);
            setData([]);
            setLoading(true);
            setError(null);
            setStartQuery(true);
            let theUrl = "";
            if(symbolInt<=2297){
                theUrl = "https://cloud.tsinghua.edu.cn/d/278a516b63444cf89b7c/files/?p=%2Fstock_data_2023%2Fstock_data_2023_1%2F"+record['stock_code']+"_2023.csv&dl=1";
            }
            else if(symbolInt<=300114){
                theUrl = "https://cloud.tsinghua.edu.cn/d/278a516b63444cf89b7c/files/?p=%2Fstock_data_2023%2Fstock_data_2023_2%2F"+record['stock_code']+"_2023.csv&dl=1";
            }
            else if(symbolInt<=300952){
                theUrl = "https://cloud.tsinghua.edu.cn/d/278a516b63444cf89b7c/files/?p=%2Fstock_data_2023%2Fstock_data_2023_3%2F"+record['stock_code']+"_2023.csv&dl=1";
            }
            else if(symbolInt<=600479){
                theUrl = "https://cloud.tsinghua.edu.cn/d/278a516b63444cf89b7c/files/?p=%2Fstock_data_2023%2Fstock_data_2023_4%2F"+record['stock_code']+"_2023.csv&dl=1";
            }
            else if(symbolInt<=603201){
                theUrl = "https://cloud.tsinghua.edu.cn/d/278a516b63444cf89b7c/files/?p=%2Fstock_data_2023%2Fstock_data_2023_5%2F"+record['stock_code']+"_2023.csv&dl=1";
            }
            else if(symbolInt<=688315){
                theUrl = "https://cloud.tsinghua.edu.cn/d/278a516b63444cf89b7c/files/?p=%2Fstock_data_2023%2Fstock_data_2023_6%2F"+record['stock_code']+"_2023.csv&dl=1";
            }
            else{
                theUrl = "https://cloud.tsinghua.edu.cn/d/278a516b63444cf89b7c/files/?p=%2Fstock_data_2023%2Fstock_data_2023_7%2F"+record['stock_code']+"_2023.csv&dl=1";
            }

            setUrl(theUrl);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <GetDataByUrl
                url={url}
                setData={setData}
                setIsLoading={setLoading}
                setError={setError}
                setColums={setColumns}
                startQuery={startQuery}
                setStartQuery={setStartQuery}
            />
            <Menu
                mode="vertical"
                defaultSelectedKeys={['menu1']}
                style={{ lineHeight: '64px', width: '200px' }}
                onClick={handleMenuClick}
            >
                <Menu.Item 
                    key="stock_info.csv"
                >
                    股票信息
                </Menu.Item>
                <Menu.Item 
                    key="sp500_symbols.csv"
                >
                    S&P 500 股票代码
                </Menu.Item>
                <Menu.Item key="menu3">Menu 3</Menu.Item>
            </Menu>
            <div style={{ flex: 1, padding: '0 20px' }}>
                {!loading && 
                <>
                    <Input
                        placeholder="Search"
                        style={{ width: 200, marginBottom: 20 }}
                        value={searchText}
                        onChange={e => {
                            setSearchText(e.target.value)
                            setFilteredData(data.filter(record => 
                                Object.values(record).some(value => 
                                    value !== null && value !== '' && value.toString().toLowerCase().includes(e.target.value.toLowerCase())
                                )
                            ));
                        }}
                    />
                    <Table
                        columns={columns}
                        bordered={true}
                        rowHoverable={true}
                        style={{ cursor: 'pointer' }}
                        dataSource={searchText === '' ? data : filteredData}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    if(menuName === 'stock_info.csv'){
                                        if(!isSubInfo){
                                            handleRowClick(record);
                                            setIsSubInfo(true);
                                        }            
                                    }
                                },
                            };
                        }}
                    />
                </>
                }
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
            </div>
        </div>
    );
};

export default DataPage;
import React, { useEffect, useRef, useState} from 'react';
import { Table, Menu, Input, Checkbox } from 'antd';
import{
    StockOutlined,
}
from '@ant-design/icons';
import GetDataByUrl from '../Component/GetDataByUrl';
import Loading from '../Component/Loading';
import '../css/DataPage.css';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartItemsColor = {
    open: 'rgba(255, 99, 132, 1)',
    high: 'rgba(54, 162, 235, 1)',
    low: 'rgba(255, 206, 86, 1)',
    close: 'rgba(75, 192, 192, 1)',
    pre_close: 'rgba(153, 102, 255, 1)',
    change: 'rgba(255, 159, 64, 1)',
    pct_chg: 'rgba(255, 99, 132, 1)',
    vol: 'rgba(0, 0, 0, 1)',
    amount: 'rgba(0, 100, 0, 1)',
};


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
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [chartDataName, setChartDataName] = useState(['close']);


    const handleMenuClick = (e) => {
        setSearchText('');
        setFilteredData([]);
        setColumns([]);
        setData([]);
        setLoading(true);
        setError(null);
        setStartQuery(true);
        setUrl(e.key);
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
                theUrl = "stock_data_2023/stock_data_2023_1/"+record['stock_code']+"_2023.csv";
            }
            else if(symbolInt<=300114){
                theUrl = "stock_data_2023/stock_data_2023_2/"+record['stock_code']+"_2023.csv&";
            }
            else if(symbolInt<=300952){
                theUrl = "stock_data_2023/stock_data_2023_3/"+record['stock_code']+"_2023.csv";
            }
            else if(symbolInt<=600479){
                theUrl = "stock_data_2023/stock_data_2023_4/"+record['stock_code']+"_2023.csv";
            }
            else if(symbolInt<=603201){
                theUrl = "stock_data_2023/stock_data_2023_5/"+record['stock_code']+"_2023.csv";
            }
            else if(symbolInt<=688315){
                theUrl = "stock_data_2023/stock_data_2023_6/"+record['stock_code']+"_2023.csv";
            }
            else{
                theUrl = "stock_data_2023/stock_data_2023_7/"+record['stock_code']+"_2023.csv";
            }

            setUrl(theUrl);
        }
    };

    //图表
    useEffect(() => {
        if(isSubInfo&&chartRef.current){
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [...data].reverse().map(record => record['trade_date']),
                    datasets: chartDataName.map(name => {
                        return {
                            label: name,
                            data: [...data].reverse().map(record => record[name]),
                            borderColor: chartItemsColor[name],
                            borderWidth: 1,
                            fill: false,
                        };
                    })
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: chartDataName.join(', ')
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: chartDataName.join(', ')
                            }
                        }
                    }
                }
            });
        }
    }
    ,[data, isSubInfo, chartDataName]);


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
                    {isSubInfo && 
                        <Checkbox.Group 
                            onChange={checkedValues => {
                                setChartDataName(checkedValues);
                                if (chartInstance.current) {
                                    chartInstance.current.destroy();
                                }
                            }} 
                            value={chartDataName}
                        >
                            <Checkbox 
                                value="open"
                            >
                                open
                                <StockOutlined style={{ color: chartItemsColor['open'] }} />
                            </Checkbox>
                            <Checkbox
                                value="high"
                            >
                                high
                                <StockOutlined style={{ color: chartItemsColor['high'] }} />
                            </Checkbox>
                            <Checkbox
                                value="low"
                            >
                                low
                                <StockOutlined style={{ color: chartItemsColor['low'] }} />
                            </Checkbox>
                            <Checkbox
                                value="close"
                            >
                                close
                                <StockOutlined style={{ color: chartItemsColor['close'] }} />
                            </Checkbox>
                            <Checkbox
                                value="pre_close"
                            >
                                pre_close
                                <StockOutlined style={{ color: chartItemsColor['pre_close'] }} />
                            </Checkbox>
                            <Checkbox 
                                value="change"
                            >
                                change
                                <StockOutlined style={{ color: chartItemsColor['change'] }} />
                            </Checkbox>
                            <Checkbox 
                                value="pct_chg"
                            >
                                pct_chg
                                <StockOutlined style={{ color: chartItemsColor['pct_chg'] }} />
                            </Checkbox>
                            <Checkbox 
                                value="vol"
                            >
                                vol
                                <StockOutlined style={{ color: chartItemsColor['vol'] }} />
                            </Checkbox>
                            <Checkbox 
                                value="amount"
                            >
                                amount
                                <StockOutlined style={{ color: chartItemsColor['amount'] }} />
                            </Checkbox>
                        </Checkbox.Group>

                    }
                    {isSubInfo && 
                        <canvas
                            ref={chartRef}
                        />
                    }
                </>
                }
                {loading && <Loading />}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
            </div>
        </div>
    );
};

export default DataPage;
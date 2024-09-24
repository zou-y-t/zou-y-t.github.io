import { useEffect, } from 'react';
import Papa from 'papaparse';

/**
 * GetDataNyUrl:从一个给定的URL获取数据
 * @param {string} url - 一个URL地址
 * @param {function} setData - 一个设置数据的函数
 * @param {function} setIsLoading - 一个设置加载状态的函数
 * @param {function} setError - 一个设置错误信息的函数
 * @param {function} setColums - 一个设置表头的函数
 * @returns {void}
 */
function GetDataByUrl({ url, setData, setIsLoading, setError, setColums, startQuery, setStartQuery }) {
    useEffect(() => {
        if (!startQuery) {
            return;
        }

        

        console.log('Fetching data from:', url);

        fetch(`${process.env.PUBLIC_URL}/Data/${url}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(csvText=>{
                // 使用 PapaParse 解析 CSV 数据
                const parsedData = Papa.parse(csvText, { header: true });
                console.log(parsedData.data); // 调试信息

                // 过滤掉空行和不完整的数据行
                const filteredData = parsedData.data.filter(record => 
                    Object.values(record).some(value => value !== null && value !== '')
                );

                setData(filteredData.map((record, index) => ({ key: index, ...record })));

                // 生成表头
                const columns = filteredData.length > 1 ? Object.keys(filteredData[1]).map(key => ({
                    title: key,
                    dataIndex: key,
                    key: key,
                })) : [];
                setColums(columns);

                setIsLoading(false);
                setStartQuery(false);
            })
            .catch(error => {
                console.error(error);
                setError(error);
                setIsLoading(false);
            });
    }, [url, setData, setIsLoading, setError, setColums, startQuery, setStartQuery]);

    return null;
}

export default GetDataByUrl;
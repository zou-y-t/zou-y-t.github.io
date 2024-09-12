# 2024/7/10
# 数据的获得与存储
## 意义
- 建模
  - 模型建立
  - 模型评估
  - 模型回测
  - 风险控制
- 交易
- 目的：能实现存取
## 数据获取
- [tushare](http://tushare.org/index.html)
- [Yahoo](http://finance.yahoo.com)
- [Google Finance](https://www.google.com/finance)
- [QuantQuote(S&P500 EOD data only)](https://www.quantquote.com)
- [EODData(requires registration)](http://eoddata.com)
## 存储方式
- csv
- NoSQL
- SQL
- ...
## 数据格式
- 必须包含的信息
  - 交易所信息
  - 数据来源
  - Ticker/symbol
  - price
  - 企业行为(stock splits/dividend adjustments)
  - 国家假日

- 易错点：
  - 企业行为
  - "spikes"：用spike filter
  - 缺失数据
## 设计股票EOD数据的表
- Exchange：交易所，这是进行证券、商品、衍生品等交易的市场。例如，纽约证券交易所（NYSE）、纳斯达克（NASDAQ）等。
- DataVendor：数据供应商，提供金融市场数据的公司或服务。例如，Bloomberg、Reuters、Quandl等。
- Symbol：交易代码，用于标识特定金融工具的唯一代码。例如，苹果公司的股票代码是AAPL。
- DailyPrice：日价格，金融工具在一天内的价格数据，通常包括开盘价、收盘价、最高价、最低价和交易量等。
- EOD：End of Day，表示日终，指一天交易结束后的数据，包括开盘价、收盘价、最高价、最低价和交易量等。
## 可视化
[资料](http://scikit-learn.org/stable/auto_examples/applications/plot_stock_market.html#stock-market)

# 时间序列分析
## Mean Reversion and Ornstein-Uhlenbeck process
- 均值回归（Mean Reversion）是一种统计现象，指的是一个变量在经历了极端值之后，往往会回归到其长期平均值。这个概念在金融市场中非常重要，因为许多资产价格和经济指标都表现出均值回归的特性。

- 奥恩斯坦-乌伦贝克过程（Ornstein-Uhlenbeck Process）是一种连续时间的随机过程，常用于建模均值回归现象。它是一个广义的布朗运动过程，具有以下形式的随机微分方程：

$dX_t = \theta (\mu - X_t) dt + \sigma dW_t$

其中：
- $X_t$ 是时间t时的状态变量。
- $\theta$是均值回归速度。
- $\mu$ 是长期均值。
- $\sigma$ 是波动率(方差)。
- $W_t$ 是标准布朗运动。

这个方程表示变量 $X_t$ 会以速度 $\theta$ 回归到长期均值$\mu$，同时受到随机波动 $\sigma dW_t$ 的影响。
## ADF Test
ADF（Augmented Dickey-Fuller）检验是一种统计测试，用于确定时间序列是否具有单位根，即时间序列是否是平稳的。平稳时间序列的均值和方差不随时间变化，而非平稳时间序列则可能表现出趋势或季节性变化。

### ADF 检验的原理

ADF 检验通过检验以下模型来确定时间序列的平稳性：

$\Delta y_t = \alpha + \beta t + \gamma y_{t-1} + \delta_1 \Delta y_{t-1} + \cdots + \delta_p \Delta y_{t-p} + \epsilon_t$

其中：
- $\Delta y_t$ 是 $y_t$ 的一阶差分。
- $\alpha$ 是常数项。
- $\beta t$ 是时间趋势项。
- $\gamma$ 是单位根系数。
- $\delta_i$ 是滞后项的系数。
- $\epsilon_t$ 是误差项。

### Python 实现

以下是使用 `statsmodels` 库进行 ADF 检验的示例代码：

```python
import numpy as np
import pandas as pd
from statsmodels.tsa.stattools import adfuller

# 生成示例时间序列数据
np.random.seed(0)
data = np.random.randn(100).cumsum()  # 随机游走数据

# 执行 ADF 检验
result = adfuller(data)

# 输出检验结果
print('ADF Statistic: %f' % result[0])
print('p-value: %f' % result[1])
print('Critical Values:')
for key, value in result[4].items():
    print('\t%s: %.3f' % (key, value))
```
### 结果解释

1. **ADF 统计量**: `result[0]`
   - 这是检验统计量。它用于与临界值进行比较，以确定是否拒绝原假设（即时间序列存在单位根，非平稳）。
   
2. **p 值**: `result[1]`
   - 这是检验的显著性水平。如果 p 值小于某个阈值（例如 0.05），则可以拒绝原假设，认为时间序列是平稳的。
   
3. **临界值**: `result[4]`
   - 这些是不同显著性水平（1%、5%、10%）下的临界值。如果 ADF 统计量小于这些临界值，则可以拒绝原假设。
### 示例输出

假设我们得到以下输出：

```
ADF Statistic: 1.103866
p-value: 0.995249
Critical Values:
    1%: -3.433
    5%: -2.863
    10%: -2.567
```

结论：

- **ADF 统计量**: `1.103866` 大于所有临界值（1%、5%、10%），这意味着我们不能拒绝原假设。
- **p 值**: `0.995249` 非常高，远大于 0.05，这进一步表明我们不能拒绝原假设。

因此，根据 ADF 检验结果，时间序列数据不是平稳的。
## Hurst Exponent
Hurst 指数（Hurst exponent）是用来衡量时间序列的长期依赖性和自相似性的统计量。它的取值范围在 0 到 1 之间，具体解释如下：

- **H = 0.5**: 时间序列是随机游走（Brownian motion），没有长期依赖性。
- **0 < H < 0.5**: 时间序列具有反持久性（anti-persistent behavior），即未来的趋势倾向于与过去的趋势相反。
- **0.5 < H < 1**: 时间序列具有持久性（persistent behavior），即未来的趋势倾向于与过去的趋势相同。

### 计算 Hurst 指数的方法

常用的计算 Hurst 指数的方法包括：

1. **R/S 分析法**: 通过计算时间序列的重标极差（Rescaled Range）来估计 Hurst 指数。
2. **差分方差法（DFA）**: 通过计算时间序列的差分方差来估计 Hurst 指数。
3. **波动分析法（Wavelet Analysis）**: 通过小波变换来估计 Hurst 指数。
### Python 实现

以下是使用 Python 计算 Hurst 指数的示例代码：

```python
import numpy as np
import pandas as pd

def hurst_exponent(ts):
    lags = range(2, 100)
    tau = [np.std(np.subtract(ts[lag:], ts[:-lag])) for lag in lags]
    poly = np.polyfit(np.log(lags), np.log(tau), 1)
    return poly[0] * 2.0
```
## Cointegrated Augmented Dickey-Fuller Test

协整增强型 Dickey-Fuller 检验（Cointegrated Augmented Dickey-Fuller Test，简称 CADF 检验）是一种用于检测多个时间序列之间是否存在协整关系的统计方法。协整关系意味着尽管单个时间序列可能是非平稳的，但它们的线性组合是平稳的。
### 重要性
在金融和经济学中，协整关系非常重要，因为它可以帮助我们识别长期均衡关系。例如，股票价格和其相关的指数可能是协整的，即使它们各自是非平稳的，但它们之间的价差可能是平稳的。
### CADF 检验步骤
1. **确定时间序列**: 选择需要检验协整关系的多个时间序列。
2. **构建线性组合**: 计算这些时间序列的线性组合。
3. **ADF 检验**: 对线性组合进行增强型 Dickey-Fuller 检验，判断其是否平稳。
### Python 实现
以下是使用 Python 进行 CADF 检验的示例代码：
```python
import numpy as np
import statsmodels.api as sm
import statsmodels.tsa.stattools as ts

# 示例数据
y1 = np.random.randn(100).cumsum() + 100
y2 = np.random.randn(100).cumsum() + 100

# 构建线性组合
y = y1 - y2

# ADF 检验
result = ts.adfuller(y)
print('ADF Statistic: %f' % result[0])
print('p-value: %f' % result[1])

# 结果解释
if result[1] < 0.05:
    print("时间序列之间存在协整关系")
else:
    print("时间序列之间不存在协整关系")
```

# ML
- Y=f(x)+e
- Logistic regression(分类)
- SVM(分类&回归)
- Random Forest(分类&回归)
- LSTM(分类&回归，高级的RNN)
- ...and more
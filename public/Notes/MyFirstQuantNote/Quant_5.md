# 2024/8/13
# Transform data into training set & Building predictive models
## 建立数据集
### 选择特征的主要流程和基本方法
#### 基本方法和原理
##### 因子的选择取决于对问题的理解
##### 常见的features
- **Time lags**
```python
import pandas as pd
import numpy as np
import datetime
import pandas_datareader.data as web

def create_lagged_series(symbol, start_date, end_date, lags=5):
    """
    This creates a pandas DataFrame that stores the percentage returns of the adjusted closing value of a stock
    obtained from Yahoo Finance, along with a number of lagged returns from the prior trading days (lags defaults to 5 days).
    Trading volume, as well as the Direction from the previous day, are also included.
    """
    # Obtain stock information from Yahoo Finance
    ts = web.DataReader(symbol, "yahoo", start_date-datetime.timedelta(days=365), end_date)
    
    # Create the new lagged DataFrame
    tslag = pd.DataFrame(index=ts.index)
    tslag["Today"] = ts["Adj Close"]
    tslag["Volume"] = ts["Volume"]
    
    # Create the shifted lag series of prior trading period close values
    for i in range(0, lags):
        tslag["Lag%s" % str(i+1)] = ts["Adj Close"].shift(i+1)
        
    # Create the returns DataFrame
    tsret = pd.DataFrame(index=tslag.index)
    tsret["Volume"] = tslag["Volume"]
    tsret["Today"] = tslag["Today"].pct_change()*100.0
    
    # If any of the values of percentage returns equal zero, set them to
    # a small number (stops issues with QDA model in scikit-learn)
    for i,x in enumerate(tsret["Today"]):
        if (abs(x) < 0.0001):
            tsret["Today"][i] = 0.0001
    
    # Create the lagged percentage returns columns
    for i in range(0, lags):
        tsret["Lag%s" % str(i+1)] = tslag["Lag%s" % str(i+1)].pct_change()*100.0
    
    # Create the "Direction" column (+1 or -1) indicating an up/down day
    tsret["Direction"] = np.sign(tsret["Today"])
    
    # Remove the NaN values from the DataFrame
    tsret = tsret[tsret.index >= start_date]
    
    return tsret
```
- **CCI**

    CCI（商品通道指数，Commodity Channel Index）是一种技术分析指标，由Donald Lambert在1980年提出。CCI用于衡量价格与其统计平均值的偏离程度，帮助交易者识别超买和超卖的市场条件。

    - CCI的计算公式如下：

        $\text{CCI} = \frac{(P_t - MA_t)}{0.015 \times MD_t}$

        其中：
        - $P_t$ 是典型价格（Typical Price），计算公式为$(\text{High} + \text{Low} + \text{Close}) / 3$。
        - $MA_t$ 是典型价格的移动平均值（通常为20天）。
        - $MD_t$ 是典型价格与其移动平均值的均绝对偏差。
        - 0.015 是一个常数，用于将CCI值缩放到合理的范围。
    - 使用方法
        - 当CCI值高于+100时，市场可能处于超买状态，价格可能会回调。
        - 当CCI值低于-100时，市场可能处于超卖状态，价格可能会上涨。
        - CCI值在+100和-100之间波动时，市场处于正常状态。
- **EVM**

    EVM（Ease of Movement，易动量）是一种技术分析指标，用于衡量价格变化与交易量之间的关系。EVM指标可以帮助交易者识别价格变动的难易程度。

  - 计算公式

    EVM的计算公式如下：

    $\text{EVM} = \frac{(\text{CurrentHigh} + \text{CurrentLow}) / 2 - (\text{Previous High} + \text{Previous Low}) / 2}{\text{Volume}}$

为了使EVM值更易于解释，通常会对其进行移动平均处理。
- **MA**

    MA（移动平均，Moving Average）是一种常用的技术分析指标，用于平滑价格数据，帮助识别价格趋势。移动平均有多种类型，最常见的是简单移动平均（SMA）和指数移动平均（EMA）。

  - 简单移动平均（SMA）

    简单移动平均是对一定时间窗口内的价格数据取平均值。计算公式如下：

    $\text{SMA}_n = \frac{P_1 + P_2 + \cdots + P_n}{n}$

    其中：
    - $P$ 是价格数据（如收盘价）。
    - $n$ 是时间窗口的大小。

  - 指数移动平均（EMA）

    指数移动平均对最近的数据赋予更大的权重。计算公式如下：

    $\text{EMA}_t = \alpha \cdot P_t + (1 - \alpha) \cdot \text{EMA}_{t-1}$

    其中：
    - $P_t$ 是当前价格。
    - $\alpha$ 是平滑系数，通常计算为 $\alpha = \frac{2}{n+1}$。
    - $\text{EMA}_{t-1}$ 是前一周期的EMA值。
  - 指数加权移动平均(EWMA)

    与EMA（指数移动平均）类似，但在计算中使用了不同的权重分配方式。EWMA对最近的数据赋予更大的权重，随着时间的推移，权重指数递减。

    $\text{EWMA}t = \lambda \cdot P_t + (1 - \lambda) \cdot \text{EWMA}{t-1}$

    其中：

    - $P_t$ 是当前价格。
    - $\lambda$ 是平滑系数，通常在0到1之间，用户可通过控制它来控制权重的衰减速度。
    - $\text{EWMA}_{t-1}$ 是前一周期的EWMA值。
- **ROC**
 
    ROC（Rate of Change，变化率）是一种技术分析指标，用于衡量价格在一定时间段内的变化速度。ROC可以帮助交易者识别价格的趋势和动量。

  - ROC的计算公式如下：

    $\text{ROC} = \frac{P_t - P_{t-n}}{P_{t-n}} \times 100$

    其中：

    - $P_t$ 是当前价格。
    - $P_{t-n}$ 是 ( n ) 天前的价格。
    - $n$ 是时间窗口的大小
- **Bollinger Bands**
    布林带（Bollinger Bands）是一种技术分析工具，由约翰·布林格（John Bollinger）发明，用于衡量市场的波动性。布林带由三条线组成：中轨线（通常是简单移动平均线SMA）、上轨线和下轨线。上轨线和下轨线分别是中轨线加上或减去一定倍数的标准差。

  - 计算公式
    中轨线（SMA）： $\text{SMA}_n = \frac{P_1 + P_2 + \cdots + P_n}{n}$

    标准差（STD）： $\text{STD}n = \sqrt{\frac{1}{n} \sum _{i=1}^{n} (P_i - \text{SMA}_n)^2}$

    上轨线： $\text{Upper Band} = \text{SMA}_n + k \cdot \text{STD}_n$

    下轨线： $\text{Lower Band} = \text{SMA}_n - k \cdot \text{STD}_n$

    其中：

    - $P$ 是价格数据（如收盘价）。
    - $n$ 是时间窗口的大小。
    - $k$ 是标准差的倍数，通常为2。
- **Force Index**

    Force Index（力量指数）是一种技术分析指标，由亚历山大·埃尔德（Alexander Elder）发明，用于衡量价格变动的力度。力量指数结合了价格变动的幅度和交易量，帮助交易者识别市场的买卖压力。

  - 力量指数的计算公式如下：

    $\text{Force Index} = (\text{Close}_t - \text{Close} _{t-1}) \times \text{Volume}_t$

    其中：

    - $\text{Close}_t$ 是当前周期的收盘价。
    - $\text{Close}_{t-1}$ 是前一周期的收盘价。
    - $\text{Volume}_t$ 是当前周期的交易量。
- **And More**

    see [here](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays)

## 建立训练集
### modeling
#### 随机森林（Random Forest）
随机森林（Random Forest）是一种集成学习方法，通过构建多个决策树并结合它们的预测结果来提高模型的准确性和稳定性。随机森林在分类和回归任务中都表现出色。

- 随机森林的工作原理
  - 数据集采样：从原始数据集中有放回地随机抽取多个子集（Bootstrap采样）。
  - 决策树构建：对每个子集构建一棵决策树。在构建过程中，每个节点的分裂只考虑随机选择的一部分特征（特征子集）。
  - 集成预测：将所有决策树的预测结果进行平均（回归任务）或投票（分类任务），得到最终的预测结果。

示例代码
```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 假设你已经有一个数据集df，其中包含特征和目标变量
# df = pd.read_csv('your_dataset.csv')

# 分割数据集为特征和目标变量
X = df.drop('target', axis=1)
y = df['target']

# 将数据集分割为训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 初始化随机森林分类器
rf = RandomForestClassifier(n_estimators=100, random_state=42)

# 训练模型
rf.fit(X_train, y_train)

# 进行预测
y_pred = rf.predict(X_test)

# 计算准确率
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')
```

##### 梯度提升决策树（GBDT）

梯度提升决策树（Gradient Boosting Decision Trees，GBDT）是一种集成学习方法，通过逐步构建多个决策树，每棵树都试图纠正前一棵树的错误。GBDT在分类和回归任务中都表现出色。

###### GBDT的工作原理

1. **初始化模型**：使用一个简单的模型（如常数值）作为初始预测。
2. **计算残差**：计算当前模型的预测值与实际值之间的差异（残差）。
3. **训练新树**：使用残差作为目标变量，训练新的决策树。
4. **更新模型**：将新树的预测结果加到当前模型中。
5. **重复步骤2-4**：重复上述步骤，直到达到预定的树的数量或其他停止条件。

###### xGBoost
XGBoost（eXtreme Gradient Boosting）是一个优化的梯度提升决策树（GBDT）实现，广泛用于各种机器学习竞赛和实际应用中。

示例代码
```python
import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score

# 假设你已经有一个数据集df，其中包含特征和目标变量
# df = pd.read_csv('your_dataset.csv')

# 分割数据集为特征和目标变量
X = df.drop('target', axis=1)
y = df['target']

# 将数据集分割为训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 初始化XGBoost分类器
xgb = XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)

# 训练模型
xgb.fit(X_train, y_train)

# 进行预测
y_pred = xgb.predict(X_test)

# 计算准确率
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')
```

#### 逻辑回归（Logistic Regression）
逻辑回归（Logistic Regression）是一种广泛使用的分类算法，适用于二分类和多分类任务。

##### 逻辑回归公式

1. **线性模型**：
   $
   z = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \cdots + \beta_n x_n
   $
   其中，$\beta_0$ 是截距项，$\beta_1, \beta_2, \ldots, \beta_n$ 是特征 $x_1, x_2, \ldots, x_n$ 的系数。

2. **逻辑函数（sigmoid函数）**：
   $
   \sigma(z) = \frac{1}{1 + e^{-z}}
   $
   其中，$e$ 是自然对数的底。

3. **预测概率**：
   $
   P(y=1|x) = \sigma(z) = \frac{1}{1 + e^{-(\beta_0 + \beta_1 x_1 + \beta_2 x_2 + \cdots + \beta_n x_n)}}
   $

##### 示例代码

以下是如何在Python中使用`scikit-learn`库构建和训练逻辑回归模型的示例代码：

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 假设你已经有一个数据集df，其中包含特征和目标变量
# df = pd.read_csv('your_dataset.csv')

# 分割数据集为特征和目标变量
X = df.drop('target', axis=1)
y = df['target']

# 将数据集分割为训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 初始化逻辑回归分类器
log_reg = LogisticRegression(random_state=42)

# 训练模型
log_reg.fit(X_train, y_train)

# 进行预测
y_pred = log_reg.predict(X_test)

# 计算准确率
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')
```

#### 最小绝对收缩和选择算子LASSO（Least Absolute Shrinkage and Selection Operator）

#### 支持向量机（SVM，Support Vector Machine）

#### 支持向量回归（SVR，Support Vector Regression）
是支持向量机（SVM）的一种扩展，用于解决回归问题。SVR通过找到一个最佳的超平面来最小化预测值与实际值之间的误差。

以下是如何在Python中使用`scikit-learn`库构建和训练SVR模型的示例代码：

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error

# 假设你已经有一个数据集df，其中包含特征和目标变量
# df = pd.read_csv('your_dataset.csv')

# 分割数据集为特征和目标变量
X = df.drop('target', axis=1)
y = df['target']

# 将数据集分割为训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 初始化SVR模型
svr = SVR(kernel='linear')

# 训练模型
svr.fit(X_train, y_train)

# 进行预测
y_pred = svr.predict(X_test)

# 计算均方误差
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse:.2f}')
```

#### 人工神经网络（ANN，Artificial Neural Network）
人工神经网络（ANN，Artificial Neural Network）是一种模拟人脑神经网络结构和功能的计算模型，广泛应用于分类、回归、图像识别等领域。

##### ANN的基本原理
- 输入层：

    输入层接收原始数据，每个节点对应一个特征。
- 隐藏层：

    隐藏层位于输入层和输出层之间，可以有一个或多个隐藏层。每个隐藏层由多个神经元组成。
    每个神经元接收来自前一层的输入，计算加权和，然后通过激活函数进行非线性变换。
- 输出层：

    输出层生成最终的预测结果。对于回归问题，输出层通常只有一个节点；对于分类问题，输出层的节点数等于类别数。
- 前向传播：

    数据从输入层通过隐藏层传递到输出层，每一层的输出作为下一层的输入。
    每个神经元的输出由以下公式计算： $y = \sigma\left(\sum_{i=1}^{n} w_i x_i + b\right)$ 其中，$w_i$ 是权重，$x_i$ 是输入，$b$ 是偏置，$\sigma$ 是激活函数。
- 激活函数：

    激活函数引入非线性，使网络能够学习复杂的模式。常见的激活函数包括sigmoid、ReLU、tanh等。

    sigmoid函数的公式： $\sigma(x) = \frac{1}{1 + e^{-x}}$

    ReLU函数的公式： $\text{ReLU}(x) = \max(0, x)$

    tanh函数的公式： $\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$

- 损失函数：

    损失函数用于衡量预测值与实际值之间的差异。常见的损失函数包括均方误差（MSE）和交叉熵损失。

    - 均方误差（MSE）：

        均方误差（MSE，Mean Squared Error）是回归问题中常用的损失函数，用于衡量预测值与实际值之间的差异。MSE的公式如下：

        $\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$

        其中，$y_i$ 是实际值，$\hat{y}_i$ 是预测值，$ n $ 是样本数量。

    - 交叉熵损失：

        交叉熵损失（Cross-Entropy Loss）通常用于分类问题，特别是多分类问题。它用于衡量预测的概率分布与实际的分布之间的差异。交叉熵损失的公式如下：

        对于二分类问题：

        $\text{Cross-Entropy Loss} = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]$

        对于多分类问题：

        $\text{Cross-Entropy Loss} = -\frac{1}{n} \sum_{i=1}^{n} \sum_{c=1}^{C} y_{i,c} \log(\hat{y}_{i,c})$

        其中，$y_{i,c}$ 是实际类别的指示函数（如果样本 $i$ 属于类别 $c$，则为$1$，否则为$0$），$\hat{y}_{i,c}$ 是预测的类别 $c$ 的概率，$C$ 是类别总数。

- 反向传播：

    反向传播算法用于调整网络的权重和偏置，以最小化损失函数。它通过计算损失函数相对于每个权重的梯度来更新权重。
- 优化器：

    优化器用于更新网络的权重和偏置。常见的优化器包括梯度下降、Adam等。

##### Keras
Keras是一个高级神经网络API，能够运行在TensorFlow、Theano和CNTK之上。它的设计目的是为了快速实验，能够将你的想法迅速转换为结果。以下是如何使用Keras库构建和训练一个简单的人工神经网络模型的示例代码：

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
from keras.models import Sequential
from keras.layers import Dense

# 假设你已经有一个数据集df，其中包含特征和目标变量
# df = pd.read_csv('your_dataset.csv')

# 分割数据集为特征和目标变量
X = df.drop('target', axis=1)
y = df['target']

# 将数据集分割为训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 标准化特征
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 初始化神经网络模型
model = Sequential()

# 添加输入层和第一个隐藏层，使用ReLU激活函数
model.add(Dense(units=64, activation='relu', input_dim=X_train.shape[1]))

# 添加第二个隐藏层，使用tanh激活函数
model.add(Dense(units=64, activation='tanh'))

# 添加输出层
model.add(Dense(units=1))

# 编译模型
model.compile(optimizer='adam', loss='mean_squared_error')

# 训练模型
model.fit(X_train, y_train, epochs=100, batch_size=32, verbose=1)

# 进行预测
y_pred = model.predict(X_test)

# 计算均方误差
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse:.2f}')
```


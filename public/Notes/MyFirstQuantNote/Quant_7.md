# 2024/8/23
# 关于Features
在金融和股票市场分析中，“长线”和“短线”通常指的是不同时间跨度的投资或交易策略。具体来说：

1. **长线（Long-term）**：
   - **定义**：长线投资或交易通常指持有资产的时间跨度较长，可能是几个月、几年甚至更长时间。
   - **特点**：长线投资者通常关注公司的基本面、长期增长潜力和市场趋势。他们更倾向于忽略短期的市场波动，专注于长期的收益。
   - **应用**：在特征工程中，长线特征可能包括长期的移动平均线（如200日移动平均线）、长期的趋势指标等。

2. **短线（Short-term）**：
   - **定义**：短线投资或交易通常指持有资产的时间跨度较短，可能是几天、几周甚至更短时间。
   - **特点**：短线交易者通常关注市场的短期波动和技术指标，试图通过快速买卖来获取短期利润。
   - **应用**：在特征工程中，短线特征可能包括短期的移动平均线（如5日或10日移动平均线）、短期的波动率指标等。


# 集成学习(Ensemble Learning)
- stack/blending/voting
- adaBoost

## Stack/Blending/Voting

1. **Stacking**：
   - **定义**：Stacking（堆叠）是一种集成学习方法，通过训练多个基础模型，并使用这些基础模型的预测结果作为输入，训练一个元模型（meta-model）来进行最终预测。
   - **特点**：Stacking可以结合不同类型的模型（如线性回归、决策树、神经网络等），从而利用每个模型的优势。
   - **示例**：在Stacking中，常见的基础模型包括线性回归、决策树和神经网络，元模型通常是一个简单的线性模型或更复杂的模型。

2. **Blending**：
   - **定义**：Blending（混合）是Stacking的一种变体，通常将数据集分为训练集和验证集，使用训练集训练基础模型，然后在验证集上进行预测，并使用这些预测结果作为元模型的输入。
   - **特点**：Blending比Stacking更简单，因为它只需要一次分割数据集，而不是像Stacking那样需要进行交叉验证。
   - **示例**：Blending通常使用简单的模型组合，如线性回归和决策树，然后使用这些模型的预测结果作为输入，训练一个元模型。

3. **Voting**：
   - **定义**：Voting（投票）是一种简单的集成学习方法，通过对多个模型的预测结果进行投票，来决定最终的预测结果。投票可以是硬投票（majority voting）或软投票（weighted voting）。
        - 硬投票（Hard Voting）
            - 定义：硬投票（Hard Voting）是一种投票策略，通过对多个模型的预测结果进行多数投票，来决定最终的预测结果。
            - 特点：每个模型对每个样本进行预测，然后选择得票最多的类别作为最终的预测结果。硬投票适用于分类任务。
            - 示例：假设有三个模型对一个样本进行预测，分别预测为类别A、类别A和类别B。硬投票的最终结果是类别A，因为类别A得票最多。

        - 软投票（Soft Voting）
            - 定义：软投票（Soft Voting）是一种投票策略，通过对多个模型的预测概率进行加权平均，来决定最终的预测结果。
            - 特点：每个模型对每个样本进行预测，并输出每个类别的概率，然后对这些概率进行加权平均，选择加权平均值最高的类别作为最终的预测结果。软投票适用于分类任务。
            - 示例：假设有三个模型对一个样本进行预测，分别输出类别A的概率为0.6、0.7和0.4，类别B的概率为0.4、0.3和0.6。软投票的最终结果是类别A，因为类别A的加权平均概率最高。
    
    
   - **特点**：Voting方法简单易行，适用于分类任务。硬投票是指每个模型投票，选择得票最多的类别；软投票是指每个模型的预测结果加权平均，选择加权平均值最高的类别。
   - **示例**：在Voting中，可以组合多个分类器（如逻辑回归、支持向量机和决策树），通过投票来决定最终的分类结果。

## AdaBoost

1. **定义**：AdaBoost（Adaptive Boosting，自适应增强）是一种Boosting方法，通过逐步训练一系列弱分类器（如决策树桩），每个分类器都试图纠正前一个分类器的错误。
2. **特点**：AdaBoost通过调整样本的权重来关注那些被前一个分类器错误分类的样本，从而提高整体的分类性能。最终的预测结果是这些弱分类器的加权和。
3. **示例**：AdaBoost通常使用决策树桩（即深度为1的决策树）作为弱分类器，通过逐步训练这些弱分类器，并将它们的预测结果加权平均，来提高整体的分类性能。

### 示例代码

以下是一个使用AdaBoost进行分类的示例代码：

```python
from sklearn.ensemble import AdaBoostClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 加载数据集
data = load_iris()
X = data.data
y = data.target

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 创建AdaBoost分类器
clf = AdaBoostClassifier(n_estimators=50, random_state=42)

# 训练模型
clf.fit(X_train, y_train)

# 预测
y_pred = clf.predict(X_test)

# 计算准确率
accuracy = accuracy_score(y_test, y_pred)
print(f'AdaBoost分类器的准确率: {accuracy}')
```
### 主要步骤和公式

1. **初始化权重**：
   - 对于每个训练样本 $i$，初始化权重 $w_i = \frac{1}{N}$，其中 $N$ 是训练样本的总数。

2. **迭代训练弱分类器**：
   - 对于每一轮 $t$：
     1. **训练弱分类器**：使用当前的样本权重 $w_i$ 训练一个弱分类器 $h_t(x)$。
     2. **计算分类误差**：计算弱分类器的分类误差 $\epsilon_t$：
       $\epsilon_t = \sum_{i=1}^N w_i \cdot I(y_i \neq h_t(x_i))$
       其中 $I$ 是指示函数，当 $y_i \neq h_t(x_i)$ 时，$I$ 为1，否则为0。
     3. **计算分类器权重**：计算弱分类器的权重 $\alpha_t$：
       $\alpha_t = \frac{1}{2} \ln \left( \frac{1 - \epsilon_t}{\epsilon_t} \right)$
     4. **更新样本权重**：更新样本权重 $w_i$：
       $w_i \leftarrow w_i \cdot \exp(-\alpha_t \cdot y_i \cdot h_t(x_i))$
       然后对权重进行归一化，使得所有权重之和为1：
       $w_i \leftarrow \frac{w_i}{\sum_{j=1}^N w_j}$

3. **最终分类器**：
   - 最终的分类器是所有弱分类器的加权和：
     $H(x) = \text{sign} \left( \sum_{t=1}^T \alpha_t \cdot h_t(x) \right)$

### 解释

- **初始化权重**：每个样本的初始权重相等。
- **迭代训练弱分类器**：在每一轮迭代中，使用当前的样本权重训练一个弱分类器，并计算其分类误差和权重。然后，根据分类结果更新样本权重，使得被错误分类的样本权重增加。
- **最终分类器**：通过加权投票的方式，将所有弱分类器的结果组合起来，得到最终的分类结果。

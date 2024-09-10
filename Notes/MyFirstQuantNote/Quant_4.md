# 2024/7/15
# ML&Quant
## Outline
- From OLS to kernel machines and beyond
  - OLS (Ordinary Least Squares)
    - 线性回归的一种，最小化误差的平方和
  - Ridge
    - 岭回归，引入L2正则化项，用于处理共线性问题，增加模型的稳定性
  - Lasso
    - 套索回归，引入L1正则化项，能够实现特征的自动选择，产生一个稀疏模型
  - Kernels
    - 核方法，通过引入核函数将数据映射到高维空间，用于非线性问题
  - Cross-validation
    - 交叉验证，一种评估模型泛化能力的方法，通过将数据集分成训练集和验证集来实现
  - Hands on: sklearn
    - 使用scikit-learn库进行实践，包括模型的选择、训练、评估等
## Types of Learning
- Supervised
  - Classification
    - 分类问题，目标是预测离散标签
    - 例如，判断邮件是否为垃圾邮件
  - Regression
    - 回归问题，目标是预测连续值
    - 例如，预测房价
- Unsupervised
  - Clustering
    - 聚类问题，将数据分组到不同的集合
    - 例如，客户细分
  - Compression
    - 数据压缩，减少数据的维度而不丢失重要信息
    - 例如，特征提取
- Reinforcement
  - 强化学习，通过奖励和惩罚来学习策略
  - 例如，自动驾驶汽车或游戏AI
## sklearn官网cheetsheet
![1721047276575](image/Quant_4/1721047276575.png)
## The simplest Sklearn workflow
```python
train_x,train_y,test_x,test_y = getData()

model = somemodel() #SVM,LASSO,OLS
model.fit(train_x,train_y)
predictions = model.predict(test_x)

score = score_function(test_y,predictions)
```
- train_x: 训练集的特征数据，用于训练模型
- train_y: 训练集的目标变量，模型根据这些数据学习如何预测
- test_x: 测试集的特征数据，用于评估模型的预测性能
- test_y: 测试集的目标变量，用于比较模型的预测结果和实际值，以评估模型性能
## an example of get test data
```python
from sklearn.datasets import load_iris
iris = load_iris()

iris.keys()
dict_keys(['target_names','data','feature_names','DESCR','target'])
```

```python
# 加载MNIST数据集
from sklearn.datasets import fetch_openml

# fetch_openml返回的是一个字典，其中包含数据和标签
mnist = fetch_openml('mnist_784', version=1)

# 查看MNIST数据集的关键信息
mnist.keys()
# 输出: dict_keys(['data', 'target', 'feature_names', 'DESCR', 'details', 'categories', 'url'])

# 数据集的特征数据存储在'data'键下，目标变量（标签）存储在'target'键下
# 'data'包含了手写数字的像素值，'target'包含了对应的数字标签（0到9）
```

```python
# 使用sklearn.datasets的make_*系列函数生成合成数据

# 导入make_*系列函数
from sklearn.datasets import make_classification, make_regression, make_blobs, make_moons

# 生成分类数据
X, y = make_classification(n_samples=100, n_features=20, n_informative=2, n_redundant=10, n_classes=2, random_state=42)
# n_samples: 样本数量
# n_features: 特征数量
# n_informative: 信息性特征的数量
# n_redundant: 冗余特征的数量（这些特征可以从信息性特征中线性组合得到）
# n_classes: 类别数量
# random_state: 随机种子，确保结果可复现

# 生成回归数据
X, y = make_regression(n_samples=100, n_features=20, n_informative=10, noise=0.1, random_state=42)
# n_samples: 样本数量
# n_features: 特征数量
# n_informative: 信息性特征的数量
# noise: 目标变量的噪声水平
# random_state: 随机种子

# 生成聚类数据
X, y = make_blobs(n_samples=100, n_features=2, centers=3, cluster_std=1.0, random_state=42)
# n_samples: 样本数量
# n_features: 特征数量
# centers: 聚类中心的数量或指定的中心点
# cluster_std: 聚类的标准差
# random_state: 随机种子

# 生成月牙形数据
X, y = make_moons(n_samples=100, noise=0.1, random_state=42)
# n_samples: 样本数量
# noise: 噪声水平
# random_state: 随机种子
```

## Supervised Workflow
```
# TRAINING
Training Data & Training Labels--->Model  TRAINING
                                      |
                                      |
#GENERALIZATION                       v
Test Data ------------------------>Prediction
                                      |
                                      v
Test Labels ---------------------->Evaluation
```
Fit model on all data after evaluation

## Regression Shrinkage and Selection via the Lasso
### Regularization
线性回归认为：

$[Y]_{N \times 1}=X_{N \times d} \cdot \theta _{d \times 1}$

我们有

$\hat{ \theta }=(X^TX)^{-1}X^Ty$

#### L2正则化(也叫岭回归正则化)
那么就有一个问题了，可能$X^TX$是一个病态的，不存在逆，那么就可以进行一些小trick($X^TX+ \delta ^2 I_d$不是病态的)来逼近线性回归模型

$\hat{ \theta }=(X^TX+ \delta ^2 I_d)^{-1}X^Ty$

这就是岭回归(ridge regression)

岭回归的损失函数（目标函数）为：

$J(\theta)=(y-X\theta)^T(y-X\theta)+\delta ^2\theta ^T\theta$

几何意义：圆形和椭圆

这里，第一项是残差平方和，第二项是正则化项，$\delta^2\theta^T\theta$用于惩罚大的参数值。通过调整$\delta$的值，我们可以在偏差和方差之间找到一个平衡，这是所谓的偏差-方差权衡。岭回归是解决多重共线性问题和防止过拟合的有效方法，特别是在特征数量多于样本数量的情况下。

下面是一个对于岭回归的损失函数取最小值时的推导

$$
\begin{align*}
\frac{\partial J(\theta)}{\partial \theta} &= \frac{\partial}{\partial \theta} \left[ (y - X\theta)^T(y - X\theta) + \delta^2\theta^T\theta \right] \\
&= \frac{\partial}{\partial \theta} \left[ y^Ty - y^TX\theta - \theta^TX^Ty + \theta^TX^TX\theta + \delta^2\theta^T\theta \right] \\
&= -2X^Ty + 2X^TX\theta + 2\delta^2\theta \\
0 &= -X^Ty + X^TX\theta + \delta^2\theta \\
(X^TX + \delta^2I)\theta &= X^Ty \\
\theta &= (X^TX + \delta^2I)^{-1}X^Ty
\end{align*}
$$

- $\delta$的选取
  - 随着$\delta$的增大，每一个$\theta$逐渐趋近于0（实验获得）
  - 所以$\delta$不能太大
#### L1正则化(也叫Lasso正则化)
Lasso回归的损失函数为：

$J(\theta) = (y - X\theta)^T(y - X\theta) + \delta ^2\sum_{i=1}^{d}|\theta_i|$

几何意义：菱形和椭圆

Lasso回归的最值不像岭回归那样有显式解，因为L1正则化项的绝对值使得损失函数变得非光滑，这导致无法直接通过解析方法求解最优$\theta$。通常，求解Lasso回归的最优参数需要使用数值优化方法，如坐标下降法（Coordinate Descent）或梯度下降法。

### Going nonlinear via basis functions
引入基本函数$\phi(...)$，将我们的输入变成非线性的

$y(x)=\phi (x) \theta+ \epsilon$

eg:$\phi (x)=[1,x,x^2]$

### Kernel regression and RBFs
$\phi(x)=[\kappa (x,\mu _1,\lambda),...,\kappa (x,\mu _d,\lambda)],eg:\kappa (x,\mu _i,\lambda)=e^{-\frac{1}{\lambda}||x-\mu _i \|^2}(高斯核)$

$\lambda$太小，过拟合；太大，就拟合成一条直线了

### Holdout Evalueation
寻找工程中的超参数

#### Cross Valication
- 传统方法：
  - **留出法（Holdout Method）**：将数据集分成两部分，一部分用于训练模型，另一部分用作验证集来评估模型性能。这种方法简单快速，但评估结果可能受到数据划分方式的影响。
- Cross Validation
  - **K折交叉验证（K-Fold Cross Validation）**：将数据集分成K个大小相等的子集。每次留出一个子集作为验证集，剩下的K-1个子集用于训练模型。这个过程重复K次，每个子集都有一次机会作为验证集。最后，取这K次评估结果的平均值作为模型性能的估计。这种方法更加稳健，能够减少评估结果对数据划分方式的依赖。
  - **留一法（Leave-One-Out Cross Validation, LOOCV）**：这是K折交叉验证的一个特例，其中K等于样本总数。这意味着每次留出一个样本作为验证集，其余的样本用于训练模型。这种方法在数据量较小的情况下很有用，但计算成本很高。
  
无论怎么样，最后我们评估的模型'不错'的时候，应该把测试集和训练集合并，然后再训练一次，达到数据利用的最大化
#### sklearn绘制热力图寻找超参数(多个参数需要两两结合多次计算)
```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC

# 假设X_train, y_train是你的训练数据
# param_grid = {'C': [0.1, 1, 10, 100], 'gamma': [1, 0.1, 0.01, 0.001]}

# 进行网格搜索
# grid_search = GridSearchCV(SVC(), param_grid, cv=5)
# grid_search.fit(X_train, y_train)

# 将结果转换为DataFrame
results = pd.DataFrame(grid_search.cv_results_)
results = results.pivot(index='param_gamma', columns='param_C', values='mean_test_score')

# 绘制热力图
plt.figure(figsize=(8, 6))
sns.heatmap(results, annot=True, fmt=".3f", cmap="viridis")
plt.title('超参数搜索结果')
plt.xlabel('C')
plt.ylabel('Gamma')
plt.show()
```
## BIG QUESTION:HOW TO DEFINE INPUTS?
[参考链接](https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators)
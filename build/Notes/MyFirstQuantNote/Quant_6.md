# 2024/8/15
# 特征选择
$x_{raw}=[x_1,x_2,x_3,...,x_n]$

筛选方法
- Subset Selection
- Shrinkage
- Dimension Reduction

## 子集选择 (Subset Selection)
子集选择是一种特征选择方法，旨在从所有可能的特征子集中选择最佳子集，以提高模型的性能。常见的子集选择方法包括：

1. **逐步回归 (Stepwise Regression)**：
   - **前向选择 (Forward Selection)**：从空模型开始，每次加入一个最显著的特征，直到加入的特征不再显著。
   - **后向消除 (Backward Elimination)**：从包含所有特征的模型开始，每次移除一个最不显著的特征，直到所有剩余特征都显著。
   - **逐步选择 (Stepwise Selection)**：结合前向选择和后向消除，每次可以加入或移除特征。

2. **最佳子集回归 (Best Subset Regression)**：暴力遍历，尝试所有可能的特征子集，选择表现最好的子集。这种方法计算量大，通常只适用于特征数量较少的情况。

## 收缩 (Shrinkage)
收缩方法通过对模型参数施加约束或惩罚，减少模型的复杂度，从而提高模型的泛化能力。常见的收缩方法包括：

1. **岭回归 (Ridge Regression)**：在最小二乘法的基础上加入L2正则化项，惩罚系数的平方和，防止过拟合。
   ```python
   from sklearn.linear_model import Ridge
   ridge = Ridge(alpha=1.0)
   ridge.fit(X_train, y_train)
   ```

2. **套索回归 (Lasso Regression)**：在最小二乘法的基础上加入L1正则化项，惩罚系数的绝对值和，可以实现特征选择。
   ```python
   from sklearn.linear_model import Lasso
   lasso = Lasso(alpha=0.1)
   lasso.fit(X_train, y_train)
   ```

3. **弹性网络 (Elastic Net)**：结合L1和L2正则化，既可以进行特征选择，又可以防止过拟合。
   ```python
   from sklearn.linear_model import ElasticNet
   elastic_net = ElasticNet(alpha=0.1, l1_ratio=0.5)
   elastic_net.fit(X_train, y_train)
   ```

## 维度缩减 (Dimension Reduction)
维度缩减方法通过将原始特征转换为较少的新特征来减少数据的维度，从而提高模型的性能和可解释性。常见的维度缩减方法包括：

1. **主成分分析 (PCA, Principal Component Analysis)**：通过线性变换将原始特征转换为若干个主成分，保留数据中最大的方差。
   ```python
   from sklearn.decomposition import PCA
   pca = PCA(n_components=2)
   X_reduced = pca.fit_transform(X)
   ```

2. **线性判别分析 (LDA, Linear Discriminant Analysis)**：通过线性变换将原始特征转换为若干个判别成分，最大化类间方差与类内方差之比。
   ```python
   from sklearn.discriminant_analysis import LinearDiscriminantAnalysis as LDA
   lda = LDA(n_components=2)
   X_reduced = lda.fit_transform(X, y)
   ```

3. **非负矩阵分解 (NMF, Non-negative Matrix Factorization)**：将原始特征矩阵分解为两个非负矩阵的乘积，适用于非负数据。
   ```python
   from sklearn.decomposition import NMF
   nmf = NMF(n_components=2)
   X_reduced = nmf.fit_transform(X)
   ```

# 遗传算法
遗传算法 (Genetic Algorithm, GA) 是一种基于自然选择和遗传机制的优化算法。它通过模拟生物进化过程来寻找最优解，适用于复杂的优化问题。

基本步骤：

- 初始化种群：随机生成一组候选解（个体），组成初始种群。
- 适应度评估：计算每个个体的适应度值，评估其在问题中的表现。
- 选择：根据适应度值选择个体，适应度高的个体有更大概率被选中。
- 交叉：对选中的个体进行交叉操作，生成新的个体（子代）。
- 变异：对新个体进行变异操作，引入随机变化。
- 替换：用新个体替换种群中的旧个体，形成新一代种群。
- 重复：重复步骤2到6，直到满足终止条件（如达到最大迭代次数或找到最优解）。


eg:

```python
import numpy as np

# 定义适应度函数
def fitness_function(x):
    return -x**2 + 5*x + 10

# 初始化种群
def initialize_population(size, bounds):
    return np.random.uniform(bounds[0], bounds[1], size)

# 选择操作
def selection(population, fitness, num_parents):
    parents = np.empty((num_parents, population.shape[1]))
    for parent_num in range(num_parents):
        max_fitness_idx = np.where(fitness == np.max(fitness))
        max_fitness_idx = max_fitness_idx[0][0]
        parents[parent_num, :] = population[max_fitness_idx, :]
        fitness[max_fitness_idx] = -99999999
    return parents

# 交叉操作
def crossover(parents, offspring_size):
    offspring = np.empty(offspring_size)
    crossover_point = np.uint8(offspring_size[1]/2)
    for k in range(offspring_size[0]):
        parent1_idx = k % parents.shape[0]
        parent2_idx = (k+1) % parents.shape[0]
        offspring[k, 0:crossover_point] = parents[parent1_idx, 0:crossover_point]
        offspring[k, crossover_point:] = parents[parent2_idx, crossover_point:]
    return offspring

# 变异操作
def mutation(offspring, mutation_rate=0.1):
    for idx in range(offspring.shape[0]):
        if np.random.rand() < mutation_rate:
            random_value = np.random.uniform(-1.0, 1.0, 1)
            offspring[idx, :] = offspring[idx, :] + random_value
    return offspring

# 遗传算法主函数
def genetic_algorithm(bounds, population_size, num_generations, num_parents):
    population = initialize_population(population_size, bounds)
    for generation in range(num_generations):
        fitness = np.apply_along_axis(fitness_function, 1, population)
        parents = selection(population, fitness, num_parents)
        offspring_crossover = crossover(parents, (population_size[0] - parents.shape[0], population.shape[1]))
        offspring_mutation = mutation(offspring_crossover)
        population[0:parents.shape[0], :] = parents
        population[parents.shape[0]:, :] = offspring_mutation
    fitness = np.apply_along_axis(fitness_function, 1, population)
    best_match_idx = np.where(fitness == np.max(fitness))
    return population[best_match_idx, :]

# 参数设置
bounds = [0, 10]
population_size = (10, 1)
num_generations = 20
num_parents = 4

# 运行遗传算法
best_solution = genetic_algorithm(bounds, population_size, num_generations, num_parents)
print("Best solution:", best_solution)
```

# 深入理解BP算法
BP算法（Backpropagation，反向传播）是一种用于训练人工神经网络的监督学习算法。它通过计算损失函数的梯度来调整网络的权重，从而最小化预测误差。以下是BP算法的基本步骤：

1. **前向传播**：
   - 输入数据通过网络的各层进行计算，得到输出结果。
   - 计算输出结果与真实值之间的误差（损失函数）。

2. **反向传播**：
   - 从输出层开始，计算损失函数相对于每个权重的梯度。
   - 通过链式法则，将梯度从输出层逐层传递回输入层。

3. **权重更新**：
   - 使用梯度下降法，根据计算得到的梯度调整每个权重，以减少误差。

以下是一个简单的BP算法示例，使用Python和NumPy实现一个两层神经网络：

```python
import numpy as np

# 激活函数及其导数
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

# 输入数据
X = np.array([[0, 0],
              [0, 1],
              [1, 0],
              [1, 1]])

# 输出数据
y = np.array([[0], [1], [1], [0]])

# 初始化权重和偏置
np.random.seed(1)
input_layer_neurons = X.shape[1]
hidden_layer_neurons = 2
output_neurons = 1

# 权重初始化
wh = np.random.uniform(size=(input_layer_neurons, hidden_layer_neurons))
bh = np.random.uniform(size=(1, hidden_layer_neurons))
wout = np.random.uniform(size=(hidden_layer_neurons, output_neurons))
bout = np.random.uniform(size=(1, output_neurons))

# 学习率
learning_rate = 0.1

# 训练过程
for epoch in range(10000):
    # 前向传播
    hidden_layer_input = np.dot(X, wh) + bh
    hidden_layer_output = sigmoid(hidden_layer_input)
    
    output_layer_input = np.dot(hidden_layer_output, wout) + bout
    predicted_output = sigmoid(output_layer_input)
    
    # 计算误差
    error = y - predicted_output
    
    # 反向传播
    d_predicted_output = error * sigmoid_derivative(predicted_output)
    
    error_hidden_layer = d_predicted_output.dot(wout.T)
    d_hidden_layer = error_hidden_layer * sigmoid_derivative(hidden_layer_output)
    
    # 更新权重和偏置
    wout += hidden_layer_output.T.dot(d_predicted_output) * learning_rate
    bout += np.sum(d_predicted_output, axis=0, keepdims=True) * learning_rate
    wh += X.T.dot(d_hidden_layer) * learning_rate
    bh += np.sum(d_hidden_layer, axis=0, keepdims=True) * learning_rate

print("Final predicted output:")
print(predicted_output)
```

这个示例展示了如何使用BP算法训练一个简单的两层神经网络来解决异或（XOR）问题。

## 学习率
学习率（Learning Rate）是优化算法中的一个超参数，用于控制每次更新权重时的步长。学习率的大小直接影响模型的训练效果：

- 学习率过大：可能导致训练过程不稳定，模型无法收敛。
- 学习率过小：可能导致训练速度过慢，模型需要很长时间才能收敛。

常见的调整方法包括：

- 手动调整：通过实验选择合适的学习率。
- 学习率调度：在训练过程中动态调整学习率，如使用学习率衰减。
- 自适应优化算法：如Adam、RMSprop等，这些算法能够自动调整学习率。

# RNN
循环神经网络（Recurrent Neural Network, RNN）是一种用于处理序列数据的神经网络，广泛应用于自然语言处理、时间序列预测等领域。RNN通过在网络中引入循环连接，使得当前时刻的输出依赖于前一时刻的状态，从而能够捕捉序列中的时间依赖关系。

## RNN的基本概念

1. **隐藏状态**：RNN在每个时间步都有一个隐藏状态，存储了前一时刻的信息。
2. **循环连接**：隐藏状态通过循环连接传递到下一时刻，使得网络能够记住之前的输入信息。
3. **权重共享**：RNN在每个时间步共享相同的权重，这使得网络能够处理任意长度的序列。

## RNN的前向传播

在每个时间步，RNN的前向传播过程如下：

1. 计算当前输入和前一时刻隐藏状态的加权和。
2. 应用激活函数（如tanh或ReLU）得到当前时刻的隐藏状态。
3. 使用当前隐藏状态计算输出。

## 简单的RNN实现示例

以下是一个使用Python和NumPy实现的简单RNN示例，用于处理序列数据：

```python
import numpy as np

# 激活函数
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

# 输入数据（序列）
X = np.array([[0, 1, 0],
              [1, 0, 1],
              [0, 1, 1]])

# 输出数据
y = np.array([[1], [0], [1]])

# 初始化权重
np.random.seed(1)
input_size = X.shape[1]
hidden_size = 2
output_size = 1

# 权重初始化
Wxh = np.random.uniform(size=(input_size, hidden_size))
Whh = np.random.uniform(size=(hidden_size, hidden_size))
Why = np.random.uniform(size=(hidden_size, output_size))
bh = np.random.uniform(size=(1, hidden_size))
by = np.random.uniform(size=(1, output_size))

# 学习率
learning_rate = 0.1

# 训练过程
for epoch in range(10000):
    for t in range(X.shape[0]):
        # 前向传播
        hidden_state = np.zeros((1, hidden_size))
        for i in range(X.shape[1]):
            hidden_state = sigmoid(np.dot(X[t, i], Wxh) + np.dot(hidden_state, Whh) + bh)
        output = sigmoid(np.dot(hidden_state, Why) + by)
        
        # 计算误差
        error = y[t] - output
        
        # 反向传播
        d_output = error * sigmoid_derivative(output)
        d_hidden_state = d_output.dot(Why.T) * sigmoid_derivative(hidden_state)
        
        # 更新权重和偏置
        Why += hidden_state.T.dot(d_output) * learning_rate
        by += np.sum(d_output, axis=0, keepdims=True) * learning_rate
        Wxh += X[t, i].reshape(-1, 1).dot(d_hidden_state) * learning_rate
        Whh += hidden_state.T.dot(d_hidden_state) * learning_rate
        bh += np.sum(d_hidden_state, axis=0, keepdims=True) * learning_rate

print("Final predicted output:")
for t in range(X.shape[0]):
    hidden_state = np.zeros((1, hidden_size))
    for i in range(X.shape[1]):
        hidden_state = sigmoid(np.dot(X[t, i], Wxh) + np.dot(hidden_state, Whh) + bh)
    output = sigmoid(np.dot(hidden_state, Why) + by)
    print(output)
```

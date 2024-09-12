# 2024/9/11
# KNN
## Formula

$\hat{Y}(x)=\frac{1}{k} \sum_{xi \in N_k(x)} y_i$

$N_k(x) \text{is the neighborhood of x defined by the k closest points }x_i\text{ in the training sample}$

## Closeness Metric

- Eucidean Distance
- Manhattan Distance
- Minkowski Distance
- Maahalanobis Diatance

## sklearn.neighbors

### Tree
we can build a tree (BallTree or KDTree) to accelerate the procedure of KNN algebra

- `BallTree`: find closest points in a super **BALL** space.Especially well fit when x is in higher demension
- `KDTree`: find closest points in a super **RECTANGER** space.Especially well fit when x is in lower demension

### KNN Classifier & Regressior & more
[Classifier](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html)

[Regressor](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsRegressor.html)

[Transformer(to a kneighbor graph)](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsTransformer.html)

[NearestCentroid](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.NearestCentroid.html)

[And More](https://scikit-learn.org/stable/api/sklearn.neighbors.html)
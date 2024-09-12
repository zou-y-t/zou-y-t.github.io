# 2024/9/10
# Score
- HW 30'
- EXAM 70'
  - 7 problems
  - only Ans scores

# Stochastic Process
Multiple Random Variables: $x_1, x_2, ..., x_n, F_{x_1, x_2, ..., x_n}(x_1, x_2, ..., x_n)$

## Models (Tools)
- Markov Chains
- Poisson Processes
- Brownian Motion

## Relation
- Independence
- Correlation
  - `Time Domain Representation`
  - `Frequency Domain Representation`
  - Typical Case: `Gaussian Process`
- Covariance

## A bad Example

$f(x_1,...,x_n)=f(x_n|x_1,...,x_{n-1}) \cdot f(x_1,...,x_{n-1})=...=\prod^n_{k=2} f(x_k|x_{k+1},...,x_n) \cdot f(x_1)$

It seems to simplify the problem, but there exists the `Constraint`; the complexity is still there.

then how to tackle this problem (simplification)?

**Reasonable Assumption**
- Simple Description
- Fast Improvement
- Widely Application

## An Example of Assumption: Markov Property

Given the same problem $f(x_1,...,x_n)$

assume an equation: $f(x_1,...,x_n)=\prod_{k=2}^{n} f(x_k|x_{k-1})$

then we can get a string of Markov Processes

**Attention**: In the second half of the semester, we will learn
- Basic Theory
- `Basic Computation` (Important)
- Typical Case: Poisson Process

# Correlation: Binary Relation between X and Y

## Metric (Distance)
### Mean Square.
$D_{MS}=(E|X-Y|^2)^{1/2}=\sqrt{E(X^2)+E(Y^2)-2E(XY)}$

$E(XY), X, Y \in \mathbb{R}; \quad E(XY^*), X, Y \in \mathbb{C}$

$E(XY)=0 \implies \text{uncorrelation}$

$E(XY)=E(X)E(Y) \equiv E(X-\bar{X})E(Y-\bar{Y}) \implies \text{uncorrelation}$

### Geometric View
$E(XY) \text{ similar to Inner Product } \langle X,Y \rangle : H \times H \rightarrow \mathbb{R}$

$\implies$

1. $E(X^2)=0 \implies P(X=0)=1$ (this is a little different from Inner Product)
2. $E(XY)=E(YX)$
3. $E((aX+bY)Z)=aE(XZ)+bE(YZ)$

then, similarly, we can get 

$\cos(\angle (X,Y))=\frac{E(XY)}{\sqrt{E(X^2)E(Y^2)}}$

$\angle (X,Y)=\pi /2 \implies \cos(\angle (X,Y))=0 \implies \text{uncorrelation}$

then we can talk about correlation in variables

## Distance

$X \rightarrow Y \implies \alpha X \rightarrow Y \implies$

$\min_{\alpha} E((\alpha X-Y)^2) \implies \frac{d}{d\alpha} E((\alpha X-Y)^2) \implies -2E(X(\alpha X-Y))=0 \implies$

$\alpha=\frac{E(XY)}{E(X^2)}$

Given the problem of finding $\alpha$ such that $\alpha X$ is the best approximation to $Y$ in the mean square error sense, we can also use the projection method.

The projection of $Y$ onto $X$ is given by:

$\text{Proj}_{X}(Y) \overset{\|Y\|\cos(\angle (X,Y))}{=} \frac{E(XY)}{E(X^2)} X$

This projection minimizes the mean square error between $\alpha X$ and $Y$.

To find $\alpha$, we set $\alpha X = \text{Proj}_{X}(Y)$:

$\alpha X = \frac{E(XY)}{E(X^2)} X$

Dividing both sides by $X$ (assuming $X \neq 0$):

$\alpha = \frac{E(XY)}{E(X^2)}$

Thus, we have obtained $\alpha$ using the projection method.
# 2024/9/13
# Gradient Descent (GD)

Assume A to be a SPD matrix

## Gradient Descent
Consider the method of steepest descent:

The solution to $Ax=b$ is obtained by minimizing the following function:

$$
E(x)=\min _{y \in \mathbb{R}^n}(\frac{1}{2} (Ay,y)-(b,y)). \\
$$

We can see it as a Quadratic Function.

![1726208340659](image/GD/1726208340659.png)

Given that we have an iterative solution $x_k \approx x$, then at the point $x_k$, E decays fastest along its negative gradient direction $-\nabla E(x_k)=b-Ax_k=r_k$. We need to determine the step size $t_k$ to satisfy

$$
\phi (\alpha _k)=E(x_k+\alpha _kr_k)=\min_\alpha E(x_k+\alpha r_k). \\
\phi'(\alpha _k)=0. \\
$$

This $\implies \alpha _k=\frac{(r_k,r_k)}{(Ar_k,r_k)}$

In a word, the procedure of GD algorithm is to subtract the error along the negative **Gradient**. So we can approximate x step by step.

**Gradient Descent (GD)**
---
$$
\begin{aligned}
&\text{Input: } x \in R^n. \\
&\text{for } k = 1, 2, \ldots, n \text{ do} \\
&\quad\quad  r_k=b-Ax_k; \\
&\quad\quad \alpha _k=\frac{(r_k,r_k)}{(Ar_k,r_k)}; \\
&\quad\quad x_{k+1}=x_k+\alpha _kr_k; \\
&\text{end for} \\
\end{aligned}
$$

## Conjugate Gradient Method
At the k-th step, CG method finds a best direction $p_k$ within a (k+1)-dimensional subspace $S_k$ containing $x_0+Span\{r_k\}$ and updates the solution

$$
x_{k+1}=x_k+\alpha _kp_k \\
$$

Apparently, the CG method defined by

$$
x_{k+1}=\argmin _{y \in x_0+S_k} E(y)=\argmin _{y \in x_0+S_k} ||x-y||_A \\
$$

is always better than the gradient descent found in $S_k$ rather than $x_0+S_k$

Define

$$
\Kappa _m \coloneqq span\{r_0,Ar_0,\ldots,A^{m-1}r_0\}. \\
$$

We get CGM

**Conjugate Gradient Method (CG)**
---
$$
\begin{aligned}
&\text{Input: } x \in R^n, r_0=b-Ax_0. \\
&\text{for } m = 0, 1, 2, \ldots \text{ do} \\
&\quad\quad  \text{Let } \Kappa _m=\Kappa _m(A,r_0)=span\{r_0,Ar_0,\ldots,A^{m-1}r_0\}; \\
&\quad\quad \text{Find } x_m \in x_0 + \Kappa _m \text{ such that} \\
&\quad\quad\quad ||x-x_m||_A=\min_{y \in x_0+\Kappa _m} ||x-y||_A=\min_{y \in x_0+\Kappa _m} ||b-Ay||_A; \\
&\text{end for} \\
\end{aligned}
$$

**Preconditioned Conjugate Gradient Method (PCG)**
---
First we need to find a preconditioner B, which is symmetric positive and easy to invert.

$$
\begin{aligned}
&\text{Input: } x \in R^n, r_0=b-Ax_0. \\
&\text{for } m = 0, 1, 2, \ldots \text{ do} \\
&\quad\quad  \text{Let } \Kappa _m=span\{Br_0,(BA)r_0,\ldots,(BA)^{m-1}r_0\}; \\
&\quad\quad \text{Find } x_m \in x_0 + \Kappa _m \text{ such that} \\
&\quad\quad\quad ||x-x_m||_A=\min_{y \in x_0+\Kappa _m} ||x-y||_A=\min_{y \in x_0+\Kappa _m} ||b-Ay||_A; \\
&\text{end for} \\
\end{aligned}
$$
# 2024/9/12
# Correlation
Having set a geometric view, we concentrate on the `Process` now.

## Divided by Index
- $\{x_n\}_{n=-\infty}^{n=+\infty}$: Discrete
- $x(t)$: Continuous

$E(x_n,x_m)=R_z(n,m)$

$E(x(t),x(s))=R_z(t,s)$

## Correlation Function: $R_z$

1. $R_z(t,t) \geq 0, \text{ thus we have }R_z(t,t)=0 \implies P(x(t)=0)=1$
2. $R_z(t,s)=R_z(s,t)$
3. $|R_z(t,s)| \leq \sqrt{R_z(t,t)R_z(s,s)} \\ \text{(Cauchy-Schwarz, suitable for any inner product)}$

# Another Assumption: Stationary
Invariance in time

Assume the values below are stationary

- $E(x(t))$
- $E(x(t)x(s))$

Then we get:

- $E(x(t))=E(x(t+T))=m(t)=m,\text{ or we can use x'(t)=x(t)-m(t)=0 to let x(t) be a constant}$
- $E(x(t)x(s))=E(x(t+T)x(s+T))=R_z(t-s)=R_z(\tau)$

This is called `Wide Sense Stationary`

## Examples

### 1
$$\{x_n\} \text{ i.i.d.}$$

### 2
$$
\{x_n\} \text{ i.i.d.},E(x)=0,E(x^2)=1,Y_n=\frac{x_n+x_{n-1}}{2}\text{(MA(1))} \\
E(Y_n)=0,E(Y_nY_m)=\begin{cases}
    \frac{1}{2} & \text{if } |n-m|=0 \\
    \frac{1}{4} & \text{if } |n-m|=1 \\
    0 & \text{if } |n-m| \geq 2
\end{cases}
$$

### 3
$$\{x_n\} \text{ i.i.d.},E(x)=0,E(x^2)=1,| \rho | \lt 1 \\
Y_n =\rho Y_{n+1}+x_n \text{(Autoregression)}\\
\overset{iteration}{=} \sum _{k=0}^\infty \rho ^k x_{n-k},(\rho ^\infty Y_{n-\infty} \rightarrow 0)\\
E(Y_n)=0, \\
E(Y_nY_m)=\rho ^{n-m} \sum _{k=0}^\infty \rho ^k \cdot E(x_k^2)=\frac{\rho ^{n-m}}{1-\rho}
$$
---
Regarding the derivation process of $E(Y_nY_m)$
$$
E(Y_n Y_m) = E\left(\left(\sum_{i=0}^{\infty} \rho^i x_{n-i}\right) \left(\sum_{j=0}^{\infty} \rho^j x_{m-j}\right)\right) 
$$
Since $\{x_n\}$ is i.i.d. and $E(x_n x_m) = 0$ when $n \neq m$, therefore:
$$
E(Y_n Y_m) = \sum_{i=0}^{\infty} \sum_{j=0}^{\infty} \rho^i \rho^j E(x_{n-i} x_{m-j})
$$

When $n \geq m$, only when $i = j + (n - m)$ does $E(x_{n-i} x_{m-j})$ not equal zero:
$$
E(Y_n Y_m) = \sum_{i=0}^{\infty} \rho^i \rho^{i + (n - m)} E(x_{n-i} x_{m-i-(n-m)}) = \rho^{n-m} \sum_{i=0}^{\infty} \rho^{2i} E(x_{n-i}^2)
$$
Since $E(x_{n-i}^2) = 1$:
$$
E(Y_n Y_m) = \rho^{n-m} \sum_{i=0}^{\infty} \rho^{2i} = \rho^{n-m} \frac{1}{1 - \rho^2}
$$

More information see [this](https://www.math.pku.edu.cn/teachers/lidf/course/atsa/atsanotes/html/_atsanotes/atsa-arstation.html)

### 4
$$x(t)=A\cos(2 \pi f_0 t+\theta) \\
A,\theta \text{ independent},E(A)=0,E(A^2)=1,\theta \sim U(0,2 \pi)\\
E(x(t))=E(A)E(\cos(2 \pi f_0 t+\theta))=0 \\
R_z(t,s)=E(A^2 \cos(2 \pi f_0 t+\theta) \cos(2 \pi f_0 s+\theta))=\frac{E(A^2)}{2} \cos(2 \pi f_0 (t-s))
$$

### 5
$$x(t) \text{ is a pulse},x(t) \in \{-1,1\} \\
P([s,t] \text{ flips } k \text{ times})=\frac{(\lambda (t-s))^k}{k!} e^{-\lambda (t-s)},(Poisson) \\
E(x(t))=1 \cdot P(x(t)=1)+(-1) \cdot P(x(t)=-1)=0 \\
E(x(t)x(s))=1 \cdot P(x(t)x(s)=1)+(-1)P(x(t)x(s)=-1)\\
=exp(-2 \lambda |t-s|)
$$

### 6
$$\{x_n\} \text{ i.i.d.} \\
E(x_n)=0,E(x_n^2)=1,\theta \sim U(0,2 \pi) \text{ independent of } \{x_n\} \\
Y(t)=x_{[t+\theta]} \\
R(t,s)=E(Y(t)Y(s))=E(x_{[t+\theta]}x_{[s+\theta]}) \\
=E_{\theta}(E_x(x_{[t+\theta]}x_{[s+\theta]}|\theta)) \\
=\int _0^1 E_x(x_{[t+\theta]}x_{[s+\theta]}|\theta) d\theta \\
\overset{\theta \text{ is independent of x}}{=} \int _0^1 E_x(x_{[t+\theta]}x_{[s+\theta]}) d\theta \\
=\begin{cases}
    0 & \text{if} |t-s| \geq 1 \\
    1-|t-s| & \text{if} |t-s| \lt 1 \\
\end{cases}
$$
There exists a length of $|t-s|$ such that $[t+\theta]$ and $[s+\theta]$ are not the same integer, so it is `1-|t-s|`
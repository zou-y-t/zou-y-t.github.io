# 2024/9/29
# Cyclostationary
## Definition
### WSS:

$$
x(t),\forall T, R_x(t,s)=R_x(t+T,s+T)=R_x(t-s) \\
$$

### Cyclostationary:

$$
x(t),\exist T, R_x(t,s)=R_x(t+T,s+T) \\
$$

T:Period
 
$$
\text{Let }D \sim U(0,T),\text{indepedent of }x(t) \\
Y(t)=x(t+D),\text{(add a Random Phase D)} \\
Y(t) \text{ WSS} \\
$$

proof:

$$
X(t)=X(\omega,t) \\
X(t+D)=X(\omega,t+D(\omega)) \\
\implies \\
\begin{aligned}
R_y(t,s)&=E(Y(t)Y(s)) \\
&=E(X(t+D)X(s+D)) \\
&=E_D(E_{x|D}(X(t+D)X(s+D)|D)) \\
&\overset{\text{D independent of } x(t)}{=}E_D(E_x(X(t+D)X(s+D)|D)) \\
&=\frac{1}{T}\int_0^T R_x(t+D,s+D)dD \\
&\overset{\text{Let }s+D=D'}{=}\frac{1}{T}\int_s^{s+T} R_x(t-s+D',D')dD' \\
&=\frac{1}{T}\int_0^T R_x((t-s)+D',D')dD' \\
\end{aligned}
$$

## PAM
$$
x(t)=\sum_{k=-\infty}^\infty \alpha_k \phi (t-kT) \\
$$

- $\alpha_k$: Symbol
- $\phi$: Baseband
- $T$: Symbol Length

Assume $E(\alpha_n\alpha_m)=R_\alpha(n-m)$

$$
\begin{aligned}
R_x(t,s)&=E(x(t)x(s))\\
&=E(\sum_{k=-\infty}^\infty \alpha_k \phi (t-kT) \sum_{k=-\infty}^\infty \alpha_k \phi (s-kT) ) \\
&=\sum_{k=-\infty}^\infty\sum_{m=-\infty}^\infty E(\alpha_k\alpha_m)\phi(t-kT)\phi(s-mT) \\
&=\sum_{k=-\infty}^\infty\sum_{m=-\infty}^\infty R_\alpha (k-m) \phi(t-kT)\phi(s-mT) \\
\implies & x(t) \text{ is not w.s.s., but cyclostationary}
\end{aligned} \\
$$

So we get a w.s.s. signal: $x'(t)=x(t+D),D\sim U(0,T)$ 

$$
\begin{aligned}
R_{x'}&=\frac{1}{T}\int_0^T \sum_{k=-\infty}^\infty\sum_{m=-\infty}^\infty R_\alpha (k-m) \phi(t+D-kT)\phi(s+D-mT)dD \\
&\overset{\text{Let }k'=k-m,m'=m}{=}\frac{1}{T}\sum_{k'=-\infty}^\infty\sum_{m'=-\infty}^\infty R_\alpha (k')\int_0^T \phi(t+D-(k'+m')T)\phi(s+D-m'T)dD \\
&\overset{\text{Let }D'=s+D-m'T}{=}\frac{1}{T}\sum_{k'=-\infty}^\infty\sum_{m'=-\infty}^\infty R_\alpha (k')\int_{s-m'T}^{s-(m'-1)T} \phi(t-s+D'-k'T)\phi(D')dD' \\
&=\frac{1}{T}\sum_{k'=-\infty}^\infty R_\alpha(k')\int_{-\infty}^\infty \phi(t-s+D'-k'T)\phi(D')dD' \\
&\text{Let }R_\phi(\tau)=\int_{-\infty}^\infty \phi(\tau +D')\phi(D')dD' \implies \\
R_{x'}&=\frac{1}{T} \sum_{k'=-\infty}^\infty R_\alpha(k')R_\phi (t-s-k'T) \\
\end{aligned}\\

\begin{aligned}
&\text{Now apply FT to }R_{x'}\\
S_{x'}(\omega)&=\int_{-\infty}^\infty R_{x'}(\tau)e^{-j\omega \tau}d\tau \\
&=\frac{1}{T}\sum_{k'=-\infty}^\infty R_\alpha(k')\int_{-\infty}^\infty R_\phi (\tau-k'T)e^{-j\omega \tau} d\tau \\
&=\frac{1}{T}\sum_{k'=-\infty}^\infty R_\alpha(k')e^{-j\omega k'T}S_\phi(\omega) \\
&\overset{\text{DTFT}}{=}\frac{1}{T}S_\alpha(\omega T)S_\phi(\omega) \\
\end{aligned}
$$

## Orthogonal Increment 
$$
x(t),x(0)=0,\forall t_1\lt t_2\leq t_3\lt t_4 \\
x(t_4)-x(t_3)\perp x(t_2)-x(t_1) \\
$$

$$
\begin{aligned}
R_x(t,s)&=E(x(t)x(s))\\
&=E((x(t)-x(s)+x(s))x(s)) \\
&=E((x(t)-x(s))x(s))+E(x^2(s)) \\
&=g(\min(s,t)) \\

E((x(t_4)-x(t_3))(x(t_2)-x(t_1)))&=R_x(t_4,t_2)+R_x(t_3,t_1)-R_x(t_4,t_1)-R_x(t_3,t_2) \\
&=0 \\
\end{aligned}
$$

## Brown Motion 
1. $B(0)=0$
2. Orthogonal Increment
3. $B(t)-B(s) \sim N(0,\sigma^2(t-s))$

$$
\begin{aligned}
R_B(t,s)&=E(B(t)B(s)) \\
&=E(B^2(s)) \\
&=\sigma^2s \\
&=\sigma^2\min(t,s) \\
\text{Let }Y(t)&=\frac{d}{dt}B(t) \implies \\
R_Y(t,s)&=E(\frac{d}{dt}B(t)\frac{d}{ds}B(s)) \\
&=\frac{\partial^2}{\partial t \partial s} E(B(t)B(s)) \\
&=\frac{\partial^2}{\partial t \partial s} \sigma^2\min(t,s) \\
&=\frac{\partial^2}{\partial t \partial s} \sigma^2(\frac{t+s}{2}-\frac{|t-s|}{2}) \\
&=\sigma^2 \frac{\partial^2}{\partial t\partial s} (-\frac{|t-s|}{2}) \\
&
\begin{cases}
\frac{d}{dx}|x|=sgn(x) \\
\frac{d}{dx}sgn(x)=2\delta(x) \\
\end{cases}\implies \\
R_Y(t,s)&=\sigma^2\delta(t-s) \\
\end{aligned}
$$

Stationary $\neq$ Predictable 
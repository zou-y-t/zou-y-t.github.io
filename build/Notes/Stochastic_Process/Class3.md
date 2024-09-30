# 2024/9/24
# $\text{WSS Correlation Function }R_x(\tau)$
$$
x(t)\text{, Stochastic Process, w.s.s.,} \\
R_x(t,s)=E(x(t)x(s))=R_x(t-s)=R_x(\tau) \\
$$

## $R_x(0)\geq |R_x(\tau)|$
$$
R_x(T)=R_x(0) \implies R_x(\tau)=R_x(\tau+T) \\
\text{proof:} \\
R_x(T)=R_x(0) \Longleftrightarrow E((x(0)-x(T))^2)=0 \\
\implies E(x(0)^2)+E(x(T)^2)=E(x(0)x(T)) \\
\overset{\text{w.s.s.}}{\implies} E(x(\tau)^2)+E(x(\tau+T)^2)=E(x(\tau)x(\tau+T)) \\
\text{meanwhile} \\
\begin{aligned}
|R_x(\tau)-R_x(\tau+T)| &= |E(x(0)x(\tau))-E(x(0)x(\tau+T))| \\
&=|E(x(0)(x(\tau)-x(\tau+T)))| \\
&\leq E(|x(0)||(x(\tau)-x(\tau+T))|) \\
&\leq \sqrt{E(x(0)^2)E((x(\tau)-x(\tau+T))^2)} \\
&=0 \\
\end{aligned} \\
$$
## $R_x(\tau) \text{ continuous at 0} \implies \text{continuous anywhere}$

## $R_x(\tau) \text{ is Positive Definite}$ 
$$
\begin{aligned}
&\text{Definition: } \\
&\qquad A \in R^{n \times n} ,\forall x \in R^n,x^TAx \geq 0 \\
&\qquad A \in C^{n \times n} ,\forall x \in C^n,x^HAx \geq 0 \\
&\qquad f(x) p.d. \Longleftrightarrow \forall n,\forall t_1,\ldots,t_n,(f(t_i-t_j))_{ij} \geq 0 \\
&\text{Theory: }\\
&\qquad  R_x(\tau) \text{ is Positive Definite} \\
&\qquad \text{proof:} \\
&\qquad \vec{x}=(x(t_1),\ldots,x(t_n))^T \implies R=E(xx^T) \\
&\qquad R_x(\tau) \implies R_x(t_i-t_j)\\
&\qquad \forall x \in R^n,x^TRx=x^TE(xx^T)x=E(x^Tx\cdot x^Tx)=E((x^Tx)^2) \geq 0 \\    
&\text{Theory: } \\
&\qquad f(x) \text{ p.d.} \Longleftrightarrow \mathcal{F}[f(x)] \geq 0 \\
&\qquad \text{proof: }\\
&\qquad \Leftarrow :F(\omega)=\mathcal{F}[f(t)] \geq 0 \implies f(t)=\mathcal{F}^{-1}[F(\omega)]\\
&\qquad\qquad  \forall \alpha_i \geq 0,g_i(\omega) \text{ p.d}.,\sum \alpha_i g_i(\omega) \geq 0 \\
&\qquad\qquad   \implies \int_{-\infty}^\infty f(S)g(\omega,S)dS \text{ p.d.} \\
&\qquad\qquad   \implies \text{to prove }e^{j\omega t} \text{ is p.d.} \\
&\qquad\qquad   (e^{j\omega (t_i-t_j)})_{ij}=hh^H,h=(e^{j\omega t_1},\ldots,e^{j\omega t_n}) \implies x^H(hh^H)x=|h^Hx|^2 \geq 0 \\
&\qquad  \Rightarrow :\text{Let }x=h=(e^{j\omega t_1},\ldots,e^{j\omega t_n}) \\
&\qquad\qquad  \implies h^H(f(t_i-t_j))_{ij}h\geq 0 \\
&\qquad\qquad  \Longleftrightarrow \sum_{i=1}^n\sum_{j=1}^n f(t_i-t_j)e^{-j\omega t_i}e^{j\omega t_j} \geq 0 \\
&\qquad\qquad  \Longleftrightarrow \sum_{i=1}^n\sum_{j=1}^n f(t_i-t_j)e^{-j\omega (t_i-t_j)}\geq 0 \\
&\qquad\qquad  t_1,\ldots,t_n \in [-T,T], \\
&\qquad\qquad  \frac{1}{T}\int_{-T}^T\int_{-T}^Tf(t-s)e^{-j\omega (t-s)}dtds \\
&\qquad\qquad  \text{Let }x=t-s y=t+s |det(\mathcal{J})|=2\\
&\qquad\qquad  \implies \text{To prove }\oint_{\mathcal{S}}\frac{1}{T}f(x)e^{-j\omega x}\cdot \frac{1}{2} dxdy\geq 0 \\
&\qquad\qquad  \oint_{\mathcal{S}}\frac{1}{T}f(x)e^{-j\omega x}\cdot \frac{1}{2} dxdy=\frac{1}{2T}(\int_{-2T}^0\int_{-x-2T}^{x+2T}+\int^{2T}_0\int_{x-2T}^{-x+2T})f(x)e^{-j\omega x}dydx \\
&\qquad\qquad  =\frac{1}{2T}\int_{-2T}^{2T}\int_{|x|-2T}^{-|x|+2T}f(x)e^{-j\omega x}dydx \\
&\qquad\qquad  =\frac{1}{2T}\int_{-2T}^{2T}(4T-2|x|)f(x)e^{-j\omega x}dx \\
&\qquad\qquad  =\int_{-2T}^{2T}(2-\frac{|x|}{T})f(x)e^{-j\omega x}dx\\
&\qquad\qquad  \overset{T\rightarrow \infty,\text{Lebesgue(Dominated Convergence Theory)}}{\implies} \int_{-2T}^{2T}f(x)e^{-j\omega x}dx \geq 0 \\
\end{aligned}
$$

## $R_x(\tau) \text{'s FT---Energe Spectrum Density}$
$$
\begin{aligned}
\lim_{T\rightarrow \infty} \frac{1}{2T}E(|\int_{-T}^Tx(t)e^{-j\omega t}dt|^2)&=\lim_{T\rightarrow \infty} \frac{1}{2T}E((\int_{-T}^Tx(t)e^{-j\omega t}dt)(\int_{-T}^Tx(s)e^{j\omega s}ds)) \\
&=\lim_{T\rightarrow \infty} \frac{1}{2T}\int_{-T}^T\int_{-T}^TE(x(t)x(s))e^{-j\omega (t-s)}dtds \\
&=\lim_{T\rightarrow \infty} \frac{1}{2T}\int_{-T}^T\int_{-T}^TR_x(t-s)e^{-j\omega (t-s)}dtds \\
&=\mathcal{F}[R_x(\tau)] \\
\end{aligned}
$$
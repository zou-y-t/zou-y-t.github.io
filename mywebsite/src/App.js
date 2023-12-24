import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <body style={{backgroundColor: 'black'}}>
        <h5 style={{ color: 'white' }}>HELLO Nuannuan,</h5>
        <h1 style={{ color: 'white' }}>MERRY CHRISTMAS!</h1>
        <div className="tree">
          <div className="star"></div>
          <div className="layer" style={{borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: '30px solid green'}}>
            <div className="ball"></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(250%, 200%)'}}></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(-200%, 185%)'}}></div>
          </div>
          <div className="layer" style={{borderLeft: '50px solid transparent', borderRight: '50px solid transparent', borderBottom: '35px solid green'}}>
            <div className="ball"></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(150%, 185%)'}}></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(-250%, 200%)'}}></div>
          </div>
          <div className="layer" style={{borderLeft: '60px solid transparent', borderRight: '60px solid transparent', borderBottom: '40px solid green'}}>
            <div className="ball"></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(250%, 200%)'}}></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(-200%, 185%)'}}></div>
          </div>
          <div className="layer" style={{borderLeft: '70px solid transparent', borderRight: '70px solid transparent', borderBottom: '45px solid green'}}>
            <div className="ball"></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(150%, 300%)'}}></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(-250%, 200%)'}}></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(350%, 200%)'}}></div>
            <div className="ball" style={{backgroundColor: 'blue', transform: 'translate(-400%, 350%)'}}></div>
          </div>
          <div className="trunk"></div>
        </div>
      </body>
    </>
  );
}

export default App;

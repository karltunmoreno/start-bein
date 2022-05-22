import logo from './logo.png';
import './App.css';
import About from './components/About/index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="happy bein bumble bee"/>
        <p>Start bein!<span>
           <br/>Sign up today!</span>
        </p>
      </header>
      <About></About>
    </div>
  );
}

export default App;

import logo from './logo.png';
import './App.css';
import About from './components/About/index';
import Carbon from './components/Carbon/index';

function App() {
  return (
    <nav>
      <li>
        <a>
          Carbon
        </a>
      </li>
    </nav>,
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="happy bein bumble bee" />
        <p>Start bein!<span>
          <br />Sign up today!</span>
        </p>
      </header>
      <About></About>
      <Carbon></Carbon>
    </div>
  );
}

export default App;

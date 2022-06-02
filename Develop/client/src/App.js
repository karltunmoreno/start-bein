<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 5821c70005e9ce5ca521407b7d247e792ef9a27d
import './App.css';
import Page from './components/Volunteer/Page';

function App() {
  return (
    <div className="App">
      <Page />
    </div>
=======
import logo from "./logo.png";
import "./App.css";
import About from "./components/About/index";
import Carbon from "./components/Carbon/index";
import Thermostat from "./components/Thermostat/index";
import Form from "./components/Form/index";
import Footer from "./components/Footer/index";

function App() {
  return (
    (
      <nav>
        <li>
          <a>Carbon</a>
        </li>
      </nav>
    ),
    (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="happy bein bumble bee" />
          <p>
            Start bein!
            <span>
              <br />
              Sign up today!
            </span>
          </p>
        </header>

        <About></About>
        <Carbon></Carbon>

        <Form></Form>
        <Thermostat></Thermostat>

        <Footer></Footer>
      </div>
    )
>>>>>>> 7d388f671160b448ea5c2fb81b8ac5c48d83b113
  );
}

export default App;


import logo from './margeAndHomer.webp';
import './App.css';
import Pages from "./components/Pages"

function App() {

  return(
      <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Simpon Memes LA</p>
      </header>
      <Pages/>
    </div>
      </>
  );
}

export default App;

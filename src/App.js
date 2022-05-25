import logo from './margeAndHomer.webp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Holis manolis. Aca van a verse los memes de los simpsons(?)</p>
        <a
          className="App-link"
          href="https://simpsonswiki.com/wiki/Main_Page"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wiki de los simpson
        </a>
      </header>
    </div>
  );
}

export default App;

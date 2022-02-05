import logo from "./logo.svg";
import "./App.css";
const ethers = require("ethers");

function App() {
  const url =
    "https://eth-rinkeby.alchemyapi.io/v2/uihGSeaVCNmR016tzK86SQmcRKL0SIO3";
  const provider = new ethers.providers.JsonRpcProvider(url);
  // const privateKey = process.env.RINKEBY_PRIVATE_KEY;
  const getBlockDockData = async () => {
    const blockNumber = await provider.getBlockNumber();
    console.log("blockNumber", blockNumber);
    return <h1> Current BlockNumber: {blockNumber}</h1>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React123
        </a>
      </header>
    </div>
  );
}

export default App;

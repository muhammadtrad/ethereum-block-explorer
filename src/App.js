import { useEffect, useState } from "react";
import "./App.css";
const ethers = require("ethers");

function App() {
  const url =
    "https://eth-rinkeby.alchemyapi.io/v2/uihGSeaVCNmR016tzK86SQmcRKL0SIO3";

  const provider = new ethers.providers.JsonRpcProvider(url);

  const [blockNumber, setBlockNumber] = useState();
  const [averageGasCost, setAverageGasCost] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      let transactionCount = 0;
      let block = await provider.getBlockNumber();
      setBlockNumber(block);

      let totalGasCost = 0;
      while (transactionCount < 500) {
        const { transactions } = await provider.getBlockWithTransactions(block);
        const currentBlockTotalGasCost = transactions.reduce((acc, curr) => {
          const bigNumber = ethers.BigNumber.from(acc.gasPrice?._hex || "0x0");
          const added = bigNumber.add(curr.gasPrice._hex);
          return added._hex;
        }, "0x0");
        const currentBigNumber = ethers.BigNumber.from(
          currentBlockTotalGasCost
        );
        totalGasCost = currentBigNumber.add(totalGasCost);
        transactionCount += transactions.length;
        block--;
      }

      setAverageGasCost(ethers.utils.formatUnits(totalGasCost._hex) / 500);
    };
    fetchData();
    setBlockNumber(blockNumber);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Current Block Number: {blockNumber}</h1>
        <h1> Estimated Gas Cost: {averageGasCost}</h1>
      </header>
    </div>
  );
}

export default App;

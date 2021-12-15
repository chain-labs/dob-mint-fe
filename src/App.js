import { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import getWeb3 from "./getWeb3";
import Collection from "./entity/Collection";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./containers/Loading";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      network: undefined,
      collectionAddress: undefined,
      collection: undefined,
      wrongNetwork: false,
      connectedAddress: undefined,
    };
  }

  componentDidMount = async () => {
    const { network, collectionAddress } = this.getEnvVar();
    try {
      this.web3 = await getWeb3();
      const correctNetwork = await this.checkNetwork(this.web3, network);
      window.ethereum.on("chainChanged", () => window.location.reload());
      if (!correctNetwork) {
        this.setState({ wrongNetwork: true });
        alert("Wrong network connect, please switch to " + network);
        throw Error("Wrong network connect, please switch to " + network);
      }
      window.ethereum.on("accountsChanged", (accounts) => {
        this.state.collection.hydrateUserData();
        this.setState({
          connectedAddress: accounts[0],
        });
      });
      const collection = new Collection(collectionAddress, this.web3);
      const loadingInterval = setInterval(() => {
        if (collection.isLoaded) {
          this.setState({ isLoading: false });
          clearInterval(loadingInterval);
        }
      }, 500);

      const accounts = await this.web3.eth.getAccounts();
      this.setState({
        network: network,
        collectionAddress: collectionAddress,
        collection: collection,
        wrongNetwork: false,
        connectedAddress: accounts[0],
      });
    } catch (error) {
      console.error(error);
    }
  };

  getEnvVar = () => {
    if (this.checkIfEnvDev()) {
      return {
        network: process.env.REACT_APP_TEST_NETWORK,
        collectionAddress: process.env.REACT_APP_TEST_CONTRACT_ADDRESS,
      };
    }
    return {
      network: process.env.REACT_APP_NETWORK,
      collectionAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
    };
  };

  checkNetwork = async (web3, network) =>
    (await web3.eth.net.getId()) == this.convertToNetworkId(network)
      ? true
      : false;

  convertToNetworkId = (network) => (network === "mainnet" ? 1 : 4);

  checkIfEnvDev = () => !(process.env.REACT_APP_IS_PRODUCTION === "true");

  render = () => {
    const { collection, connectedAddress, network, isLoading } = this.state;
    return !isLoading ? (
      <div className="App">
        <Nav connectedAddress={connectedAddress} network={network} />
        <Hero collection={collection} />
      </div>
    ) : (
      <Loading message={"Daughters of Blockchain are getting ready..."} />
    );
  };
}

export default App;

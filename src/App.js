import { Component } from "react";
import "./App.css";
import Hero from "./components/Hero";
import getWeb3 from "./getWeb3";
import Collection from "./entity/Collection";
import Loading from "./containers/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkNetwork, GA_TRACKING_ID } from "./constants";
import ReactGA from 'react-ga4';

ReactGA.initialize(GA_TRACKING_ID);



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
    // if (!window.location.hostname.includes("localhost")) {
    if (true) {
      ReactGA.initialize(GA_TRACKING_ID);
    }
    ReactGA.send({ hitType: "pageview", page: "/loading" });
    const { network, collectionAddress } = this.getEnvVar();
    try {
      this.web3 = await getWeb3();
      const correctNetwork = await checkNetwork(this.web3, network);
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
      }, 1000);

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

  checkIfEnvDev = () => !(process.env.REACT_APP_IS_PRODUCTION === "true");

  render = () => {
    const { collection, connectedAddress, network, isLoading } = this.state;
    return !isLoading ? (
      <div className="App">
        <Hero collection={collection} connectedAddress={connectedAddress} network={network} />
      </div>
    ) : (
      <Loading message={"Please select Polygon Matic as a network and connect your wallet"} />
    );
  }; 
}

export default App;

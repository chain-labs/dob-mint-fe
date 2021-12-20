
export const networkIds = {
    rinkeby: 4,
    mainnet: 1,
    polygon: 137,
    polygon_test: 80001
}

export const networkUnits = {
    rinkeby: "ETH",
    mainnet: "ETH",
    polygon: "MATIC",
    polygon_test: "MATIC"
}
  
export const checkIfEnvDev = () => !(process.env.REACT_APP_IS_PRODUCTION === "true");

const getNetwork = () => {
    if (checkIfEnvDev()) {
        return process.env.REACT_APP_TEST_NETWORK;
    } else {
        return process.env.REACT_APP_NETWORK;
    }
}

export const checkNetwork = async (web3, network) => {
    const id = await web3.eth.net.getId();
    const reqdId = convertToNetworkId(network);

   return (id) === reqdId
      ? true
      : false;
  };


export const convertToNetworkId = (network) => (networkIds[network]);

export const getUnit = () => {
    const network = getNetwork();
    console.log({network, unit: networkUnits[network]});
    return networkUnits[network];
};
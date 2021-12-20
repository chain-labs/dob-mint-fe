
export const checkIfEnvDev = () => !(process.env.REACT_APP_IS_PRODUCTION === "true");

const getNetwork = () => {
    if (checkIfEnvDev) {
        return process.env.REACT_APP_TEST_NETWORK;
    } else {
        return process.env.REACT_APP_NETWORK;
    }
}

export const getUnit = () => {
    const network = getNetwork();
    if (network === "polygon") {
        return "MATIC"
    } else return "ETH"
};
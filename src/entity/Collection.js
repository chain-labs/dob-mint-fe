import abi from "./abi.js";

class Collection {
  constructor(address, web3) {
    this.address = address;
    this.web3 = web3;
    this.contract = new web3.eth.Contract(abi, address);
    Promise.all([
        this.hydrateMetadata(),
        this.hydrateUserData(),
        this.hydrateTokenDetails(),
        this.hydrateStatus(),
      ]).then(()=>this.isLoaded = true);
  }

  hydrateMetadata = async () => {
    const methods = this.contract.methods;
    this.symbol = await methods.symbol().call();
    this.name = await methods.name().call();
    this.owner = await methods.owner().call();
    this.presaleStartTime = await methods.presaleStartTime().call();
    this.publicSaleStartTime = await methods.publicSaleStartTime().call();
  };

  hydrateUserData = async () => {
    const methods = this.contract.methods;
    const connectedAccount = (await this.web3.eth.getAccounts())[0];
    this.user = {};
    this.user.tokenBalance = await methods.balanceOf(connectedAccount).call();
    this.user.address = connectedAccount;
    this.user.userTokens = await methods
      .getAllTokensOfOwner(connectedAccount)
      .call();
  };

  hydrateStatus = async () => {
    const methods = this.contract.methods;
    this.isPresaleAllowed = await methods.isPresaleAllowed().call();
    this.isPresaleActive = await methods.isPresaleActive().call();
    this.isSaleActive = await methods.isSaleActive().call();
  }

  hydrateTokenDetails = async () => {
    const methods = this.contract.methods;
    this.token = {};
    this.token.presalePrice = await methods.presalePrice().call();
    this.token.maxTokens = await methods.maximumTokens().call();
    this.token.maxPurchase = await methods.maxPurchase().call();
    this.token.publicPrice = await methods.price().call();
  };
}

export default Collection;

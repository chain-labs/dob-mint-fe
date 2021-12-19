import Button from "@restart/ui/esm/Button";
import { useState } from "react";
import { Card, FormControl, InputGroup } from "react-bootstrap";
import Web3 from "web3";

const SaleActiveComponent = ({
    maxPurchase,
    price,
    buy,
    connectedAddress,
    state
  }) => {
    const [value, setValue] = useState(0);
    const [isBuying, setIsBuying] = useState(false);
  
    const handpleInputChange = (e) => {
      setValue(e.target.value);
    };
  
    const handleBuy = async () => {
      setIsBuying(true);
      const tx = await buy(value).send({
        from: connectedAddress,
        value: new Web3.utils.toBN(price).mul(new Web3.utils.toBN(value)),
      });
      console.log(tx);
      if (tx?.transactionHash) {
        setIsBuying(false);
      }
    };
  
    return (
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Mint DoB</Card.Title>
          <Card.Text>{state} is Active</Card.Text>
          <Card.Text>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Tokens to mint
              </InputGroup.Text>
              <FormControl
                onChange={handpleInputChange}
                value={value}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Card.Text>
          <Card.Text>
            Maximum tokens that can be minted per transaction: {maxPurchase || 0}
          </Card.Text>
          <Card.Text>
            Mint price per token: {Web3.utils?.fromWei(price?.toString()) || 0} ETH
          </Card.Text>
          <Card.Text>
            Total Cost:{" "}
            {Web3.utils?.fromWei(
              new Web3.utils.toBN(price).mul(new Web3.utils.toBN(value))
            ) || 0}{" "}
            ETH
          </Card.Text>
          <Button onClick={handleBuy} variant="primary">
            {isBuying ? "Minting..." : "Mint"}
          </Button>
        </Card.Body>
      </Card>
    );
};
  
export default SaleActiveComponent;
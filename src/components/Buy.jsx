import { useEffect, useState } from "react";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { useTimer } from "react-timer-hook";
import Web3 from "web3";

// states for buying
const WaitingForPresale = Symbol("waiting for presale");
const PresaleActive = Symbol("presale active");
const WaitingForSale = Symbol("waiting for sale");
const SaleActive = Symbol("sale active");
const SaleEnded = Symbol("sale ended");

const Buy = ({ collection }) => {
  const [state, setState] = useState();
  const [expiryTimestamp, setExpiryTimestamp] = useState(Date.now());

  const nextState = (state) => {
    if (state === WaitingForSale) {
      setState(SaleActive);
    } else if (state === WaitingForPresale) {
      setState(PresaleActive);
    }
  };

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: expiryTimestamp,
    onExpire: () => nextState(state),
  });

  useEffect(() => {
    figureOutState();
  }, []);

  useEffect(() => {
    if (state === WaitingForPresale) {
      setExpiryTimestamp(
        toJSTimestamp(collection?.presaleStartTime) -
          new Date().getTimezoneOffset() * 60
      );
    } else if (state === WaitingForSale) {
      setExpiryTimestamp(
        toJSTimestamp(collection?.publicSaleStartTime) -
          new Date().getTimezoneOffset() * 60
      );
    } else {
      setExpiryTimestamp(0);
    }
  }, [state]);

  const toJSTimestamp = (timestamp) => parseInt(timestamp) * 1000;

  const figureOutState = () => {
    if (collection?.isPresaleAllowed) {
      if (toJSTimestamp(collection?.presaleStartTime) > Date.now()) {
        setState(WaitingForPresale);
        return;
      } else if (collection?.isPresaleActive) {
        setState(PresaleActive);
        return;
      }
    }
    if (toJSTimestamp(collection?.publicSaleStartTime) > Date.now()) {
      setState(WaitingForSale);
      return;
    } else if (collection?.isSaleActive) {
      setState(SaleActive);
      return;
    }
    setState(SaleEnded);
  };

  const renderAccordingToState = (state) => {
    console.log(state);
    if (state === WaitingForPresale) {
      return (
        <WaitingForPresaleComponent
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          days={days}
        />
      );
    }
    if (state === PresaleActive) {
      return (
        <PresaleActiveComponent
          maxPurchase={collection?.token?.maxPurchase}
          presalePrice={collection?.token?.presalePrice}
          presaleBuy={collection.contract.methods["presaleBuy(uint256)"]}
          connectedAddress={collection?.user?.address}
        />
      );
    }
    if (state === WaitingForSale) {
      return (
        <WaitingForSaleComponent
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          days={days}
        />
      );
    }
    if (state === SaleActive) {
      return (
        <SaleActiveComponent
          maxPurchase={collection?.token?.maxPurchase}
          publicPrice={collection?.token?.publicPrice}
          buy={collection.contract.methods["buy(uint256)"]}
          connectedAddress={collection?.user?.address}
        />
      );
    }
    if (state === SaleEnded) {
      return <SaleEndedComponent />;
    }
  };

  return state ? renderAccordingToState(state) : <></>;
};

const SaleEndedComponent = () => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Mint DoB</Card.Title>
        <Card.Text>Sale have Ended</Card.Text>
      </Card.Body>
    </Card>
  );
};

const WaitingForPresaleComponent = ({ seconds, minutes, hours, days }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Mint DoB</Card.Title>
        <Card.Text>
          Presale starts in{" "}
          <Timer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const WaitingForSaleComponent = ({ seconds, minutes, hours, days }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Mint DoB</Card.Title>
        <Card.Text>
          Sale starts in{" "}
          <Timer
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            days={days}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const SaleActiveComponent = ({
  maxPurchase,
  publicPrice,
  buy,
  connectedAddress,
}) => {
  const [value, setValue] = useState(0);
  const [isBuying, setIsBuying] = useState(false);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleBuy = async () => {
    setIsBuying(true);
    const tx = await buy(value).send({
      from: connectedAddress,
      value: new Web3.utils.toBN(publicPrice).mul(new Web3.utils.toBN(value)),
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
        <Card.Text>Public Sale is Active</Card.Text>
        <Card.Text>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Tokens to mint
            </InputGroup.Text>
            <FormControl
              onChange={handleInputChange}
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
          Mint price per token: {Web3.utils.toBN(publicPrice) || 0} ETH
        </Card.Text>
        <Card.Text>
          Total Cost:{" "}
          {Web3.utils.fromWei(
            new Web3.utils.toBN(publicPrice).mul(new Web3.utils.toBN(value))
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

const PresaleActiveComponent = ({
  maxPurchase,
  presalePrice,
  presaleBuy,
  connectedAddress,
}) => {
  const [value, setValue] = useState(0);
  const [isBuying, setIsBuying] = useState(false);

  const handpleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handlePresaleBuy = async () => {
    setIsBuying(true);
    const tx = await presaleBuy(value).send({
      from: connectedAddress,
      value: new Web3.utils.toBN(presalePrice).mul(new Web3.utils.toBN(value)),
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
        <Card.Text>Presale Sale is Active</Card.Text>
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
          Mint price per token: {Web3.utils.fromWei(presalePrice) || 0} ETH
        </Card.Text>
        <Card.Text>
          Total Cost:{" "}
          {Web3.utils.fromWei(
            new Web3.utils.toBN(presalePrice).mul(new Web3.utils.toBN(value))
          ) || 0}{" "}
          ETH
        </Card.Text>
        <Button onClick={handlePresaleBuy} variant="primary">
          {isBuying ? "Minting..." : "Mint"}
        </Button>
      </Card.Body>
    </Card>
  );
};

const Timer = ({ seconds, minutes, hours, days }) => {
  return (
    <>
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
    </>
  );
};

export default Buy;

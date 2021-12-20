import { useEffect, useState } from "react";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import Web3 from "web3";
import ModalBox from "./ModalBox";
import WaitingComponent from "./Buy/WaitingComponent";
import SaleActiveComponent from "./Buy/ActiveSale";

// states for buying
export const WaitingForPresale = Symbol("waiting for presale");
export const WaitingForSale = Symbol("waiting for sale");
export const PresaleActive = Symbol("presale active");
export const SaleActive = Symbol("sale active");
export const SaleEnded = Symbol("sale ended");
export const showModal = Symbol("true");

const SaleEndedComponent = () => {
	return (
		<Card
			className="text-center"
			style={{
				backgroundColor: "transparent",
				color: "white",
				border: "3px solid white",
				fontFamily: "Satoshi",
				fontSize: "1rem",
			}}
		>
			<Card.Body>
				<Card.Title>Mint DoB</Card.Title>
				<hr />
				<h1>OOPS!</h1>
				<Card.Text>
					<div style={{ fontSize: "2rem",fontFamily:"Satoshi",color:"red" }}>We are Sorry! Sale have Ended</div>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

const Buy = ({ collection }) => {
	const [state, setState] = useState();
	const [expiryTimestamp, setExpiryTimestamp] = useState(Date.now());

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
				<WaitingComponent
					status={state}
					setStatus={setState}
					time={expiryTimestamp}
				/>
			);
		}
		if (state === PresaleActive) {
			return (
				<SaleActiveComponent
					maxPurchase={collection?.token?.maxPurchase}
					salePrice={collection?.token?.presalePrice}
					buy={collection.contract.methods["presaleBuy(uint256)"]}
          connectedAddress={collection?.user?.address}
          presale
				/>
			);
		}
		if (state === WaitingForSale) {
			return (
				<WaitingComponent
					status={state}
					setStatus={setState}
					time={expiryTimestamp}
				/>
			);
		}

		if (state === SaleActive) {
			return (
				<div>
					<SaleActiveComponent
						maxPurchase={collection?.token?.maxPurchase}
						salePrice={collection?.token?.publicPrice}
						buy={collection.contract.methods["buy(uint256)"]}
						connectedAddress={collection?.user?.address}
					/>
				</div>
			);
		}
		if (state === SaleEnded) {
			return <SaleEndedComponent />;
		}
	};
	return state ? renderAccordingToState(state) : <div>Loading...</div>;
};

export default Buy;

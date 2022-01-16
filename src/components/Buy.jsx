import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import WaitingComponent from "./Buy/WaitingComponent";
import SaleActiveComponent from "./Buy/ActiveSale";
import ReactGA from 'react-ga4';
import { GA_TRACKING_ID } from "../constants";


// states for buying
export const WaitingForPresale = Symbol("waiting for presale");
export const WaitingForSale = Symbol("waiting for sale");
export const PresaleActive = Symbol("presale active");
export const SaleActive = Symbol("sale active");
export const SaleEnded = Symbol("sale ended");
export const Paused = Symbol("paused");
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
					<div style={{ fontSize: "2rem",fontFamily:"Satoshi",color:"red" }}>We are Sorry! Sale has Ended</div>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

const SalePausedComponent = () => {
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
				<h1>Hi!</h1>
				<Card.Text>
					<div style={{ fontSize: "2rem",fontFamily:"Satoshi",color:"red" }}>Sale is Paused! Kindly check back later.</div>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

const Buy = ({ collection }) => {
  const [state, setState] = useState();
	const [expiryTimestamp, setExpiryTimestamp] = useState(Date.now());

	useEffect(() => {
		ReactGA.initialize(GA_TRACKING_ID);
		ReactGA.send({ hitType: "pageview", page: "/minting" });
		
	}, [])
  
  
	useEffect(() => {
		const figureOutState = () => {
			if (collection?.paused) {
				setState(Paused);
				return;
			}
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
	figureOutState();
	}, [collection]);

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
	}, [state, collection]);

	const toJSTimestamp = (timestamp) => parseInt(timestamp) * 1000;


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

		if (state === Paused) {
			return <SalePausedComponent />;
		}
	};
	return state ? renderAccordingToState(state) : <div>Loading...</div>;
};

export default Buy;

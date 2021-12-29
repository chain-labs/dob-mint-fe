import { useEffect, useState } from "react";
import { Card, FormControl, InputGroup, Button } from "react-bootstrap";
import Web3 from "web3";
import { GA_TRACKING_ID, getUnit } from "../../constants";
import ModalBox from "../ModalBox";
import ReactGA from 'react-ga4';



const SaleActiveComponent = ({
	maxPurchase,
	salePrice,
	buy,
    connectedAddress,
    presale
}) => {
	const [value, setValue] = useState(1);
	const [isBuying, setIsBuying] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		ReactGA.initialize(GA_TRACKING_ID);
	}, []);

	const handpleInputChange = (e) => {
		setValue(e.target.value);
	};
	
	console.log({maxPurchase});
    
    const unit = getUnit();

	const handleSaleBuy = async () => {
		ReactGA.event({ category: presale ? "Christmas Sale" : "Sale", action: "Buy", label: "Button Click" });
        setIsBuying(true);
        try {
            const tx = await buy(value).send({
                from: connectedAddress,
                value: new Web3.utils.toBN(salePrice).mul(new Web3.utils.toBN(value)),
            });
            console.log(tx);
            if (tx?.transactionHash) {
                setIsBuying(false);
				setShowModal(true);
			} else {
				setIsBuying(false)
                alert("Something Went Wrong..Try Again!")
				ReactGA.event({ category: presale ? "Christmas Sale" : "Sale", action: "Buy Failed", label: "ERROR ALERT" });
            }
		} catch (err) {
			ReactGA.event({ category: presale ? "Christmas Sale" : "Sale", action: "Buy Failed", label: "ERROR ALERT" });
            alert("Something Went Wrong..Try Again!")
            setIsBuying(false);
        }
	};

	return (
		<div className="buyCard">
			<Card
				className="text-center"
				style={{
					backgroundColor: "transparent",
					color: "white",
                    border: "3px solid white",
                    borderRadius: "8px",
					fontFamily: "Satoshi",
					fontSize: "1rem",
				}}
			>
				<Card.Body>
					<Card.Title>Mint a Daughter of Blockchain {presale ? "(Christmas Sale)" : ""}</Card.Title>
					<hr />
					<Card.Text>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div>Price Per Token</div>
							<div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
								{Web3.utils.fromWei(salePrice.toString()) || 0} {unit}
							</div>
						</div>
					</Card.Text>
					<Card.Text>
						<InputGroup className="mb-3">
							<InputGroup.Text
								id="inputGroup-sizing-default"
								style={{ backgroundColor: "#8757b2", color: "white" }}
							>
								Tokens to mint
							</InputGroup.Text>
							<FormControl
								onChange={handpleInputChange}
                                value={value}
                                type="number"
                                max={maxPurchase}
                                min={1}
								aria-label="Default"
								aria-describedby="inputGroup-sizing-default"
								style={{ backgroundColor: "black", color: "white" }}
							/>
						</InputGroup>
					</Card.Text>
					<Card.Text>
						(
						<span style={{ color: "green", fontWeight: "600" }}>
							Maximum {maxPurchase || 0} tokens can be minted per transaction
                        </span>
                        )
					</Card.Text>
					<Card.Text>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div>Total Cost</div>
							<div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
								{Web3.utils.fromWei(
									new Web3.utils.toBN(salePrice).mul(new Web3.utils.toBN(value))
								) || 0}{" "}
								{unit}
							</div>
						</div>
					</Card.Text>
					<hr />
					<Button
						onClick={handleSaleBuy}
						variant="primary"
                        style={{ width: "100%" }}
                        disabled={(value > parseInt(maxPurchase) || value < 1) ? true : false}
					>
						{isBuying ? "Minting..." : "Mint"}
					</Button>
				</Card.Body>
			</Card>
			<ModalBox
				show={showModal}
				onHide={() => {
				    setShowModal(false);
				}}
			/>
		</div>
	);
};
  
export default SaleActiveComponent;
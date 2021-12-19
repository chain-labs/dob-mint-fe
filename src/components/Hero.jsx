import Buy from "./Buy";
import Img from "../assets/Christmas.png";
import "../style/style.scss";
import { Button } from "react-bootstrap";
import Nav from "./Nav";
import Logo from "../assets/logo2.png";
import Modal from "./ModalBox";

const Hero = ({ collection }) => {
	return (
		<div className="buyContainer">
			<Nav></Nav>
			<div className="mainSection">
				<img style={{ width: "800px" }} src={Img} alt="no"></img>
				<div style={{}}>
					<img
						style={{
							width: "40vw",
							marginTop: "100px",
							marginBottom: "20px",
							// marginRight: "50px",
						}}
						src={Logo}
						alt="no"
					></img>
					<div
						style={{ width: "100%", display: "flex", justifyContent: "center" }}
					>
						<Buy collection={collection} />
					</div>
				</div>
			</div>
			{/* <Buy collection={collection} />  */}
			{/* <h1>Hero</h1> */}
		</div>
	);
};

export default Hero;

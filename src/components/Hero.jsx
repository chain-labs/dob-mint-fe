import Buy from "./Buy";
import Img from "../assets/Christmas.png";
import "../style/style.scss";
import Nav from "./Nav";
import Logo from "../assets/logo2.png";

const Hero = ({ collection, connectedAddress, network }) => {
	return (
		<div className="buyContainer">
			<Nav connectedAddress={connectedAddress} network={network} />
			<div className="mainSection">
				<img className="mainImg" src={Img} alt="no"/>
				<div>
					<img
						style={{
							width: "40vw",
							marginTop: "100px",
							marginBottom: "20px",
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
		</div>
	);
};

export default Hero;

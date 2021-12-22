import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loading = ({ message }) => (
	<header className={"App-header"}>
		<FontAwesomeIcon className={"App-logo logo-spin"} icon={faCircleNotch} />
		<h3 className={"mt-5"}>
			{message}
			<div>
                    <label>Need help?</label>
				<div>
					<a href="https://daughtersofblockchain.com/metamask-wallet/">
						1. Steps to connect wallet
					</a>
				</div>
				<a href="https://daughtersofblockchain.com/get-matic/">
					2. Steps to get Matic
				</a>
			</div>
		</h3> 
	</header>
);

export default Loading;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loading = ({ message }) => (
	<header className={"App-header"}>
		<FontAwesomeIcon className={"App-logo logo-spin"} icon={faCircleNotch} />
		<h3 className={"text-center mt-5"}>
			{message}
			<div>
				<div>
					<a href="https://daughtersofblockchain.com/metamask-wallet/">
						https://daughtersofblockchain.com/metamask-wallet/
					</a>
				</div>
				<a href="https://daughtersofblockchain.com/get-matic/">
					https://daughtersofblockchain.com/get-matic/
				</a>
			</div>
		</h3>
	</header>
);

export default Loading;

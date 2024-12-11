import React from "react";
import ConnectButton from "../connect-btn-sign-message";
import { ModeToggle } from "../theme-switch";
import FuelNetworkSwitcher from "../network-switcher";

function Header() {
	return (
		<div className="flex justify-between items-start py-1 px-2 w-full border-b">
			<p>Logo</p>

			<div className="flex items-start gap-2">
				<ModeToggle />
				<FuelNetworkSwitcher/>
				<ConnectButton />
			</div>
		</div>
	);
}

export default Header;

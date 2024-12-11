import {
	http,
	cookieStorage,
	createConfig,
	createStorage,
	fallback,
} from "wagmi";
import { type Chain, sepolia, mainnet } from "wagmi/chains";

import type { Config, CreateConnectorFn, Transport } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export function generateETHConnectors(
	appName: string,
): Array<CreateConnectorFn> {
	const connectors: Array<CreateConnectorFn> = [
		injected({
			shimDisconnect: true,
			target: () => ({
				id: "io.metamask",
				name: "MetaMask",
				provider: "isMetaMask",
				icon: "https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/SVG_MetaMask_Icon_Color.svg",
			}),
		}),
		coinbaseWallet({ appName, headlessMode: true }),
	];

	if (process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
		connectors.push(
			walletConnect({
				projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
				showQrModal: false,
			}),
		);
	}
	return connectors;
}

export const APP = {
	name: "Fuel Connectors Example APP",
	description: "SSR Example app of Fuel Connectors",
};
export const CHAINS_TO_CONNECT = [mainnet, sepolia] as [Chain, ...Chain[]];

export const TRANSPORTS: Record<string, Transport> = {
	[CHAINS_TO_CONNECT[0].id]: fallback(
		[
			http(
				`https://eth-${CHAINS_TO_CONNECT[0].name}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_WC_PROJECT_ID}`,
			),
			http(),
		],
		{ rank: false },
	),
	[CHAINS_TO_CONNECT[1]?.id ?? "defaultChainId"]: fallback([http()], {
		rank: false,
	}),
};

export const DEFAULT_WAGMI_CONFIG: Config = createConfig({
	chains: CHAINS_TO_CONNECT,
	connectors: generateETHConnectors(APP.name),
	transports: TRANSPORTS,
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
});

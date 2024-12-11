"use client";

import { DEFAULT_WAGMI_CONFIG } from "@/lib/config";
import { createConfig, defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { CHAIN_IDS, Network, Provider } from "fuels";
import { useTheme } from "next-themes";
import { Config } from "wagmi";

export const NETWORKS: Network[] = [
	{
		chainId: CHAIN_IDS.fuel.testnet,
		url: "https://app-testnet.fuel.network",
	},
	{
		chainId: CHAIN_IDS.fuel.devnet,
		url: "https://app-devnet.fuel.network",
	},
	{
		chainId: CHAIN_IDS.fuel.mainnet,
		url: "https://app.fuel.network",
	},
];

export const NETWORK_NAMES: { [key: string]: string } = {
	"https://app.fuel.network": "Fuel Mainnet",
	"https://app-devnet.fuel.network": "Fuel Devnet",
	"https://app-testnet.fuel.network": "Fuel Testnet",
};

// For SSR application we need to use
// createConfig to avoid errors related to window
// usage inside the connectors.
const FUEL_CONFIG = createConfig(() => {
	return {
		connectors: defaultConnectors({
			devMode: true,
			wcProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
			//@ts-expect-error:unknown
			ethWagmiConfig: DEFAULT_WAGMI_CONFIG as Config,
			chainId: NETWORKS[1]?.chainId,
		}),
	};
});

type themeType = "dark" | "light" | undefined;

export const FuelProviders = ({ children }: { children: React.ReactNode }) => {
	const { theme } = useTheme();
	return (
		<>
			<FuelProvider
				theme={theme as themeType}
				fuelConfig={FUEL_CONFIG}
				networks={NETWORKS}>
				{children}
			</FuelProvider>
		</>
	);
};

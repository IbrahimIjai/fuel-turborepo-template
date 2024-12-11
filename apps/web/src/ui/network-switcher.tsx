"use client";

import React, { useState } from "react";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@fueltemp/ui";
import { NetworkIcon } from "lucide-react";
import { useNetwork, useNetworks, useSelectNetwork } from "@fuels/react";
import { Network } from "fuels";
import { NETWORKS, NETWORK_NAMES } from "@/providers/fuel/fuel-provider-child";

const FuelNetworkSwitcher: React.FC = () => {
	const { network } = useNetwork();
	const { selectNetwork } = useSelectNetwork();

	console.log({ network });

	const handleNetworkChange = async (network: Network) => {
		try {
			await selectNetwork({ chainId: network.chainId }); // Additional logic after network change if necessary
		} catch (error) {
			console.error("Failed to switch network:", error);
		}
	};
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2">
					<NetworkIcon className="w-4 h-4" />
					{network && network.chainId}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<ul className=" w-full">
					{NETWORKS.map((net) => (
						<li key={net.chainId}>
							<Button
								className="w-full"
								variant="outline"
								onClick={() => handleNetworkChange(net)}>
								{NETWORK_NAMES[net.url]}
							</Button>
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	);
};

export default FuelNetworkSwitcher;

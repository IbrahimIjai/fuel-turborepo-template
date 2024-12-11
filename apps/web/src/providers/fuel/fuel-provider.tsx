"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import type { State } from "wagmi";
import { FuelProviders } from "./fuel-provider-child";

const queryClient = new QueryClient();

export function ProvidersForFuel({
	children,
}: {
	children: React.ReactNode;
	initialState?: State;
}) {
	return (
		<QueryClientProvider client={queryClient}>
			<FuelProviders>{children}</FuelProviders>
		</QueryClientProvider>
	);
}

"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-providers";
import { ProvidersForFuel } from "./fuel/fuel-provider";

export function RootProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<ProvidersForFuel>{children}</ProvidersForFuel>
		</ThemeProvider>
	);
}

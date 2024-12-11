"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useIsMounted } from "@/hooks/useIsMounted";
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

export function ThemeProvider({ children }: ThemeProviderProps) {
	const mounted = useIsMounted();
	if (!mounted) {
		return <>{children}</>;
	}
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange>
			{children}
		</NextThemesProvider>
	);
}

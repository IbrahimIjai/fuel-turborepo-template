"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@fueltemp/ui";
import { useIsMounted } from "@/hooks/useIsMounted";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const mounted = useIsMounted();

	if (!mounted) {
		return <></>;
	}
	return (
		<Button
			variant="outline"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
			{theme === "dark" ? (
				<Sun className="h-6 w-6" />
			) : (
				<Moon className="h-6 w-6" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}

import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "@/providers/root-provider";

import Header from "@/ui/layout/header";

// const teko = Teko({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<html lang="en">
			<body>
				<RootProvider>
					<Header />
					{children}
				</RootProvider>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import CursorGlow from "@/components/CursorGlow";
import { Inter, Orbitron } from "next/font/google";
import ScrollSystem from "@/components/ScrollSystem";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-main",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DS Portfolio",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en" suppressHydrationWarning>
<body
  className={`
    ${inter.variable} 
    ${orbitron.variable} 
    font-sans 
    transition-colors duration-300
  `}
>        <Toaster position="top-right" />
<Providers>
  
          <ScrollSystem> 
          {children}
          <CursorGlow />
          </ScrollSystem>
        </Providers>
        
      </body>
    </html>
  );
}
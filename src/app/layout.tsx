import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import JotaiProvider from "@/components/JotaiProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import Modals from "@/components/Modals";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slack",
  description: "A faithfull Slack clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ConvexClientProvider>
            <JotaiProvider>
              <Toaster />
              <Modals />
              {children}
            </JotaiProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}

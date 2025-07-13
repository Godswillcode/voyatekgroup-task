import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/layout/Navbar";
import { SideBar } from "./components/layout/SideBar";
import { ReactQueryProvider } from "./providers/react-query-provider";
import { ConfigProvider } from "antd"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Development Task",
  description:
    "Recreate and enhance the given CRM-like UI, as shown in the provided.",
};

export const viewport = {
  themeColor: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />
        <div className="flex w-full relative">
          <div className={`w-[20rem] fixed z-40 overflow-hidden lg:flex hidden`}>
            <SideBar />
          </div>
          <div className="w-full lg:ml-[16.3rem] pb-10 Container">
            <div className="bg-white p-2 lg:p-4">
              <ConfigProvider>
                <ReactQueryProvider>{children}</ReactQueryProvider>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

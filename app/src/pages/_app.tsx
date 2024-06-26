import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import SocketProvider from "@/context/SocketProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);

import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { WagmiProvider } from "wagmi";
import { config } from "../../wagmi.config";
import AuthProvider from "./AuthProvider";
import FavoriteProvider from "./FavoriteProvider";
import LoginProvider from "./LoginProvider";
import TokenProvider from "./TokenProvider";

const queryClient = new QueryClient();

const customTheme = lightTheme({
  accentColor: "#31BB9B",
});

export default function GlobalProvider({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact" theme={customTheme}>
              <LoginProvider>
                <FavoriteProvider>
                  <TokenProvider>{children}</TokenProvider>
                </FavoriteProvider>
              </LoginProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </AuthProvider>
    </>
  );
}

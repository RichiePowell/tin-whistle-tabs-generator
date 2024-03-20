import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { theme } from "../theme/theme";
import { TabsCreatorProvider } from "../context/TabsCreatorContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <TabsCreatorProvider>
        <Component {...pageProps} />
      </TabsCreatorProvider>
    </ChakraProvider>
  );
}
export default MyApp;

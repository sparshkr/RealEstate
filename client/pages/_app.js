import "../styles/globals.css";
import { ThirdwebProvider, ChainId, metamaskWallet } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ethers } from "ethers";

import { StateContextProvider } from "../context";

console.log(Sepolia.chainId);

const metamaskConfig = metamaskWallet({});

// override metadata
metamaskConfig.meta.name = "..."; // change the name
metamaskConfig.meta.iconURL =
  "https://imgs.search.brave.com/Qx5c8JjPgmpGzMSPm3YFy1X-069v3cRiayp10r0g39Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzM2L01ldGFNYXNr/X0ZveC5zdmc.svg"; // change the icon

const App = ({ Component, pageProps }) => {
  // const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();

  return (
    <>
      <ThirdwebProvider
        activeChain={Sepolia}
        supportedWallets={[metamaskConfig]}
        clientId="0d7a273a86b230233dfc99e7cb2c676a"

        // signer={signer}
      >
        <StateContextProvider>
          <Component {...pageProps} />
        </StateContextProvider>
      </ThirdwebProvider>
    </>
  );
};

export default App;

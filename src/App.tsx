import React from "react";
import "./App.css";
import List from "./pages/List";
import Detail from "./pages/Detail";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/detail/:asset_contract_address/:token_id",
    element: <Detail />,
  },
]);

function App() {
  return (
    <div className="App">
      <WagmiConfig client={client}>
        <RouterProvider router={router} />
      </WagmiConfig>
    </div>
  );
}

export default App;

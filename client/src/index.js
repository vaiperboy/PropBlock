import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoralisProvider
      appId="PeP7tgk42Rg6dqfjxGrKYTSlpPexY2H0Z11Vlnhe"
      serverUrl="https://hedtlvl01nyx.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);

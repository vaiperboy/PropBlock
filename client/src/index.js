import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MoralisProvider
      appId="8lxU2AcoHdQpUL8TYqkBdx62W77QCqEMhj7XZb82"
      serverUrl="https://p1gktb2edlq5.grandmoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);

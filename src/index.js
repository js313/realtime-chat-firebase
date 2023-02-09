import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { ChatContextProvider } from "./context/chatContext";
import { DisplayContextProvider } from "./context/displayContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <DisplayContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </DisplayContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

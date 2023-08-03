import React from "react";
import {UserProvider} from "./Components/UserContext";
import { createRoot } from 'react-dom/client';
// import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
    <App />
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);



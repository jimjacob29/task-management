import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import MainContextProvider from "./context/mainContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MainContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MainContextProvider>
    </StrictMode>
);

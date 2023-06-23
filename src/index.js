import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "./App";
import AppComponentContext from "./context";
import reportWebVitals from "./reportWebVitals";
import "./sass/main.css";
import { StyledEngineProvider } from "@mui/material/styles";

// worker;

const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppComponentContext>
        <React.StrictMode>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </React.StrictMode>
      </AppComponentContext>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as BrowserRouter  } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store/store";

import App from "./App";

const root = ReactDOM.createRoot(document!.getElementById("root")!);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <BrowserRouter basename="/">
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

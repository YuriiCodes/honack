import React from "react";
import ReactDOM from "react-dom";

import App from "./app/app";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <SnackbarProvider />
      <App />
    </Layout>
  </BrowserRouter>,

  document.getElementById("root")
)
;

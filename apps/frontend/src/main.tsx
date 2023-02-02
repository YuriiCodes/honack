import React, {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import Layout from "./layout/Layout";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <App/>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);

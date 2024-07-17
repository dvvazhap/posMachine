import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import Provider from "./context/contextProvider.tsx";
import './index.scss';

const _root = document.getElementById('root');
// @ts-ignore
const root = createRoot(_root);
root.render(<React.StrictMode>
  <Provider>
    <App />
  </Provider>
</React.StrictMode>
);
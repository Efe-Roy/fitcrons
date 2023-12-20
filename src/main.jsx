import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-toastify/dist/ReactToastify.css";

import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/store";
// import store from './redux/store';

const { store, persistor } = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

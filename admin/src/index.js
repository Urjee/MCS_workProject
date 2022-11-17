import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import {store, persistor} from "./Admin/Redux/store"
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <CookiesProvider>
  <Provider store={store} > 
   <PersistGate loading={null} persistor={persistor}>

    <React.StrictMode>
      <App />
    </React.StrictMode>
    </PersistGate>
  </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

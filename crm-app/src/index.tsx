import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Auth} from "./store/Auth";
import {WebSocketClient} from "./websocket/WebSocketClient";


interface Store {
    auth: Auth,
    wsClient?: WebSocketClient
}

const auth = Auth.getInstance();

export const Context = createContext<Store>({
    auth
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={{auth}}>
        <App />
    </Context.Provider>
);

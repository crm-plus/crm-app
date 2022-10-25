import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from './store/Auth';
import { NotificationStore } from './store/NotificationStore';


interface Store {
  auth: Auth,
  notification: NotificationStore
}

const auth = Auth.getInstance();
const notification = NotificationStore.getInstance();

export const Context = createContext<Store>({
    auth,
    notification
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={{ auth, notification }}>
        <App />
    </Context.Provider>
);

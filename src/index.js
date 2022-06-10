/* eslint-disable import/no-cycle */
import {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import HotelStore from "./store/HotelStore";
import SearchStore from "./store/SearchStore";


// eslint-disable-next-line import/prefer-default-export
export const Context = createContext(null)

const container = document.getElementById('root');
const root = createRoot(container); 
// eslint-disable-next-line react/jsx-no-constructed-context-values
root.render(<Context.Provider value={{user: new UserStore(),hotels: new HotelStore(),searchStore: new SearchStore()}}>
  <App />
</Context.Provider>);
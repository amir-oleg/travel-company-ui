/* eslint-disable import/no-cycle */
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import SearchHotels from "./components/SearchHotels";

const App = observer(() => (
        <BrowserRouter>
            <NavBar />
            <SearchHotels />
            <AppRouter />
        </BrowserRouter>
    ));

export default App;
/* eslint-disable import/no-cycle */
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import { useContext } from "react";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import SearchHotels from "./components/SearchHotels";
import SearchHotelsAdmin from "./components/SearchHotelsAdmin";
import {Context} from "./index";

const App = observer(() => {
        const {user} = useContext(Context)

        return (<BrowserRouter>
            <NavBar />
            {user.roles.includes("Admin") ?
            <SearchHotelsAdmin/>:
            <SearchHotels />
            }
            <AppRouter />
        </BrowserRouter>)
    });

export default App;
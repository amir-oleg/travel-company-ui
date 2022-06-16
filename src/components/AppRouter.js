/* eslint-disable import/no-cycle */
import {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import PersonalCabinet from "../pages/PersonalCabinet";
import {LK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, HOTELS_ROUTE, LK_FREE_ORDERS_ROUTE} from "../utils/consts";
import Auth from "../pages/Auth";
import HotelsList from './HotelsList';
import HotelEav from '../pages/HotelEav';
import HotelEavAdmin from '../pages/HotelEavAdmin';

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            <Route path={LK_ROUTE} element={user.isAuth ? <PersonalCabinet/> : <Navigate to={HOME_ROUTE} />}/>
            <Route path={LK_FREE_ORDERS_ROUTE} element={user.isAuth ? <PersonalCabinet/> : <Navigate to={HOME_ROUTE} />}/>
            <Route path={LOGIN_ROUTE} element={<Auth/>} />
            <Route path={REGISTRATION_ROUTE} element={<Auth/>} />
            <Route path={HOTELS_ROUTE} element={<HotelsList/>} />
            {user.roles.includes("Admin") ? 
                <Route path="/hotels/:id" element={<HotelEavAdmin/>} /> :
                <Route path="/hotels/:id" element={<HotelEav/>} />
            }
        </Routes>
    );
});

export default AppRouter;
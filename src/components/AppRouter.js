/* eslint-disable import/no-cycle */
import {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Admin} from "../pages/Admin";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, HOTELS_ROUTE} from "../utils/consts";
import Auth from "../pages/Auth";
import HotelsList from './HotelsList';
import Hotel from '../pages/Hotel';

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            <Route path={ADMIN_ROUTE} element={user.isAuth ? <Admin/> : <Navigate to={HOME_ROUTE} />}/>
            <Route path={LOGIN_ROUTE} element={<Auth/>} />
            <Route path={REGISTRATION_ROUTE} element={<Auth/>} />
            <Route path={HOTELS_ROUTE} element={<HotelsList/>} />
                <Route path="/hotels/:id" element={<Hotel/>} />
            
        </Routes>
    );
});

export default AppRouter;
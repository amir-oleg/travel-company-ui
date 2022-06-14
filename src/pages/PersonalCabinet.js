/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
import {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import UserCabinet from "../components/UserCabinet"
import ManagerCabinet from "../components/ManagerCabinet"
import AdminCabinet from "../components/AdminCabinet"
import {LOGIN_ROUTE} from "../utils/consts";

const PersonalCabinet = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
    <div>
       {user.roles.includes("User") ? <UserCabinet/> : 
        user.roles.includes("Manager") ? <ManagerCabinet/> : 
        user.roles.includes("Admin") ? <AdminCabinet/> : navigate(LOGIN_ROUTE, {replace: true})}
    </div>);
});

export default PersonalCabinet
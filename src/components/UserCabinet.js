/* eslint-disable import/no-cycle */
import {useState, useEffect} from 'react';
import {Row, Col, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {getPersonalData} from "../API/PersonalCabinetService"
import {cancelBook} from "../API/OrdersService"
import {LK_ROUTE} from "../utils/consts";


const userCabinet = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState({})
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getPersonalData().then(data => setUser(data))
    }, [])

    const click = async (id) =>
    {
        await cancelBook(id)
        navigate(LK_ROUTE, {replace: true})
    }

    return (
    <div>
        <div>Имя: {user.firstName}</div>
        <div>Фамилия: {user.lastName}</div>
        <div>Отчество: {user.patronymic}</div>
        <div>Заказы:</div>
        {Array.isArray(user.orders) && user.orders.length ? user.orders.map(order => 
            <Row key={user.orders.id}>
                <Col>№ {order.id}</Col>
                <Col>Отель: {order.hotelName} Номер: {order.accomodationName}</Col>
                <Col>С: {order.startDate} По: {order.endDate}</Col>
                <Col>{order.price}р. <Button  onClick={() => click(order.id)} >Отменить</Button></Col>
                
            </Row>) : <p>Заказы отсутствуют</p>}
    </div>
    );
};

export default userCabinet
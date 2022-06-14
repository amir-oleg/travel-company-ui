/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-cycle */
import {useState, useEffect} from 'react';
import {Row, Col, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {getManagerData} from "../API/PersonalCabinetService"
import {cancelBook, getFreeOrders, takeOrderInJob, markOrderAsPaid} from "../API/OrdersService"
import {LK_ROUTE, LK_FREE_ORDERS_ROUTE} from "../utils/consts";


const managerCabinet = () => {
    const [user, setUser] = useState({})
    const [freeOrders, setFreeOrders] = useState([])
    const navigate = useNavigate()
    // eslint-disable-next-line no-restricted-globals
    const isFreeOrders = location.pathname === LK_FREE_ORDERS_ROUTE
    
    
    useEffect(() => {
        getFreeOrders().then(data => setFreeOrders(data))
    }, []) 
    
    useEffect(() => {
        getManagerData().then(data => setUser(data))
    }, []) 
    
    const clickCancel = async (id) =>
    {
        await cancelBook(id)
        navigate(LK_ROUTE, {replace: true})
    }

    const clickTakeInJob = async (id) =>
    {
        await takeOrderInJob(id)
        navigate(LK_ROUTE, {replace: true})
    }

    const clickMarkAsPaid = async (id) =>
    {
        await markOrderAsPaid(id)
        navigate(LK_ROUTE, {replace: true})
    }

    return (
    <div>
        <div>Имя: {user.firstName}</div>
        <div>Фамилия: {user.lastName}</div>
        <div>Отчество: {user.patronymic}</div>
        <div>Заказы:</div>
        {isFreeOrders ? 
        <div>
            <Button onClick ={() => navigate(LK_ROUTE)}>Показать свои заказы</Button>
        </div> : 
        <div>
            <Button onClick ={() => navigate(LK_FREE_ORDERS_ROUTE)}>Показать новые заказы</Button>
        </div>
        }
        {!isFreeOrders && Array.isArray(user.orders) && user.orders.length ? user.orders.map(order => 
            <Row key={order.id}>
                <Col>№ {order.id}</Col>
                <Col>Имя клиента: {order.clientName}<br/>Номер: {order.clientPhoneNumber}</Col>
                <Col>Отель: {order.hotelName} Номер: {order.accomodationName}</Col>
                <Col>С: {order.startDate} По: {order.endDate}</Col>
                <Col>{order.price}р. <Button  onClick={() => clickCancel(order.id)} >Отменить</Button></Col>
                {order.isPaid ? <Col>Заказ оплачен</Col> : <Col><Button  onClick={() => clickMarkAsPaid(order.id)} >Пометить оплаченным</Button></Col>}
            </Row>) : 
            isFreeOrders && Array.isArray(freeOrders.orders) && freeOrders.orders.length ? freeOrders.orders.map(order => 
            <Row key={order.id}>
                <Col>№ {order.id}</Col>
                <Col>Имя клиента: {order.clientName}<br/>Номер: {order.clientPhoneNumber}</Col>
                <Col>Отель: {order.hotelName} Номер: {order.accomodationName}</Col>
                <Col>С: {order.startDate} По: {order.endDate}</Col>
                <Col>{order.price}р. <Button  onClick={() => clickTakeInJob(order.id)} >Взять в работу</Button><Button  onClick={() => clickCancel(order.id)} >Отменить</Button></Col>
            </Row>) : <p>Заказы отсутствуют</p>
            }
    </div>
    );
};

export default managerCabinet
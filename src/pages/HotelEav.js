/* eslint-disable import/no-cycle */
import {useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Row, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useParams} from 'react-router-dom'; 
import {Context} from "../index";
import {getAccomodationsInHotelEav, getHotelByIdEav} from "../API/HotelService";
import AccomodationItemEav from "../components/AccomodationItemEav"

const HotelEav = observer( () => {
    const {searchStore} = useContext(Context)
    const {id} = useParams() 
    const [hotel, setHotel] = useState({})
    const [accomodations, setAccs] = useState([]);

    useEffect(() => {
        getHotelByIdEav(id).then(
            doc => setHotel(doc)
        );   
        getAccomodationsInHotelEav(id, searchStore.startDate, searchStore.endDate, searchStore.guests).then(
            doc => setAccs(doc)
        )
    }, [id, searchStore.endDate, searchStore.guests, searchStore.startDate]);

    return (
        <div className="border d-flex align-items-center justify-content-center customHeight">
            <div>
            <h1>{hotel.hotelName}</h1>
            <Image width={700} src={`${process.env.REACT_APP_API_URL}/api/images/${hotel.previewImage}`}/>
            <div>
                <Row>
                {Array.isArray(hotel.services) && hotel.services.length && hotel.services.map( service =>
                        <Col key={service.name}>{service.name} : {service.value} {service.measureOfUnit}</Col>
                )}
                </Row>
            </div>
            {accomodations.map(acc =>
                <AccomodationItemEav key={acc.name} acc={acc}/>
            )}
            </div>
        </div>
    );

});

export default HotelEav
/* eslint-disable import/no-cycle */
import {useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Image from "react-bootstrap/Image";
import {useParams} from 'react-router-dom'; 
import {Context} from "../index";
import {getAccomodationsInHotel, getHotelById} from "../API/HotelService";
import AccomodationItem from "../components/AccomodationItem"

const Hotel = observer( () => {
    const {searchStore} = useContext(Context)
    const {id} = useParams() 
    const [hotel, setHotel] = useState({})
    const [accomodations, setAccs] = useState([]);

    useEffect(() => {
        getHotelById(id).then(
            doc => setHotel(doc)
        );   
        getAccomodationsInHotel(id, searchStore.startDate, searchStore.endDate, searchStore.guests).then(
            doc => setAccs(doc)
        )
    }, [id, searchStore.endDate, searchStore.guests, searchStore.startDate]);

    return (
        <div className="border d-flex align-items-center justify-content-center customHeight">
            <div>
            <h1>{hotel.hotelName}</h1>
            <Image width={700} src={`${process.env.REACT_APP_API_URL}/api/images/${hotel.previewImage}`}/>
            {accomodations.map(acc =>
                <AccomodationItem key={acc.name} acc={acc}/>
            )}
            </div>
        </div>
    );

});

export default Hotel
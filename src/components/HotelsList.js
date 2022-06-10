/* eslint-disable import/no-cycle */
import {useContext} from 'react';
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import HotelItem from "./HotelItem";

const HotelsList = observer(() => {
    const {hotels} = useContext(Context)
    return (
        <Row md={1} className="border d-flex align-items-center justify-content-center">
            {hotels.hotels.map(hotel =>
                <HotelItem key={hotel.id} hotel={hotel}/>
            )}
        </Row>
    );
});

export default HotelsList;
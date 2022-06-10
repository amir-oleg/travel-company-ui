/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {generatePath, useNavigate} from "react-router-dom"
import star from '../assests/star.png'
import {HOTELS_ROUTE} from '../utils/consts'

function HotelItem({hotel}) {
    const path = generatePath(`${HOTELS_ROUTE}/:id`, {id: hotel.id});
    const navigate = useNavigate()
    return (
        <Col className="mt-3" style={{display:"flex", justifyContent: "center"}}>
            <Card style={{width: 270, cursor: 'pointer'}} border="light" onClick={() => navigate(path)}>
                <Image width={270} height={270} src={`${process.env.REACT_APP_API_URL}/api/images/${hotel.previewImage}`}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div>{hotel.countOfStars}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{hotel.name}</div>
                <div>От: {hotel.lowestPrice}р.</div>
            </Card>
        </Col>
    );
}

export default HotelItem;
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import {Button, Carousel} from "react-bootstrap";

function AccomodationItem({acc}) {

    return (
        <div className="mt-3" style={{display:"flex", flexDirection: "row", alignItems: "flex-start"}}>
            <div>
                <Carousel style={{width: 270, height:270, backgroundColor: "rgba(0, 0, 0, 0.5)"}}>{acc.images.map( a => 
                    <Carousel.Item style={{height:270}} key={a}>
                        <img
                        className="d-block w-100"
                        style={{height:230}}
                        src={`${process.env.REACT_APP_API_URL}/api/images/${a}`}
                        alt=""/>
                    </Carousel.Item>)}
                </Carousel>
            </div>
                <div>{acc.name}</div>
                <div>Цена на ваш период: {acc.price}р.</div>
                <Button /* onClick={click} */>Заказать</Button>
            
        </div>
    );
}

export default AccomodationItem;
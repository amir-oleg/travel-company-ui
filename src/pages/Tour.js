/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Row, Col, Carousel } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { useParams } from 'react-router-dom'
import { getTourById } from '../API/ToursService'
import arrow from '../assests/arrow.png'
import food from '../assests/food.png'

const Tour = observer(() => {
	console.log('TURUTRUTURTURT')
	const { id } = useParams()
	const [tour, setTour] = useState({})

	useEffect(() => {
		getTourById(id).then((doc) => setTour(doc))
		setTour({tourName:"Name tour tour",previewImageId:1, dietType:"pitanie", startCountry:"Russia", startCity:"Moscow", endCountry:"Turkey", endCity:"Ankara", price:100000, tourCategories:['1cat','2cat'], guests:2, childrenCount:0, days:7, services:[{name:'name1', value:'val', measureOfUnit:'pc'},{name:'name2', value:'val', measureOfUnit:'pc'},{name:'name3', value:'val', measureOfUnit:'pc'},{name:'name4', value:'val', measureOfUnit:'pc'}], accomodation:{images:[1,2]}})
	}, [id]) 

	console.log(tour)
	return (
		<div className="border d-flex align-items-center justify-content-center customHeight">
			<div>
				<h1>{'"'}{tour.tourName}{'"'}</h1>
				<Image
					width={700}
					src={`${process.env.REACT_APP_API_URL}/api/images/${tour.previewImageId}`}
				/>
				<Row>
				<Col><h3>{tour.startCountry}</h3><br/><h4>{tour.startCity}</h4></Col>
				<Col>
				<Image 
				width={128}
				src={arrow}/>
				</Col>
				<Col><h3>{tour.endCountry}</h3><br/><h4>{tour.endCity}</h4></Col>
				</Row>
				<Row>
					<Col><h3>Цена: {tour.price}р.</h3></Col>
					<Col><Button>Оставить заявку</Button></Col>
				</Row>
				<Row>
					<Col><Image 
				width={96}
				src={food}/></Col>
				<Col><h4>{tour.dietType}</h4></Col>
				</Row>
				
<Row>
	<Col>
	<h4>Категории:</h4> 
				{tour.tourCategories &&
					tour.tourCategories.map((cat) => (
						<l key={cat}>{cat} </l>
					))}
					</Col>
					</Row>
					<Row>
				<Col><h5>Взрослые: {tour.guests}</h5></Col>
				<Col><h5>Дети: {tour.childrenCount}</h5></Col>
				<Col><h5>Ночей: {tour.days}</h5></Col>
				</Row>
				<Row><h4>Детали:</h4></Row>
{tour.services && tour.services.map((x) => 
	<Row key={x.name}>
	<Col>
		{x.name} : {x.value}{' '}{x.measureOfUnit}
	</Col>
</Row>
)}
<Row>
	<Col>{'"'}{tour.accomodation.hotelName}{'"'}</Col>
	</Row>	
	<Row>
	<Image
					width={700}
					src={`${process.env.REACT_APP_API_URL}/api/images/${tour.accomodation.hotelPreviewImageId}`}
				/>
		</Row>
		<Row><h4>Категория отеля:{tour.accomodation.category}</h4></Row>
		{tour.accomodation.hotelServices && tour.accomodation.hotelServices.map((x) => 
	<Row key={x.name}>
	<Col>
		{x.name} : {x.value}{' '}{x.measureOfUnit}
	</Col>
</Row>
)}				
			<div className="mt-3" style={{display:"flex", flexDirection: "row", alignItems: "flex-start"}}>
            <div>
                <Carousel style={{width: 270, height:270, backgroundColor: "rgba(0, 0, 0, 0.5)"}}>{tour.accomodation.accomodationImages.map( a => 
                    <Carousel.Item style={{height:270}} key={a}>
                        <img
                        className="d-block w-100"
                        style={{height:230}}
                        src={`${process.env.REACT_APP_API_URL}/api/images/${a}`}
                        alt=""/>
                    </Carousel.Item>)}
                </Carousel>
                <div>
                    
                        {Array.isArray(tour.accomodation.accomodationServices) && tour.accomodation.accomodationServices.length && tour.accomodation.accomodationServices.map( service =>
                        <Row key={service.name}>
						<Col>{service.name} : {service.value} {service.measureOfUnit}</Col>
						</Row>
                        )}
                    
                </div>
            </div>
                <div>{tour.accomodation.accomodationName}</div>
        </div>
				
				
				
			</div>
		</div>
	)
})

export default Tour

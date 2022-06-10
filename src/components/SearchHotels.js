/* eslint-disable import/no-cycle */
import {useContext, useState} from 'react'
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {getBySearchParams} from "../API/HotelService";
import {Context} from "../index";
import {HOTELS_ROUTE} from "../utils/consts";

const SearchHotels = observer(() => {
    const [country, setCountry] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [guests, setGuests] = useState('')
    const {hotels} = useContext(Context)
    const {searchStore} = useContext(Context)
    const navigate = useNavigate()

    const click = async () => {
        try{
            const response = await getBySearchParams(country, startDate, endDate, guests)
            hotels.setHotels(response.hotels)
            searchStore.setStartDate(startDate)
            searchStore.setEndDate(endDate)
            searchStore.setGuests(guests)
            navigate(HOTELS_ROUTE, {replace: true})
        }catch(e){
            alert(e.response.data.message)
        }
    }
    return (
        <div style={{display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center", paddingTop: "1rem"}}>
            <input type='text'
            value = {country}
            onChange = {e => setCountry(e.target.value)}
            placeholder = 'Введите страну...'
            style={{ marginRight: ".5rem"}}/><p>Дата начала</p><input
            type="date"
            name="start"
            id="startdate"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={{ width: "150px", marginRight: ".5rem", marginleft: ".5rem"}}
            /><p>Дата окончания</p><input
            type="date"
            name="end"
            min={startDate}
            id="enddate"
            value={endDate}
            placeholder="Select Date"
            onChange={e => setEndDate(e.target.value)}
            style={{ width: "150px", marginRight: ".5rem", marginleft: ".5rem"}}
            /><input
            type="number"
            value={guests}
            placeholder= "2"
            min="1"
            onChange={e => setGuests(e.target.value)}
            style={{ width: "50px", marginRight: ".5rem" }}/><button type='button' onClick={click}>
                Поиск
            </button>
        </div>
    )
});


export default SearchHotels
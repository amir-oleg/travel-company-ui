/* eslint-disable import/no-cycle */
import {useContext, useState} from 'react'
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap"
import {Context} from "../index";
import {HOTELS_ROUTE} from "../utils/consts";
import {getHotelBySearchString} from "../API/HotelService";

const SearchHotelsAdmin = observer(() => {
    const [search, setSearch] = useState('')
    const {hotels} = useContext(Context)
    const navigate = useNavigate()

    const click = async () => {
        try{
            const response = await getHotelBySearchString(search, 1)
            hotels.setHotels(response.hotels)
            navigate(HOTELS_ROUTE, {replace: true})
        }catch(e){
            alert(e.response.data.message)
        }
    }
    return (
        <div style={{display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center", paddingTop: "1rem"}}>
            <input
            type='text'
            value={search}
            onChange= {e => setSearch(e.target.value)}
            placeholder = 'Введите запрос...'
            />
            <Button type='button' onClick={click}>
                Поиск
            </Button>
        </div>
    )
});


export default SearchHotelsAdmin
import {$host} from "./index";

    export const getBySearchParams = async (country, startDate, endDate, guests) => {
        const response = await $host.get('api/accomodations', {params: { country, startDate, endDate, guests}})
        
        return response.data
    }

    export const getAccomodationsInHotel = async (hotelId, startDate, endDate, guests) => {
        const response = await $host.get(`api/hotels/${hotelId}/accomodations`, {params: { startDate, endDate, guests}})
        return response.data
    }

    export const getHotelById = async (hotelId) => {
        const response = await $host.get(`api/hotels/${hotelId}/`)
        return response.data
    }

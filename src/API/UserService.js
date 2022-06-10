import jwtDecode from "jwt-decode";
import {$authHost, $host} from "./index";

export const registration = async (email, password) => {
    const response = await $host.post('api/authenticate/register', {email, password})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('api/authenticate/login', {email, password})
    localStorage.setItem('token', response.data.token)
    return jwtDecode(response.data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/authenticate/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
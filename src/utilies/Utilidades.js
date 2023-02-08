import axiosClient from "./axios-client";

export const URL = "https://rickandmortyapi.com/api/";
export const baseUrl = "http://127.0.0.1:8000/api/";
export const buscar = async (user, id) => {
    try {
        await axiosClient.get('/sanctum/csrf-cookie');
        const estado = await axiosClient.get(`api/favorito/${user}/${id}`);
        if (estado) {
            return true
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
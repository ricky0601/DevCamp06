import { httpClient } from "./http";

interface AddCartPrams{
    book_id : number;
    quantity: number;
}

export const addCart = async(params: AddCartPrams) => {
    const response = await httpClient.post('/carts', params);
    return response.data;
}
import { Blob } from "buffer";

interface IProduct {
    id?: number;
    image?: string;
    name: string;
    description?: string;
    price: number;
    quantity?: number;
}

export default IProduct;
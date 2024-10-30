interface IProduct {
    id?: number;
    image?: Buffer;
    name: string;
    description?: string;
    price: number;
    quantity?: number;
}

export default IProduct;
import { Blob } from "buffer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { nullable: true})
    image: string

    @Column('varchar', { length: 100, nullable: false})
    name: string

    @Column('varchar', { length: 300, nullable: true})
    description: string

    @Column('integer', { nullable: false})
    price: number

    @Column('integer', { nullable: false, default: 0})
    quantity: number

}

export default Product;
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('blob', { nullable: true})
    image: Buffer

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
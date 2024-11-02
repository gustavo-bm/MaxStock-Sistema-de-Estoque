import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 255, nullable: true })
    image: string;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 300, nullable: true })
    description: string;

    @Column('int', { nullable: false })
    price: number;

    @Column('int', { nullable: false, default: 0 })
    quantity: number;
}

export default Product;

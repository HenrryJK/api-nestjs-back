
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    // @PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    id_producto: number;
    @Column()
    nombre_producto: string;
    @Column()
    precio_venta: number;

    @DeleteDateColumn()
    deletedAt: Date;

}

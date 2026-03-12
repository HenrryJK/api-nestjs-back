
import { Marca } from "src/marca/entities/marca.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    // @PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    id_producto: number;
    @Column()
    nombre_producto: string;
    @Column()
    precio_venta: number;

    @Column({ name: 'id_marca', nullable: true })
    id_marca: number;

    @ManyToOne(() => Marca, (marca) => marca.productos)
    @JoinColumn({ name: 'id_marca' })
    marcaRel: Marca;

    @DeleteDateColumn()
    deletedAt: Date;

}


import { Color } from "src/colors/entities/color.entity";
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
    id_marca: number | null;

    @ManyToOne(() => Marca, (marca) => marca.productos)
    @JoinColumn({ name: 'id_marca' })
    marcaRel: Marca;

    @Column({ name: 'id_color', nullable: true })
    id_color: number | null;

    @ManyToOne(() => Color, (color) => color.productos)
    @JoinColumn({ name: 'id_color' })
    colorRel: Color;

    @DeleteDateColumn()
    deletedAt: Date;

}

import { Product } from "src/products/entities/product.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Color {
  @Column({ primary: true, generated: true })
  id_color: number;

  @Column()
  nombre_color: string;

  @OneToMany(() => Product, (product) => product.colorRel)
  productos: Product[];

  @DeleteDateColumn()
  deletedAt: Date;

}
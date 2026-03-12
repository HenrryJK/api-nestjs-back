import { Product } from "src/products/entities/product.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Marca {
    
  @Column({ primary: true, generated: true })
  id_marca: number;

  @Column()
  nombre_marca: string;
  
  @OneToMany(() => Product, (product) => product.marcaRel)
  productos: Product[];

  @DeleteDateColumn()
  deletedAt: Date;

}

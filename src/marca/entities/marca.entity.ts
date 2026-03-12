import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Marca {
  @Column({ primary: true, generated: true })
  id_marca: number;
  @Column()
  nombre_marca: string;
  @DeleteDateColumn()
  deletedAt: Date;

}

import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    nombre_producto: string;

    // @IsInt()
    // @Ispositive()
    @IsString()
    precio_venta: number;

    @IsInt()
    @IsOptional()
    id_marca?: number;

}

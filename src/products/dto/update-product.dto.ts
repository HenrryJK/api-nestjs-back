import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsString } from 'class-validator';
// extends PartialType(CreateProductDto)
export class UpdateProductDto  {
    @IsString()
    @IsOptional()
    nombre_producto: string;
    @IsString()
    @IsOptional()
    precio_venta: number;
}

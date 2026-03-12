import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Marca } from 'src/marca/entities/marca.entity';
import { Color } from 'src/colors/entities/color.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Nota de henry: Validar marca si se envía
    if (createProductDto.id_marca) {
      const marca = await this.marcaRepository.findOneBy({ id_marca: createProductDto.id_marca });
      if (!marca) {
        throw new NotFoundException(`La marca ${createProductDto.id_marca} no existe`);
      }
    }

    // Nota de henry: Validar color si se envía
    if (createProductDto.id_color) {
      const color = await this.colorRepository.findOneBy({ id_color: createProductDto.id_color });
      if (!color) {
        throw new NotFoundException(`El color ${createProductDto.id_color} no existe`);
      }
    }

    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['marcaRel', 'colorRel'], // Nota de henrry: Cargamos ambas relaciones
    });

    return products.map(product => ({
      id_producto: product.id_producto,
      nombre_producto: product.nombre_producto,
      precio_venta: product.precio_venta,
      id_marca: product.marcaRel?.id_marca ?? null,
      marca: product.marcaRel?.nombre_marca ?? null,
      id_color: product.colorRel?.id_color ?? null,
      nombre_color: product.colorRel?.nombre_color ?? null,
      deletedAt: product.deletedAt,
    }));
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id_producto: id },
      relations: ['marcaRel', 'colorRel'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return {
      id_producto: product.id_producto,
      nombre_producto: product.nombre_producto,
      precio_venta: product.precio_venta,
      id_marca: product.marcaRel?.id_marca ?? null,
      marca: product.marcaRel?.nombre_marca ?? null,
      id_color: product.colorRel?.id_color ?? null,
      nombre_color: product.colorRel?.nombre_color ?? null,
      deletedAt: product.deletedAt,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id_producto: id },
      relations: ['marcaRel', 'colorRel'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    // nota de henry:  marca si se actualiza
    if (updateProductDto.id_marca !== undefined) {
      if (updateProductDto.id_marca === null) {
        product.id_marca = null;
      } else {
        const marca = await this.marcaRepository.findOneBy({ id_marca: updateProductDto.id_marca });
        if (!marca) {
          throw new NotFoundException(`Marca con id ${updateProductDto.id_marca} no existe`);
        }
        product.id_marca = updateProductDto.id_marca;
      }
    }
    if (updateProductDto.id_color !== undefined) {
      if (updateProductDto.id_color === null) {
        product.id_color = null;
      } else {
        const color = await this.colorRepository.findOneBy({ id_color: updateProductDto.id_color });
        if (!color) {
          throw new NotFoundException(`Color con id ${updateProductDto.id_color} no existe`);
        }
        product.id_color = updateProductDto.id_color;
      }
    }

    if (updateProductDto.nombre_producto !== undefined) {
      product.nombre_producto = updateProductDto.nombre_producto;
    }
    if (updateProductDto.precio_venta !== undefined) {
      product.precio_venta = updateProductDto.precio_venta;
    }

    await this.productRepository.save(product);

    return this.findOne(id);
  }

  async remove(id: number) {
    // Nota d henrry: Usamos delete para eliminar el producto fisicamente y bueno ya no logica.
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return { message: 'Producto eliminado exitosamente' };
  }
}

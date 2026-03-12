import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Marca } from 'src/marca/entities/marca.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>, // Para validar existencia
  ) {}

  async create(createProductDto: CreateProductDto) {
    // const product =this.productRepository.create(createProductDto);
    // return await this.productRepository.save(product);
    if (createProductDto.id_marca) {
      const marca = await this.marcaRepository.findOneBy({ id_marca: createProductDto.id_marca });
      if (!marca) {
        throw new NotFoundException(`La marca para este producto ${createProductDto.id_marca} no existe`);
      }
    }

    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    // return this.productRepository.find();
        // Cargamos la relación con la marca
    const products = await this.productRepository.find({
      relations: ['marcaRel'],
    });

    // Mapeamos para obtener el formato deseado: { id_producto, nombre_producto, precio_venta, id_marca, marca, deletedAt }
    return products.map(product => ({
      id_producto: product.id_producto,
      nombre_producto: product.nombre_producto,
      precio_venta: product.precio_venta,
      id_marca: product.marcaRel?.id_marca ?? null,
      marca: product.marcaRel?.nombre_marca ?? null,
      deletedAt: product.deletedAt,
    }));
  }

  async findOne(id: number) {
    // return await this.productRepository.findOneBy({ id_producto: id });
    const product = await this.productRepository.findOne({
        where: { id_producto: id },
        relations: ['marcaRel'],
      });
      if (!product) {
        throw new NotFoundException(`Producto con este id ${id} no encontrado`);
      }

      return {
        id_producto: product.id_producto,
        nombre_producto: product.nombre_producto,
        precio_venta: product.precio_venta,
        id_marca: product.marcaRel?.id_marca ?? null,
        marca: product.marcaRel?.nombre_marca ?? null,
        deletedAt: product.deletedAt,
      };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
      // Buscar el producto existente
      const product = await this.productRepository.findOne({
        where: { id_producto: id },
        relations: ['marcaRel'],
      });
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      // Si se actualiza id_marca, verificar que la nueva marca exista
      if (updateProductDto.id_marca !== undefined) {
        const marca = await this.marcaRepository.findOneBy({ id_marca: updateProductDto.id_marca });
        if (!marca) {
          throw new NotFoundException(`Marca with id ${updateProductDto.id_marca} not found`);
        }
      }

      // Actualizar propiedades
      Object.assign(product, updateProductDto);
      await this.productRepository.save(product);

      // Retornar el producto actualizado en el mismo formato
      return this.findOne(id);
  }

  async remove(id: number) {
        const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return { message: 'Product deleted successfully' };
    // return await this.productRepository.softDelete({ id_producto: id }); // se le pasa el id entiendo
    // return await this.productRepository.softRemove({ id_producto: id }); // se le pasa la instancia del registro
  }
}

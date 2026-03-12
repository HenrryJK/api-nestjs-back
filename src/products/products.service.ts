import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // const product =this.productRepository.create(createProductDto);
    // return await this.productRepository.save(product);
    return await this.productRepository.save(createProductDto);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({ id_producto: id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update({ id_producto: id }, updateProductDto);
  }

  async remove(id: number) {
    return await this.productRepository.delete({ id_producto: id });
    // return await this.productRepository.softDelete({ id_producto: id }); // se le pasa el id entiendo
    // return await this.productRepository.softRemove({ id_producto: id }); // se le pasa la instancia del registro
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  async create(createMarcaDto: CreateMarcaDto) {
    const marca = this.marcaRepository.create(createMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  async findAll() {
    return await this.marcaRepository.find();
  }

  async findOne(id: number) {
    const marca = await this.marcaRepository.findOneBy({ id_marca: id });
    if (!marca) {
      throw new NotFoundException(`La marca id ${id} no encontrado`);
    }
    return marca;
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    const marca = await this.findOne(id);
    Object.assign(marca, updateMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  async remove(id: number) {
    const result = await this.marcaRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`La marca id ${id} no encontrado`);
    }
    return { message: 'Marca eliminada exitosamente' };
  }
}

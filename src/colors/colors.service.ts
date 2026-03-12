import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}
  async create(createColorDto: CreateColorDto) {
    const color = this.colorRepository.create(createColorDto);
    return await this.colorRepository.save(color);
  }

  async findAll() {
    return await this.colorRepository.find();
  }

  async findOne(id: number) {
    const color = await this.colorRepository.findOneBy({ id_color: id });
    if (!color) {
      throw new NotFoundException(`Color con id ${id} no encontrado`);
    }
    return color;
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    const color = await this.findOne(id);
    Object.assign(color, updateColorDto);
    return await this.colorRepository.save(color);
  }

  async remove(id: number) {
    const result = await this.colorRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Color con id ${id} no encontrado`);
    }
    return { message: 'Color eliminado exitosamente' };
  }
}

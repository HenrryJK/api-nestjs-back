import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // nota de henrry: Aqui se inyecta el repositorio de la entidad user para poder usarlo en los metodos 
  // acciones del servicios que se hará a la base de datos.
  // crear
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }
  // listar todos los usuarios
  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }});
  }
  
  // accion para buscar por email y traer la contraseñaaaas
  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id_user', 'name', 'email', 'password', 'role'],
    });
  }
  // listar todos los usuarios
  findAll() {
    return this.userRepository.find();
  }
  // listar un usuario por id
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  // actualizar un usuario por id
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  // eliminar un usuario por id
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

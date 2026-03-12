import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({ 
  /// nota henrry: Aqui importo para que la entidad usuer se pueda ver creado en la base de datos
  imports: [ TypeOrmModule.forFeature([User]) ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  
})
export class UsersModule {}

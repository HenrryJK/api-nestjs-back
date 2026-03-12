import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';

@Module({
  controllers: [MarcaController],
  providers: [MarcaService],
  imports: [TypeOrmModule.forFeature([Marca])],
  // nota d henrry:Esto es correcto  exportar el modulo para
  // que pueda ser utilizado en otros modulos como el de productos aclaro esto.
  exports: [TypeOrmModule],
})
export class MarcaModule {}

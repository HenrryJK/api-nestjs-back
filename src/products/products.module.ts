import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Marca } from 'src/marca/entities/marca.entity';
import { MarcaModule } from 'src/marca/marca.module';
import { MarcaService } from 'src/marca/marca.service';

@Module({
  // imports: [TypeOrmModule.forFeature([Product,Marca])],
  imports: [TypeOrmModule.forFeature([Product]), MarcaModule],
  controllers: [ProductsController],
  providers: [ProductsService, MarcaService],
})
export class ProductsModule {}

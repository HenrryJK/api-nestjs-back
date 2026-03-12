import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Marca } from 'src/marca/entities/marca.entity';
import { MarcaModule } from 'src/marca/marca.module';
import { MarcaService } from 'src/marca/marca.service';
import { ColorsService } from 'src/colors/colors.service';
import { ColorsModule } from 'src/colors/colors.module';

@Module({
  // imports: [TypeOrmModule.forFeature([Product,Marca])],
  imports: [TypeOrmModule.forFeature([Product]), MarcaModule, ColorsModule],
  controllers: [ProductsController],
  providers: [ProductsService, MarcaService, ColorsService],
})
export class ProductsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from '~/category/category.controller';
import { Category, categorySchema } from '~/category/category.model';
import { CategoryService } from '~/category/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: categorySchema }])],
  exports: [CategoryService],
})
export class CategoryModule {}

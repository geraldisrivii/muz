import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '~/role/role.model';
import { CategoryService } from '~/category/category.service';
import { Category, CreateCategory } from '~/category/category.model';

@ApiTags('Category')
@Controller('/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Category] })
  getAll() {
    return this.categoryService.getAll();
  }

  @Post()
  @ApiResponse({ status: 200, type: [Category] })
  create(@Body() data: CreateCategory) {
    return this.categoryService.create(data);
  }
}

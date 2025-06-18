import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoodService } from '~/good/good.service';
import { CreateGood, Good } from '~/good/good.model';

@ApiTags('Good')
@Controller('/goods')
export class GoodController {
  constructor(private goodService: GoodService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Good] })
  getAll() {
    return this.goodService.getAll();
  }

  @Post()
  @ApiResponse({ status: 200, type: [Good] })
  create(@Body() data: CreateGood) {
    return this.goodService.create(data);
  }
}

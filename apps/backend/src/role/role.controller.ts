import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '~/role/role.model';
import { RolesService } from '~/role/role.service';

@ApiTags('Roles')
@Controller('/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Role] })
  getAll(){
    return this.rolesService.getAll();
  }
}

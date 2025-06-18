import { Module } from '@nestjs/common';
import { RolesController } from './role.controller';
import { RolesService } from './role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, roleSchema } from '~/role/role.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: roleSchema }])],
  exports: [RolesService],
})
export class RolesModule {}

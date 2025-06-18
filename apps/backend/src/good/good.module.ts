import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodController } from '~/good/good.controller';
import { Good, goodSchema } from '~/good/good.model';
import { GoodService } from '~/good/good.service';

@Module({
  controllers: [GoodController],
  providers: [GoodService],
  imports: [MongooseModule.forFeature([{ name: Good.name, schema: goodSchema }])],
  exports: [GoodService],
})
export class GoodModule {}

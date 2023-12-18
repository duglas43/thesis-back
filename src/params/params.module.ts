import { Module } from '@nestjs/common';
import { ParamsService } from './params.service';
import { ParamsController } from './params.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParamEntity } from './entities/param.entity';

@Module({
  imports: [SequelizeModule.forFeature([ParamEntity])],
  controllers: [ParamsController],
  providers: [ParamsService],
})
export class ParamsModule {}

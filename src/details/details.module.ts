import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DetailEntity } from './entities/detail.entity';
import { ParamEntity } from 'src/params/entities/param.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    SequelizeModule.forFeature([DetailEntity, ParamEntity]),
    CaslModule,
  ],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}

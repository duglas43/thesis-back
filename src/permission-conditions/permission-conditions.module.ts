import { Module } from '@nestjs/common';
import { PermissionConditionsService } from './permission-conditions.service';
import { PermissionConditionsController } from './permission-conditions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionConditionModel } from './model';

@Module({
  imports: [SequelizeModule.forFeature([PermissionConditionModel])],
  controllers: [PermissionConditionsController],
  providers: [PermissionConditionsService],
  exports: [PermissionConditionsService],
})
export class PermissionConditionsModule {}

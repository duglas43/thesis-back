import { Module } from '@nestjs/common';
import { PermissionFieldsService } from './permission-fields.service';
import { PermissionFieldsController } from './permission-fields.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionFieldModel } from './model/permission-field.model';

@Module({
  imports: [SequelizeModule.forFeature([PermissionFieldModel])],
  controllers: [PermissionFieldsController],
  providers: [PermissionFieldsService],
  exports: [PermissionFieldsService],
})
export class PermissionFieldsModule {}

import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [SequelizeModule.forFeature([AddressEntity])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}

import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MachineEntity } from './entities/machine.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [SequelizeModule.forFeature([MachineEntity]), CaslModule],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule {}

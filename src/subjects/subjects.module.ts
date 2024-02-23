import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectModel } from './model';

@Module({
  imports: [SequelizeModule.forFeature([SubjectModel])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}

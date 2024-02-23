import { Injectable, NotFoundException } from '@nestjs/common';
import { SubjectDto } from './dto';
import { SubjectModel } from './model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(SubjectModel)
    private subjectModel: typeof SubjectModel,
  ) {}

  async findAll() {
    const subjects = await this.subjectModel.findAll();
    return subjects.map((subject) => new SubjectDto(subject));
  }

  async findOne(id: number) {
    const subject = await this.subjectModel.findByPk(id);
    if (!subject) {
      throw new NotFoundException('Subject  not found');
    }
    return new SubjectDto(subject);
  }
}

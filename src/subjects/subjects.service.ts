import { Injectable, NotFoundException } from "@nestjs/common";
import { SubjectDto } from "./dto";
import { SubjectModel } from "./model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(SubjectModel)
    private subjectModel: typeof SubjectModel
  ) {}

  async findAll() {
    const subjects = await this.subjectModel.findAll();
    return subjects.map((subject) => new SubjectDto(subject));
  }

  async findOne(id: number) {
    const subject = await this.subjectModel.findByPkOrThrow(id);
    return new SubjectDto(subject);
  }
}

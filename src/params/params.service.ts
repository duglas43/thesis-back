import { Injectable } from "@nestjs/common";
import { CreateParamDto, UpdateParamDto, ParamDto, FindParamDto } from "./dto";
import { ParamModel } from "./model/param.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

@Injectable()
export class ParamsService {
  constructor(
    @InjectModel(ParamModel)
    private paramEntity: typeof ParamModel
  ) {}

  async create(dto: CreateParamDto) {
    const param = await this.paramEntity.create({ ...dto });
    return new ParamDto(param);
  }

  async findAll(dto: FindParamDto) {
    const params = await this.paramEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { unit: { [Op.like]: `%${dto.query}%` } },
          { type: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return params.map((param) => new ParamDto(param));
  }

  async findOne(id: number) {
    const param = await this.paramEntity.findByPk(id);
    return new ParamDto(param);
  }

  async update(id: number, dto: UpdateParamDto) {
    const param = await this.paramEntity.findByPk(id);
    await this.paramEntity.update(dto, { where: { id } });
    return new ParamDto(param);
  }

  async remove(id: number) {
    const param = await this.paramEntity.findByPk(id);
    await param.destroy();
    return new ParamDto(param);
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CreateDetailDto,
  UpdateDetailDto,
  DetailDto,
  FindDetailDto,
} from "./dto";
import { DetailModel } from "./model/detail.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { ParamModel } from "src/params/model/param.model";

@Injectable()
export class DetailsService {
  constructor(
    @InjectModel(DetailModel)
    private detailEntity: typeof DetailModel,
    @InjectModel(ParamModel)
    private paramEntity: typeof ParamModel
  ) {}

  async create(dto: CreateDetailDto) {
    const detail = await this.detailEntity.create({ ...dto });
    return new DetailDto(detail);
  }

  async findAll(dto: FindDetailDto) {
    const details = await this.detailEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { partNumber: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return details.map((detail) => new DetailDto(detail));
  }

  async findOne(id: number) {
    const detail = await this.detailEntity.findByPkOrThrow(id);
    return new DetailDto(detail);
  }

  async update(id: number, dto: UpdateDetailDto) {
    const detail = await this.detailEntity.findByPkOrThrow(id);
    await this.detailEntity.update(dto, { where: { id } });
    return new DetailDto(detail);
  }

  async remove(id: number) {
    const detail = await this.detailEntity.findByPkOrThrow(id);
    await detail.destroy();
    return new DetailDto(detail);
  }

  async addParam(
    id: number,
    { paramId, value }: { paramId: number; value: string }
  ) {
    const detail = await this.detailEntity.findByPkOrThrow(id);
    const param = await this.paramEntity.findByPkOrThrow(paramId);
    await detail.$add("params", paramId, { through: { value } });
    return new DetailDto(detail);
  }

  async removeParam(id: number, paramId: number) {
    const detail = await this.detailEntity.findByPkOrThrow(id);
    await this.paramEntity.findByPkOrThrow(paramId);
    await detail.$remove("params", paramId);
    return new DetailDto(detail);
  }
}

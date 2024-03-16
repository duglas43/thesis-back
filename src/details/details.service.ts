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
import { ListResponseDto } from "../common/dto";
import { ORDER } from "../common/enum";

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
    const { rows, count } = await this.detailEntity.findAndCountAll({
      where: {
        [Op.and]: [
          dto.query && {
            [Op.or]: [
              { name: { [Op.like]: `%${dto.query}%` } },
              { partNumber: { [Op.like]: `%${dto.query}%` } },
            ],
          },
        ].filter(Boolean),
      },
      ...(dto.order && { order: [["id", dto.order]] }),
      ...(dto.sort && { order: [[dto.sort]] }),
      ...(dto.sort && dto.order && { order: [[dto.sort, dto.order]] }),
      ...(dto.limit && { limit: dto.limit }),
      ...(dto.page && { offset: dto.limit * dto.page }),
    });
    const response = new ListResponseDto<DetailDto>(
      rows.map((detail) => new DetailDto(detail)),
      {
        totalCount: count,
        pageCount: Math.ceil(count / dto.limit) || 1,
        resultCount: rows.length,
        page: dto.page || 1,
        limit: dto.limit || count,
        order: dto.order || ORDER.ASC,
        sort: dto.sort || "id",
      }
    );
    return response;
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

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
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS, SUBJECTS } from "src/casl/enum";
import { pick } from "lodash";
import { permittedFieldsOf } from "@casl/ability/extra";
import { ForbiddenError } from "@casl/ability";

@Injectable()
export class DetailsService {
  constructor(
    @InjectModel(DetailModel)
    private detailModel: typeof DetailModel,
    @InjectModel(ParamModel)
    private paramEntity: typeof ParamModel
  ) {}

  async create(dto: CreateDetailDto) {
    const detail = await this.detailModel.create({ ...dto });
    return new DetailDto(detail);
  }

  async findAll(dto: FindDetailDto, ability: AppAbility) {
    const rows = await this.detailModel.findAll({
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
    const notPaginatedRows = await this.detailModel.findAll({
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
    });
    const count = notPaginatedRows.filter((detail) =>
      ability.can(ACTIONS.READ, detail)
    ).length;

    const authorizedDetails = rows.filter((detail) =>
      ability.can(ACTIONS.READ, detail)
    );
    const processedDetails = authorizedDetails.map((detail) => {
      const allowedFields = permittedFieldsOf(ability, ACTIONS.READ, detail, {
        fieldsFrom: (rule) =>
          rule.fields || Object.keys(this.detailModel.getAttributes()),
      });
      return pick(detail, allowedFields);
    });
    const response = new ListResponseDto<DetailDto>(
      processedDetails.map((detail) => new DetailDto(detail)),
      {
        totalCount: count,
        pageCount: Math.ceil(count / dto.limit) || 1,
        resultCount: authorizedDetails.length,
        page: dto.page || 1,
        limit: dto.limit || count,
        order: dto.order || ORDER.ASC,
        sort: dto.sort || "id",
      }
    );
    return response;
  }

  async findOne(id: number, ability: AppAbility) {
    const detail = await this.detailModel.findByPkOrThrow(id);
    ForbiddenError.from(ability).throwUnlessCan(ACTIONS.READ, detail);
    return new DetailDto(detail);
  }

  async update(id: number, dto: UpdateDetailDto, ability: AppAbility) {
    const detail = await this.detailModel.findByPkOrThrow(id);
    ForbiddenError.from(ability).throwUnlessCan(ACTIONS.UPDATE, detail);
    ForbiddenError.from(ability).throwUnlessCan(ACTIONS.UPDATE, detail);
    Object.keys(dto).forEach((key) => {
      if (detail[key] === dto[key]) return;
      ForbiddenError.from(ability).throwUnlessCan(ACTIONS.UPDATE, detail, key);
    });
    await this.detailModel.update(dto, { where: { id } });
    return new DetailDto(detail);
  }

  async remove(id: number) {
    const detail = await this.detailModel.findByPkOrThrow(id);
    await detail.destroy();
    return new DetailDto(detail);
  }

  async addParam(
    id: number,
    { paramId, value }: { paramId: number; value: string }
  ) {
    const detail = await this.detailModel.findByPkOrThrow(id);
    const param = await this.paramEntity.findByPkOrThrow(paramId);
    await detail.$add("params", paramId, { through: { value } });
    return new DetailDto(detail);
  }

  async removeParam(id: number, paramId: number) {
    const detail = await this.detailModel.findByPkOrThrow(id);
    await this.paramEntity.findByPkOrThrow(paramId);
    await detail.$remove("params", paramId);
    return new DetailDto(detail);
  }
}

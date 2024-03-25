import { ForbiddenException, Injectable } from "@nestjs/common";
import {
  CreateMachineDto,
  UpdateMachineDto,
  FindMachineDto,
  MachineDto,
} from "./dto";
import { ForbiddenError } from "@casl/ability";
import { InjectModel } from "@nestjs/sequelize";
import { MachineModel } from "./model/machine.model";
import { Op } from "sequelize";
import { ListResponseDto } from "src/common/dto";
import { ORDER } from "src/common/enum";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS, SUBJECTS } from "src/casl/enum";
import { pick } from "lodash";
import { permittedFieldsOf } from "@casl/ability/extra";

ForbiddenError.setDefaultMessage(
  (rule) =>
    `You are not allowed to ${rule.action} this ${rule.subject} ${rule?.field}`
);
@Injectable()
export class MachinesService {
  constructor(
    @InjectModel(MachineModel)
    private machineModel: typeof MachineModel
  ) {}

  async create(dto: CreateMachineDto) {
    const machine = await this.machineModel.create({ ...dto });
    return new MachineDto(machine);
  }

  async findAll(dto: FindMachineDto, ability: AppAbility) {
    const rows = await this.machineModel.findAll({
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
    const notPaginatedRows = await this.machineModel.findAll({
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
    const count = notPaginatedRows.filter((machine) =>
      ability.can(ACTIONS.READ, machine)
    ).length;
    const authorizedMachines = rows.filter((machine) =>
      ability.can(ACTIONS.READ, machine)
    );
    const processedMachine = authorizedMachines.map((machine) => {
      const allowedFields = permittedFieldsOf(ability, ACTIONS.READ, machine, {
        fieldsFrom: (rule) =>
          rule.fields || Object.keys(this.machineModel.getAttributes()),
      });
      return pick(machine, allowedFields);
    });

    const response = new ListResponseDto<MachineDto>(
      processedMachine.map((machine) => new MachineDto(machine)),
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

  async findOne(id: number, ability: AppAbility) {
    const machine = await this.machineModel.findByPkOrThrow(id);
    ForbiddenError.from(ability).throwUnlessCan(ACTIONS.READ, machine);
    return new MachineDto(machine);
  }

  async update(id: number, dto: UpdateMachineDto, ability: AppAbility) {
    const machine = await this.machineModel.findByPkOrThrow(id);
    ForbiddenError.from(ability).throwUnlessCan(ACTIONS.UPDATE, machine);
    Object.keys(dto).forEach((key) => {
      if (machine[key] === dto[key]) return;
      ForbiddenError.from(ability).throwUnlessCan(ACTIONS.UPDATE, machine, key);
    });
    await machine.update(dto);
    return new MachineDto(machine);
  }

  async remove(id: number, ability: AppAbility) {
    const machine = await this.machineModel.findByPkOrThrow(id);
    ForbiddenError.from(ability).throwUnlessCan(ACTIONS.DELETE, machine);
    await machine.destroy();
    return new MachineDto(machine);
  }
}

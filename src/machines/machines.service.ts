import { Injectable } from "@nestjs/common";
import {
  CreateMachineDto,
  UpdateMachineDto,
  FindMachineDto,
  MachineDto,
} from "./dto";
import { InjectModel } from "@nestjs/sequelize";
import { MachineModel } from "./model/machine.model";
import { Op } from "sequelize";
import { ListResponseDto } from "src/common/dto";
import { ORDER } from "src/common/enum";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS } from "src/casl/enum";

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
    const { rows, count } = await this.machineModel.findAndCountAll({
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
    const authorizedMachines = rows.filter((machine) =>
      ability.can(ACTIONS.READ, machine)
    );

    const response = new ListResponseDto<MachineDto>(
      authorizedMachines.map((machine) => new MachineDto(machine)),
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
    const machine = await this.machineModel.findByPkOrThrow(id);
    return new MachineDto(machine);
  }

  async update(id: number, dto: UpdateMachineDto) {
    const machine = await this.machineModel.findByPkOrThrow(id);
    await this.machineModel.update(dto, { where: { id } });
    return new MachineDto(machine);
  }

  async remove(id: number) {
    const machine = await this.machineModel.findByPkOrThrow(id);
    await machine.destroy();
    return new MachineDto(machine);
  }
}

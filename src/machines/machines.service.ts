import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CreateMachineDto,
  UpdateMachineDto,
  FindMachineDto,
  MachineDto,
} from "./dto";
import { InjectModel } from "@nestjs/sequelize";
import { MachineModel } from "./model/machine.model";
import { Op } from "sequelize";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS } from "src/casl/enum";

@Injectable()
export class MachinesService {
  constructor(
    @InjectModel(MachineModel)
    private machineEntity: typeof MachineModel
  ) {}

  async create(dto: CreateMachineDto) {
    const machine = await this.machineEntity.create({ ...dto });
    return new MachineDto(machine);
  }

  async findAll(dto: FindMachineDto, ability: AppAbility) {
    const machines = await this.machineEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { partNumber: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return machines.reduce((acc, machine) => {
      if (ability.can(ACTIONS.READ, machine)) {
        acc.push(new MachineDto(machine));
      }
      return acc;
    }, []);
  }

  async findOne(id: number, ability: AppAbility) {
    const machine = await this.machineEntity.findByPk(id);
    if (!machine) {
      throw new NotFoundException("Machine not found");
    }
    if (!ability.can(ACTIONS.READ, machine)) {
      throw new NotFoundException("Machine not found");
    }
    return new MachineDto(machine);
  }

  async update(id: number, dto: UpdateMachineDto, ability: AppAbility) {
    const machine = await this.machineEntity.findByPk(id);
    if (!machine) {
      throw new NotFoundException("Machine not found");
    }
    if (!ability.can(ACTIONS.UPDATE, machine)) {
      throw new NotFoundException("Machine not found");
    }
    Object.keys(dto).forEach((key) => {
      if (!ability.can(ACTIONS.UPDATE, machine, key)) {
        delete dto[key];
      }
    });
    await this.machineEntity.update(dto, { where: { id } });
    return new MachineDto(machine);
  }

  async remove(id: number, ability: AppAbility) {
    const machine = await this.machineEntity.findByPk(id);
    if (!machine) {
      throw new NotFoundException("Machine not found");
    }
    if (!ability.can(ACTIONS.DELETE, machine)) {
      throw new NotFoundException("Machine not found");
    }
    await machine.destroy();
    return new MachineDto(machine);
  }
}

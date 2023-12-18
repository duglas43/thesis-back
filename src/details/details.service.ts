import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateDetailDto,
  UpdateDetailDto,
  DetailDto,
  FindDetailDto,
} from './dto';
import { DetailEntity } from './entities/detail.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ParamEntity } from 'src/params/entities/param.entity';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { ACTIONS } from 'src/casl/enums';
import { DetailParamEntity } from './entities';

@Injectable()
export class DetailsService {
  constructor(
    @InjectModel(DetailEntity)
    private detailEntity: typeof DetailEntity,
    @InjectModel(ParamEntity)
    private paramEntity: typeof ParamEntity,
  ) {}

  async create(dto: CreateDetailDto) {
    const detail = await this.detailEntity.create({ ...dto });
    return new DetailDto(detail);
  }

  async findAll(dto: FindDetailDto, ability: AppAbility) {
    const details = await this.detailEntity.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { partNumber: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return details.reduce((acc, detail) => {
      if (ability.can(ACTIONS.READ, detail)) {
        acc.push(new DetailDto(detail));
      }
      return acc;
    }, []);
  }

  async findOne(id: number, ability: AppAbility) {
    const detail = await this.detailEntity.findByPk(id);
    if (!detail) {
      throw new NotFoundException('Detail not found');
    }
    if (!ability.can(ACTIONS.READ, detail)) {
      throw new NotFoundException('Detail not found');
    }
    return new DetailDto(detail);
  }

  async update(id: number, dto: UpdateDetailDto, ability: AppAbility) {
    const detail = await this.detailEntity.findByPk(id);
    if (!detail) {
      throw new NotFoundException('Detail not found');
    }
    if (!ability.can(ACTIONS.UPDATE, detail)) {
      throw new NotFoundException('Detail not found');
    }
    Object.keys(dto).forEach((key) => {
      if (!ability.can(ACTIONS.UPDATE, detail, key)) {
        delete dto[key];
      }
    });
    await this.detailEntity.update(dto, { where: { id } });
    return new DetailDto(detail);
  }

  async remove(id: number, ability: AppAbility) {
    const detail = await this.detailEntity.findByPk(id);
    if (!detail) {
      throw new NotFoundException('Detail not found');
    }
    if (!ability.can(ACTIONS.DELETE, detail)) {
      throw new NotFoundException('Detail not found');
    }
    await detail.destroy();
    return new DetailDto(detail);
  }

  async addParam(
    id: number,
    { paramId, value }: { paramId: number; value: string },
    ability: AppAbility,
  ) {
    const detail = await this.detailEntity.findByPk(id);
    const param = await DetailParamEntity.findByPk(paramId);
    if (!detail || !param) {
      throw new NotFoundException('Detail or param not found');
    }
    if (!ability.can(ACTIONS.CREATE, DetailParamEntity)) {
      throw new NotFoundException('Detail or param not found');
    }
    await detail.$add('params', paramId, { through: { value } });
    return new DetailDto(detail);
  }

  async removeParam(id: number, paramId: number, ability: AppAbility) {
    const detail = await this.detailEntity.findByPk(id);
    const param = await DetailParamEntity.findByPk(paramId);
    if (!detail || !param) {
      throw new NotFoundException('Detail or param not found');
    }
    if (!ability.can(ACTIONS.DELETE, DetailParamEntity)) {
      throw new NotFoundException('Detail or param not found');
    }
    await detail.$remove('params', paramId);
    return new DetailDto(detail);
  }
}

import { Injectable } from '@nestjs/common';
import {
  CreateAddressDto,
  UpdateAddressDto,
  AddressDto,
  FindAddressDto,
} from './dto';
import { AddressEntity } from './entities/address.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(AddressEntity)
    private addressEntity: typeof AddressEntity,
  ) {}

  async create(dto: CreateAddressDto) {
    const address = await this.addressEntity.create({ ...dto });
    return new AddressDto(address);
  }

  async findAll(dto: FindAddressDto) {
    const address = await this.addressEntity.findAll({
      where: {
        [Op.or]: [
          { index: { [Op.like]: `%${dto.query}%` } },
          { city: { [Op.like]: `%${dto.query}%` } },
          { disrtict: { [Op.like]: `%${dto.query}%` } },
          { building: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return address.map((address) => new AddressDto(address));
  }

  async findOne(id: number) {
    const address = await this.addressEntity.findByPk(id);
    return new AddressDto(address);
  }

  async update(id: number, dto: UpdateAddressDto) {
    const address = await this.addressEntity.findByPk(id);
    await this.addressEntity.update(dto, { where: { id } });
    return new AddressDto(address);
  }

  async remove(id: number) {
    const address = await this.addressEntity.findByPk(id);
    await address.destroy();
    return new AddressDto(address);
  }
}

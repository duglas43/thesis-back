import { Injectable } from "@nestjs/common";
import {
  CreateOfficeDto,
  UpdateOfficeDto,
  OfficeDto,
  FindOfficeDto,
} from "./dto";
import { OfficeModel } from "./model/office.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(OfficeModel)
    private officeModel: typeof OfficeModel
  ) {}

  async create(dto: CreateOfficeDto) {
    const office = await this.officeModel.create({ ...dto });
    return new OfficeDto(office);
  }

  async findAll(dto: FindOfficeDto) {
    const offices = await this.officeModel.findAll({
      where: {
        ...(dto.query && {
          [Op.or]: [{ name: { [Op.like]: `%${dto.query}%` } }],
        }),
      },
    });
    return offices.map((office) => new OfficeDto(office));
  }

  async findOne(id: number) {
    const office = await this.officeModel.findByPkOrThrow(id);
    return new OfficeDto(office);
  }

  async update(id: number, dto: UpdateOfficeDto) {
    const office = await this.officeModel.findByPkOrThrow(id);
    await office.update(dto);
    return new OfficeDto(office);
  }

  async remove(id: number) {
    const office = await this.officeModel.findByPkOrThrow(id);
    await office.destroy();
    return new OfficeDto(office);
  }
}

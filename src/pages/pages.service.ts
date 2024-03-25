import { Injectable } from "@nestjs/common";
import { CreatePageDto, UpdatePageDto, PageDto, FindPageDto } from "./dto";
import { PageModel } from "./model/page.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { SUBJECTS, ACTIONS } from "src/casl/enum";
import { permittedFieldsOf } from "@casl/ability/extra";
import { pick } from "lodash";
import { ForbiddenError } from "@casl/ability";

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(PageModel)
    private pageModel: typeof PageModel
  ) {}

  async create(dto: CreatePageDto) {
    const page = await this.pageModel.create({ ...dto });
    return new PageDto(page);
  }

  async findAll(dto: FindPageDto, ability: AppAbility) {
    const pages = await this.pageModel.findAll({
      where: {
        ...(dto.query && {
          [Op.or]: [{ name: { [Op.like]: `%${dto.query}%` } }],
        }),
      },
    });
    const authorizedPages = pages.filter((page) =>
      ability.can(ACTIONS.READ, page)
    );
    const processedPages = authorizedPages.map((page) => {
      const allowedFields = permittedFieldsOf(ability, ACTIONS.READ, page, {
        fieldsFrom: () => Object.keys(this.pageModel.getAttributes()),
      });
      return pick(page, allowedFields);
    });
    return processedPages.map((page) => new PageDto(page));
  }

  async findOne(id: number, ability: AppAbility) {
    const page = await this.pageModel.findByPkOrThrow(id);
    ForbiddenError.from(ability).throwUnlessCan(ACTIONS.READ, page);
    return new PageDto(page);
  }

  async update(id: number, dto: UpdatePageDto, ability: AppAbility) {
    const page = await this.pageModel.findByPkOrThrow(id);
    ForbiddenError.from(ability).throwUnlessCan(ACTIONS.UPDATE, page);
    Object.keys(dto).forEach((key) => {
      if (page[key] === dto[key]) return;
      ForbiddenError.from(ability).throwUnlessCan(
        ACTIONS.UPDATE,
        SUBJECTS.MACHINE,
        key
      );
    });
    await page.update(dto);
    return new PageDto(page);
  }

  async remove(id: number) {
    const page = await this.pageModel.findByPkOrThrow(id);
    await page.destroy();
    return new PageDto(page);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { DetailsService } from "./details.service";
import {
  CreateDetailDto,
  UpdateDetailDto,
  DetailDto,
  FindDetailDto,
} from "./dto";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import {
  AppApiUnauthorizedResponse,
  AppApiNotFoundResponse,
  AppApiForbiddenResponse,
  ApiListResponse,
} from "src/common/swagger/decorators";
import { CheckPolicies, GetAbility } from "src/casl/decorator";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS, SUBJECTS } from "src/casl/enum";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("details")
@Controller("details")
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.CREATE, SUBJECTS.DETAIL)
  )
  @ApiCreatedResponse({ type: DetailDto })
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailsService.create(createDetailDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.READ, SUBJECTS.DETAIL)
  )
  @ApiListResponse(DetailDto)
  findAll(
    @Query() findDetailDto: FindDetailDto,
    @GetAbility() ability: AppAbility
  ) {
    return this.detailsService.findAll(findDetailDto, ability);
  }

  @Get(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.READ, SUBJECTS.DETAIL)
  )
  @ApiOkResponse({ type: DetailDto })
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility
  ) {
    return this.detailsService.findOne(id, ability);
  }

  @Patch(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.UPDATE, SUBJECTS.DETAIL)
  )
  @ApiOkResponse({ type: DetailDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDetailDto: UpdateDetailDto,
    @GetAbility() ability: AppAbility
  ) {
    return this.detailsService.update(id, updateDetailDto, ability);
  }

  @Delete(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.DELETE, SUBJECTS.DETAIL)
  )
  @ApiOkResponse({ type: DetailDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.detailsService.remove(id);
  }

  @Post(":id/param")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        paramId: { type: "integer" },
        value: { type: "string" },
      },
    },
  })
  @ApiOkResponse()
  addParam(
    @Param("id", ParseIntPipe) id: number,
    @Body("paramId", ParseIntPipe) paramId: number,
    @Body() value: string
  ) {
    return this.detailsService.addParam(id, { paramId, value });
  }

  @Delete(":id/param/:paramId")
  @ApiOkResponse()
  removeParam(
    @Param("id", ParseIntPipe) id: number,
    @Param("paramId", ParseIntPipe) paramId: number
  ) {
    return this.detailsService.removeParam(id, paramId);
  }
}

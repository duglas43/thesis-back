import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { PagesService } from "./pages.service";
import { PageDto, CreatePageDto, UpdatePageDto, FindPageDto } from "./dto";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import {
  AppApiUnauthorizedResponse,
  AppApiNotFoundResponse,
  AppApiForbiddenResponse,
} from "src/common/swagger/decorators";
import { CheckPolicies, GetAbility } from "src/casl/decorator";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS, SUBJECTS } from "src/casl/enum";

@ApiBearerAuth()
@AppApiUnauthorizedResponse()
@AppApiForbiddenResponse()
@AppApiNotFoundResponse()
@ApiTags("pages")
@Controller("pages")
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.CREATE, SUBJECTS.PAGE)
  )
  @ApiCreatedResponse({ type: PageDto })
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.READ, SUBJECTS.PAGE)
  )
  @ApiOkResponse({ type: [PageDto] })
  findAll(
    @Query() findPageDto: FindPageDto,
    @GetAbility() ability: AppAbility
  ) {
    return this.pagesService.findAll(findPageDto, ability);
  }

  @Get(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.READ, SUBJECTS.PAGE)
  )
  @ApiOkResponse({ type: PageDto })
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @GetAbility() ability: AppAbility
  ) {
    return this.pagesService.findOne(id, ability);
  }

  @Patch(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.UPDATE, SUBJECTS.PAGE)
  )
  @ApiOkResponse({ type: PageDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePageDto: UpdatePageDto,
    @GetAbility() ability: AppAbility
  ) {
    return this.pagesService.update(id, updatePageDto, ability);
  }

  @Delete(":id")
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ACTIONS.DELETE, SUBJECTS.PAGE)
  )
  @ApiOkResponse({ type: PageDto })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.pagesService.remove(id);
  }
}

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SubjectDto } from './dto';

@ApiBearerAuth()
@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOkResponse({ type: [SubjectDto] })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SubjectDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subjectsService.findOne(id);
  }
}

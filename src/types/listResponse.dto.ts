import { ApiProperty } from '@nestjs/swagger';
import { ORDER } from './';
export class MetaDto {
  @ApiProperty()
  totalCount: number; // total number of items
  @ApiProperty()
  pageCount: number; // total number of pages
  @ApiProperty()
  resultCount: number; // number of items in current page
  @ApiProperty()
  page: number; // current page
  @ApiProperty()
  limit: number;
  @ApiProperty()
  order: ORDER;
  @ApiProperty()
  sort: string;
}
export class ListResponseDto<T> {
  @ApiProperty()
  content: T[];
  @ApiProperty()
  meta: MetaDto;
  constructor(content: T[], meta: MetaDto) {
    this.content = content;
    this.meta = meta;
  }
}

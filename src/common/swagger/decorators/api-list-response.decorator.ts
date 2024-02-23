import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ListResponseDto } from '../../dto';

export const ApiListResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(() => ListResponseDto) },
          {
            properties: {
              content: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                type: 'object',
                properties: {
                  totalCount: { type: 'number' },
                  pageCount: { type: 'number' },
                  resultCount: { type: 'number' },
                  page: { type: 'number' },
                  limit: { type: 'number' },
                  order: { type: 'string' },
                  sort: { type: 'string' },
                },
              },
            },
          },
        ],
      },
    }),
  );
};

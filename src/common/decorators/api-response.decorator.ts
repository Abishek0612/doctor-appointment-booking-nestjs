import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiSuccessResponse(description: string, type?: any) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      type,
    }),
  );
}

export function ApiCreatedResponse(description: string, type?: any) {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description,
      type,
    }),
  );
}

export function ApiErrorResponses() {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 404, description: 'Not Found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
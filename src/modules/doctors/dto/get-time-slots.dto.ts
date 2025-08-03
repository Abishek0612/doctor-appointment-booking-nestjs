import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTimeSlotsDto {
  @ApiProperty({ example: '2024-12-15' })
  @IsDateString()
  date: string;
}

import { IsString, IsEmail, IsArray, IsOptional, IsNumber, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Cardiology' })
  @IsString()
  specialization: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: ['Monday', 'Tuesday', 'Wednesday'] })
  @IsArray()
  @IsString({ each: true })
  availableDays: string[];

  @ApiProperty({ example: '09:00' })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  startTime: string;

  @ApiProperty({ example: '17:00' })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  endTime: string;

  @ApiProperty({ example: 30 })
  @IsOptional()
  @IsNumber()
  slotDuration?: number;
}
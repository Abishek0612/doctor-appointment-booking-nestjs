import { IsString, IsEmail, IsDateString, IsUUID, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'John Smith' })
  @IsString()
  patientName: string;

  @ApiProperty({ example: 'patient@example.com' })
  @IsEmail()
  patientEmail: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  patientPhone: string;

  @ApiProperty({ example: '2024-12-15' })
  @IsDateString()
  appointmentDate: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  startTime: string;

  @ApiProperty({ example: 'doctor-uuid-here' })
  @IsUUID()
  doctorId: string;

  @ApiProperty({ example: 'Regular checkup', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
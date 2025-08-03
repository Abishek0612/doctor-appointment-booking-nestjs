import { ApiProperty } from '@nestjs/swagger';
import { DoctorResponseDto } from '../../doctors/dto/doctor-response.dto';

export class AppointmentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  patientName: string;

  @ApiProperty()
  patientEmail: string;

  @ApiProperty()
  patientPhone: string;

  @ApiProperty()
  appointmentDate: Date;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  notes: string;

  @ApiProperty({ type: DoctorResponseDto })
  doctor: DoctorResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class AppointmentsListResponseDto {
  @ApiProperty({ type: [AppointmentResponseDto] })
  data: AppointmentResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  totalPages: number;
}
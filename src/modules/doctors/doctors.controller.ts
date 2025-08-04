import { Controller, Get, Post, Body, Param, Query, ParseUUIDPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { GetTimeSlotsDto } from './dto/get-time-slots.dto';
import { DoctorResponseDto, DoctorsListResponseDto } from './dto/doctor-response.dto';

@ApiTags('doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'Doctor created successfully', type: DoctorResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors with pagination and filtering' })
  @ApiResponse({ status: 200, description: 'Doctors retrieved successfully', type: DoctorsListResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'specialization', required: false, type: String })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('specialization') specialization?: string,
  ) {
    return this.doctorsService.findAll(page, limit, specialization);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by ID' })
  @ApiResponse({ status: 200, description: 'Doctor found', type: DoctorResponseDto })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.doctorsService.findOne(id);
  }

  @Get(':id/time-slots')
  @ApiOperation({ summary: 'Get available time slots for a doctor' })
  @ApiResponse({ status: 200, description: 'Available time slots', type: [String] })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getTimeSlots(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() getTimeSlotsDto: GetTimeSlotsDto,
  ) {
    return this.doctorsService.getAvailableTimeSlots(id, getTimeSlotsDto.date);
  }
}
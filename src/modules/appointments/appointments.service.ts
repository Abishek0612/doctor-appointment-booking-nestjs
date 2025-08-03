import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../../entities/appointment.entity';
import { Doctor } from '../../entities/doctor.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const doctor = await this.doctorsRepository.findOne({
      where: { id: createAppointmentDto.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    await this.validateAppointmentSlot(createAppointmentDto);

    const endTime = this.calculateEndTime(createAppointmentDto.startTime, doctor.slotDuration);

    const appointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      appointmentDate: new Date(createAppointmentDto.appointmentDate),
      endTime,
      doctor,
    });

    return this.appointmentsRepository.save(appointment);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{
    data: Appointment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [appointments, total] = await this.appointmentsRepository.findAndCount({
      relations: ['doctor'],
      skip: (page - 1) * limit,
      take: limit,
      order: { appointmentDate: 'DESC', startTime: 'ASC' },
    });

    return {
      data: appointments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  private async validateAppointmentSlot(createAppointmentDto: CreateAppointmentDto): Promise<void> {
    const { doctorId, appointmentDate, startTime } = createAppointmentDto;

    // Check for existing appointment
    const existingAppointment = await this.appointmentsRepository.findOne({
      where: {
        doctor: { id: doctorId },
        appointmentDate: new Date(appointmentDate),
        startTime,
        status: AppointmentStatus.SCHEDULED, // Use enum instead of string
      },
    });

    if (existingAppointment) {
      throw new BadRequestException('This time slot is already booked');
    }

    // Get doctor details
    const doctor = await this.doctorsRepository.findOne({
      where: { id: doctorId },
    });

    // Add null check
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const requestedDate = new Date(appointmentDate);
    const dayName = requestedDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Now doctor is guaranteed to not be null
    if (!doctor.availableDays.includes(dayName)) {
      throw new BadRequestException('Doctor is not available on this day');
    }

    const requestedTimeInMinutes = this.timeToMinutes(startTime);
    const startTimeInMinutes = this.timeToMinutes(doctor.startTime);
    const endTimeInMinutes = this.timeToMinutes(doctor.endTime);

    if (requestedTimeInMinutes < startTimeInMinutes || requestedTimeInMinutes >= endTimeInMinutes) {
      throw new BadRequestException('Appointment time is outside doctor working hours');
    }
  }

  private calculateEndTime(startTime: string, duration: number): string {
    const startMinutes = this.timeToMinutes(startTime);
    const endMinutes = startMinutes + duration;
    return this.minutesToTime(endMinutes);
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
}
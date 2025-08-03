import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../../entities/doctor.entity';
import { Appointment, AppointmentStatus } from '../../entities/appointment.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorsRepository.create(createDoctorDto);
    return this.doctorsRepository.save(doctor);
  }

  async findAll(page: number = 1, limit: number = 10, specialization?: string): Promise<{
    data: Doctor[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const query = this.doctorsRepository.createQueryBuilder('doctor')
      .where('doctor.isActive = :isActive', { isActive: true });

    if (specialization) {
      query.andWhere('LOWER(doctor.specialization) LIKE LOWER(:specialization)', {
        specialization: `%${specialization}%`,
      });
    }

    const [doctors, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: doctors,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({
      where: { id, isActive: true },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async getAvailableTimeSlots(doctorId: string, date: string): Promise<string[]> {
    const doctor = await this.findOne(doctorId);
    
    const requestedDate = new Date(date);
    const dayName = requestedDate.toLocaleDateString('en-US', { weekday: 'long' });

    if (!doctor.availableDays.includes(dayName)) {
      return [];
    }

    const allSlots = this.generateTimeSlots(doctor.startTime, doctor.endTime, doctor.slotDuration);

    const bookedAppointments = await this.appointmentsRepository.find({
      where: {
        doctor: { id: doctorId },
        appointmentDate: requestedDate,
        status: AppointmentStatus.SCHEDULED, // Use enum instead of string
      },
    });

    const bookedTimes = bookedAppointments.map(appointment => appointment.startTime);

    return allSlots.filter(slot => !bookedTimes.includes(slot));
  }

  private generateTimeSlots(startTime: string, endTime: string, duration: number): string[] {
    const slots: string[] = [];
    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);

    for (let current = start; current < end; current += duration) {
      slots.push(this.minutesToTime(current));
    }

    return slots;
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
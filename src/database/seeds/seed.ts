import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DoctorsService } from '../../modules/doctors/doctors.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const doctorsService = app.get(DoctorsService);

  const doctors = [
    {
      firstName: 'John',
      lastName: 'Smith',
      specialization: 'Cardiology',
      email: 'john.smith@hospital.com',
      phone: '+1234567890',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startTime: '09:00',
      endTime: '17:00',
      slotDuration: 30,
    },
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      specialization: 'Dermatology',
      email: 'sarah.johnson@hospital.com',
      phone: '+1234567891',
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      startTime: '10:00',
      endTime: '16:00',
      slotDuration: 45,
    },
    {
      firstName: 'Michael',
      lastName: 'Brown',
      specialization: 'Orthopedics',
      email: 'michael.brown@hospital.com',
      phone: '+1234567892',
      availableDays: ['Tuesday', 'Thursday', 'Saturday'],
      startTime: '08:00',
      endTime: '18:00',
      slotDuration: 30,
    },
  ];

  for (const doctor of doctors) {
    await doctorsService.create(doctor);
    console.log(`Created doctor: ${doctor.firstName} ${doctor.lastName}`);
  }

  await app.close();
  console.log('Seed completed!');
}

seed().catch(console.error);
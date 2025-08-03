import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  specialization: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('text', { array: true })
  availableDays: string[]; // ['Monday', 'Tuesday', etc.]

  @Column('time')
  startTime: string; // '09:00'

  @Column('time')
  endTime: string; // '17:00'

  @Column({ default: 30 })
  slotDuration: number; 

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
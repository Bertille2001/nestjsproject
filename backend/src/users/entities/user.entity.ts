import { Notification } from 'src/notifications/entities/notification.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class User {

  @PrimaryGeneratedColumn()
  idusers: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

@OneToMany(() => Notification,(notification)=>notification.user)
notifications: Notification[];
}


import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly connection: Connection) {}

  // fonction creation de la notification
  async createNotification(
    queryRunner: QueryRunner,
    dtoNotification: CreateNotificationDto,
    user: User,
  ) {
    try {
      const notification = new Notification();

      notification.message = dtoNotification.message;
      notification.user = user;

      queryRunner.manager.save(notification);
      //    return userNotification;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to create notification');
      }
    }
  }

  // recuperer les notifcations
  async getNotifications() {
    return this.connection.manager.find(Notification);
  }

  // recuperer notification par id
  async getNotification(idusers: number) {
    return this.connection.manager.findOne(User, { where: { idusers } });
  }

}
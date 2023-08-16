import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>
  ) {}


 async createNotification(user :  User, message : string): Promise<Notification>{
    const notify = new Notification();
    notify.message = message;
    notify.user = user;
    return this.notificationRepository.save(notify);
}

findAll()

{
    return from(this.notificationRepository.find());
}

}


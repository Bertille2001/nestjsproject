import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notifications.service';
//import { Observable } from 'rxjs';
import { Notification } from './entities/notification.entity';
import { Observable } from 'rxjs';



@Controller('notification')
export class NotificationController {
  constructor(private readonly notifcationService: NotificationService) {}

  @Get(':id')
  async GetNotification(@Param('id') id: number) {
    return this.notifcationService.getNotification(id);
  }

  @Get()
  async GetNotifications() {
    return this.notifcationService.getNotifications();
  }

}
import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
//import { Observable } from 'rxjs';
import { Notification } from './entities/notification.entity';
import { Observable } from 'rxjs';



@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
 
 
  // @Post()
  // create(@Body() notification:Notification): Observable<Notification>
  // {
  //   return this.notificationsService.createNotification(notification);
  // } 

  @Get()
  findAll()
  {
     return this.notificationsService.findAll();
  }}


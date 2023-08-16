import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
// import { NotificationSubscribers } from 'src/events/notification.subscribers';
//import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [NotificationsService, 
    // NotificationSubscribers
  ]
})
export class NotificationsModule {}

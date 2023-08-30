import { Module } from '@nestjs/common';
import { NotificationController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationService } from './notifications.service';
import { Notification } from './entities/notification.entity';
// import { NotificationSubscribers } from 'src/events/notification.subscribers';
//import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService, 
    // NotificationSubscribers
  ]
})
export class NotificationsModule {}

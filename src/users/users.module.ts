import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';


@Module({
  imports:[TypeOrmModule.forFeature([User , Notification]),
  NotificationsModule,
  TypeOrmModule.forFeature([Notification]),EventEmitterModule.forRoot()],
  controllers: [UsersController],
  providers: [UserService , NotificationsService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './users/config/typeorm.config';
import { NotificationsModule } from './notifications/notifications.module';
import { User } from './users/entities/user.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [UsersModule ,
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forRoot(typeOrmConfig) ,
  NotificationsModule,EventEmitterModule.forRoot(),
],
 
  controllers: [AppController],
  providers: [AppService],
  exports:[AppService] ,

})
export class AppModule {}

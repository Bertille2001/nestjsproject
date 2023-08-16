// user.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Controller('users')
export class UsersController{

 constructor(private readonly userService: UserService,
  private readonly notificationService : NotificationsService){}  
 
@Post()
async create(@Body() 
  user:User)
{
  this.userService.createUser(user);
// notif
const message = `${user.firstname} crée`
const createdUser = await this.userService.createUser(user);
  return {message: 'User added success' ,  user: createdUser};
} 

 @Get()
 findAll()
 {
    
    return this.userService.findAll();
 }

 @Patch(':id')
 update(@Param('id') id: number, @Body() users:User)
 {
    return this.userService.updateUser(id,users);
 }

@Delete(':id')
delete(@Param('id') id: number)
{
    return this.userService.deleteUser(id);
}

}
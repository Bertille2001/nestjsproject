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
  const addUSER = await   this.userService.createUserWithNotification(user);
  return {message : 'creer avec succces' ,user}
// notif
// const message = `${user.firstname} crée`
// const createdUser = await this.userService.createUserWithNotification(user);
//   return {message: 'User added success' ,  user: createdUser};
} 

 @Get()
 findAll()
 {
    
    return this.userService.findAll();
 }

 @Patch(':id')
 async update(@Param('id') id: number, @Body() user:User)
 {
    const updateUser = await  this.userService.updateUser(id,user);
    // creation de la notif
    // const message = `${user.firstname} updated`;
    // await this.notificationService.createNotification(updateUser , message);
    return {message : 'user updated' , user : updateUser};
 }

@Delete(':id')
delete(@Param('id') id: number)
{
    return this.userService.deleteUserWithNotification(id);
}

}
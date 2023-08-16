// user.service.ts
import { Injectable ,InternalServerErrorException} from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
//import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
// import { from, Observable } from 'rxjs';
//import { UserCreatedEvent } from 'src/events/user-created.event';
import { NotificationsService } from 'src/notifications/notifications.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';



@Injectable()

export class UserService{
  constructor(
    @InjectRepository(User)
    private  userRepository: Repository<User>,
    private  notificationService:NotificationsService,

    //private readonly notificationsService: NotificationsService,
    // private readonly eventEmitter: EventEmitter2,
    ){}

async createUser(user:User){
    
      try {
          const createdUser =  await this.userRepository.save(user);
        // this.eventEmitter.emit('user.save',User);
        // notif
        const message  = `${user.firstname} created`;
        this.notificationService.createNotification(createdUser , message )
        return  createdUser;
    
      } catch (error) {
        throw new InternalServerErrorException('utilisateur non creer')
      }
    
}

findAll()
{
    try {

        
        return  this.userRepository.find();
    } catch (error) {
     throw new InternalServerErrorException ('erreur')  
    }
}

updateUser(id:number, user:User)
{
    // this.eventEmitter.emit('user.updated', User);
    return (this.userRepository.update(id,user));
}


  deleteUser(id:number)
  {
    try {
     // this.eventEmitter.emit('user.deleted', id);
     return this.userRepository.delete(id);
     } catch (error) {
      throw new InternalServerErrorException('utillisateur supprimé')
     }
 }
}

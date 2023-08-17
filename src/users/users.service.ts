// user.service.ts
import { Injectable ,InternalServerErrorException,NotFoundException} from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
//import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
// import { from, Observable } from 'rxjs';
//import { UserCreatedEvent } from 'src/events/user-created.event';
import { NotificationsService } from 'src/notifications/notifications.service';
import { DeleteResult, Repository,EntityManager, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';



@Injectable()

export class UserService{
  constructor(
    @InjectRepository(User)
    private  userRepository: Repository<User>,
    private  notificationService:NotificationsService,
    private readonly entityManager: EntityManager,

   
    ){}

// async createUser(user:User){
    
//       try {
//           const createdUser =  await this.userRepository.save(user);
//         // this.eventEmitter.emit('user.save',User);
//         // notif
//         const message  = `${user.firstname} created`;
//         this.notificationService.createNotification(createdUser , message )
//         return  createdUser;
    
//       } catch (error) {
//         throw new InternalServerErrorException('utilisateur non creer')
//       }
    
// }

async createUserWithNotification(user: User): Promise<User> {
    try {
      return await this.entityManager.transaction(async transactionalEntityManager => {
        const createdUser = await transactionalEntityManager.save(User, user);

        const notificationMessage = `${user.firstname} a été créé`;
        await this.notificationService.createNotification( createdUser,notificationMessage);

        return createdUser;
      });
    } catch (error) {
      throw new InternalServerErrorException('Une erreur est survenue lors de la création de l\'utilisateur');
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
async findOneById(id: number){
    try {
       const myId =   await this.userRepository.findOneById(id);
       return myId;
   
} catch (error) {
    throw new InternalServerErrorException("Not found user by id: " + id);

}
}
// async updateUser(id:number, user:User):Promise<User>
// {

//     try {
//         const userId = await this.userRepository.findOneById(id);
//         if(!user){
//             throw new Error ('User not found');
//         }
//         // mise a jour des donnée dans la db
//         if(userId.firstname){
//             userId.firstname = user.firstname;
//         }
//         if(userId.lastname){
//             userId.lastname = user.lastname;
//         }
//         if(userId.lastname){
//             userId.lastname = user.lastname;
//         }

//         return this.userRepository.save(userId);
//     } catch (error) {
//         throw new InternalServerErrorException('mise a jour echoué');
//     }
 

// }

async updateUser(id: number, updatedData: Partial<User>): Promise<User> {
    try {
      return await this.entityManager.transaction(async transactionalEntityManager => {
        const userToUpdate = await transactionalEntityManager.findOneById(User, id);

        if (!userToUpdate) {
          throw new NotFoundException(` l'Id ${id} n'a pas été trouvé`);
        }

        // Effectuer la mise à jour des champs pertinents
        transactionalEntityManager.merge(User, userToUpdate, updatedData);

        // Mettre à jour l'utilisateur
        const updateResult = await transactionalEntityManager.save(userToUpdate);

        const notificationMessage = `${userToUpdate.firstname} a été mis à jour`;
        await this.notificationService.createNotification(userToUpdate,notificationMessage);

        return updateResult;
      });
    } catch (error) {
      throw new InternalServerErrorException('Erreur');
    }
  }

//   deleteUser(id:number)
//   {
//     try {
    
//      return this.userRepository.delete(id);
//      } catch (error) {
//       throw new InternalServerErrorException('utillisateur supprimé')
//      }
//  }

async deleteUserWithNotification(id: number): Promise<void> {
    try {
      await this.entityManager.transaction(async transactionalEntityManager => {
        const userToDelete = await transactionalEntityManager.findOneById(User, id);

        if (!userToDelete) {
          throw new NotFoundException(`L'utilisateur avec l'ID ${id} n'a pas été trouvé`);
        }

        await transactionalEntityManager.remove(userToDelete);

        const notificationMessage = `${userToDelete.firstname} a été supprimé`;
        await this.notificationService.createNotification( userToDelete,notificationMessage);
      });
    } catch (error) {
      throw new InternalServerErrorException('Une erreur est survenue lors de la suppression de l\'utilisateur');
    }
  }
}

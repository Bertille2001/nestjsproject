
import {Injectable,NotFoundException,InternalServerErrorException, BadRequestException,} from '@nestjs/common';
import { DataSource, QueryRunner, Connection } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { normalize } from 'path';
import { InjectConnection } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { NotificationService } from 'src/notifications/notifications.service';


@Injectable()
export class UserService {
  constructor(
    private readonly notificationService: NotificationService,
       private readonly dataSource: DataSource,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  // créons l utilisateur

  async createUser(createUserDto: CreateUserDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new User();
      user.firstname = createUserDto.firstname;
      user.lastname = createUserDto.lastname;
      user.age = createUserDto.age;

      await queryRunner.manager.save(user);

      // // Créer automatiquement une notification 
      const message = `created ${user.firstname}`;
      const notif = new CreateNotificationDto();
      notif.message = message;

      await this.notificationService.createNotification(
        queryRunner,
        notif,
        user,
      );

      await queryRunner.commitTransaction();
      return { message: `  ${user.firstname} created` };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // mettre a jour un utilisateur
  async updateUser(idusers: number, updateUserDto: UpdateUserDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOneOrFail(User  , {where : {idusers}});

      user.firstname = updateUserDto.firstname;
      user.lastname = updateUserDto.lastname;
      user.age = updateUserDto.age;

      await queryRunner.manager.save(user);

      //    // Enregistrez une notification
      const message = `updated ${user.firstname}`;
      const notif = new CreateNotificationDto();
      notif.message = message;

      await this.notificationService.createNotification(
        queryRunner,
        notif,
        user,
      );

      await queryRunner.commitTransaction();
      return { message: ` ${user.idusers} => ${user.firstname} updated` };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(idusers: number) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOneOrFail(User  , {where : {idusers}});


      await queryRunner.manager.delete(User, idusers);

      //    // Enregistrez une notification
      const message = `deleted ${user.firstname}`;
      const notif = new CreateNotificationDto();
      notif.message = message;

      await this.notificationService.createNotification(
        queryRunner,
        notif,
        user,
      );

      await queryRunner.commitTransaction();
      return {
        message: ` ${user.idusers} => ${user.firstname} deleted`,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getAllUsers() {
    const user = new User();
    const allUsers = await this.connection.manager.find(User);
    return { message: 'Les utilisateurs : ', user: allUsers };
  }

  async getUser(idusers: number) {
   
    const user = await this.connection.manager.findOneOrFail(User  , {where : {idusers}});

    return { message: `Utilisateur: ${user.idusers} `, user: user };
  }
}

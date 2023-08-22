import { NotificationType } from "src/notification-type.enum";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Notification { 
    
  @PrimaryGeneratedColumn()
  id: number;

@CreateDateColumn()
createdAt : Date;

   
  @Column()
  message: string;


  
  
  @ManyToMany(() => User, user => user.notifications)
  user: User;
}

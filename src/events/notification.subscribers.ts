// import { Injectable } from "@nestjs/common";
// import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
// import { Notification } from "src/notifications/entities/notification.entity";
// import { NotificationsService } from "src/notifications/notifications.service";
// import { User } from "src/users/entities/user.entity";





// @Injectable()
// export class NotificationSubscribers{

//   constructor(
    
//     private readonly notificationService: NotificationsService,
//     private readonly eventEmitter: EventEmitter2,
//   ){}
//     date=new Date()


//   @OnEvent('user.save')
//   handleUserCreateEvent(payloadUser:User){
//     console.log('utilisateur cree:',payloadUser);
//     const info: Notification={
//       hour: this.date.getHours(),
//       minute: this.date.getMinutes(),
//       message: {payloadUser.firstname}+ 'created',
//       user: payloadUser,
//       id: null,
//     };
  
//     const message  =  payloadUser.firstname;
//     const formattedTime = `${info.hour}:${info.minute}`;
//     this.notificationService.createNotification(info)
// }
    
// @OnEvent('user.updated')
// handleUserUpdateEvent(payloadUser: User) {
//   console.log('Utilisateur mis à jour:', payloadUser);

//   const info : Notification = {
//     hour: this.date.getHours(),
//     minute: this.date.getMinutes(),
//     message: payloadUser.firstname +'a été mis à jour',
//     firsname: payloadUser,
//     id: null,
    
//   };

  
//   this.notificationService.createNotification(info);
// }


      
// @OnEvent('user.deleted')
// handleUserDeleteEvent(payloadUser: User) {
//   console.log('Utilisateur supprimé:', payloadUser);
  
//   const info: Notification = {
//     hour: this.date.getHours(),
//     minute: this.date.getMinutes(),
//     message: payloadUser.firstname +  'a été supprimé',
//     firsname: payloadUser,
//     id: null,
    
//   };

 
//   this.notificationService.createNotification(info);
// }

//   }

    



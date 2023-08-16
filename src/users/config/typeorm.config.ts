import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeOrmConfig: TypeOrmModuleOptions= {
    
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username : 'postgres',
    password : '2001',
    database : 'stageWoe',
    autoLoadEntities: true,
    synchronize : true,
}

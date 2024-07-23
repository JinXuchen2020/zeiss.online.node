import { TypeOrmModule } from "@nestjs/typeorm";
import { CamelCaseNamingStrategy } from "./CamelCaseNamingStrategy";

const database = TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: "sa",
    password: "123456",
    database: 'SaleInfo',
    options: {
        encrypt: false, // MSSQL-specific option
    },
    synchronize: true, //use this with development environment
    entities: [],
    autoLoadEntities: true, //use this with development environment
    //dropSchema: true, //use this with development environment
    namingStrategy: new CamelCaseNamingStrategy(),
})

export default database;
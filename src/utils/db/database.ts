import {Project} from "../../entities/Project";
import {DataSource, DataSourceOptions} from "typeorm";

export const Db = new DataSource({
    type: process.env.DB_DRIVER as 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.APP_ENV === 'local',
    logging: false,
    entities: [Project],
} as DataSourceOptions)

Db.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
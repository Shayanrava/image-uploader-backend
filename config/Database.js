import { Sequelize } from "sequelize";

const db =new Sequelize("uploader" , "root" , "Shayan$$%%" ,{
    host : "localhost",
    dialect : "mysql"
});

export default db;
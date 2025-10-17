import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const { DataTypes } = Sequelize;

const Product = db.define("products", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

// (async () => {
//     try {
//         await db.sync();
//     } catch (err) {
//         console.error( err);
//     }
// })();

export default Product;

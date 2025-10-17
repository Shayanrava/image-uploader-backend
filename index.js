import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors"
import router from "./routes/ProductRoute.js";

// npm express express-fileupload mysql2 sequelize cors


const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(router)



app.listen(process.env.PORT , console.log("server is running"));


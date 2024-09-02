import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { DataBaseConnection } from "./db.js"
import { userRouter } from "./routes/users.js";
import { movieRouter } from "./routes/movies.js";
import { isAuthorized } from "./middlewares/auth.js";


//configure dotenv
dotenv.config();

//server setup
const app = express();
const PORT = process.env.PORT

//default middlewares
app.use(express.json());
app.use(cors());


//database connection
DataBaseConnection()

//routes
app.use("/api/user", userRouter);
app.use("/api/movies", isAuthorized, movieRouter);

//listen the server
app.listen(PORT, ()=>{
    console.log(`server running on localhost:${PORT}`)
});
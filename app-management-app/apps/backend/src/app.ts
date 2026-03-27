import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";

console.log("Trying deployment trigger");
dotenv.config();

import corsOptions from "../config/cors";
import morgan from "morgan";
import inventoryListRoutes from "../src/api/v1/routes/inventoryListRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

app.use(morgan("combined"));

// allows express to parse json
app.use(express.json());

//add cors middleware
app.use(cors(corsOptions));

// Listening for requests 
app.get("/",  (_req, res) => {
    res.send("Got response from backend!");
});

app.use("/api/v1", inventoryListRoutes);


app.use(errorHandler);


export default app;
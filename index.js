import express from "express";
import connectDB from "./connection/connection.js";
import cors from "cors";
import path from "path";
import Routes from "./routes/routes.js";
const app = express();
const port = process.env.PORT || 7000;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the directory name of the current module file
// const currentModuleFile = fileURLToPath(import.meta.url);
// const currentModuleDir = dirname(currentModuleFile);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const uploadsDirectory = path.join(__dirname, 'uploads');
// Create a route handler to serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDirectory));
app.use('/', Routes);
// middleware call
connectDB();
app.listen(port, (err)=>{
    if(err){
        console.log(`Server is not running on ${port}`);
    }else{
        console.log(`Server is running on ${port}`);
    }
})



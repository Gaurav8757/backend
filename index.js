import express from "express";
import connectDB from "./connection/connection.js";
import cors from "cors";
import path from "path";
import Routes from "./routes/routes.js";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 7000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Create a route handler to serve static files from the uploads directory
// const uploadsDirectory = ;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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



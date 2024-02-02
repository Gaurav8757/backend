import express from "express";
import connectDB from "./connection/connection.js";
import cors from "cors";
import path from "path";
import Routes from "./routes/routes.js";
import fileUpload from "./middleware/fileUpload.js"
const app = express();
const port = process.env.PORT || 7000;


// Get the current module's directory using import.meta.url
const currentModuleFile = new URL(import.meta.url).pathname;
const basePath = path.dirname(currentModuleFile);
 // Adjust this line based on your project structure
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Create a route handler to serve static files from the uploads directory
app.use('/uploads', express.static(path.join(basePath, 'uploads')));

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



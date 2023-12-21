import express from "express";
import connectDB from "./connection/connection.js";
import cors from "cors";
import path from "path";
import Routes from "./routes/routes.js";
const app = express();
const port = process.env.PORT || 7000;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module file
const currentModuleFile = fileURLToPath(import.meta.url);
const currentModuleDir = dirname(currentModuleFile);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(currentModuleDir, "F:/policy/policy-bazaar/src/admin/uploads")));

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



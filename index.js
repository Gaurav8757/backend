import express from "express";
import connectDB from "./connection/connection.js";
import cors from "cors";
import Routes from "./routes/routes.js";
const app = express();
const port = process.env.PORT || 7000;


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//     sessions({
//       secret: process.env.pass_key,
//       resave: false,
//       saveUninitialized: false,
//     }));
app.use(cors());
// routes call
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



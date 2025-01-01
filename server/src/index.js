// env configuration
// require('dotenv').config({path: './env'})    // Better way below

import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Import app Instance of express
import { app } from "./app.js";

dotenv.config({path: './.env'})

// Connect To DB
connectDB()
.then( () => {  // If Database Connected Succesfully then, Start server {ie listen}...

    app.listen( process.env.PORT || 5000, () => {
        console.log(`Server Started Running/LIstening On PORT: ${process.env.PORT}`);
    })

} )
// Handle DB connection err
.catch( (err) => {console.log("MongoDB connection failed, Error: ", err)}) 






import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'

const connectDB = async () => {
    // While connecting, we might get error => try - catch wrapping.
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error making connection to database, Error: ", error);
        process.exit(1)   // Search More About it!
    }
}

export default connectDB;
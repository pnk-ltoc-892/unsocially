import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'

// Connection options must follow the database name in the path, so they can't
// simply be appended to MONGODB_URL.
const buildConnectionUri = (baseUrl) => {
    const [hosts, query] = baseUrl.split("?");
    return `${hosts.replace(/\/+$/, "")}/${DB_NAME}${query ? `?${query}` : ""}`;
}

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(buildConnectionUri(process.env.MONGODB_URL))
    
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error making connection to database, Error: ", error);
        process.exit(1)
    }
}

export default connectDB;
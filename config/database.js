import mongoose from "mongoose";
import { APP_DATABASE } from "./config.js";

export const connectDB = async () => {
    try {
        console.log("Mongodb connection start....");

        const response = await mongoose.connect(APP_DATABASE)

        console.log(`Mongodb connected : ${response.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}
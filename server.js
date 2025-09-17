import app from "./app.js";
import { APP_PORT } from "./config/config.js";
import { connectDB } from "./config/database.js";

app.listen(APP_PORT, () => {
    connectDB()
    console.log(`App running at : http://localhost:${APP_PORT}`);
});
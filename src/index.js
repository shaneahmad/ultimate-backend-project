// require("dotenv").config({ path: "./env" });
import connetDB from "./db/index.js";
import dotenv from "dotenv";
// import express from "express";
// const app = express();
dotenv.config({ path: "./env" });



connetDB();

/*

// iffes are used with semi-colon to avoid any issues with the code
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`, {});
        app.on("error", () => {
            console.log("Error starting the server", error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch(error) {
        console.error("Error connecting to MongoDB", error);
    }
})()

*/
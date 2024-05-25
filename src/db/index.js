import mongoose from "mongoose";


const connetDB = async () => {
    try {
        // console.log(process.env.MONGO_URI);
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`, {});
        console.log("Connected to MongoDB");
        console.log(connectionInstance.connection.host);
    } catch(error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connetDB;
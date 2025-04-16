import mongoose from "mongoose"

export const  connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Successfully connected to mongoDB✅!")
    } catch (error) {
        console.log("Failed to connect to mongoDB🚮!")
    }
}

export default connectMongo;
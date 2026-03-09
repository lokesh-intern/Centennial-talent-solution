import mongoose from "mongoose";

const connect = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(e){
        console.log(`Error at DB connection: ${e}`);
    }
}

export default connect;
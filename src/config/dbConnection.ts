import mongoose from "mongoose";

const connectionString = process.env.MONGO_URI;
if (!connectionString) {
  throw new Error("MONGO_URI is not defined in the .env file");
}

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(connectionString);
    console.log(
      `MongoDB connected: ${connect.connection.host} to ${connect.connection.name}`
    );
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;

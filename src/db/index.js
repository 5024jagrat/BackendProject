// import mongoose from "mongoose";

// import { DB_NAME } from "../constants.js";

// //DB is on another continent, so we will connect it using async await.

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`
//     );
//     console.log(
//       `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("MONGODB connections error ", error);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; 

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME, // ✅ Use dbName option instead of manual concatenation
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;

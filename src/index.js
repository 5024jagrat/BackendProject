import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
/*
const app = express()(
  // ()() //  iffis if kisi function ko immediately excute krwana hai.

  async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      app.on("error", () => {
        console.log("ERRR: ", error);
        throw error;
      });
      app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
      });
    } catch (error) {
      console.error("ERROR: ", error);
      throw err;
    }
  }
)();
*/

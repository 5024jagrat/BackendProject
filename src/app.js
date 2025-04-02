import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// bhot jagah se data aayega json se aayega url se aayega etc etc.

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
export { app };

app.use(express.static("public"));

app.use(cookieParser());

// aysnc await returns promise

// so we can use .then and .catch

// when you want to use any middleware than we will use using app.use
// middleware are nothing but jab hum req maangte hai server se uske beech kaa kaam is middleware agar uske beech mai mai kuch kaam krwana hai toh


// middleware is nothing but a checkink inbetween.

// (err,req,res,next) next is flag used in middleware that go to the next.

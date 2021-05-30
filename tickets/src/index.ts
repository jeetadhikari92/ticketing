import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No Jwt secret");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb!");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Tickets service running at 3000!");
  });
};

start();

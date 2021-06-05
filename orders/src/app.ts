import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundErrors,
  currentUser,
} from "@jeetadhikari/ticketing-common";
import { indexOrdersRouter } from "./routes";
import { showOrdersRouter } from "./routes/show";
import { newOrdersRouter } from "./routes/new";
import { deleteOrdersRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(indexOrdersRouter);
app.use(showOrdersRouter);
app.use(newOrdersRouter);
app.use(deleteOrdersRouter);

app.all("*", async () => {
  throw new NotFoundErrors();
});
app.use(errorHandler);

export { app };

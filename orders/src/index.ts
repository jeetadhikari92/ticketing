import mongoose from "mongoose";
import { app } from "./app";
import { ExpirationCompletedListener } from "./events/listeners/expiration-completed-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  console.log('Starting Orders service...')
  if (!process.env.JWT_KEY) {
    throw new Error("No Jwt secret");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("No NATS cluster id");
  }
  if (!process.env.NATS_URL) {
    throw new Error("No NATS url");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("No NATS client id");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompletedListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();

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
    console.log("Orders service running at 3000!");
  });
};

start();

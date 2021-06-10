import { Message } from "node-nats-streaming";
import {
  PaymentCreatedEvent,
  Listerner,
  Subjects,
  NotFoundErrors,
} from "@jeetadhikari/ticketing-common";
import { queueGroupName } from "./queue-group-name";
import { Order, OrderStatus } from "../../models/orders";

export class PaymentCreatedListener extends Listerner<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new NotFoundErrors();
    }
    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    msg.ack();
  }
}

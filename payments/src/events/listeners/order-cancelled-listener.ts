import {
  Listerner,
  NotFoundErrors,
  OrderCancelledEvent,
  Subjects,
  OrderStatus,
} from "@jeetadhikari/ticketing-common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/orders";
import { queueGroupName } from "./queueGroupName";

export class OrderCancelledListener extends Listerner<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version,
    });
    if (!order) {
      throw new NotFoundErrors();
    }
    order.set({ status: OrderStatus.Cancelled });
    await order.save();
    msg.ack();
  }
}

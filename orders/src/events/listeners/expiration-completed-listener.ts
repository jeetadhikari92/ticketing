import { Message } from "node-nats-streaming";
import { ExpirationCompletedEvent, Listerner, NotFoundErrors, OrderStatus, Subjects } from "@jeetadhikari/ticketing-common";
import { Order } from "../../models/orders";
import { queueGroupName } from "./queue-group-name";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompletedListener extends Listerner<ExpirationCompletedEvent> {
  readonly subject = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompletedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);
    if(!order) {
      throw new NotFoundErrors()
    }
    if(order.status === OrderStatus.Complete) {
      return msg.ack();
    }
    order.set({
      status: OrderStatus.Cancelled
    });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id
      },
      version: order.version
    });

    msg.ack();
  }
}
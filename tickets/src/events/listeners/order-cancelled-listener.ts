import { Message } from "node-nats-streaming";
import { Listerner, OrderCancelledEvent, Subjects } from "@jeetadhikari/ticketing-common";
import { queueGroupName } from "./queueGroupName";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { Ticket } from "../../models/ticket";

export class OrderCancelledListener extends Listerner<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: undefined });
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
    });

    msg.ack();
  }
}
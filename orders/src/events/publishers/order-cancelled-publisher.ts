import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@jeetadhikari/ticketing-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

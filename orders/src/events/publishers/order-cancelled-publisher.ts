import { Subjects, Publisher, OrderCancelledEvent } from '@jeetadhikari/ticketing-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

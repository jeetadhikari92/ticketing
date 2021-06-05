import { Publisher, OrderCreatedEvent, Subjects } from '@jeetadhikari/ticketing-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

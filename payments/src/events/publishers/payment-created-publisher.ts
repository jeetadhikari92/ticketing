import { Subjects, Publisher, PaymentCreatedEvent } from '@jeetadhikari/ticketing-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

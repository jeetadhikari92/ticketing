import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@jeetadhikari/ticketing-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

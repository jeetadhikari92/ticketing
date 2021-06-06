import { ExpirationCompletedEvent, Publisher, Subjects } from "@jeetadhikari/ticketing-common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
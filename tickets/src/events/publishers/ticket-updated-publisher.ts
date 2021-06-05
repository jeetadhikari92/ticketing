import { Publisher, Subjects, TicketUpdatedEvent} from '@jeetadhikari/ticketing-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated; 
}
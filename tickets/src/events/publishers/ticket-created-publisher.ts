import { Publisher, Subjects, TicketCreatedEvent} from '@jeetadhikari/ticketing-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated; 
}
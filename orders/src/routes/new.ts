import express, {Request, Response} from 'express';
import { body } from 'express-validator'
import mongoose from 'mongoose';
import { requireAuth, validateRequest, NotFoundErrors, BadRequestErrors, OrderStatus } from '@jeetadhikari/ticketing-common';
import { Ticket } from '../models/ticket';
import { Order } from '../models/orders';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const requestValidators = [
  body('ticketId')
    .notEmpty()
    .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
    .withMessage('Ticket id must be provided'),
]

router.post('/api/orders', 
  requireAuth, 
  requestValidators, 
  validateRequest, 
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if(!ticket) {
      throw new NotFoundErrors()
    }

    const isTicketReserved = await ticket.isReserved();
    if(isTicketReserved) {
      throw new BadRequestErrors('Ticket is already reserved');
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

    const order = new Order({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket
    })
    
    await order.save();
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price
      }
    })

    res.status(201).send(order);
})

export { router as newOrdersRouter };
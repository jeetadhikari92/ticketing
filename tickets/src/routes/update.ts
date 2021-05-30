import express, { Response, Request } from "express";
import { body } from "express-validator";
import {
  NotFoundErrors,
  validateRequest,
  requireAuth,
  NotAuthorizedError,
} from "@jeetadhikari/ticketing-common";
import { Ticket } from "../models/ticket";

const router = express.Router();

const requestValidator = [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price should be more than 0"),
];

router.put(
  "/api/tickets/:id",
  requireAuth,
  requestValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundErrors();
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    res.send(ticket);
  }
);

export { router as updateTicketRouter };

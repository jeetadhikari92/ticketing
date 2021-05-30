import express, { Response, Request } from "express";
import { NotFoundErrors } from "@jeetadhikari/ticketing-common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundErrors();
  }

  res.send(ticket);
});

export { router as showTicketRouter };

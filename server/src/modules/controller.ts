import { Request, Response } from "express";
import justify from "./justify.js";

export function justifyController(req: Request, res: Response) {
  const input = req.body as string;
  const output = justify(input);

  res.type("text/plain").send(output);
}

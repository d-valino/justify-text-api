import express from 'express'
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../services/auth/token.js";
import { consumeWords } from '../services/auth/rateLimit.js';


export const textPlainMiddleware = express.text({ type: 'text/plain', limit: '50mb' });


export function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
	const header = req.header("Authorization");
	if (!header?.startsWith("Bearer ")) {
		return res.status(401).json({ error: "Missing token" });
	}

	const token = header.slice(7);

	try {
		//	Throws exception if the token is not valid
		const { email } = verifyJwt(token);

		req.user = { email };
		next();
	} catch {
		res.status(401).json({ error: "Invalid token" });
	}
}


export function wordLimitMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	
	const email = req.user!.email;
	const text = req.body as string;

	if (!email) {
		return res.status(401).send("Not authorized");
	}

	//Check for daily word limit
	if (!consumeWords(email, text)) {
		return res.status(402).json({
			error: "Payment Required",
		});
	}

	next();
}

import { Request, Response } from "express";
import { signJwt } from "../services/auth/token.js";


function isValidEmail(email: string): boolean {
	//Regex verification to valid email formats
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function authController(req: Request, res: Response) {
	const { email } = req.body;

	if (typeof email !== "string" || !isValidEmail(email)) {
		return res.status(401).json({ error: "Invalid email" });
	}

	// Create token with JWT
	const token = signJwt({ email });

	res.json({ token });
}

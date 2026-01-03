import { Router} from 'express';
import express from 'express';
import { justifyController } from './controller.js';

const textPlainMiddleware = express.text({ type: 'text/plain' });

export function apiRoutes() {
	const router = Router();
	
	//Justify endpoint
	router.post( '/justify', textPlainMiddleware, justifyController);

	return router;
}

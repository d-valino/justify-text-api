import { Router} from 'express';
import { textPlainMiddleware } from './middleware/justifyMiddleware.js';
import { justifyController } from './controller/justifyController.js';

export function apiRoutes() {
	const router = Router();
	
	//Justify endpoint
	router.post( '/justify', textPlainMiddleware, justifyController);

	return router;
}

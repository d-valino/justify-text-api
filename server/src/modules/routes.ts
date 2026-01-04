import { Router} from 'express';
import { textPlainMiddleware } from './middleware/justifyMiddleware.js';
import { justifyController } from './controller/justifyController.js';
import { jsonMiddleware } from './middleware/authMiddleware.js';
import { authController } from './controller/authController.js';

export function apiRoutes() {
	const router = Router();
	
	//Justify endpoint
	router.post( '/justify', textPlainMiddleware, justifyController);

	//Router endpoint
	router.post('/token', jsonMiddleware, authController);

	return router;
}

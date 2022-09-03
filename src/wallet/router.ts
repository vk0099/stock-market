import { OK } from 'http-status-codes';
import { Router, NextFunction, Response, Request } from 'express';
import { checkBalance, logout, moneyTransaction } from './module';
import { APIError } from '../utils/custom-error';

const router = Router();

router.post(
	'/add-money',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.status(OK).send(
				await moneyTransaction(
					{ ...req.body, type: 'deposit' },
					res.user
				)
			);
		} catch (err) {
			next(new Error(err.message));
		}
	}
);

router.post(
	'/withdraw-money',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.status(OK).send(
				await moneyTransaction(
					{ ...req.body, type: 'withdraw' },
					res.user
				)
			);
		} catch (err) {
			next(new Error(err.message));
		}
	}
);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(OK).send(await checkBalance(res.user));
	} catch (err) {
		next(new Error(err.message));
	}
});

router.get(
	'/logout',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.status(OK).send(await logout(res.user));
		} catch (err) {
			next(new Error(err.message));
		}
	}
);

export = router;

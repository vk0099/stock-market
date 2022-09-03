import { OK } from 'http-status-codes';
import { Router, NextFunction, Response, Request } from 'express';
import { BuyShare, protfolioDetails, sharesList } from './module';

const router = Router();

router.post(
	'/buy-shares',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.status(OK).send(
				await BuyShare({ ...req.body, type: 'BUY' }, res.user)
			);
		} catch (err) {
			next(new Error(err.message));
		}
	}
);

router.post(
	'/sell-shares',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.status(OK).send(
				await BuyShare({ ...req.body, type: 'SELL' }, res.user)
			);
		} catch (err) {
			next(new Error(err.message));
		}
	}
);

router.get('', async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(OK).send(await protfolioDetails(res.user));
	} catch (err) {
		next(new Error(err.message));
	}
});

router.get(
	'/companies',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.status(OK).send(await sharesList());
		} catch (err) {
			next(new Error(err.message));
		}
	}
);

export = router;

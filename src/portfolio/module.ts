import { companysList } from '../utils/constants';
import { APIError } from '../utils/custom-error';
import { walletSchema } from '../wallet/wallet-schema';
import { companySchema } from './company-schema';
import { portfolioSchema } from './portfolio-schema';

export async function sharesList() {
	try {
		return await companySchema.find({}).exec();
	} catch (error) {
		throw error;
	}
}

export async function BuyShare(objBody, userObj) {
	try {
		if (!objBody || !objBody.companyID || !objBody.noofShares) {
			throw new APIError('please send the company id', 400);
		}
		let companyDetails = await companySchema.findById(objBody.companyID);
		let totalAmount = companyDetails.sharePrice * objBody.noofShares;
		let balance = await walletSchema.findOne({ userId: userObj['_id'] });
		let transactionDetails: any = {};
		if (!balance || balance.amount < totalAmount) {
			throw new APIError('Insufficient funds to buy shares', 400);
		}
		if (objBody.type === 'BUY') {
			transactionDetails = await portfolioSchema.findOneAndUpdate(
				{ userId: userObj['_id'], companyID: objBody['companyID'] },
				{
					$inc: { noofShares: objBody.noofShares }
				},
				{
					upsert: true,
					new: true
				}
			);
			await companySchema.findByIdAndUpdate(
				objBody.companyID,
				{
					$inc: { availableShares: -objBody.noofShares }
				},
				{ new: true }
			);
			await walletSchema.findByIdAndUpdate(userObj['_id'], {
				$inc: { amount: -totalAmount }
			});
		} else if (objBody.type === 'SELL') {
			transactionDetails = await portfolioSchema.findOneAndUpdate(
				{ userId: userObj['_id'], companyID: objBody['companyID'] },
				{
					$inc: { noofShares: -objBody.noofShares }
				},
				{ new: true }
			);
			await companySchema.findByIdAndUpdate(objBody.companyID, {
				$inc: { availableShares: objBody.noofShares }
			});
			await walletSchema.findByIdAndUpdate(userObj['_id'], {
				$inc: { amount: totalAmount }
			});
		}
		return transactionDetails;
	} catch (error) {
		throw error;
	}
}

export async function protfolioDetails(userObj) {
	try {
		return await portfolioSchema
			.find({ userId: userObj['_id'] })
			.populate([{ path: 'companyID' }, { path: 'userId' }]);
	} catch (error) {}
}

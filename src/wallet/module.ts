import { userSchema } from '../users/user-schema';
import { APIError } from '../utils/custom-error';
import { walletSchema } from './wallet-schema';

export async function moneyTransaction(objBody, userObj) {
	try {
		if (!objBody || !objBody.amount) {
			throw new APIError('required fields are missing', 400);
		}
		let wallet: any = {};
		if (objBody.type === 'deposit') {
			wallet = await walletSchema.findOneAndUpdate(
				{ userId: userObj['_id'] },
				{ $inc: { amount: objBody.amount } },
				{ new: true }
			);
		} else if (objBody.type === 'withdraw') {
			wallet = await walletSchema.findOneAndUpdate(
				{ userId: userObj['_id'] },
				{ $inc: { amount: -objBody.amount } },
				{ new: true }
			);
		}
		return { staus: 'transaction done sucessfully', wallet };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function checkBalance(userObj) {
	try {
		let wallet = await walletSchema.findOne({ userId: userObj['_id'] });
		return wallet;
	} catch (error) {
		throw new APIError(error.message, error.code);
	}
}

export async function logout(userObj) {
	try {
		if (userObj) {
			return await userSchema.findByIdAndUpdate(
				userObj._id,
				{ $set: { token: null } },
				{ new: true }
			);
		} else {
			throw new APIError('user was not able to logout', 400);
		}
	} catch (error) {
		throw error;
	}
}

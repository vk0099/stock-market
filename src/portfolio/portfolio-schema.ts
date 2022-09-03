import * as mongoose from 'mongoose';
import { userSchema } from '../users/user-schema';
import { companySchema } from './company-schema';

const schema = new mongoose.Schema(
	{
		companyID: { type: mongoose.Types.ObjectId, ref: companySchema },
		buySharePrice: { type: Number },
		noofShares: { type: Number },
		userId: { type: mongoose.Types.ObjectId, ref: userSchema }
	},
	{ timestamps: true }
);

export const portfolioSchema = mongoose.model('portfolio', schema);

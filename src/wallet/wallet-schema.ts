import * as mongoose from 'mongoose';
import { userSchema } from '../users/user-schema';

const schema = new mongoose.Schema(
	{
		amount: { type: Number, default: 0 },
		userId: { type: mongoose.Types.ObjectId, ref: userSchema }
	},
	{ timestamps: true }
);

export const walletSchema = mongoose.model('wallet', schema);

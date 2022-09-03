import * as mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		name: { type: String },
		sharePrice: { type: Number },
		availableShares: { type: Number, default: 10000 }
	},
	{ timestamps: true }
);

export const companySchema = mongoose.model('company', schema);

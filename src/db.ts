import * as mongoose from 'mongoose';

export = (instance = 'Main') => {
	mongoose.connect('mongodb://localhost/market' as any, {}).then(
		() => {
			console.log(`${instance} DB Connection established successfully.`);
		},
		(err) => {
			console.log(`${instance} DB Connection to established failed.`);
		}
	);
};

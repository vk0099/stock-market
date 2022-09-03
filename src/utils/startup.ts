import { companySchema } from '../portfolio/company-schema';
import { userSchema } from '../users/user-schema';
import { companysList } from './constants';
import { hashPassword } from './utils';

(async function userInit(): Promise<boolean> {
	let existingUserCount: any = await userSchema.find({}).exec();
	let companyExistingData: any = await companySchema.find({}).exec();
	if (!existingUserCount.length) {
		await userSchema.create(
			{
				userName: 'vamsi',
				email: 'vamsikrishnagonuguntla77@gmail.com',
				password: hashPassword('vamsi@123')
			},
			{
				userName: 'vk',
				email: 'vamsikrishnagonuguntla99@gmail.com',
				password: hashPassword('vamsi@123')
			}
		);
		console.log('No existing users found. users created successfully.');
	}
	if (!companyExistingData.length) {
		await companySchema.create(companysList);
		console.log('No companies are found. companies created successfully.');
	} else {
		console.log(`${existingUserCount.length} existing users found in DB`);
		console.log(
			`${companyExistingData.length} are the comapies stored in DB`
		);
	}
	return true;
})();

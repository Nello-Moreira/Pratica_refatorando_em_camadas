import jwt from 'jsonwebtoken';
import financialService from '../services/financialService';

async function postFinancialEvent(req, res) {
	const authorization = req.headers.authorization || '';
	const token = authorization.split('Bearer ')[1];
	const { value, type } = req.body;

	if (!value || !type) {
		return res.sendStatus(400);
	}

	if (!['INCOME', 'OUTCOME'].includes(type)) {
		return res.sendStatus(400);
	}

	if (value < 0) {
		return res.sendStatus(400);
	}

	let user = jwt.verify(token, process.env.JWT_SECRET);

	await financialService.saveEvent({ userId: user.id, value, type });

	res.sendStatus(201);
}

export default { postFinancialEvent };

import jwt from 'jsonwebtoken';
import financialService from '../services/financialService';

async function postFinancialEvent(req, res) {
	const userId = req.userId;
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

	await financialService.saveEvent({ userId, value, type });

	res.sendStatus(201);
}

async function getFinancialEvents(req, res) {
	const userId = req.userId;

	const events = await financialService.searchEvents(userId);

	if (!events) {
		return res.sendStatus(500);
	}

	return res.send(events.rows);
}

async function getSum(req, res) {
	const userId = req.userId;

	const sum = await financialService.getSum(userId);

	if (sum === null) {
		return res.sendStatus(500);
	}

	return res.send({ sum });
}

export default { postFinancialEvent, getFinancialEvents, getSum };

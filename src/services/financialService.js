import financialRepository from '../repositories/financialRepository';

async function saveEvent({ userId, value, type }) {
	return await financialRepository.insertFinancialEvent({
		userId,
		value,
		type,
	});
}

async function searchEvents(userId) {
	return await financialRepository.searchFinancialEvent(userId);
}

async function getSum(userId) {
	const events = await searchEvents(userId);

	if (!events) {
		return null;
	}

	return events.rows.reduce(
		(total, event) =>
			event.type === 'INCOME' ? total + event.value : total - event.value,
		0
	);
}

export default { saveEvent, searchEvents, getSum };

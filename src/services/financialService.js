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

export default { saveEvent, searchEvents };

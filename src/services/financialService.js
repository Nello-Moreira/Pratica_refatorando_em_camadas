import financialRepository from '../repositories/financialRepository';

async function saveEvent({ userId, value, type }) {
	return await financialRepository.insertFinancialEvent({
		userId,
		value,
		type,
	});
}

export default { saveEvent };

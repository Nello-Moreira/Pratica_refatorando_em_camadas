import connection from '../database.js';

async function searchFinancialEvent(userId) {
	try {
		return await connection.query(
			`SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
			[userId]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertFinancialEvent({ userId, value, type }) {
	try {
		await connection.query(
			`INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
			[userId, value, type]
		);
		return true;
	} catch (error) {
		return null;
	}
}

export default { searchFinancialEvent, insertFinancialEvent };

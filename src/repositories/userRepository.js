import connection from '../database.js';

async function searchUserByEmail(email) {
	try {
		return await connection.query(
			`SELECT * FROM "users" WHERE "email"=$1`,
			[email]
		);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function insertUser({ name, email, hashedPassword }) {
	try {
		await connection.query(
			`INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
			[name, email, hashedPassword]
		);
		return true;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default { searchUserByEmail, insertUser };

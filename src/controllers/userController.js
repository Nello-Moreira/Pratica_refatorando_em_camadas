import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../database.js';

import userService from '../services/userService.js';

async function signUp(req, res) {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.sendStatus(400);
	}

	const registered = await userService.registerUser({
		name,
		email,
		password,
	});

	if (registered === null) {
		return res.sendStatus(500);
	}

	if (registered === false) {
		return res.sendStatus(409);
	}

	return res.sendStatus(201);
}

async function signIn(req, res) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.sendStatus(400);
		}

		const user = await connection.query(
			`SELECT * FROM "users" WHERE "email"=$1`,
			[email]
		);

		if (
			!user.rows[0] ||
			!bcrypt.compareSync(password, user.rows[0].password)
		) {
			return res.sendStatus(401);
		}

		const token = jwt.sign(
			{
				id: user.rows[0].id,
			},
			process.env.JWT_SECRET
		);

		res.send({
			token,
		});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export default { signUp, signIn };

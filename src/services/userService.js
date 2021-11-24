import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository.js';
import jwt from 'jsonwebtoken';

async function registerUser({ name, email, password }) {
	const user = await userRepository.searchUserByEmail(email);

	if (user === null) {
		return null;
	}

	if (user.rowCount > 0) {
		return false;
	}

	const hashedPassword = bcrypt.hashSync(password, 12);

	await userRepository.insertUser({ name, email, hashedPassword });

	return true;
}

async function authenticate({ email, password }) {
	const user = await userRepository.searchUserByEmail(email);

	if (!user) return null;

	if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
		return false;
	}

	const token = jwt.sign(
		{
			id: user.rows[0].id,
		},
		process.env.JWT_SECRET
	);

	return token;
}

function activeSession(token) {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch {
		return false;
	}
}

export default { authenticate, registerUser, activeSession };

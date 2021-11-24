import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository.js';

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

async function authenticate({ email, password }) {}

export default { authenticate, registerUser };

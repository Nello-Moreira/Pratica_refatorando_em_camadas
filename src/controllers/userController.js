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
	const { email, password } = req.body;

	if (!email || !password) {
		return res.sendStatus(400);
	}

	const token = await userService.authenticate({ email, password });

	if (token === null) {
		return res.sendStatus(500);
	}

	if (token === false) {
		return res.sendStatus(401);
	}

	return res.send({ token });
}

export default { signUp, signIn };

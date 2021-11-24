import jwt from 'jsonwebtoken';

async function tokenMiddleware(req, res, next) {
	const authorization = req.headers.authorization || '';
	const token = authorization.split('Bearer ')[1];

	if (!token) return res.sendStatus(401);

	try {
		jwt.verify(token, process.env.JWT_SECRET);
	} catch {
		return res.sendStatus(401);
	}

	return next();
}

export default tokenMiddleware;

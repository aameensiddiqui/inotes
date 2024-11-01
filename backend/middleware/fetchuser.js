const jwt = require("jsonwebtoken");
const JWT_SECRETKEY = "hellomoto";

const fetchuser = (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send({ error: "please authenticate using a valid token" });
	}
	try {
		const data = jwt.verify(token, JWT_SECRETKEY);
		req.user = data.user;
		next();
	} catch (e) {
		res.status(401).send({ error: "please authenticate using a valid token" });
	}
};
module.exports = fetchuser;

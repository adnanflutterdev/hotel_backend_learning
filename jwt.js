const jwt = require("jsonwebtoken");

const jwtAuthenticationMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    console.log('first')
    res.status(401).json({ error: "Authorization token is required" });
  }
  const token = authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid authorization token" });
  }
};

const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3000 });
};

module.exports = { jwtAuthenticationMiddleware, generateJwtToken };

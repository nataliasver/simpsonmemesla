const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("El token", token);
    console.log("El header", authHeader);
    console.log(authHeader.split(' ')[1])
    if(token == null) return res.sendStatus(401);
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log(err)
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}

module.exports = { verifyToken }
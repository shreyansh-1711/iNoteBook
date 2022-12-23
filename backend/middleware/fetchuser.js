var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Shreyanshisop';

const fetchuser = (req, res, next) => {
    //Get the user from JWT token and  add id to req object

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authentictae using valid token" })

    }    
    try {

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authentictae using valid token" })
    }
}


module.exports = fetchuser
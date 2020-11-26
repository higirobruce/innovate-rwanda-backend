var jwt = require('jsonwebtoken');

const getToken = (req, res) => {
    const token = jwt.sign({ user: res.locals.user }, process.env.SECRETKEY, { expiresIn: '1d' });
    if (token) {
        res.status(200).send({
            message: "Token Got",
            user:res.locals.user,
            token:token,
            companyInfo:res.locals.companyInfo
        });
    } else {
        res.status(403).send({
            message: "Getting token failed",
            user:res.locals.user,
            token: '',
            companyInfo:res.locals.companyInfo
        });
    }
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (typeof token !== 'undefined') {
        jwt.verify(token, process.env.SECRETKEY, (err,data) => {
            if (err) {
                res.status(403).send({
                    message: "Authentication Failed"
                });
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({
            message: "Invalid/Expired token"
        });
    }
}

module.exports = {
    getToken,
    verifyToken,
}
const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    console.log('verifying token')
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied');

    try {
        //Get user ID from token payload
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //if (!verified) return res.status(401).send('Access denied 2');
        req.user = verified;
        console.log('verified:',verified,req.user)
        next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
}
//THIS AUTHENTICATION HELPER EXAMPLE IS FROM GOOGLEBOOKS

const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    // function for our authenticated routes
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function (req, res, next) {
        // allows token to be sent via  req.query or headers
        let token = req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return res.status(400).json({ message: 'You have no token!' });
        }

        // verify token and get user data out of it
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
            return res.status(400).json({ message: 'invalid token!' });
        }

        // send to next endpoint
        next();
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

    //MOD 21 RECOMMENDED JWT MIDDLEWARE
    authMiddleware: function({ req }) {
        //OKs TOKEN TO BE SENT
        let token = req.body.token || req.query.token || req.headers.authorization;

        //SEPARATE BEARER FROM TOKENVALUE
        if (req.headers.authorization) {
            token = token
              .split(' ')
              .pop()
              .trim();
        }
        
        //IF NOT TOKEN - RETURN AS IS
        if (!token) {
            return req;
        }

        try {
            //DECODE AND ATTACH USER DATA TO REQ. OBJ
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }            

        // RETURN UPDATE REQ. OBJ
        return req;
    }

};

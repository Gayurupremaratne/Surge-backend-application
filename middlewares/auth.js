const jwt = require('jwt-simple');
const bearerToken = require('bearer-token');
const user = require('../models/user');
const response = require("../config/response");

module.exports = function (req, res, next) {
    if (req.url.indexOf('/api/user/login') === 0) {
        next();
    } else {
        try {
            bearerToken(req, function (err, token) {
                if (err) {
                    response.fail(req, res, response.messages.empty_header);
                    return;
                } else {
                    try {
                        const decoded = jwt.decode(token, process.env.SURGE_AUTH_SECRET);
                        const isExpired = (new Date(decoded.exp).getTime() <= Date.now());

                        if (isExpired || !decoded.id) {
                            response.fail(req, res, response.messages.expired_token, 'Login expired');
                            return;
                        }

                        user.getUserById(decoded.id, (err, user) => {
                            if (err) {
                                response.fail(req, res, response.messages.db_error, 'Request failed', err);
                                return;
                            } else {
                                if (user.length === 0) {
                                    response.fail(req, res, response.messages.not_found, 'No user Found');
                                    return;
                                }else{
                                    user.id=decoded.id
                                    next();
                                }
                            }
                        });


                    } catch (err) {
                        response.fail(req, res, response.messages.invalid_token, 'Authentication failed');
                        return;
                    }
                }
            });
        } catch (err) {
            response.fail(req, res, response.messages.empty_header);
            return;
        }
    }
    

    
};

const response = require("../helpers/response");
const { trimParams } = require("../helpers/utils");

const validator = {

  login: (req, res, next) => {
    const { email, password } = trimParams(req.body);

    if (!email || !password) {
        response.fail(req, res, response.messages.parameter_missing, 'Please provide both email and password');
        return;
    } else {
        next();
    }
  },

}

module.exports = validator;

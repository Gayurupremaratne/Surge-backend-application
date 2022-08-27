const response = require('../helpers/response');
const UserModel = require('../models/user');


const adminRoutes = {

    getUsers: (req, res) => {
     
        UserModel.find((err, data) => {
            if (err) {
                response.fail(req, res, response.messages.db_error, 'Get users', err);
                return;
            }
            else {
                response.success(req, res, data, "successfully retrieved");
                return;

            }
        });
    },

    getUserByID: (req, res) => {
        const { id } = req.params;
        UserModel.findById(id, (err, data) => {
            if (err) {
                response.fail(req, res, response.messages.db_error, 'Get users', err);
                return;
            }
            else {
                response.success(req, res, data, "successfully retrieved");
                return;

            }
        });
    },


};
module.exports = adminRoutes;

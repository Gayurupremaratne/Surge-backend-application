const response = require('../helpers/response');
const UserModel = require('../models/user');
const paginate = require('jw-paginate');;

const adminRoutes = {

    getUsers: (req, res) => {

        UserModel.find((err, data) => {
            if (err) {
                response.fail(req, res, response.messages.db_error, 'Get users', err);
                return;
            }
            else {
                const items = data
               
                // get page from query params or default to first page
                const page = parseInt(req.params.no) || 1;

                // get pager object for specified page
                const pageSize = 2;
                const pager = paginate(items.length, page, pageSize);

                // get page of items from items array
                const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

                // return pager object and current page of items
                return res.json({ pager, pageOfItems });
                // response.success(req, res, data, "successfully retrieved");
                // return;

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

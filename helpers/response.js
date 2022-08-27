const messages = {
  invalid_url: {
    status: 404,
    code: 9001,
    message: "Invalid API URL"
  },
  parameter_missing: {
    status: 400,
    code: 9002,
    message: "Mandatory Parameter Missing"
  },
  db_error: {
    status: 400,
    code: 9003,
    message: "Database Error"
  },
  not_found: {
    status: 404,
    code: 9004,
    message: "Data not found"
  },
  empty_header: {
    status: 404,
    code: 9005,
    message: "Empty header"
  },
  expired_token: {
    status: 404,
    code: 9006,
    message: "Token expired"
  },
  invalid_token: {
    status: 404,
    code: 9007,
    message: "Invalid access token"
  },
  invalid_params: {
    status: 404,
    code: 9008,
    message: "Invalid parameter"
  },
  unauthorized_request: {
    status: 404,
    code: 9009,
    message: "Unauthorized user"
  },
  server_error: {
    status: 500,
    code: 9010,
    message: "Server error"
  },
  unauthorized_user: {
    status: 403,
    code: 9011,
    message: "Unauthorized user"
  },
  inactive_message: {
    status: 403,
    code: 9012,
    message: "Inactive message"
  },
  unable_to_load: {
    status: 403,
    code: 9013,
    message: "Inactive message"
  }  
  
};

const success = function (req, res, data, friendly_message) {
	const resp = {
		"status": true,
		"code": 0,
		"message": "Success",
		"friendly_message": "Success",
		"data": data

	};

	if (friendly_message) {
		resp.friendly_message = friendly_message;
	}

	if (!res.headersSent) {
		res.status(200);
		res.json(resp);
	}
	return;

};

const fail = function (req, res, message, friendly_message, data) {
	var resp = {
		"status": false,
		"code": message.code,
		"message": message.message,
		"friendly_message": message.message,
		"data": data || {}
	};

	if (friendly_message) {
		resp.friendly_message = friendly_message;
	}

	if (!res.headersSent) {
		res.json(resp);
	}
	return;
};

exports.success = success;
exports.fail = fail;
exports.messages = messages;

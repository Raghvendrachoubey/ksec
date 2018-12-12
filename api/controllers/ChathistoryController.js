module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    savehistory: function (req, res) {
        if (req.body) {
			Chathistory.savehistory(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
	getpanindia: function (req, res) {
        if (req.body) {
            Chathistory.getpanindia(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    getdashboarddata: function (req, res) {
        if (req.body) {
            Chathistory.getdashboarddata(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    like: function (req, res) {
        if (req.body) {
            Chathistory.like(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    dislike: function (req, res) {
        if (req.body) {
            Chathistory.dislike(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
	tagwithcrn: function (req, res) {
        if (req.body) {
            Chathistory.tagwithcrn(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
	gettaggedcrn: function (req, res) {
        if (req.body) {
            Chathistory.gettaggedcrn(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
	getunans: function (req, res) {
        if (req.body) {
			res.setHeader('Access-Control-Allow-Origin', 'http://10.240.21.20:8003');
            Chathistory.getunans(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
    getfeedback: function (req, res) {
        if (req.body) {
            Chathistory.getfeedback(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
	readfaq: function (req, res) {
        if (req.body) {
            Chathistory.readfaq(req.body, res.callback);
        }
        else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            })
        }
    },
};
module.exports = _.assign(module.exports, controller);
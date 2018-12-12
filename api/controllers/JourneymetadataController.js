module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getjourney: function (req, res) {
        if (req.body) {
            Journeymetadata.getjourney(req.body, res.callback);
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
	readjourney: function (req, res) {
        if (req.body) {
            Journeymetadata.readjourney(req.body, res.callback);
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
	getdropdowncount: function (req, res) {
        if (req.body) {
            Journeymetadata.getdropdowncount(req.body, res.callback);
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
	getchargejourney: function (req, res) {
        if (req.body) {
            Journeymetadata.getchargejourney(req.body, res.callback);
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
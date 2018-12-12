module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getnotification: function (req, res) {
        if (req.body) {
            Notifications.getnotification(req.body, res.callback);
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
    readnotificationcount:function (req, res) {
        if (req.body) {
            Notifications.readnotificationcount(req.body, res.callback);
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
    readnotiit:function (req, res) {
        if (req.body) {
            Notifications.readnotiit(req.body, res.callback);
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
	readFile: function (req, res) {
        if (req.query.file) {
            var width;
            var height;
            if (req.query.width) {
                width = parseInt(req.query.width);
                if (_.isNaN(width)) {
                    width = undefined;
                }
            }
            if (req.query.height) {
                height = parseInt(req.query.height);
                if (_.isNaN(height)) {
                    height = undefined;
                }
            }
            Notifications.readUploaded(req.query.file, width, height, req.query.style, res);
        } else {
            res.callback("No Such File Found");
        }

    },
};
module.exports = _.assign(module.exports, controller);
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getticker: function (req, res) {
        if (req.body) {
            Ticker.getticker(req.body, res.callback);
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
    readticker:function (req, res) {
        if (req.body) {
            Ticker.readticker(req.body, res.callback);
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
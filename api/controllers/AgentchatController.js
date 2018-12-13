module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    savechat: function (req, res) {
        if (req.body) {
            Agentchat.savechat(req.body, res.callback);
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
    disconnectuser: function (req, res) {
        if (req.body) {
            Agentchat.disconnectuser(req.body, res.callback);
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
    setdisconnectsocket: function (req, res) {
        if (req.body) {
            Agentchat.setdisconnectsocket(req.body, res.callback);
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
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getSysMsg: function (req, res) {
        //console.log(req);
        if (req.body) {
            Chatbotautolist.getSysMsg(req.body, res.callback);
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
    getDthlink: function (req,res) {
        //console.log(req);
        if (req.body) {
            Chatbotautolist.getDthlink(req.body, res.callback);
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
    getttsSpeech: function (req,res) {
        //console.log(req);
        if (req.body) {
            Chatbotautolist.getttsSpeech(req.body, res.callback);
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
module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    loginuser: function (req, res) {
        
        if (req.body) {
            Usermasterad.loginuser(req,req.body, res.callback);
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
	getsessiondata:function (req, res) {
        //res.header("Access-Control-Allow-Origin", '10.240.21.21:8002');
        if (req.body) {
            Usermasterad.getsessiondata(req,req.body, res.callback);
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
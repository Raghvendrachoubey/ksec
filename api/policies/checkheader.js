module.exports = function (req, res, next) {
	//console.log("setting header");
	//res.header("Access-Control-Allow-Origin", '10.240.21.21:8002');
    next();
};
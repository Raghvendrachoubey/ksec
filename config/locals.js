module.exports = {
    hookTimeout: 30000000,
	ssl: {
        key: require('fs').readFileSync(__dirname + '/ssl/key2.pem'),
        cert: require('fs').readFileSync(__dirname + '/ssl/cert1.pem')
    },
};

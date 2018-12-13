module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    announce: function(req, res) {

        // Get the socket ID from the reauest
        var socketId = sails.sockets.getId(req);
        //console.log(req);
        // Get the session from the request
        var session = req.session;
        var access_role = req.body.query.access_role;
        var sid = req.body.query.sid;
        var sname = req.body.query.name;
        // Create the session.users hash if it doesn't exist already
        session.users = session.users || {};

        User.create({
        name: 'unknown',
        socketId: socketId,
        access_role: access_role,
        sid: sid,
        sname: sname,
        }).exec(function(err, user) {
        if (err) {
            return res.serverError(err);
        }

        // Save this user in the session, indexed by their socket ID.
        // This way we can look the user up by socket ID later.
        session.users[socketId] = user;
        //console.log(user,"userdata");
        // Subscribe the connected socket to custom messages regarding the user.
        // While any socket subscribed to the user will receive messages about the
        // user changing their name or being destroyed, ONLY this particular socket
        // will receive "message" events.  This allows us to send private messages
        // between users.
        User.subscribe(req, user, 'message');

        // Get updates about users being created
        User.watch(req);

        // Get updates about rooms being created
        Room.watch(req);

        // Publish this user creation event to every socket watching the User model via User.watch()
        User.publishCreate(user, req);

        res.json(user);

        });


    },
    leaveroom: function(req, res) {

        if ( _.isUndefined(req.param('roomName')) ) {
            return res.badRequest('`roomName` is required.');
        }

        if (!req.isSocket) {
            return res.badRequest('This endpoints only supports socket requests.');
        }

        var roomName = req.param('roomName');
        console.log(roomName);
        sails.sockets.leave(req, roomName, function(err) {
            if (err) {return res.serverError(err);}
            return res.json({
            message: 'Left a fun room called '+roomName+'!'
            });
        });


    },
    loginFacebook: function (req, res) {
        passport.authenticate('facebook', {
            scope: ['public_profile', 'user_friends', 'email'],
            failureRedirect: '/'
        }, res.socialLogin)(req, res);
    },
    loginGoogle: function (req, res) {
        if (req.query.returnUrl) {
            req.session.returnUrl = req.query.returnUrl;
        } else {

        }

        passport.authenticate('google', {
            scope: ['openid', 'profile', 'email'],
            failureRedirect: '/'
        }, res.socialLogin)(req, res);
    },
    profile: function (req, res) {
        if (req.body && req.body.accessToken) {
            User.profile(req.body, res.callback);
        } else {
            res.callback("Please provide Valid AccessToken", null);
        }
    },
    pdf: function (req, res) {

        var html = fs.readFileSync('./views/pdf/demo.ejs', 'utf8');
        var options = {
            format: 'A4'
        };
        var id = mongoose.Types.ObjectId();
        var newFilename = id + ".pdf";
        var writestream = gfs.createWriteStream({
            filename: newFilename
        });
        writestream.on('finish', function () {
            res.callback(null, {
                name: newFilename
            });
        });
        pdf.create(html).toStream(function (err, stream) {
            stream.pipe(writestream);
        });
    },
    backupDatabase: function (req, res) {
        res.connection.setTimeout(200000000);
        req.connection.setTimeout(200000000);
        var q = req.host.search("127.0.0.1");
        if (q >= 0) {
            _.times(20, function (n) {
                var name = moment().subtract(5 + n, "days").format("ddd-Do-MMM-YYYY");
                exec("cd backup && rm -rf " + name + "*", function (err, stdout, stderr) {});
            });
            var jagz = _.map(mongoose.models, function (Model, key) {
                var name = Model.collection.collectionName;
                return {
                    key: key,
                    name: name,
                };
            });
            res.json("Files deleted and new has to be created.");
            jagz.push({
                "key": "fs.chunks",
                "name": "fs.chunks"
            }, {
                "key": "fs.files",
                "name": "fs.files"
            });
            var isBackup = fs.existsSync("./backup");
            if (!isBackup) {
                fs.mkdirSync("./backup");
            }
            var mom = moment();
            var folderName = "./backup/" + mom.format("ddd-Do-MMM-YYYY-HH-mm-SSSSS");
            var retVal = [];
            fs.mkdirSync(folderName);
            async.eachSeries(jagz, function (obj, callback) {
                exec("mongoexport --db " + database + " --collection " + obj.name + " --out " + folderName + "/" + obj.name + ".json", function (data1, data2, data3) {
                    retVal.push(data3 + " VALUES OF " + obj.name + " MODEL NAME " + obj.key);
                    callback();
                });
            }, function () {
                // res.json(retVal);
            });
        } else {
            res.callback("Access Denied for Database Backup");
        }
    },
    getAllMedia: function (req, res) {
        Media.getAllMedia(req.body, res.callback);
    },
	checkstatus: function (req, res) {
        
		res.json({
			value: true,
			data: {
				message: "ok"
			}
		});
    },
};
module.exports = _.assign(module.exports, controller);
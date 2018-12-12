var schema = new Schema({
    From_Date: {
        type: Date,
    },
    To_Date: {
        type: Date,
    },
    Status: {
        type:Number
    },
    Ticker_name: {
        type:String
    },
    Created_time:{
        type:Date
    },
    DocFile:{
        type:Array
    },
    TickerType:{
        type:String
    },
    Title:{
        type:String
    },
    LinkURL:{
        type:String
    },
    users:{
        type:Array
    }
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Notifications', schema,'Notification');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "Notification", "Notifications"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var CryptoJS = require("crypto-js");
var model = {
    readnotificationcount: function (data, callback) {
        Notifications.count({
            $and:[{From_Date:{$lte:new Date()}},{To_Date:{$gte:new Date()}}],
            Status:0,
            'users.email':data.user
        }, function(err, found)  {
            if (err) {
                callback(err, null);
            } 
            else {
                console.log(found);
               
                found2 = found;
                //var Journey_Data = JSON.parse(found.Journey_Data);
                callback(null,{count: found});
                
            }

        });
        
    },
    getnotification: function (data, callback) {
		var ciphertext= data.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        Notifications.find({
            //$and:[{From_Date:{$lte:new Date(data.today)}},{To_Date:{$gte:new Date(data.today)}}],
			$and:[{From_Date:{$lte:new Date(decryptedData.today)}},{To_Date:{$gte:new Date(decryptedData.today)}}],
            Status:0
        },{
			Modified_By:0,Upload_By:0,users:0
		}
		).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    if (err) {
                            return err;
                    }
                    else {
                        //found2 = found;
                        Notifications.count({
                            $and:[{From_Date:{$lte:new Date(decryptedData.today)}},{To_Date:{$gte:new Date(decryptedData.today)}}],
                            Status:"0",
                            'users.email':decryptedData.user
                        }, function(err, found2)  {
                            if (err) {
                                callback(err, null);
                            } 
                            else {
                                
                               
                                //found2 = found;
                                var response={data:found,count:found2} 
                                //var Journey_Data = JSON.parse(found.Journey_Data);
                                //callback(null,{count: found});
                                callback(null, response);        
                            }
                
                        });
                        
                    }
                    
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
        
    },
    readnotiit:function(data,callback){
		var ciphertext= data.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        Notifications.update(
            { 
                _id:decryptedData.id,
            },
            {
                // $set:{
                //     livechat:livechat,
                //     unanswered:unanswered,
                //     unshandled:unshandled
                // }, 
                $push: { 
                    users:
                    {
                        email:decryptedData.user,
                        readdate:new Date(),
                    }
                } 
            }
        ).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    if (err) {
                            return err;
                    }
                    else {
                        found2 = found;
                        //var Journey_Data = JSON.parse(found.Journey_Data);
                        callback(null, found);
                    }
                    
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    },
	readUploaded: function (filename, width, height, style, res) {
        res.set({
            'Cache-Control': 'public, max-age=31557600',
            'Expires': new Date(Date.now() + 345600000).toUTCString()
        });
		//res.removeHeader('Content-Security-Policy');
		//res.removeHeader('X-Frame-Options');
		//res.removeHeader('x-xss-protection');
		res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob: http://10.240.21.21/cingularitidev/ http://10.240.21.21/cingulariti/; frame-src 'none'; object-src 'self' data: blob:; connect-src 'self' http://10.240.21.21:8000 http://10.240.21.21:9052 http://10.240.21.21:5000; frame-ancestors 'none'; plugin-types application/pdf");
		//console.log(style);
		/*gfs.files.find({ filename: filename,root:'wid_notification' }).toArray(function (err, files) {
			if (err) console.log(err);
			console.log(files);
		});*/
		
			//console.log(mongoose.connections[0].db);
			var readstream = gfs.createReadStream({
				filename:filename,root:'wid_notification'
				//filename: filename,root:'wid_notification'
			});
			readstream.on('error', function (err) {
				res.json({
					value: false,
					error: err
				});
				
			});
			
			var buf;
			var newNameExtire;
			var bufs = [];
			var proceedI = 0;
			var wi;
			var he;
			readstream.on('data', function (d) {
				bufs.push(d);
			});
			readstream.on('end', function () {
				buf = Buffer.concat(bufs);
				//console.log(buf);
				proceed();
			});


			function proceed() {
				proceedI++;
				if (proceedI === 2) {
					Jimp.read(buf, function (err, image) {
						if (err) {
							res.callback(err, null);
						} else {
							if (style === "contain" && width && height) {
								image.contain(width, height).getBuffer(Jimp.AUTO, writer2);
							} else if (style === "cover" && (width && width > 0) && (height && height > 0)) {
								image.cover(width, height).getBuffer(Jimp.AUTO, writer2);
							} else if ((width && width > 0) && (height && height > 0)) {
								image.resize(width, height).getBuffer(Jimp.AUTO, writer2);
							} else if ((width && width > 0) && !(height && height > 0)) {
								image.resize(width, Jimp.AUTO).getBuffer(Jimp.AUTO, writer2);
							} else {
								image.resize(Jimp.AUTO, height).getBuffer(Jimp.AUTO, writer2);
							}
						}
					});
				}
			}

			function writer2(err, imageBuf) {
				var writestream2 = gfs.createWriteStream({
					filename: newNameExtire,root:'wid_notification'
				});
				var bufferStream = new stream.PassThrough();
				bufferStream.end(imageBuf);
				bufferStream.pipe(writestream2);
				res.send(imageBuf);
			}

			function read2(filename2) {
				console.log("inside read2");
				var readstream2 = gfs.createReadStream({
					filename: filename2,root:'wid_notification'
				});
				
				readstream2.on('error', function (err) {
					res.json({
						value: false,
						error: err
					});
					console.log(err);
				});
				readstream2.pipe(res);
			}
			var onlyName = filename.split(".")[0];
			var extension = filename.split(".").pop();
			if ((extension == "jpg" || extension == "png" || extension == "gif") && ((width && width > 0) || (height && height > 0))) {
				//attempt to get same size image and serve
				var newName = onlyName;
				if (width > 0) {
					newName += "-" + width;
				} else {
					newName += "-" + 0;
				}
				if (height) {
					newName += "-" + height;
				} else {
					newName += "-" + 0;
				}
				if (style && (style == "contain" || style == "cover")) {
					newName += "-" + style;
				} else {
					newName += "-" + 0;
				}
				newNameExtire = newName + "." + extension;
				gfs.exist({
					filename: newNameExtire,root:'wid_notification'
				}, function (err, found) {
					//console.log(err);
					if (err) {
						res.json({
							value: false,
							error: err
						});
					}
					if (found) {
						read2(newNameExtire);
					} else {
						proceed();
					}
				});
				//else create a resized image and serve
			} else {
				console.log("read");
				readstream.pipe(res);
			}
		
        //error handling, e.g. file does not exist
    },
};
module.exports = _.assign(module.exports, exports, model);
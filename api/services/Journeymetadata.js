var schema = new Schema({
    Journey_Name: {
        type: String,
    },
    ap_status: {
        type: Array,
    },
    readusers:{
        type:Array
    },
	Dept:{
		type:String
	},
	Sub_Dept:{
		type:String
	},
	dim_cols:{
		type:Number
	},
	dim_rows:{
		type:Number
	}
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Journeymetadata', schema,'journey_metadata');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
   
    getjourney: function (data, callback) {
        Journeymetadata.find({
            'readusers.empcode':{$ne:data.user}
        }).exec(function (err, found) {
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
                        Journeymetadata.count({
                            
                            // 'users':{$elemMatch:{email:data.user}}
                            'readusers.empcode':data.user
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
    readjourney: function (data, callback) {
        Journeymetadata.update(
            { 
                _id:data.id,
            },
            {
                
                $push: { 
                    readusers:
                    {
                        empcode:data.user,
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
	getdropdowncount: function (data, callback) {
        Journeymetadata.findOne({
            Journey_Name:{$regex:".*"+data.Journey_Name+".*",$options:"i"}
        }).limit(1).exec(function (err, found) {
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
	getchargejourney: function (data, callback) {
        Journeymetadata.find({
            Journey_Name:{$regex:".*charge.*",$options:"i"}
        }).exec(function (err, found) {
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
};
module.exports = _.assign(module.exports, exports, model);
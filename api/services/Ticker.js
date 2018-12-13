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
    users:{
        type:Array
    },
    LinkURL:{
        type:String
    }

});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Ticker', schema,'Ticker');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "Ticker", "Ticker"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getticker: function (data, callback) {
		
        Ticker.find({
            $and:[{From_Date:{$lte:new Date(data.today)}},{To_Date:{$gte:new Date(data.today)}}],
            Status:0
        },{
			Modified_By:0,Upload_By:0,users:0
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
    readticker: function (data, callback) {
        Ticker.count({
            $and:[{From_Date:{$lte:new Date()}},{To_Date:{$gte:new Date()}}],
            Status:0,
            users:[data.user]
        }, function(err, found)  {
            if (err) {
                callback(err, null);
            } 
            else {
                if (err) {
                        return err;
                }
                else {
                    found2 = found;
                    //var Journey_Data = JSON.parse(found.Journey_Data);
                    callback(null, found);
                }
            }

        });
        
    },
};
module.exports = _.assign(module.exports, exports, model);
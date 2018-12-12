var schema = new Schema({
    ap_status: {
        type: String,
    },
    topic_data: {
        type: String,
    },
    topic_data: {
        type:String
    },
    topics_mod_by: {
        type:Array
    },
    topics_mod_date:{
        type:Array
    },
    topics_mod_utype:{
        type:Array
    },
    topics_up_by:{
        type:String
    },
    topics_up_date:{
        type:String
    },
    topics_up_utype:{
        type:String
    }

});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Topicjourney', schema,'Topic_Journey');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "Ticker", "Ticker"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getfolderstructure: function (data, callback) {
        Topicjourney.find({
            topic_name:'DIRECTORY'
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
};
module.exports = _.assign(module.exports, exports, model);
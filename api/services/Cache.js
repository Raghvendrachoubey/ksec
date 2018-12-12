var schema = new Schema({
    original_input: {
        type: String,
    },
    verbs: {
        type: Array,
    },
    nouns: {
        type: Array,
    },
    Journey_Name: {
        type: String,
    },
    type: {
        type: String,
    },
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Cache', schema,'cache');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "cache", "cache"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getautocomplete: function (data, callback) {
        
        //console.log("data", data)
        searchstring=data.string;
        searchstring = "/"+searchstring+"/";
        var obj = { 
            value:{ $regex: '.*' + data.string + '.*',$options:"i" }
        };
        //console.log(obj);
        if(data.topic != '')
            obj = {topic:data.topic,value:{ $regex: '.*' + data.string + '.*',$options:"i" }};
        Cache.find(obj, { topic: 1, value: 1, id:1,answers:1 }).limit(4).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    callback(null, found);
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
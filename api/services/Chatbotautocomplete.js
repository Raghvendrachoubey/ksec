var schema = new Schema({
    topic: {
        type: String,
    },
    value: {
        type: String,
    },
    location: {
        type: String,
    },
    answers: {
        type: String,
    },
    final: {
        type: String,
    },
    combine: {
        type: String,
    },
    id: {
       type:Number,
   }, 
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Chatbotautocomplete', schema,'chatbotautocomplete');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "chatbotautocomplete", "chatbotautocomplete"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getautocomplete: function (data, callback) {
        
        //console.log("data", data)
        searchstring=data.string;
        searchstring = "/"+searchstring+"/";
        var obj = { 
           value:{ $regex: '.*' + data.string + '.*',$options:"i" }
		   //value:new RegExp(data.string, 'i')
        };
        //console.log(obj);
        if(data.topic != '')
            obj = {topic:data.topic,value:{ $regex: '.*' + data.string + '.*',$options:"i" }};
        /*Chatbotautocomplete.find(obj, { topic: 1, value: 1, id:1,answers:1 }).limit(4).distinct("value",function (err, found) {
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

        });*/
		Chatbotautocomplete.aggregate([ 
			{ "$match": obj
			},
			
			
			{
				"$group":{"_id":"$value",topic:{$first:"$topic"},value:{$first:"$value"},id:{$first:"$id"},answers:{$first:"$answers"}}
			},
			//{$sort:{"handle":-1}},
			{$sort:{"FAQ":1,value:1}},
			{"$project": {_id:0,value: 1, topic: 1,id:1,user:1,answers:1}},
			{ $limit : 4 }
		],
		function(err, updatefound) {
			if (err) {
                callback(err, null);
            } 
            else {
                //console.log(updatefound,"inside update");
                if (updatefound) {
                    callback(null, updatefound);
                }
				else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }
		}); 
    },
};
module.exports = _.assign(module.exports, exports, model);
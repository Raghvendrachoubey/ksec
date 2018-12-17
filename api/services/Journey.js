var schema = new Schema({
    Journey_Name: {
        type: String,
    },
    Type: {
        type: Array,
    },
    image_name:{
        type:String
    },
	Dept:{
		type:String
	},
	Sub_Dept:{
		type:String
	},
	details:{
		type:String
	},
	Brand_Name:{
		type:String
	},
	image_data:{
        type:String
    },
    URL: {
        type:String
    }
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Journey', schema,'journey');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
   
    getproductlisting: function (data, callback) {
        Journey.find({
            Journey_Name:data.Journey_Name
        },{image_name:1,details:1,Brand_Name:1,image_data:1,URL:1}).sort({_id:1}).exec(function (err, found) { //bugfix 17-11  sort by column
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
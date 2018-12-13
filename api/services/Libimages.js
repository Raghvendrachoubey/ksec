var schema = new Schema({
    file_name: {
        type: String,
    },
    filedataUrl: {
        type: String,
    }
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Libimages', schema,'lib_images');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
   
    getimagedata: function (data, callback) {
        Libimages.findOne({
            file_name:data.filename
        },{filedataUrl:1}).limit(1).exec(function (err, found) {
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
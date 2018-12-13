var schema = new Schema({
    
    "text": {
        type: String,
    },
    id: {
       type:String,
   }, 
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Loc', schema,'loc');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "loc", "loc"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    
};
module.exports = _.assign(module.exports, exports, model);
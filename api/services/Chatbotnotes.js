var schema = new Schema({
    Table: {
        type: String,
    },
    JourneyName: {
        type: String,
    },
    For_Existing_CRN_new_account_opening: {
        type: Array,
    },
    NTB_New_to_bank_customer: {
        type: Array,
    },
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Chatbotnotes', schema,'chatbotnotes');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "chatbotnotes", "chatbotautocomplete"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getnotedata: function (data, callback) {
        var s_obj = {};
        if(data.value == 'NTB_New_to_bank_customer')
        {
            s_obj = {
                NTB_New_to_bank_customer : 1
            };
        }
        else if(data.value == 'For_Existing_CRN_new_account_opening')
        {
            s_obj = {
                For_Existing_CRN_new_account_opening : 1
            };
        }
        Chatbotnotes.find({
             Table:data.table
        },s_obj).exec(function (err, found) {
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
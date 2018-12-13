var schema = new Schema({
    chatlist:[
        // type: Array,
        {
            date: {
                 type: Date,
                 default: Date.now 
            },
            from_id:Schema.Types.ObjectId,
            to_id:Schema.Types.ObjectId,
            fromid:{
                type:Number,
            },
            toid:{
                type:Number,
            },
            fromname:{
                type:String,
            },
            toname:{
                type:String,
            },
            msg:{
                type:String,
            },
            from_socketid:{
                type:String,
            },
            to_socketid:{
                type:String,
            },
        }
    ],
    user1:{
        type:Schema.Types.ObjectId,
    },
    user2: {
        type:Schema.Types.ObjectId,
    },
    socketid1: {
        type:String
    },
    socketid2: {
        type:String
    },
    disconnected : {
        type:Boolean
    },
    disconnectby:{
        type:Schema.Types.ObjectId,
    },
	session_id: {
		type:Number
	},
	username1:{
        type:String
    },
    username2:{
        type:String
    },
    conversation_id:{
        type:Number
    },
    context_id:{
        type:Number
    },
    contexts:{
        type:Array
    },
	empcode1:{
		type:String
	},
	empcode2:{
		type:String
	}
});


schema.plugin(deepPopulate, {
    /*populate: {
        'user': {
            select: 'fname _id'
        }
    }*/
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
//userlogschema.plugin(uniqueValidator);
//userlogschema.plugin(timestamps);
//userlogschema = require('userlogschema');

module.exports = mongoose.model('agentchat', schema,'agentchat');
//var chatbot_user_logs = mongoose.model('chatbot_user_logs', userlogschema,"chatbot_user_logs");
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    setdisconnectsocket:function (data, callback){
        Agentchat.update({
            $and : [
                { $or:[ {'user1':mongoose.Types.ObjectId(data.from_id)}, {'user2':mongoose.Types.ObjectId(data.from_id)}] },
            ],
        },{  disconnected: true }, {multi: true},function (err, found) {
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
    disconnectuser:function (data, callback){
        Agentchat.findOneAndUpdate({
            $and : [
                { $or:[ {'user1':mongoose.Types.ObjectId(data.from_id)}, {'user1':mongoose.Types.ObjectId(data.to_id)}] },
                { $or:[ {'user2':mongoose.Types.ObjectId(data.from_id)}, {'user2':mongoose.Types.ObjectId(data.to_id)}] },
            ],
            $and : [
                { $or:[ {'socketid1':data.socketid}, {'socketid2':data.socketid}] },
                // { $or:[ {'socketid2':data.socketid}, {'socketid2':data.socketid}] },
            ],
        },{ $set: { disconnected: true,disconnectby:mongoose.Types.ObjectId(data.disconnectby) }}).exec(function (err, found) {
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
    savechat:function (data, callback) {
        Agentchat.findOne( {
            $and : [
                { $or:[ {'socketid1':data.from_socketid}, {'socketid1':data.to_socketid}] },
                { $or:[ {'socketid2':data.from_socketid}, {'socketid2':data.to_socketid}] },
            ]
        },function(err,found){
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(found,"found obj");
                if (found) {
                    Agentchat.update(
                        { 
                            $and : [
                                { $or:[ {'socketid1':data.from_socketid}, {'socketid1':data.to_socketid}] },
                                { $or:[ {'socketid2':data.from_socketid}, {'socketid2':data.to_socketid}] },
                            ]
                        },
                        { $push: { 
                            chatlist:
                                {
                                    from_id:mongoose.Types.ObjectId(data.from_id),
                                    to_id:mongoose.Types.ObjectId(data.to_id),
                                    fromid:data.fromid,
                                    toid:data.toid,
                                    fromname:data.fromname,
                                    toname:data.toname,
                                    msg:data.msg,
                                    from_socketid:data.from_socketid,
                                    to_socketid:data.to_socketid,
                                }
                             
                        } }
                    ).exec(function (err2, updatefound) {
                        if (err2) {
                            callback(err2, null);
                        } 
                        else {
                            //console.log(updatefound,"inside update");
                            if (updatefound) {
                                callback(null, updatefound);
                            } else {
                                callback({
                                    message: "-1"
                                }, null);
                            }
                        }
                    });
                } else {
                    Agentchat.saveData({
                        socketid1: data.from_socketid,
                        socketid2: data.to_socketid,
                        disconnected:false,
                        user1:mongoose.Types.ObjectId(data.from_id),
                        user2:mongoose.Types.ObjectId(data.to_id),
						session_id:data.session_id,
						conversation_id:data.conversation_id,
                        context_id:data.context_id,
                        contexts:data.chatlist,
						empcode1:data.empcode,
						empcode2:data.toempcode,
                        chatlist:[
                            {
                                from_id:mongoose.Types.ObjectId(data.from_id),
                                to_id:mongoose.Types.ObjectId(data.to_id),
                                fromid:data.fromid,
                                toid:data.toid,
                                fromname:data.fromname,
                                toname:data.toname,
                                msg:data.msg,
                                from_socketid:data.from_socketid,
                                to_socketid:data.to_socketid,
                            }
                        ]
                    },function (err3, savefound) {
                        if (err3) {
                            callback(err3, null);
                        } 
                        else {
                            if (savefound) {
                                //console.log(savefound,"inside update");
                                callback(null, savefound);
                            } else {
                                callback({
                                    message: "-1"
                                }, null);
                            }
                        }

                    });
                }
            }
        });
    },
    
};
module.exports = _.assign(module.exports, exports, model);
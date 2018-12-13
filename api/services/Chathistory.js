var schema = new Schema({
    // Journey_Name: {
    //     type: String,
    // },
    chatlist: {
        type: Array,
    },
    user: {
        type: String,
    },
    session_id: {
       type:Number,
    },
    responsetype :{
        type: String,
    },
    dthyperlink: {
        type:Object
    },
    inputDate : {
        type:Date
    }, 
    outputDate: {
        type:Date
    },
    respdiff : {
        type:Number
    },
    like : {
        type:Number
    },
    dislike : {
        type:Number
    },
	livechat : {
        type:Number
    },
	crntagged:{
		type:Number
	},
	crnno:{
		type:String
	},
	unanswered:{
        type:Number
    },
    unshandled : {
        type:Number
    },
    conversation_id:{
        type:Number
    },
	state:{
		type:String
	},
	city:{
		type:String
	},
	role:{
		type:String
	},
	functions:{
		type:String
	},
	lobcode:{
		type:String
	},
	lobname:{
		type:String
	},
	loccode:{
		type:String
	},
	empname:{
		type:String
	},
	empid:{
		type:String
	},
	branch:{
		type:String
	},
	department:{
		type:Array
	},
	division:{
		type:String
	},
	segment:{
		type:String
	}
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Chathistory', schema,'chathistory');
var CryptoJS = require("crypto-js");
var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "chathistory", "chathistory"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
var model = {
    getdashboarddata: function (data, callback) {
		var ad = require("./Usermasterad");
		ad.findOne({
			'DOMAIN LOGIN ID': data.empcode,
		}).limit(1).exec(function (aderr, adfound) {
			if(aderr)
			{
				callback(aderr,null);
			}
			if(adfound)
			{
				
				var myteam= new Array();
				if(adfound.MyTeam)
				{
					
					if(adfound.MyTeam.length>0)
					{
						for(var i = 0 ; i <= adfound.MyTeam.length-1; i++)
						{
							
							myteam2= new Array({'user':adfound.MyTeam[i]['Employee ID']});
							//myteam2['user'] = adfound.MyTeam[i]['Employee ID'];
                            
                            myteam.push({'user':adfound.MyTeam[i]['Employee ID']});
                            
                            /*if(adfound.MyTeam.length == i+1)
                            {
                                var owner = new Array({'user':data.empcode});
                                //owner['user']=data.empcode;
                                myteam.push({'user':data.empcode});
                            }*/
						}
					}
				}
				var resobj = {};
				var userfilter = {};
				
				var filterobj = {};
				var filter2 = {};
				if(data.user)
				{
					if(data.user == '1')
					{
						userfilter = {
							user: data.empcode
						};
					}
					else if(data.user == '2')
					{
						//myteam.push({'user':data.empcode});
						if(myteam.length>0)
							userfilter = { $or:myteam };
						else 
							userfilter ={user:'-11'};
					}
				}
				if(data.date_filter_type=="") {
					if(data.fromdata && data.todate) {
						if(data.fromdate != "" && data.todate != "")
						{
							filterobj = {
								"createdAt": {"$gte": new Date(data.fromdate), "$lte": new Date(data.todate)}
							};
						}
					}
					else if(data.fromdate)
					{
						if(data.fromdate != "" )
						{
							filterobj = {
								"createdAt": {"$gte": new Date(data.fromdate)}
							};
						}
					}   
					else if(data.todate)
					{
						if(data.todate != "" )
						{
							filterobj = {
								"createdAt": {"$lte": new Date(data.todate)}
							};
						}
					}
				}
				else if(data.date_filter_type=="1")
				{
					filterobj = {
						"createdAt": {"$gte": new Date(data.date_filter)}
					};
				}
				else if(data.date_filter_type=="2")
				{
					filterobj = {
						"createdAt": {"$gte": new Date(data.date_filter2_fromdate), "$lte": new Date(data.date_filter2_todate)}
					};
				}
				var object3 = extend({}, userfilter, filterobj);
				//console.log(object3);
				Chathistory.count(object3, function(err, c) {
					//console.log('Count is ' + c);
					Chathistory.aggregate([
						{ "$match": object3 },
						{
							"$project": {
								"ticketsCount": {
									"$size": '$chatlist'
								}
							}
						},
						{
							"$group": {
								"_id": null,
								"count": {
									"$sum": "$ticketsCount"
								}
							}
						}
					],function(err, results) {
						//console.log(results);
						if(results) {
							Chathistory.aggregate([ 
								{ "$match": object3 },
								{
									"$group":  { "_id": "$chatlist.topic" }
								},
								{
									$group: {
										_id : "count",
										total : {"$sum" : 1}
									}
								}
							],
							function(err, results2) {
								var ccount = c;
								var icount = 0;
								if(results.length > 0)
									icount = results[0].count;
								var tcount = 0;
								if(results2.length > 0)
									tcount = results2[0].total;
								resobj ={c_count : ccount,i_count:icount,t_count:tcount};
								//console.log(results2);
								callback(null,resobj);
							}); 
						}
						else {
							resobj ={c_count : 0,i_count:0,t_count:0};
							callback(null,resobj);
						}
					});
				});
			}
		});
    },
	tagwithcrn: function (data, callback) {
		Chathistory.update(
			{ 
				session_id:data.session_id,
				conversation_id:data.conversation_id
				//user:data.user
			},
			{
				$set:{
					crntagged:1,
					crnno:data.crnno
				}, 
				
			}
		).exec(function (err2, updatefound) {
			if (err2) {
				callback(err2, null);
			} 
			else {
				if (updatefound) {
					callback(null, updatefound);
				} else {
					callback({
						message: "-1"
					}, null);
				}
			}
		});
	},
	gettaggedcrn: function (data, callback) {
		Chathistory.find(
			{ 
				crnno:data.crnno,
				crntagged:1
				//user:data.user
			}).sort({createdAt:-1}).limit(5).exec(function (err2, updatefound) {
			if (err2) {
				callback(err2, null);
			} 
			else {
				if (updatefound) {
					callback(null, updatefound);
				} else {
					callback({
						message: "-1"
					}, null);
				}
			}
		});
	},
	getpanindia: function (data, callback) {
		var filterobj = {};
		// console.log(data.fromdate,"fromdate");
		//console.log(new Date());
		if(data.fromdate && data.todate) {
			if(data.fromdate != "" && data.todate != "")
			{
				filterobj = {
					"createdAt": {"$gte": new Date(data.fromdate+ " 00:00:01"), "$lte": moment(data.todate+" 23:59:59").format("YYYY-MM-DD HH:mm:ss")}
				};
			}
		}
		else if(data.fromdate && !data.todate)
		{
			if(data.fromdate != "" )
			{
				filterobj = {
					"createdAt": {"$gte": new Date(data.fromdate)}
				};
			}
		}   
		else if(data.todate && !data.fromdate)
		{
			if(data.todate != "" )
			{
				filterobj = {
					"createdAt": {"$lte": new Date(data.todate)}
				};
			}
		}
		console.log(filterobj,"filterobj");
		Chathistory.find(
			 
				filterobj
				//user:data.user
			).exec(function (err2, updatefound) {
			if (err2) {
				callback(err2, null);
			} 
			else {
				if (updatefound) {
					// console.log(updatefound.length);
					callback(null, {done:1});
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1; //January is 0!

					var yyyy = today.getFullYear();
					if(dd<10){
						dd='0'+dd;
					} 
					if(mm<10){
						mm='0'+mm;
					} 
					var today = dd+'-'+mm+'-'+yyyy;
					var createCsvWriter = require('csv-writer').createObjectCsvWriter;
					var csvWriter = createCsvWriter({
						//path: '\\\\10.22.121.31/KAIRADocuments/PANINDIA.csv',
						//path: '\\\\DTREEAPP04.KBank.KotakGroup.com\\d$/Reports/panindia/PANINDIA.csv',
						path: './panindia/PANINDIA_'+today+'.csv',
						header: [
							{id: 'date', title: 'Date'},
							{id: 'time', title: 'Time'},
							{id: 'cid', title: 'Conversation ID'},
							{id: 'iid', title: 'Interaction ID'},
							{id: 'topic', title: 'Topic'},
							{id: 'query', title: 'User typed'},
							{id: 'dtquery', title: 'User clicked'},
							{id: 'botresponse', title: 'Response'},
							{id: 'responsetime', title: 'Response Time'},
							{id: 'crntagged', title: 'CRN Tagged'},
							{id: 'eid', title: 'Employee ID'},
							{id: 'ename', title: 'Employee Name'},
							//{id: 'erole', title: 'Employee Role'},
							//{id: 'ef', title: 'Employee Function'},
							//{id: 'es', title: 'Employee Segment'},
							//{id: 'ed', title: 'Employee Division'},
							//{id: 'lob', title: 'LOB'},
							{id: 'liked', title: 'Liked'},
							{id: 'dl', title: 'Disliked'},
							{id: 'fb', title: 'Feedback'},
							{id: 'lui', title: 'Live Chat User ID'},
							{id: 'lun', title: 'Live Chat User Name'},
							//{id: 'bc', title: 'Branch Code'},
							//{id: 'bn', title: 'Branch Name'},
							//{id: 'city', title: 'City'},
							{id: 'unansq', title: 'Unanswered Query'},
							// {id: 'sv1', title: 'Supervisor 1'},
							// {id: 'sv2', title: 'Supervisor 2'},
							// {id: 'sv3', title: 'Supervisor 3'},
							// {id: 'sv4', title: 'Supervisor 4'},
						]
					});
					var csvWriter2 = createCsvWriter({
						//path: '\\\\10.22.121.31/KAIRADocuments/PANINDIA.csv',
						path: './panindia/PANINDIA.csv',
						//path: '\\\\DTREEAPP04.KBank.KotakGroup.com\\d$/Reports/panindia/PANINDIA_'+today+'.csv',
						header: [
							{id: 'date', title: 'Date'},
							{id: 'time', title: 'Time'},
							{id: 'cid', title: 'Conversation ID'},
							{id: 'iid', title: 'Interaction ID'},
							{id: 'topic', title: 'Topic'},
							{id: 'query', title: 'User typed'},
							{id: 'dtquery', title: 'User clicked'},
							{id: 'botresponse', title: 'Response'},
							{id: 'responsetime', title: 'Response Time'},
							{id: 'crntagged', title: 'CRN Tagged'},
							{id: 'eid', title: 'Employee ID'},
							{id: 'ename', title: 'Employee Name'},
							//{id: 'erole', title: 'Employee Role'},
							//{id: 'ef', title: 'Employee Function'},
							//{id: 'es', title: 'Employee Segment'},
							//{id: 'ed', title: 'Employee Division'},
							//{id: 'lob', title: 'LOB'},
							{id: 'liked', title: 'Liked'},
							{id: 'dl', title: 'Disliked'},
							{id: 'fb', title: 'Feedback'},
							{id: 'lui', title: 'Live Chat User ID'},
							{id: 'lun', title: 'Live Chat User Name'},
							//{id: 'bc', title: 'Branch Code'},
							//{id: 'bn', title: 'Branch Name'},
							//{id: 'city', title: 'City'},
							{id: 'unansq', title: 'Unanswered Query'},
							// {id: 'sv1', title: 'Supervisor 1'},
							// {id: 'sv2', title: 'Supervisor 2'},
							// {id: 'sv3', title: 'Supervisor 3'},
							// {id: 'sv4', title: 'Supervisor 4'},
						]
					}); 
					var records = [
						{date: 'Bob',  time: 'French, English'},
						
					];
					_.reverse(updatefound);
					var records = [];
					var totalint = 0;
					_.forEach(updatefound, function(cs) {
						var empid = "";
						var division="";
						var segment = "";
						var functions = "";
						var roles = "";
						var crntagged = "";
						var lob ="";
						var loc = "";
						var liked = "";
						
						var branch = "";
						var lui = "";
						var lun = "";
						var topicdata="";
						var respdiff="";
						var chatlist = cs.chatlist;
						var iid = 0;
						
						if(cs.division)
							division = cs.division;
						if(cs.segment)
							segment = cs.segment;
						if(cs.functions)
							functions = cs.functions;
						if(cs.role)
							roles = cs.role;
						if(cs.crntagged) {
							crntagged = "CRN NO:"+cs.crnno;
						}
						else 
							crntagged = "NA";
						if(cs.lobname) {
							lob=cs.lobname;
						}
						if(cs.loccode) {
							loc=cs.loccode;
						}
						if(cs.branch) {
							branch =cs.branch;
						}
						if(cs.empid) {
							empid = cs.empid;
							//console.log(empid);
						}
						else
							empid = cs.user;
						totalint += chatlist.length;
						
						if(chatlist) {
							_.forEach(chatlist, function(cl) {
								var userquery = "NA";
								var dtquery = "NA";
								var response='';
								var dt ="";
								var lkdl="NA";
								var disliked="";
								var feedback = "NA";
								var unansq = "0";
								var i_like = 0;
								var i_dislike = 0;
								if(cl) {
									if(cl.user_input && cl.user_input!='')
										userquery=cl.user_input.replace(/[^\x00-\x7F]/g, "");
									else if (cl.dthyperlink)
										dtquery=cl.dthyperlink.Dthlink;
									//if(cl.dthyperlink || cl.user_input) 
									{
										if(cl.respdiff)
										{
											respdiff = Math.floor(cl.respdiff);
										}
										if(cl.unanswered == 1) {
											unansq = 1;
										}
										if(cl.response) {
											if(cl.response.type) {
												if(cl.response.Type!=='conflict') {
													if(cl.Journey_Name) {
														if(cl.Journey_Name != '')
														{
															topicdata = cl.Journey_Name;
														}
														else
															topicdata="General Conversation";
													}
													else {
														if(cl.response.unanswered)
															topicdata = "NA";
														else
															topicdata="General Conversation";
													}
												}
												else if(cl.response.unanswered)
													topicdata = "NA";
												else
													topicdata="General Conversation";
												if(cl.response.Type=='conflict') {
													if(cl.Journey_Name.constructor == Array)
														topicdata='Conflict : '+cl.Journey_Name.toString();
													else
														topicdata='Conflict : '+cl.Journey_Name.replace(new RegExp("u'","g"), ' ');
												}
												if(cl.response.type=='DTHyperlink')
												{
													response += 'Response :';
													var faqs = '';
													if(cl.response.Text) {
														response +=(cl.response.Text.replace(/[^\x00-\x7F]/g, "")).replace(new RegExp("'","g"), '"');
													}
													if(cl.response.FAQ) {
														faqindex= 0 ;
														_.forEach(cl.response.FAQ, function(faqlist) {
															
															if(faqindex==0) {
																// dt += 
																faqs = ' '+faqlist.key;
															}
															else {
																faqs += ' ,'+faqlist.key;
															}

															faqindex++;
														});
														topicdata += faqs;
													}
													if(cl.response.DT) {
														dtindex = 0;
														_.forEach(cl.response.DT, function(dtlist) {
															
															if(dtindex==0) {
																// dt += 
																dt = ' '+dtlist;
															}
															else {
																dt += ' ,'+dtlist;
															}

															dtindex++;
														});
														response += dt;
														if(cl.response.FAQ) {
															//var readfaqs = 
															readfaqs=_.filter(cl.response.FAQ, function(o) { return o.read; });
															var faqindex = 0;
															var faqs = '';
															_.forEach(readfaqs, function(faqlist) {
																
																if(faqindex==0) {
																	// dt += 
																	faqs = ' '+faqlist.key;
																}
																else {
																	faqs += ' '+faqlist.key;
																}

																faqindex++;
															});
															response += faqs;
														}
													}
												}
												if(cl.response.type=='product listing')
												{
													response += 'Response : Instruction displayed';
												}
												if(cl.response.type=='rate card')
												{
													response += 'Response : Rate card displayed';
												}
												if(cl.response.type=='text')
												{
													if(cl.response.Text)
													{
														if(cl.response.Text.length > 10000)
															response += 'Response : Journey '+cl.response.Journey_Name+' displayed';
														else
															response += 'Response : '+(cl.response.Text.replace(/[^\x00-\x7F]/g, "")).replace(new RegExp("'","g"), '"');
													}
													if(cl.response.FAQ) {
														readfaqs=_.filter(cl.response.FAQ, function(o) { return o.read; });
														var faqindex = 0;
														var faqs = '';
														_.forEach(readfaqs, function(faqlist) {
															
															if(faqindex==0) {
																// dt += 
																faqs = ' '+faqlist.key;
															}
															else {
																faqs += ' '+faqlist.key;
															}

															faqindex++;
														});
														response += faqs;
													}
												}
											}
											else {
												topicdata="NA";
												response += 'Sorry I could not understand';
											}
										}
										else {
											topicdata="NA";
											response += 'Sorry I could not understand';
										}
										if(cl.livechat) {
											if(cl.livechat==1)
											{
												lui=cl.livechatagentid;
												lun=cl.livechatagentname;
											}
										}
										else {
											lui = "NA";
											lun = "NA";
										}
										if(cs.like) {
											if(cs.like==1) {
												liked = "1";
												lkdl = "1";
												i_like = 1;
											}
										}
										if(cl.dislike) {
											if(cl.dislike==1)
											{
												disliked = "1";
												liked = "0";
												lkdl = "0";
												i_dislike = 1;
											}
											if(cl.feedback)
												feedback = cl.feedback;
										}
										/*else {
											disliked = "0";
											feedback = "NA";
											if(!cs.like)
												lkdl = "NA";
										}
										if(feedback == "") {
											feedback="NA";
											lkdl = "NA";
										}*/
										records.push({
											date: moment(cl.inputDate).format("DD-MMM-YYYY") ,
											time: moment(cl.inputDate).format("HH:mm:ss A"),
											cid:cs.session_id+'-'+cs.conversation_id,
											iid:iid,
											query:userquery,
											dtquery:dtquery,
											crntagged:crntagged,
											eid:empid,
											ename:cs.empname,
											//ef:cs.functions,
											//erole:cs.role,
											//es:cs.segment,
											//ed:cs.division,
											//city:cs.city,
											//bc:loc,
											//bn:branch,
											//lob:cs.lobname,
											lui:lui,
											lun:lun,
											liked:i_like,
											dl:i_dislike,
											fb:feedback,
											botresponse:response,
											topic:topicdata,
											responsetime:moment.utc(respdiff*1000).format("HH:mm:ss"),
											unansq:unansq
										});
										iid++;
									}
								}
								
							});
						}
					});
					//console.log(totalint,"total int");
					//console.log('...Done',records);
					var fs = require('fs');
					for(var i = 8 ; i <= 14 ; i++) {
						var subdate = moment().subtract(i, "days").format("DD-MM-YYYY");
						fs.unlink('./panindia/PANINDIA_'+subdate+'.csv', function (err) {
							if (err) {};
							// if no error, file has been deleted successfully
							//console.log('File deleted!');
						}); 
					}
					
					wpromise=csvWriter.writeRecords(records)       // returns a promise
					.then((perr,psucc) => {
						
						var pnr = require("./Panindiareport");
						var pnrs ="";
						if(perr)
							pnrs = perr;
						else
							pnrs = "Generated";
						//console.log('err,suc',pnrs,perr,psucc);
						var sessiondata = pnr({fromdate:data.fromdate,todate:data.todate,reportstatus:pnrs});
						sessiondata.save(function (unserr,unsresult) {

						});
					});
					//console.log(wpromise);
					csvWriter2.writeRecords(records)       // returns a promise
					.then((perr2,psucc2) => {
						console.log('...Done');
						
					});

				} else {
					callback({
						message: "-1"
					}, null);
				}
			}
		});
	},
    savehistory: function (cdata, callback) {
		var ciphertext= cdata.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        var dtobject = {};
		var livechat = 0;
		var crntagged=0;
		var crnno="";
		var livechatagentid="";
		var livechatagentname="";
		var unanswered=0;
        var unshandled=0;
        var unansview = -1;
		
		if(data.crnno)
		{
			crntagged = 1;
			crnno = data.crnno;
		}
		if(data.livechat)
		{
			livechat = 1;
			livechatagentid=data.livechatagentid;
			livechatagentname=data.livechatagentname;
		}
        if(data.DTHlink)
		{
            dtobject = {
                Dthlink:data.DTHlink,
                DTHstage:data.DTHstage
            };
		}
		if(data.unanswered)
        {
            unansview=0;
            unanswered=1;
        }
        Chathistory.findOne( {
            session_id:data.session_id,
            user:data.user,
            conversation_id:data.conversation_id
            
        },function(err,found){
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(found,"found obj");
                if (found) {
					if(found.chatlist) 
					{
						var foundchatlist = found.chatlist;
						var int_ind = _.findIndex(foundchatlist, function(o) { return o.i_ind == data.i_ind; });
						//if(new Date(data.inputDate) > new Date(foundchatlist[foundchatlist.length-1].inputDate))
						if(int_ind == -1)
						{
							data.user_input = data.user_input.replace(/[^\x00-\x7F]/g, "");
							Chathistory.update(
								{ 
									session_id:data.session_id,
									user:data.user,
									conversation_id:data.conversation_id
								},
								{
									$set:{
										livechat:livechat,
										unanswered:unanswered,
										unshandled:unshandled
									}, 
									$push: { 
										chatlist:
										{
											user_input:data.user_input,
											response:data.response,
											responsetype:data.responsetype,
											dthyperlink:dtobject,
											Journey_Name:data.Journey_Name,
											topic:data.topic,
											inputDate:new Date(data.inputDate),
											outputDate:new Date(data.outputDate),
											respdiff:data.respdiff,
											livechat:livechat,
											unanswered:unanswered,
											unshandled:unshandled,
											context_id:data.context_id,
											unansview:unansview,
											livechatagentid:livechatagentid,
											livechatagentname:livechatagentname,
											i_ind:data.i_ind
										}
									 
									} 
								}
							).exec(function (err2, updatefound) {
								if (err2) {
									callback(err2, null);
								} 
								else {
									//console.log(updatefound,"inside update");
									if (updatefound) {
										if(unanswered==1)
										{
											var interaction_index=found.chatlist.length-1;
											
											var uns = require("./Unansweredquestion");
											var sessiondata = uns({interaction_index:interaction_index,handleview:0,user:data.user,handle:0,conversationid:found._id,old_question:data.user_input,new_question:"",session_id:data.session_id});
											sessiondata.save(function (unserr,unsresult) {

											});
										}
										callback(null, updatefound);
									} else {
										callback({
											message: "-1"
										}, null);
									}
								}
							});
						}
						else {
							callback(null, {exists:1});
						}
					}
					else {
						callback(null, {done2:1});
					}
                } else {
					var dept_arr = [];
					data.user_input = data.user_input.replace(/[^\x00-\x7F]/g, "");
					if(data.department && data.department!="")
						dept_arr = data.department.split(",");
                    Chathistory.saveData({
                        session_id:data.session_id,
                        user:data.user,
						livechat:livechat,
						crnno:crnno,
						crntagged:crntagged,
						unanswered:unanswered,
                        unshandled:unshandled,
                        conversation_id:data.conversation_id,
						empid:data.empid,
						empname:data.empname,
						state:data.state,
						city:data.city,
						role:data.role,
						functions:data.functions,
						lobcode:data.lobcode,
						lobname:data.lobname,
						loccode:data.loccode,
						department:dept_arr,
						division:data.division,
						segment:data.segment,
						branch:data.branch,
                        chatlist:[
                            {
                                user_input:data.user_input,
                                response:data.response,
                                responsetype:data.responsetype,
                                dthyperlink:dtobject,
                                Journey_Name:data.Journey_Name,
                                topic:data.topic,
                                inputDate:new Date(data.inputDate),
                                outputDate:new Date(data.outputDate),
                                respdiff:data.respdiff,
								livechat:livechat,
								unanswered:unanswered,
                                unshandled:unshandled,
                                context_id:data.context_id,
                                unansview:unansview,
								livechatagentid:livechatagentid,
								livechatagentname:livechatagentname,
								i_ind:data.i_ind
                            }
                        ]
                    },function (err3, savefound) {
                        if (err3) {
                            callback(err3, null);
                        } 
                        else {
                            if (savefound) {
                                //console.log(savefound,"inside save");
								if(unanswered==1)
                                {
                                    var uns = require("./Unansweredquestion");
                                    var sessiondata = uns({interaction_index:0,handleview:0,user:data.user,handle:0,conversationid:savefound._id,old_question:data.user_input,new_question:"",session_id:data.session_id});
                                    sessiondata.save(function (unserr,unsresult) {

                                    });
                                }
                                callback(null, {done:1});
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
    dislike: function (cdata, callback) {
		var ciphertext= cdata.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        var updateobj = { dislike:1 };
		//var listobj={};
        /*for(var i = 0; i < data.interactions.length ; i++)
        {
            var objstring = 'chatlist.'+parseInt(data.interactions[i])+'.dislike';
            var listobj={};
            var i_ind2 = parseInt(data.interactions[i]);
            var i_ind = 0;
			i_ind = i_ind2-1;
			if(i_ind2 > 1) {
				i_ind=i_ind/2;
			}
            listobj['chatlist.'+i_ind+'.dislike']=1;
            // listobj ={
            //     //objstring:1,
            //     feedback:data.feedback
            // };
            updateobj = extend({}, listobj, updateobj);
            listobj['chatlist.'+i_ind+'.feedback']=data.feedback;
            updateobj = extend({}, listobj, updateobj);
            listobj['chatlist.'+i_ind+'.handle']=0;
            updateobj = extend({}, listobj, updateobj);
            listobj['chatlist.'+i_ind+'.handleview']=0;
            updateobj = extend({}, listobj, updateobj);
        }*/
		var interactions_v = data.interactions_v;
        //console.log(interactions_v);
		Chathistory.findOne({
            session_id:data.session_id,
			user:data.user,
			conversation_id:data.conversation_id
        }).limit(1).exec(function (err, datafound) {
			var cl=datafound.chatlist;
			
			
			var userinput="";
			var qfound = [];
			var iind = data.iind;
			
			for(var cj = 0 ; cj <= iind.length-1 ; cj++) {
				var mainquery='';
				var listobj={};
				var int_ind = _.findIndex(cl, function(o) { return o.i_ind == iind[cj]; });
				if(int_ind > -1) {
					var dthyperlink = 0;
					var g_i = -1;
					if(cl[int_ind].user_input && cl[int_ind].user_input != '') {
						//if(!(_.find(qfound, function(o) { return o == cl[ci].user_input; }))) {
							listobj['chatlist.'+int_ind+'.dislike']=1;
							updateobj = extend({}, listobj, updateobj);
							listobj['chatlist.'+int_ind+'.feedback']=data.feedback;
							updateobj = extend({}, listobj, updateobj);
							listobj['chatlist.'+int_ind+'.handle']=0;
							updateobj = extend({}, listobj, updateobj);
							listobj['chatlist.'+int_ind+'.handleview']=0;
							updateobj = extend({}, listobj, updateobj);
							userinput=cl[int_ind].user_input;
							mainquery = userinput;
							g_i=int_ind;
							//qfound.push(userinput);
						//}
					}
					else if(cl[int_ind].dthyperlink) {
						if(cl[int_ind].dthyperlink.Dthlink) {
							//if(!(_.find(qfound, function(o) { return o == cl[ci].dthyperlink.Dthlink; }))) {
								listobj['chatlist.'+int_ind+'.dislike']=1;
								updateobj = extend({}, listobj, updateobj);
								listobj['chatlist.'+int_ind+'.feedback']=data.feedback;
								updateobj = extend({}, listobj, updateobj);
								listobj['chatlist.'+int_ind+'.handle']=0;
								updateobj = extend({}, listobj, updateobj);
								listobj['chatlist.'+int_ind+'.handleview']=0;
								updateobj = extend({}, listobj, updateobj);
								userinput=cl[int_ind].dthyperlink.Dthlink;
								dthyperlink=1;
								g_i=int_ind;
								//qfound.push(userinput);
								for(var j = int_ind; j>=0 ;j--)
								{
									
									if(cl[j] && mainquery=='') {
										console.log(j);
										if(cl[j].user_input !='') {
											mainquery = cl[j].user_input;
											console.log(mainquery,j);
										}
									}
								}
							//}
						}
					}
					if(g_i > -1) {
						var uns = require("./Feedbackquestion");
						var sessiondata = uns({interaction_index:g_i,handleview:0,mainquery:mainquery,feedback:data.feedback,user:data.user,handle:0,conversationid:datafound._id,old_question:userinput,dthyperlink:dthyperlink,new_question:"",session_id:data.session_id});
						sessiondata.save(function (unserr,unsresult) {

						});
					}
				}
			}
			/*for(var ci = 0 ; ci <= cl.length-1 ; ci++) {
				var mainquery='';
				var listobj={};
				for(var cj = 0 ; cj <= interactions_v.length-1 ; cj++) {
					var dthyperlink = 0;
					var g_i = -1;
					if(cl[ci].user_input == interactions_v[cj] ) {
						if(!(_.find(qfound, function(o) { return o == cl[ci].user_input; }))) {
							listobj['chatlist.'+ci+'.dislike']=1;
							updateobj = extend({}, listobj, updateobj);
							listobj['chatlist.'+ci+'.feedback']=data.feedback;
							updateobj = extend({}, listobj, updateobj);
							listobj['chatlist.'+ci+'.handle']=0;
							updateobj = extend({}, listobj, updateobj);
							listobj['chatlist.'+ci+'.handleview']=0;
							updateobj = extend({}, listobj, updateobj);
							userinput=cl[ci].user_input;
							mainquery = userinput;
							g_i=ci;
							qfound.push(userinput);
						}
					}
					else if(cl[ci].dthyperlink) {
						if(cl[ci].dthyperlink.Dthlink==interactions_v[cj]) {
							if(!(_.find(qfound, function(o) { return o == cl[ci].dthyperlink.Dthlink; }))) {
								listobj['chatlist.'+ci+'.dislike']=1;
								updateobj = extend({}, listobj, updateobj);
								listobj['chatlist.'+ci+'.feedback']=data.feedback;
								updateobj = extend({}, listobj, updateobj);
								listobj['chatlist.'+ci+'.handle']=0;
								updateobj = extend({}, listobj, updateobj);
								listobj['chatlist.'+ci+'.handleview']=0;
								updateobj = extend({}, listobj, updateobj);
								userinput=cl[ci].dthyperlink.Dthlink;
								dthyperlink=1;
								g_i=ci;
								qfound.push(userinput);
								for(var j = ci; j>0 ;j--)
								{
									console.log(j);
									if(cl[j] && mainquery!='') {
										if(cl[j].user_input !='')
											mainquery = cl[j].user_input;
									}
								}
							}
						}
					}
					if(g_i > -1) {
						var uns = require("./Feedbackquestion");
						var sessiondata = uns({interaction_index:g_i,handleview:0,mainquery:mainquery,feedback:data.feedback,user:data.user,handle:0,conversationid:datafound._id,old_question:userinput,dthyperlink:dthyperlink,new_question:"",session_id:data.session_id});
						sessiondata.save(function (unserr,unsresult) {

						});
					}
				}
			}*/
			//console.log(updateobj);
			Chathistory.update(
				{ 
					session_id:data.session_id,
					user:data.user,
					conversation_id:data.conversation_id
				},
				{ 
					$set: updateobj 
				}
			).exec(function (err, updatefound) {
				if (err) {
					callback(err, null);
				} 
				else {
					//console.log(updatefound,"inside update");
					if (updatefound) {
						/*Chathistory.findOne( {
							session_id:data.session_id,
							user:data.user,
							conversation_id:data.conversation_id
						},function(err,datafound){*/
							//var uns = require("./Feedbackquestion");
							//console.log(datafound);
							//var chatlist = datafound.chatlist;
							//console.log(updatefound);
							/*for(var i = 0; i < data.interactions.length ; i++)
							{
								var userinput="";
								var objstring = 'chatlist.'+parseInt(data.interactions[i])+'.dislike';
								var listobj={};
								var i_ind2 = parseInt(data.interactions[i]);
								var i_ind = 0;
								
								i_ind = i_ind2-1;
								if(i_ind2 > 1) {
									i_ind=i_ind/2;
								}
								var dthyperlink = 0;
								var interaction = chatlist[i_ind];
								if(interaction.user_input!='')
								{
									mainquery=interaction.user_input;
									userinput=interaction.user_input;
								}
								else if(interaction.dthyperlink)
								{
									dthyperlink = 1;
									userinput=interaction.dthyperlink.Dthlink;
									for(var j = chatlist.length-1; j>0 ;j--)
									{
										if(chatlist[j]) {
											if(chatlist[j].user_input !='')
												mainquery = chatlist[j].user_input;
										}
									}
								}
								var sessiondata = uns({interaction_index:i_ind,handleview:0,mainquery:mainquery,feedback:data.feedback,user:data.user,handle:0,conversationid:datafound._id,old_question:userinput,dthyperlink:dthyperlink,new_question:"",session_id:data.session_id});
								sessiondata.save(function (unserr,unsresult) {

								});
							}*/
							callback(null, updatefound);
						/*});*/
					}
				}
			});
		});
    },
    like: function (cdata, callback) {
		var ciphertext= cdata.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        var updateobj = { like:1 };
        
        Chathistory.update(
            { 
                session_id:data.session_id,
                user:data.user,
                conversation_id:data.conversation_id
            },
            { 
                $set: updateobj 
            }
        ).exec(function (err, updatefound) {
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(updatefound,"inside update");
                if (updatefound) {
                    callback(null, updatefound);
                }
            }
        });
    },
	getunans: function (data, callback) {
        var updateobj = { like:1 };
        
        Chathistory.find(
            { 
                $and:[{user:data.user}],
                $or:[{
                    "chatlist.unansview":0,
                    "chatlist.unanswered":1
                }],
                $or:[{
                    //"chatlist.handle":0,
                    "chatlist.handleview":0,
                    "chatlist.dislike":1
                }],
            }
        ).sort({createdAt: -1}).exec(function (err, updatefound) {
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(updatefound,"inside update");
                if (updatefound) {
                    callback(null, updatefound);
                }
            }
        });
    },
    getfeedback: function (data, callback) {
        var updateobj = { dislike:1 };
        
        Chathistory.find(
            { 
                $and:[{user:data.user}],
                $or:[{
                    "chatlist.handle":0,
                    "chatlist.handleview":0,
                    "chatlist.dislike":1
                }],
            }
        ).sort({createdAt: -1}).exec(function (err, updatefound) {
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(updatefound,"inside update");
                if (updatefound) {
                    callback(null, updatefound);
                }
            }
        });
    },
	readfaq: function (cdata, callback) {
		var ciphertext= cdata.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        listobj = {};
        var data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        var updateobj = { read:1 };
		/*var i_ind2 = data.listindex;
		var i_ind = 0;
		i_ind = i_ind2-1;
		if(i_ind2 > 1) {
			i_ind=i_ind/2;
		}
		listobj['chatlist.'+Math.floor(i_ind)+'.response.FAQ.'+data.faqindex+'.read']=1;
		
		updateobj = extend({}, listobj, updateobj);*/
        //console.log(i_ind);
        //console.log(listobj);
		Chathistory.findOne({
            session_id:data.session_id,
			user:data.user,
			conversation_id:data.conversation_id
        }).limit(1).exec(function (err, chatfound) {
			var cl = chatfound.chatlist;
			for (var i = 0; i <= cl.length-1 ; i++) {
				if(cl[i].user_input==data.user_input){
					listobj['chatlist.'+i+'.response.FAQ.'+data.faqindex+'.read']=1;
				}

			}

			Chathistory.update(
				{ 
					session_id:data.session_id,
					user:data.user,
					conversation_id:data.conversation_id
				},
				{ 
					$set: listobj 
				}
			).exec(function (err, updatefound) {
				if (err) {
					callback(err, null);
				} 
				else {
					//console.log(updatefound,"inside update");
					if (updatefound) {
						var Faqclicks= require("./Faqclicks");
						Faqclicks.findOne({
							session_id:data.session_id,
							user:data.user,
							conversation_id:data.conversation_id,
							key:data.key
						}).limit(1).exec(function (aderr, adfound) {
							if(aderr)
							{
								callback(aderr,null);
							}
							if(adfound)
							{
								callback({
									message: "-11"
								}, null);
							}
							else {
								Faqclicks.saveData({
									session_id:data.session_id,
									user:data.user,
									conversation_id:data.conversation_id,
									empid:data.empid,
									empname:data.empname,
									key:data.key,
									value:data.value,
									additional_conflict:data.faq,
									user_input:data.user_input
								},function (err3, savefound) {
									if (err3) {
										callback(err3, null);
									} 
									else {
										if (savefound) {
											//console.log(savefound,"inside save");
											
											callback(null, {done:1});
										} else {
											callback({
												message: "-1"
											}, null);
										}
									}

								});
							}
						});
					}
				}
			});
		});
    },
};
module.exports = _.assign(module.exports, exports, model);
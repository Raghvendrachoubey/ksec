var schema = new Schema({
	module_name:{
	   type:String
	},
	content:{
	   type:String
	},
	upload_date:{
	   type:String
	},
	update_date:{
	   type:String
	}
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Modulelib', schema,'modulelib');
var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();
var JSSoup = require('jssoup').default;
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
	calculate:function (data, callback) {
        
        Modulelib.findOne({
            module_name: data.Journey_Name,
            //user:data.user
        }).exec(function (err, found) {
            if (err) {
                //console.log("err",err);
                callback(err, null);
            } 
            else {
                if (found) {
					var output="";
					var soup = new JSSoup(found.content);
					var formulas=soup.findAll('p');
					var tiledlist = data.tiledlist;
					for(var j = 0 ; j <= tiledlist.form_data.length-1 ; j++)
					{
						var fname = tiledlist.form_data[j].name.replace(/ /g,"");
						var fvalue;
						if(tiledlist.form_data[j].type=="date")
							fvalue =moment(eval('data[tiledlist.form_data[j].name]'),'DD/MM/YYYY');	
						//var fvalue = new Date(eval('data[tiledlist.form_data[j].name]'));
						else
							fvalue = eval('data[tiledlist.form_data[j].name]');
						parser.setVariable(fname,fvalue);
						// console.log(fvalue,fname);
						console.log(parser.getVariable(fname));
						// console.log(eval('data[tiledlist.form_data[j].name]'),"vv");
					}
					//console.log(formulas);
					
					parser.setFunction('IFCHECK', function(params) {
						console.log(params,"newparasfu");
						return ((parser.parse(params[0])));
					});
					parser.setFunction('IFC1', function(params) {
						console.log(params,"newparasfu");
						return (params);
					});
					parser.on('callFunction', function(name, params, done) {
					  //console.log(params,"param list");
						if (name === 'SUBTRACT_DATE') {
							//done(((new Date()-params[0])/1000/60/60/24));
							var a= moment(new Date(),'DD/MM/YYYY');
							days = a.diff(params[0],'days');
							done(days);
							//console.log(a,"today date");
							//console.log(days,"days");
						}
						if (name === 'CALC') {
							console.log(params[0],"calcparams");
							var calc_res=parser.parse(params[0]);
							//console.log(calc_res,"calc_res");
							done(calc_res.result.toFixed(2));
							
						}
						if (name === 'INDEX') {
							var option_list = [];
							for(var j = 0 ; j <= tiledlist.form_data.length-1 ; j++)
							{
								if(tiledlist.form_data[j].type=='select')
								{
									if(_.findIndex(tiledlist.form_data[j].values, function(o) { return o.value == params[0]; })>=0)
										option_list=tiledlist.form_data[j].values;
								}
							}
							var indexx=_.findIndex(option_list, function(o) { return o.value == params[0]; });
							done(indexx+1);
							
						}
						if (name === 'MIN_FIND') {
							var minval1=params[0];
							var minval2=params[1];
							console.log(params,"min");
							if(parseFloat(minval1)<parseFloat(minval2)) {
								console.log("1st true");
								done(minval1);
								//done(1222);
							}
							else
							{
								console.log("2nd true");
								done(minval2);
								//done(333);
							}
						}
						if (name === 'MAX_FIND') {
							var minval1=params[0];
							var minval2=params[1];
							console.log(params,"min");
							if(parseFloat(minval1)>parseFloat(minval2)) {
								console.log("1st true");
								done(minval1);
								//done(1222);
							}
							else
							{
								console.log("2nd true");
								done(minval2);
								//done(333);
							}
						}
						if(name==='NUMBER_COMPARISON') {
							console.log(params,"n comp");
							if(parseFloat(params[0])>parseFloat(params[1]))
							{
								console.log("ftrue");
								done(params[2]);
							}
							else {
								console.log("ffalse");
								done(params[3]);
								//done(2);
							}
						}
						if (name === 'IFCHECK') {
							console.log(params,"ifcheckl");
							//ifres=parser.parse(params[0]);
							if(params[0])
								done(params[0]);
							else 
								done("");
						}
						if (name === 'IFC') {
							console.log(params.length,"ifcheckl");
							//ifres=parser.parse(params[0]+params[1]+params[2]);
							//console.log(ifres);
							if(params[0])
								done(params[1]);
							else 
								done("");
						}
					});
					for(var i = 0 ; i <= formulas.length-1 ; i++)
					{
						
						var removedtag = formulas[i].text;
						//console.log(formulas[i]);
						//console.log(removedtag);
						//f_m = removedtag.replace("\r","");
						//f_m=f_m.replace("\n","");
						//console.log(f_m,"split");
						var equal_f=removedtag.split("=");
						var outputresult = "";
						equal_f[0]=equal_f[0].replace(/ /g,"");
						// console.log(equal_f[0]+"-");
						if(equal_f[1])
							equal_f[1]=equal_f[1].replace(/ /g, "");
						if(equal_f[0].toLowerCase() == 'output' &&  i == formulas.length-1) {
							outputparams = equal_f[1].split(',');

							for (var j = 0 ; j <= outputparams.length-1 ; j++) {
								outputparamsval = outputparams[j].replace(/ /g,"");
								// console.log(outputparams[j]+"op");
								outputresult += "<b>"+outputparamsval+"</b>: "+parseFloat(parser.getVariable(outputparamsval)).toFixed(2)+"<br>";
							}
							outputresult = outputresult.replace(/_/g," ");
						}
						else {
							output+=equal_f[0]+":";
							
							/*parser.on('callVariable', function(name, done) {
							  if (name === 'TODAY()') {
								done(new Date());
							  }
							});*/
							
							
							
							//console.log(require('hot-formula-parser').SUPPORTED_FORMULAS);
							//console.log(equal_f[1],"after equal");
							
							
								//equal_f[1]=equal_f[1].replace(" ","");
							// console.log(equal_f[1],"got res");
							var result = parser.parse(equal_f[1]);
							//eval(equal_f[0] + "=" + result.result);
							var varname= equal_f[0];
							// console.log(equal_f[0],"set dynamic");
							// console.log(result,"res dynamic");
							if(result.result)
							{
								if(isNaN(result.result))
								{
									parser.setVariable(equal_f[0],parseFloat(result.result));
									output+=" "+result.result+" <br>";
								}
								else
								{
									console.log(result.result);
									parser.setVariable(equal_f[0],parseFloat(result.result).toFixed(4));
									output+=" "+parseFloat(result.result).toFixed(4)+" <br>";
								}
							}
							else
							{							
								parser.setVariable(equal_f[0]," ");
								output+="  <br>";
							}
						}
					}
					callback(null, outputresult);
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    }
};
module.exports = _.assign(module.exports, exports, model);
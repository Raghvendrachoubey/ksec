myApp.factory('apiService', function ($rootScope,$http, $q, $timeout,CsrfTokenService,$httpParamSerializer) {
    //adminurl = "http://wohlig.co.in/chatbotapi/index.php/json/";
    adminurl = "https://cingulariti.in:8096/ksec_backend/";
    var adminUrl2 = "http://wohlig.io/api/";
    var adminUrl3 = "https://cingulariti.in:9005/api/"
    //var adminUrl3 = "http://localhost:8080/api/";
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    //return
    return {

        // This is a demo Service for POST Method.
        getDemo: function (formData, callback) {
            $http({
                url: adminurl + 'demo/demoService',
                method: 'POST',
                data: formData
            }).success(callback);
        },
		readfaq:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/readfaq",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        translate: function (formData,callback) {
            return $http({
                url: adminUrl3+'Translate/translate',
                method: 'POST',
                data: formData,
            });
        },
        translatelink: function (formData,callback) {
            return $http({
                url: adminUrl3+'Translate/translatelink',
                method: 'POST',
                data: formData,
            });
        },
        // This is a demo Service for POST Method.
		getsessiondata: function(formData, callback) {
            
            // $http.post(adminurl + "api.php?func=getautocomplete&string=" + request).then(function (response) {
            //     //console.log("Hello",response);
            //     return response;
            // });
            return $http({
                url:adminUrl3+ "Usermasterad/getsessiondata",
                //url: "http://wohlig.co.in/chatbotapi/index.php/json/" + 'getautocomplete',
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            })
        },
		getimagedata: function(formData, callback) {
            
            // $http.post(adminurl + "api.php?func=getautocomplete&string=" + request).then(function (response) {
            //     //console.log("Hello",response);
            //     return response;
            // });
			
            return $http({
                url:adminUrl3+ "Libimages/getimagedata",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            })
        },
		getproductlisting: function(formData, callback) {
            
            // $http.post(adminurl + "api.php?func=getautocomplete&string=" + request).then(function (response) {
            //     //console.log("Hello",response);
            //     return response;
            // });
			
            return $http({
                url:adminUrl3+ "Journey/getproductlisting",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            })
        },
        getautocomplete: function(formData, typecount) {
            
            // $http.post(adminurl + "api.php?func=getautocomplete&string=" + request).then(function (response) {
            //     //console.log("Hello",response);
            //     return response;
            // });
			
            return ($http({
                url:adminUrl3+ "Chatbotautocomplete/getautocomplete",
                //url: "http://wohlig.co.in/chatbotapi/index.php/json/" + 'getautocomplete',
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            }).then(function (response){
				response.typecount=typecount;
				return response;
			}))
        },
		getfolderstructure:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Topicjourney/getfolderstructure",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		tagwithcrn:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/tagwithcrn",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		gettoken:function(formData,callback){
            return    $http({
                url:adminurl+'ObtainAuthToken/',
                method: 'POST',
                data:(formData),
                //withCredentials: true,
                //headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            });
        },
		get_conversationid:function(formData,callback){
			var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
            fd['session_object'] = $rootScope.session_object;
            return    $http({
                url:adminurl+'get_conversationid/',
                method: 'POST',
                data:$httpParamSerializer(fd),
                //withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
            });
        },
        get_contextid:function(formData,callback){
			var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
            fd['session_object'] = $rootScope.session_object;
            return    $http({
                url:adminurl+'get_contextid/',
                method: 'POST',
                data:$httpParamSerializer(fd),
                //withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
            });
        },
		getjourney:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Journeymetadata/getjourney",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		readjourney:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Journeymetadata/readjourney",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		getidletime:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Idletime/gettimer",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		gettaggedcrn:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/gettaggedcrn",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		readnotificationcount:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Notifications/readnotificationcount",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        readpostitcount:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Postit/readpostitcount",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        readticker:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Ticker/readticker",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        getticker:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Ticker/getticker",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        getnotification:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Notifications/getnotification",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        readnotiit:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Notifications/readnotiit",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        readpostit:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Postit/readpostit",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        getpostit:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Postit/getpostit",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        getimages:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Imagemulti/getimages",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		unansfeedbackcount:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Unansweredquestion/unansfeedbackcount",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		getnewquestion:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Unansweredquestion/getnewquestion",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        getunans:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Unansweredquestion/getunans",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        readunans:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Unansweredquestion/readunans",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        readunanscount:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Unansweredquestion/readunanscount",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        readfeedbackq:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Feedbackquestion/readfeedbackq",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        readfeedbackcount:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Feedbackquestion/readfeedbackcount",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        getfeedback:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Feedbackquestion/getfeedback",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        getdashboarddata:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/getdashboarddata",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        savehistory:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/savehistory",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        dislike:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/dislike",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        like:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Chathistory/like",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        saveagentchat:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Agentchat/savechat",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        setdisconnectsocket:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Agentchat/setdisconnectsocket",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
		getguidelinedata:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Guidelines/getdetail",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        disconnectuser:function(formData, callback) {
            
            return $http({
                url:adminUrl3+ "Agentchat/disconnectuser",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData,
            });
           
        },
        login:function(formData, callback) {
            
            // $http.post(adminurl + "api.php?func=getautocomplete&string=" + request).then(function (response) {
            //     //console.log("Hello",response);
            //     return response;
            // });
            
            return $http({
                url:adminUrl3+ "Chatbotuser/loginuser",
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                method: 'POST',
                data: formData,
            });
           
        },
        logout:function(formData, callback) {
            
           
            return $http({
                //url: "http://wohlig.co.in/chatbotapi/index.php/json/" + 'login/',
                url:adminUrl3+ "Chatbotuserlogs/logoutuser",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                method: 'POST',
                data: formData,
                //withCredentials: false,
                //dataType:"json",
            });
            
        },
		userlogout:function(formData, callback) {
            
           
            return $http({
                //url: "http://wohlig.co.in/chatbotapi/index.php/json/" + 'login/',
                url:adminUrl3+ "Usersessiontrail/logoutuser",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                method: 'POST',
                data: formData,
                //withCredentials: false,
                //dataType:"json",
            });
            
        },
		loginstatus:function(formData, callback) {
            
           
            return $http({
                //url: "http://wohlig.co.in/chatbotapi/index.php/json/" + 'login/',
                url:adminUrl3+ "Chatbotuserlogs/loginstatus",
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                //headers: {'X-CSRFToken': "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"},
                method: 'POST',
                data: formData,
                //withCredentials: false,
                //dataType:"json",
            });
            
        },
        changepassword:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/changepassword',
                method: 'POST',
                data: formData
            });
            // $.ajax({
            //     url : adminurl+"changepassword",
            //     data: formData,
            //     headers: {'X-CSRFToken': CsrfTokenService.getCookie("csrftoken")},
            //     type: "POST",
            //     dataType: "json",
                
            // });
        },
        
        forgotpassword:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/forgotpassword',
                method: 'POST',
                data: formData
            });
        },
        isvalidpasswordresetreq:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/isvalidpasswordresetreq',
                method: 'POST',
                data: formData
            });
        },
        changepassword2:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/resetpassword',
                method: 'POST',
                data: formData
            });
        },
        getttsSpeech:function(formData,callback){
            ////console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotautolist/getttsSpeech',
                method: 'POST',
                data:(formData),
                //withCredentials: false
            });
            
            
        },
        startRecording:function(formData,callback){
            ////console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotvoice/startRecording',
                method: 'POST',
                data:(formData),
               
            });
            
            
        },
        stopRecording:function(formData,callback){
            ////console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotvoice/stopRecording',
                method: 'POST',
                data:(formData),
                
            });
            
            
        },
		tts:function(formData,callback){
            ////console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotvoice/startRecoding1',
                method: 'POST',
                data:(formData),
            });
            
            
        },
        getnoteval:function(formData,callback){
            ////console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Chatbotnotes/getnotedata',
                method: 'POST',
                data:(formData),
            });
            
            
        },
        sendchat:function(formData,callback){
            ////console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Livechat/addConv',
                method: 'POST',
                data:(formData),
            });
            
            
        },
        Feed:function(formData,callback){
            ////console.log(formData);
            return    $http({
                //url:adminurl+'out/'+formData.user_id+"/",
                url: adminUrl3 + 'Feed',
                method: 'POST',
                data:(formData),
            });
            
            
        },
        getdiagram:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Diagram/getdiagram',
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            });
        },
        searchapi:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Chatbotuser/searchapi',
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            });
        },
		getuserdetail:function(formData, callback) {
            ////console.log($rootScope.sailscsrf,"csrf");
            return $http({
                url: adminUrl3 + 'Usermasterad/loginuser',
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            });
        },
		getdropdowncount:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Journeymetadata/getdropdowncount',
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            });
        },
		getchargejourney:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Journeymetadata/getchargejourney',
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            });
        },
		calculate:function(formData, callback) {
            
            return $http({
                url: adminUrl3 + 'Modulelib/calculate',
				headers:{'authorization':$.jStorage.get('accesstoken'),'x-csrf-token':$rootScope.sailscsrf},
                method: 'POST',
                data: formData
            });
        },
		htmlformsubmit:function(formData, callback) {
			 var fd = formData;
            fd['session_object'] = $rootScope.session_object;
            return $http({
                url: adminurl + 'outform/'+formData.user_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
                method: 'POST',
                data: $httpParamSerializer(fd),
                dataType:"json"
            });
        },
		outtablist:function(formData,callback){
			var fd = formData;
            
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
			fd['session_object'] = $rootScope.session_object;
            return    $http({
                url:adminurl+'outtablist/'+formData.user_id+"/",
				//url:'http://10.10.19.191:4220',
                method: 'POST',
				dataType:"json",
                data:$httpParamSerializer(fd),
                //withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken},
            });
        },
		outmatrix:function(formData,callback){
			var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
            fd['session_object'] = $rootScope.session_object;
            return    $http({
                url:adminurl+'outmatrix/'+formData.user_id+"/",
				//url:'http://10.10.19.191:4220',
                method: 'POST',
				dataType:"json",
                data:$httpParamSerializer(fd),
                //withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken},
            });
        },
		outconflict:function(formData, callback) {
			var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
            fd['session_object'] = $rootScope.session_object;
            return $http({
                url: adminurl + 'outconflict/'+formData.user_id+"/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
                method: 'POST',
                data: $httpParamSerializer(fd),
                dataType:"json"
            });
        },
        crnsubmit:function(formData,callback){
			var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
            fd['session_object'] = $rootScope.session_object;
            return    $http({
                url:adminurl+'outcrn/'+formData.user_id+"/",
				//url:'http://10.10.19.191:4220',
                method: 'POST',
				dataType:"json",
                data:$httpParamSerializer(fd),
                //withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken},
            });
        },
        gettabdata:function(formData,callback){
            
            return    $http({
                url:adminurl+'get_tab_data/',
                method: 'POST',
                data:$.param(formData),
                dataType:"json",
                //xsrfHeaderName :"X-CSRFToken",
                //xsrfCookieName :"csrftoken",
                //withCredentials: false,
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken': formData.csrfmiddlewaretoken},
            });
            /*
            var data = $.param(formData);
        
            var config = {
                dataType:"json",
                'Content-Type': 'application/json',
                headers : { 'X-CSRFToken': formData.csrfmiddlewaretoken}
            }
            return $http.post(adminurl+'get_tab_data/', data,config).success(function(data,status,headers,config){
                
            });*/

        },
        getSysMsg:function(formData,callback){
            var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
            fd['session_object'] = $rootScope.session_object;
            return    $http({
                url:adminurl+'out/'+formData.user_id+"/",
                //url: adminUrl3 + 'Chatbotautolist/getSysMsg',
                method: 'POST',
                data:$httpParamSerializer(fd),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
                //withCredentials: false,
                //headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            });
            // var fd = $.param(formData);
            // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(fd), 'k_123');
            
            
            
            
            
            // var fd = JSON.stringify((formData));
            // //var encodedString = Base64.encode(fd);
            // ////console.log(fd);
            // var ciphertext = CryptoJS.AES.encrypt((fd),'k_123').toString();
            // var a = ciphertext.toString().replace(" ", "+");
            // var b=a.replace(" ", "+");
            // var bytes = CryptoJS.AES.decrypt((b),'k_123');
            // // //console.log(ciphertext);
            // // //console.log(bytes);
            // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // ////console.log(decryptedData);
            // var data = {data:ciphertext};
            // ////console.log(data);
            // // var data = {data:encodedString};
            // // //console.log(data);
            // // var decodedString = Base64.decode(encodedString);
            // // //console.log(JSON.parse(decodedString));
            // return    $http({
            //     url: adminUrl3 + 'Api/out',
            //     method: 'POST',
            //     data: data
            //     //withCredentials: false,
            //     //headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            // });
            
        },
        ratecardsubmit : function(formData,callback){
			var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
            fd['session_object'] = $rootScope.session_object;
            ////console.log(formData);
            return    $http({
                url:adminurl+'outratecard/'+formData.user_id+"/",
                //url: adminUrl3 + 'Chatbotautolist/getSysMsg',
                method: 'POST',
                data:$httpParamSerializer(fd),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
                //withCredentials: false,
                //headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
            });
            
            
        },
        get_session: function (formData, callback) {
			////console.log($rootScope.djtoken,"dj");
            return $http({
                url: adminurl + 'get_session/',
                headers: {'Authorization':$rootScope.djtoken},
                method: 'POST',
                data: $.param(formData),
                dataType:"json"
            });
        },
        getDthlinkRes:function(formData,callback){
            ////console.log(formData);
            var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
			_.unset(fd, 'tiledlist.Process');
            fd['session_object'] = $rootScope.session_object;
            return    $http({
                url:adminurl+'outDTL/'+formData.user_id+"/",
                //url: adminUrl3 + 'Chatbotautolist/getDthlink',
                method: 'POST',
                data:$httpParamSerializer(fd),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
            });
            
            
        },
        outprocess:function(formData,callback){
            ////console.log(formData);
            var fd = formData;
			_.unset($rootScope.session_object, 'data');
			_.unset($rootScope.session_object, 'response');
            fd['session_object'] = $rootScope.session_object;
            return    $http({
                url:adminurl+'outprocess/'+formData.user_id+"/",
                //url: adminUrl3 + 'Chatbotautolist/getDthlink',
                method: 'POST',
                data:$httpParamSerializer(fd),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
            });
            
            
        },
        gps_location:function(formData, callback){
            //console.log(formData);
            var fd = formData;
            return    $http({
                url:adminurl+'gps_location/',
                //url: adminUrl3 + 'Chatbotautolist/getDthlink',
                method: 'POST',
                data:$httpParamSerializer(fd),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8','Authorization':$rootScope.djtoken,'X-CSRFToken':formData.csrfmiddlewaretoken },
            });          
        }
    };
    //return responsedata;
});
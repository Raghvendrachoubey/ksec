// var liveChatUrl="http://localhost:5000/" ;
var liveChatUrl="https://kaira.prod.kotak.int:5000/" ;

myApp.factory("livechatapi",function($http){  
      return {
        agentLogin:function(data,callback){
            //console.log("agent login data",data);
            $http({
                url: liveChatUrl + 'agentlogin',
                method: 'post',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                data:data 
            }).then(callback);
        },
        agentLogout:function(data,callback){
            //console.log("agent logout data",data);
            $http({
                url: liveChatUrl + 'agentlogout',
                method: 'post',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                data:data 
            }).then(callback);
        },
        agentBreakStatus:function(data,callback){
            //console.log("agent change status ",data);
            $http({
                url: liveChatUrl + 'break',
                method: 'post',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                data:data 
            }).then(callback);
        },
        userlogin:function(data,callback){
            //console.log("user login data",data);
            $http({
                url: liveChatUrl + 'userlogin',
                method: 'post',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                data:data 
            }).then(callback);
        },
        userlogOut:function(data,callback){
            //console.log("user logout data",data);
            $http({
                url: liveChatUrl + 'userlogout',
                method: 'post',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                data:data 
            }).then(callback);
        },
        getAgentOnline:function(callback){
            $http({
                url: liveChatUrl + 'live_agent',
                method: 'post',
                data:{'Email':agentemail,'agentname':agentname}
            }).then(callback);
        },
        sendKeys:function(value,callback){
            $http({
                url: liveChatUrl + 'hot_keys',
                method: 'post',
                data:{'hotkeyvalue':value}
            }).then(callback);
        },
        getKeys:function(callback){
            $http({
                url: liveChatUrl + 'hot_keys',
                method: 'get',
            }).then(callback);
        },
    }
})
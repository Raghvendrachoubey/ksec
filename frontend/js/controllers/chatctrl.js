myApp.controller('ChatCtrl', function ($scope, $rootScope,TemplateService,livechatapi, NavigationService,CsrfTokenService, $timeout,$interval,$http,apiService,$state,$uibModal,Menuservice,$cookies,$sce,Idle,$location,toastr) {
	 
		

    $rootScope.contentobj = [];
    $rootScope.crnconver = [];
    $rootScope.crndata = {};
    $rootScope.autocompletelist = [];
    $rootScope.chatOpen = false;
    $rootScope.showTimeoutmsg = false;
    $rootScope.firstMsg=false;
    $rootScope.chatmsg = "";
    $rootScope.chatmsgid = "";
    $rootScope.chatText = "";
    $rootScope.answers = "";
    $rootScope.msgSelected = false;
    $rootScope.showTdcal = false;
    $rootScope.showRdcal = false;
    $rootScope.showSTD = false;
    $rootScope.showCTD = false;
    $rootScope.agentconnected = false;
    $rootScope.lastagent ="";
    $rootScope.agentlist = [];
    $rootScope.agentdet = {};
    $rootScope.outprocessclick = 0;
    $rootScope.journeylist = [];
    $rootScope.isLoggedIn = false;
    $rootScope.displaySubmitButton = false;
    $rootScope.languagelist = [
        {id:"en" , name:"English"},
        {id:"hi" , name:"Hindi"},
        {id:"mr" , name:"Marathi"},
        {id:"kn" , name:"Kannada"},
        {id:"te" , name:"Telugu"},
        {id:"bn" , name:"Bengali"},
    ];
    $scope.login = function(username,email,sl)
    {
        
        
            $scope.formData = {username:username,email:(email)};
        /*
        apiService.login($scope.formData).then(function (callback){
            //console.log(callback);
        });*/
        
            apiService.login($scope.formData).then(function (callback){
                // $scope.csrftoken=CsrfTokenService.getCookie("csrftoken");
                
                //if(angular.isUndefined(callback.data.error.message))
                if(callback.data.value)
                {
                    // console.log(callback.data.data);
                    $.jStorage.flush();
                    $timeout(function(){
                        $scope.chatpanelheight = $("#chat_window_1").height()-160;
                    },2000);
                    $rootScope.isLoggedIn = true;
                    
                    // $rootScope.access_role = callback.data.data.accessrole;
                    $.jStorage.set("accesstoken",callback.data.data.token);
                    $.jStorage.set("name",username);
                    $.jStorage.set("email", email);
                    $rootScope.selectedLanguage = sl;
                    $.jStorage.set("language", $rootScope.selectedLanguage.id);
                    $scope.sessiondata = {
                        id_string : "",
                        //data : {},
                        DTHyperlink : '',
                        LineNo : '',
                        options : '',
                        opts : '',
                        row_by_framework_level : '',
                        framework_level : 1,
                        response:{},
                        response_type :'',
                        form_input_type : '',
                        form_input_dict : {} , 
                        form_input_list : []  ,  
                        form_category : '',
                        Context:'',
                        Context_1:'',
                        Context_2:'',
                        Context_3:'',
                        Context_4:'',
                        Context_5:'',
                        gb_dt_start_row:-1,
                        gb_dt_end_row:-1,
                        gb_dt_current_cursor_row:-1,
                        gb_dt_current_cursor_col:-1,
                        gb_dt_file_name:'',
                        gb_sub_topic_list : [],
                        gb_step_list : [],
                        gb_current_step : '',
                        tooltip : [],
                        gb_topic_tuple_array:[],
                        gb_max_ratio_index_in_tuple:[],
                        gb_topic:'',
                        gb_matched_row_values:[],
                        gb_matched_col_values:[],
                    };
                    $.jStorage.set("sessiondata",$scope.sessiondata);
                    
                }
                else if(callback.data.error.message == -1)
                    $scope.loginerror = -1;
            });
        
        
    };
    if(!$.jStorage.get("language"))
    {
        $rootScope.selectedLanguage = $rootScope.languagelist[0];
        $.jStorage.set("language", $rootScope.selectedLanguage.id);
    }
    else 
    {
        
        $rootScope.selectedLanguage = $.jStorage.get("language");
        $("#language_list").val($rootScope.selectedLanguage).trigger('change');
        
        var v_obj = _.find($rootScope.languagelist, function(o) { return o.id == $rootScope.selectedLanguage; });
        $rootScope.selectedLanguage=v_obj;
        
        var v_index = _.findIndex($rootScope.languagelist, function(o) { return o.id == $rootScope.selectedLanguage.id; });
        var langname = v_obj.name;
        $("#language_list option:contains(" + langname + ")").prop('selected', true);
        //$('#language_list').find('option:nth-child('+v_index+')').prop('selected', true);            
    }
    $scope.langchange = function(sl) {
        $rootScope.selectedLanguage = sl;
        $.jStorage.set("language", $rootScope.selectedLanguage.id);
    };
    $rootScope.menuOpen=false;

    $scope.not_menu = [
        {msg:"Changes in the commission structure",img:"not1.png"},
        {msg:"Shubh Deepawali from Fino",img:"not2.jpg"},
        {msg:"Transact more to achieve more now",img:"not3.jpg"},
        {msg:"More"},
    ];
    $scope.$noti_instance = {};
    $scope.shownotification = function(notdata) {
        
        $scope.notedata = notdata;
        $scope.$noti_instance = $uibModal.open({
            scope: $scope,
            animation: true,
            size: 'sm',
            templateUrl: 'views/modal/notificationdata.html',
            resolve: {
                items: function () {
                    return notdata;
                }
            },
            //controller: 'CommonCtrl'
        });
    };
    $scope.noticancel = function() {
        ////console.log("dismissing");
        $scope.$noti_instance.dismiss('cancel');
    };
    $scope.failuremsg = [
        {msg:"I'm glad that you are trying new functionalities. However, currently I'm equipped with information about Cash-In, New Products, Transaction Status, Commission & Charges and General Information about Account Opening Processes."},
        {msg:"I'm glad that you are trying new functionalities. However, currently I'm equipped with information about Cash-In, New Products, Transaction Status, Commission & Charges and General Information about Account Opening Processes."},
        //{msg:"No hard feelings but I don't think I can answer that"},
        {msg:"I'm glad that you are trying new functionalities. However, currently I'm equipped with information about Cash-In, New Products, Transaction Status, Commission & Charges and General Information about Account Opening Processes."},
    ];
    $scope.lastfailure="";
    if($.jStorage.get("lastagent"))
        $rootScope.lastagent = $.jStorage.get("lastagent");
    if($.jStorage.get("agentlist"))
        $rootScope.agentlist = $.jStorage.get("agentlist");
    
    angular.element(document).ready(function() { 
        $("body").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDy_367PJeu1ykECzPAc7fZNPLF5bOTSlU&v=3.exp&sensor=true' async defer></script>");
        // $timeout(function(){
        // new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
        // },10000);
        $timeout(function(){
            $rootScope.panelheight = $(window).height()-80;
        },0);
        
    });
    // var mylist = $.jStorage.get("chatlist");
    // if(!mylist || mylist == null)
    //     $rootScope.chatlist = [];
    // else
    //     $rootScope.chatlist = $.jStorage.get("chatlist");
    $rootScope.chatlist=[];
    $rootScope.autolistid="";
    $rootScope.autolistvalue="";
    $rootScope.showMsgLoader=false;
    $rootScope.rate_count= 0;
    //$("#testLoad").load("http://wohlig.com/");
    var vm = this;
    
    vm.displayTranscript = displayTranscript;
    vm.transcript = '';
    //  //$rootScope.transcript = "";
    // // $rootScope.displayTranscript = function() {
    // //     //vm.transcript = $rootScope.transcript;
    // //     $(".chatinput").val($rootScope.transcript);
    // //     //console.log("Speech",$rootScope.transcript);
    // //     //This is just to refresh the content in the view.
    // //     if (!$scope.$$phase) {
    // //         $scope.$digest();
    // //     }
    // // };
    // $rootScope.speechEnd = function() {
    //     //console.log("Speech Ended");
    // };
    
    // //vm.displayTranscript = $rootScope.displayTranscript();
    
    // $rootScope.speechStarted = function() {
    //     //console.log("speech Started");
    // };
    // /**
    //  * Handle the received transcript here.
    //  * The result from the Web Speech Recognition will
    //  * be set inside a $rootScope variable. You can use it
    //  * as you want.
    //  */
    $rootScope.newuser = function() {
        $rootScope.chatlist = [];
        $scope.userlogout();
         // ----------------
        // $rootScope.agentconnected = false;
        // $rootScope.endConversation(1);

        //  // livechatapi.userlogOut({
        //  //     'user_empcode': $rootScope.empcode,
        //  //     'domain_login_id':$rootScope.connectedAgentName
        //  // },function(data){
        //  //    //console.log("live user logout ",data);
        //  // })

         
        // if($rootScope.chatlist.length > 1)
        // {
        //     /*
        //     apiService.get_session({}).then( function (response) {
        //         $cookies.put("csrftoken",response.data.csrf_token);
        //         $cookies.put("session_id",response.data.session_id);
        //         $.jStorage.set("csrftoken",response.data.csrf_token);
        //         $.jStorage.set("session_id",response.data.session_id);
        //         $rootScope.session_id =response.data.session_id;
        //         $rootScope.conversationid=$rootScope.id+response.data.session_id;
        //         $rootScope.chatlist = [];
        //         $rootScope.firstMsg = true;
        //         msg = {Text:"Hi, How may I help you ?",type:"SYS_FIRST"};
        //         $rootScope.pushSystemMsg(0,msg);
        //         ////console.log(response.data);
        //     });*/
        // }
        // $(".icrnno").val("");
        // $rootScope.outprocessjourney="";
        // $rootScope.outprocessjourneylist=[];
        // $rootScope.crnconver = [];
        // $rootScope.crndata = {};
        // $rootScope.getconversationid();
        // $rootScope.script_data=[];
        // $rootScope.tabvalue.elements = [];
        // $rootScope.tabvalue.element_values=[];
        // $rootScope.journeylist=[];
        // $rootScope.outprocessclick=0;
        // $rootScope.chatlist = [];
        // $rootScope.firstMsg = true;
        // //Idle.setTimeout(10);
        //   //  Idle.watch();
        // var today = new Date();
        // var hrs = today.getHours();

        // var greet;

        // if (hrs < 12)
        //     greet = 'Good Morning';
        // else if (hrs >= 12 && hrs <= 17)
        //     greet = 'Good Afternoon';
        // else if (hrs >= 17 && hrs <= 24)
        //     greet = 'Good Evening';
        // msg = {Text:greet+",I'm Bandhu How can I help you today?",type:"SYS_FIRST"};
        // //msg = {Text:"Hi, How may I help you ?",type:"SYS_FIRST"};
        // $rootScope.pushSystemMsg(0,msg);
        
    };
    $rootScope.savehistory = function(obj,cli) {
        ////console.log(obj);
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), $rootScope.FRONTEND_ENC_KEY).toString();
        apiService.savehistory({data:ciphertext}).then(function (response){
            //console.log(response);
            //console.log(cli);
            if(response.data.data) {
                $rootScope.chatlist[cli].gotresponse=true;
                return true;
            }
            else
                return false;
        }).catch(function (reason) {
            //console.log(reason);
            $rootScope.savehistory(obj,cli);
        });
    };
    
    $scope.userlogout = function() {

        
        $scope.formData = {sessionid:$rootScope.sessionid,user:$rootScope.id};
        if($rootScope.access_role=='user')
        {
            //var formData = {user:$rootScope.empcode,emp:$rootScope.Employee_ID};
            if($.jStorage.get("accesstoken")) {
				var formData = {data:$.jStorage.get("accesstoken")};
				apiService.userlogout(formData).then(function (callback){ 
					// $scope.agentlogout();
					$rootScope.tabvalue.elements = [];
					$rootScope.tabvalue.element_values = [];
					$.jStorage.flush();
					livechatapi.agentLogout({
						'domain_login_id': $rootScope.empcode
					}, function (data) {
						//console.log("agent logout", data)
					})
					//if(io.socket.isConnected())
						//io.socket.disconnect();
					//$state.go("login");
					$timeout(function(){
                        $rootScope.isLoggedIn = false;
						// window.location.href=$rootScope.dmpurl+"/login/user_logout";
					},500);
					
				});
			}
			else {
				$timeout(function(){
                    $rootScope.isLoggedIn = false;
					// window.location.href=$rootScope.dmpurl+"/login/user_logout";
				},500);
			}
        }
        
        apiService.logout($scope.formData).then(function (callback){
            // $scope.agentlogout();
            $rootScope.tabvalue.elements = [];
            $rootScope.tabvalue.element_values = [];
            $.jStorage.flush();
            //if(io.socket.isConnected())
                //io.socket.disconnect();
            //$state.go("login");
            livechatapi.agentLogout({
                'domain_login_id': $rootScope.empcode
            }, function (data) {
                //console.log("agent logout", data)
            })
            $timeout(function(){
                $rootScope.isLoggedIn = false;
                // window.location.href=$rootScope.dmpurl+"/login/user_logout?log_stat=2";
            },500);            
        });
        
        
    };
    $scope.checkloginstatus2 = function(){
        if(!$.jStorage.get("accesstoken")) {
            
            // $scope.userlogout();
        }
    };
    $scope.$on('IdleStart', function() {
        
        $rootScope.idlestart = true;
        
    });
    $scope.$on("$destroy",function(){
        if (angular.isDefined($scope.promise2)) {
            $interval.cancel($scope.promise2);
        }
        
    });
    // $interval(function() {
    //     $scope.promise2=$scope.checkloginstatus2();
    // },10000);
    $rootScope.$on('IdleTimeout', function() {
        // var scope = angular.element(document.getElementById('changepwd')).scope();
        // scope.logout();
        //if($.jStorage.get("timer")==45)
        if($rootScope.idleflag==1)
        {
            //msg = {Text:"Hello! it looks like you've been inactive, type  help if you need anything ",type:"SYS_EMPTY_RES"};
            //$rootScope.pushSystemMsg(0,msg); 
            // end their session and redirect to login
            $timeout(function(){
                Idle.setTimeout(900);
                Idle.setIdle(10);
                Idle.watch();
                $rootScope.idlestart=false;
                $rootScope.idleflag=2;
            },500);
            
            $rootScope.newuser();
            
            //$.jStorage.set("timer",45);
            //console.log("End -start new",new Date());
        }
        else if($rootScope.idleflag==2)
        {
            //alert("The session has timed out. Please click here to login again.");
            toastr.warning("The session has timed out. Please click here to login again.", 'Warning');
            //console.log("End -start new2",$rootScope.idleflag);
            $scope.userlogout();
        }
    });
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    
    function displayTranscript() {
        vm.transcript = $rootScope.transcript;
        ////console.log("transcript",$rootScope.transcript);
        $(".chatinput").val($rootScope.transcript);
        //This is just to refresh the content in the view.
        if (!$scope.$$phase) {
            $scope.$digest();
            ////console.log("transcript",$rootScope.transcript);
        }
    }
    // function displayTranscript() {
    //     vm.transcript = $rootScope.transcript;
    //     $(".chatinput").val($rootScope.transcript);
    //     //console.log("Speech",$rootScope.transcript);
    //     //This is just to refresh the content in the view.
    //     if (!$scope.$$phase) {
    //         $scope.$digest();
    //     }
    // }
    angular.element(document).ready(function(){
        ////console.log($rootScope.uipage);
        
       
        
    });
    $timeout(function(){
        if($rootScope.uipage =='dashboard' )
            $rootScope.showChatwindow();
    },2000);
    $rootScope.trustedHtml = function (plainText) {
        return $sce.trustAsHtml(plainText);
    };
    $rootScope.getCookie = function(c_name)
    {
        if (document.cookie.length > 0)
        {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1)
            {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return "";
    };
    $rootScope.searchapi = function() {
        topic=$('.searchTerm').val();
        ////console.log(topic);
        encoded=Base64.encode(topic);
        // $.ajax({
        //     url: "https://www.kotak.com/content/kotakcl/en/search/_jcr_content/mid_par/search.filterclick.all.0.10.esc.json/"+encoded,
        //     dataType: "json",
        //     async: true,
        //     cache: false,
        //     timeout: 3000,
        //     //type: "GET",
        //     success: function (data) {
        //         //console.log(data,"Data");
                
        //     },
        // });
        formData={search:encoded};
        apiService.searchapi(formData).then(function (response){
                ////console.log(response.data);
            var msg={type:'kotak_search',data:response.data.data};
            //$rootScope.pushSystemMsg('',msg);
        });
    };
    $rootScope.findTopic = function(topic) {
        var prev = "";
        if(topic == "")
        {
            $("#topiclist li").parent().find('ul.tree').toggle(300);
            $("#topiclist li").parent().children("a").find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
            $("#topiclist li").show();
        }
        else
            $("#topiclist li").hide();
            $("h3#topic").text(topic);
            $("#topiclist li").each(function(){
            
            var keyword = new RegExp($(this).children("a").find().attr("id"), 'i');
            ////console.log($(this).text().search(new RegExp(topic, "i")));
            //if (keyword.test(topic))
            if($(this).find("a").text().search(new RegExp(topic, "i"))<0)
            {
                
            }
            else
            {
                $(this).show();
                $(this).children("a").find().show();
                if($(this).parent().find('ul.tree').is(':visible')) {
                    
                }
                else
                {
                    $(this).parent().find('ul.tree').toggle(300);
                    $(this).parent().children("a").find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
                }
                
                ////console.log("found",topic);   
            }
            //$(this).find(".section_last").removeClass("active");
        });
    };
    $rootScope.scrollChatWindow = function() {
        $timeout(function(){
            var chatHeight = $("ul.chat").height();
            $('.panel-body').animate({scrollTop: chatHeight});
        });
    };
	$rootScope.scrollprocess = function() {
        $timeout(function(){
            $('#tab_data').animate({scrollTop: 0});
        },500);
    };
    $rootScope.iframeHeight = window.innerHeight-53;
    $rootScope.getcurrtime = function() {
        var d = new Date(),
        h=d.getHours(); 
        m=d.getMinutes();
        s=d.getSeconds();
        time = h+":"+m+":"+s;
        return time;
    };
    $rootScope.getDatetime = function() {
        //return (new Date).toLocaleFormat("%A, %B %e, %Y");
        return currentTime = new Date();
    };
    $scope.typecount=0;
    $rootScope.getAutocomplete = function(chatText) {
        if( $rootScope.answers == "")
        {
            $rootScope.showTimeoutmsg = false;
            // if(!$rootScope.showTimeoutmsg && chatText=="") 
            // {
            //     $timeout(function () {
            //         //$rootScope.showTimeoutmsg = true;
            //         // msg = {Text:"Any Confusion ? How May I help You ?",type:"SYS_INACTIVE"};
            //         // $rootScope.pushSystemMsg(0,msg);
            //     },60000);
            // }
            ////console.log("HI");
            $rootScope.chatText = chatText;
            if($(".chatinput").val() == "" || $(".chatinput").val() == null) {
                $rootScope.autocompletelist = [];
                
            }
            else {
                var str2 = $(".chatinput").val();
                if(str2) {
                    str2 = str2.toLowerCase();
                    if (str2.includes("calculator") || str2.includes("td cal") || str2.includes("rd cal") || str2.includes("calc") )
                    //if($rootScope.chatText != "calc" || $rootScope.chatText != "calculator" || $rootScope.chatText != "td cal" || $rootScope.chatText != "rd cal")
                    {
                        ////console.log("not calc");
                    }
                    else     
                    {  
                
                        wordstr = str2.split(" ");
                        lastchar=str2.substr(str2.length-1);
                        ////console.log(lastchar,"lc");
                        ////console.log(str2,"str");
                        if(lastchar == ' ') {
                            var topic = $("#topic").text();
                            $rootScope.chatdata = { string:$rootScope.chatText,topic:topic};
                            $scope.typecount++;
                            apiService.getautocomplete($rootScope.chatdata,$scope.typecount).then(function (response){
                                if(response.typecount==$scope.typecount) {
                                    if($(".chatinput").val() == '') {} 
                                    else {
                                        $rootScope.autocompletelist = response.data.data;
                                        
                                    }
                                }
                                $scope.typecount=0;
                            });
                        }
                    }
                }
            }
        }
    };
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false,
        isopen:false,
    };
    $rootScope.pushSystemMsg = function(id,value) {
        $rootScope.chatmsgid = id;
        $rootScope.chatmsg = value;
        $rootScope.autocompletelist = [];
        $rootScope.chatlist.push({id:"id",msg:angular.copy(value),position:"left",curTime: $rootScope.getDatetime()});
        $rootScope.chatEnterDisabled=false;
        $.jStorage.set("chatlist",$rootScope.chatlist);
        ////console.log($rootScope.chatlist);
        $timeout(function(){
            $rootScope.scrollChatWindow();
        });
        
    };
    $scope.$modalInstanceds = {};
    $rootScope.openMydashboard = function() {
        $scope.$modalInstanceds = $uibModal.open({
            scope: $scope,
            animation: true,
            size: 'lg',
            templateUrl: 'views/modal/profile.html',
            controller: 'ProfileCtrl'
        });
    };
    $scope.Mydashboardcancel = function() {
        ////console.log("dismissing");
        $scope.$modalInstanceds.dismiss('cancel');
        //$scope.$modalInstance.close();
    };
    $rootScope.expanddbtile = function() {
        $(".dashboardtiles").removeClass('col-md-3');
        $(".dashboardtiles").addClass('col-md-6');
    };
    $rootScope.reducedbtile = function() {
        $(".dashboardtiles").removeClass('col-md-6');
        $(".dashboardtiles").addClass('col-md-3');
    };
    $rootScope.showChatwindow = function () {
        newlist = $.jStorage.get("chatlist");
        // if(!newlist || newlist == null)
        // {
        //     $rootScope.firstMsg = false;
        // }
        // else
        // { 
        //     $rootScope.firstMsg = true;
        // }
        // $.jStorage.set("showchat",true);
        if(!$rootScope.firstMsg)
        {
            $rootScope.firstMsg = true;
            var today = new Date();
            var hrs = today.getHours();

            var greet;

            if (hrs < 12)
                greet = 'Good Morning';
            else if (hrs >= 12 && hrs <= 17)
                greet = 'Good Afternoon';
            else if (hrs >= 17 && hrs <= 24)
                greet = 'Good Evening';
            //console.log(greet);
            msg = {Text:greet+",I'm Bandhu How can I help you today?",type:"SYS_FIRST"};
            $rootScope.pushSystemMsg(0,msg);  
        }
        $('#chat_panel').slideDown("slow");
        // $("#chat_panel").toggle('scale');
        //$('#chat_panel').find('.panel-body').slideDown("fast");
        //$('#chat_panel').find('.panel-footer').slideDown("slow");
        $('.panel-heading span.icon_minim').removeClass('panel-collapsed');
        $('.panel-heading span.icon_minim').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        $timeout(function(){
            $("#chat-circle").hide();
            //  $("#chat-circle").toggle('scale');
        },500);
        $rootScope.chatOpen = true;
        $rootScope.scrollChatWindow();
        if($(".expandable2").hasClass('col-md-12')) //-- menu closed
        {
            $(".expandable2").removeClass('col-md-12');
            $(".expandable2").addClass('col-md-8');
            //$rootScope.reducedbtile();
        }
        else if($(".expandable2").hasClass('col-md-9')) //-- menu opened
        {
            $(".expandable2").removeClass('col-md-9');
            $(".expandable2").addClass('col-md-5');
            //$rootScope.expanddbtile();
        }
		$(".fdashboard").hide();
        angular.element(document).ready(function(){
            $timeout(function(){
                $scope.chatpanelheight = $("#chat_window_1").height()-160;
            },2000);
        });
    };
    $rootScope.minimizeChatwindow = function() {
        $.jStorage.set("showchat",false);
        $rootScope.showTimeoutmsg = false;
        $rootScope.autocompletelist = [];
        $('#chat_panel').slideUp();
        // $('#chat_panel').toggle('scale');
        //$('#chat_panel').find('.panel-body').slideUp("fast");
        //$('#chat_panel').find('.panel-footer').slideUp("fast");
        $('.panel-heading span.icon_minim').addClass('panel-collapsed');
        $('.panel-heading span.icon_minim').addClass('glyphicon-plus').removeClass('glyphicon-minus');
        $("#chat-circle").show( "fadeIn");
        // $("#chat-circle").toggle('scale');
        if($(".expandable2").hasClass('col-md-8')) //-- menu is closed
        {
            $(".expandable2").removeClass('col-md-8');
            $(".expandable2").addClass('col-md-12');
            //$rootScope.expanddbtile();
        }
        else if($(".expandable2").hasClass('col-md-5')) //-- menu is opened
        {
            $(".expandable2").removeClass('col-md-5');
            $(".expandable2").addClass('col-md-9');
            if($(".dashboardtiles").hasClass('col-md-6'))
            {
                //$rootScope.reducedbtile();
            }
            
        }
    };
    $rootScope.exportToExcel=function(tableId){ // ex: '#my-table'
        $scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
        ////console.log(tableId);
        ////console.log($scope.exportHref);
        var res=tableId.split("table");
        $timeout(function() {
            var link = document.createElement('a');
            link.download = res[0]+".xlsx";
            link.href = $scope.exportHref;
            link.click();
        }, 100);
        //$timeout(function(){location.href=$scope.exportHref;},100); // trigger download
    }
    $rootScope.pushAutoMsg = function(id,value,answer) {
        $rootScope.msgSelected = true;
        $rootScope.chatmsgid = id;
        $rootScope.chatmsg = value;
        $rootScope.answers = answer;
        $rootScope.autocompletelist = [];
        $rootScope.chatlist.push({id:$rootScope.chatlist.length,msg:value,position:"right",curTime: $rootScope.getDatetime()});
    
        var automsg = { Text: answer , type : "SYS_AUTO"};
        $rootScope.pushSystemMsg(id,automsg);
        $rootScope.showMsgLoader = false;
        //$.jStorage.set("chatlist",$rootScope.chatlist);
        $rootScope.msgSelected = false;
        $rootScope.chatmsgid = "";
        $rootScope.chatmsg = "";
        $rootScope.answers = "";
        $(".chatinput").val("");
        $rootScope.autolistid = "";
        $rootScope.chatText = "";
        $rootScope.scrollChatWindow();
    };
    
    $rootScope.showSTDcal = function(){
        $rootScope.showSTD = true;
        $rootScope.showCTD = false;
        // $("#simple-form").delay(100).fadeIn(100);
        // $("#cumu-form").fadeOut(100);
    };
    $rootScope.showCTDcal = function(){
        $rootScope.showSTD = false;
        $rootScope.showCTD = true;
        // $("#cumu-form").delay(100).fadeIn(100);
        // $("#simple-form").fadeOut(100);
        
    };
    $rootScope.showTdcalc = function(){
        $rootScope.showTdcal = true;
        $rootScope.showRdcal = false;
    };
    $rootScope.showRdcalc = function(){
        $rootScope.showTdcal = false;
        $rootScope.showRdcal = true;
        $rootScope.showSTDcal();
    };
    $rootScope.tdcalc = function(mon,rate,tenure,index) {
        var mondep = parseFloat(mon);
        var rate = parseFloat(rate);
        var ten = parseFloat(tenure);
        var rdmValue = mondep * (  (Math.pow((1+rate/4),(ten/3))-1  )/(1-(Math.pow(1+rate/4),(-1/3))));
        $('.rdm'+index).val(rdmValue.toFixed(2));
    };
    $rootScope.calcSTD = function(principal,rate,tenure,index) {
        var principal = parseFloat(principal);
        var rate2 = parseFloat(rate);
        var tenure_days = parseFloat(tenure);
        var tenure_yrs = tenure_days/365;
        $('.tenure_yrs'+index).val(tenure_yrs.toFixed(2));
        var int_maturity = (principal * rate2 * tenure_yrs)/100;
        $('.int_maturity'+index).val(int_maturity.toFixed(2));
        var val_maturity = principal + int_maturity;
        $('.val_maturity'+index).val(val_maturity.toFixed(2));
    };
    $rootScope.calcCTD = function(principal,rate,tenure,index) {
        var cumu_principal = parseFloat(principal);
        var cumu_rate2 = parseFloat(rate);
        var cumu_tenure_days = parseFloat(tenure);
        var cumu_tenure_yrs = cumu_tenure_days/365;
        var cumu_val_maturity = cumu_principal * (1+(cumu_rate2/400))^(4*cumu_tenure_yrs);
        var cumu_int_maturity = cumu_val_maturity - cumu_principal;
        $('.cumu_tenure_yrs'+index).val(cumu_tenure_yrs.toFixed(2));
        $('.cumu_int_maturity'+index).val(cumu_int_maturity.toFixed(2));
        $('.cumu_val_maturity'+index).val(cumu_val_maturity.toFixed(2));
    };
    $scope.askchargej=function(str,decryptedData){
        var msg3 = {Text:str,response:decryptedData,type:"SYS_CHARGE"};
		$rootScope.pushSystemMsg(0,msg3); 
    };
    $scope.getchrjourney = function(msg,selected,response) {
        $rootScope.chatlist.push({id:"SYS_CHARGE",msg:selected,position:"right",curTime: $rootScope.getDatetime()});
    
        if(selected == 'Yes') {
            $rootScope.getSystemMsg('',"GSFC Final");
        }
        else {
			
            //$rootScope.getSystemMsg('',msg);
			var ogdata={data:{data:response}};
			
			angular.forEach(response.tiledlist, function(value, key) {
				if(value.type=="text")
				{ 
					$rootScope.pushSystemMsg(0,response);
				}
				if (value.type == "html_form") {
					//$rootScope.pushSystemMsg(0, decryptedData);
					
					$rootScope.pushSystemMsg(0,response);
					
					$rootScope.showMsgLoader = false;
				}
				if(value.type=="rate card")
				{
					
					$rootScope.pushSystemMsg(0,response);
				
					//$rootScope.pushSystemMsg(0,decryptedData);
					$rootScope.showMsgLoader = false;
					
					// $(".r_c_col").val($(".r_c_col option:first").val());
					// $(".r_c_row").val($(".r_c_row option:first").val());

					// var firstOption = $('.r_c_col option:first');
					// firstOption.attr('selected', true);
					// $('.r_c_col').attr('selectedIndex', 0);
					
					$timeout(function(){
						if(value.no_drop==2 && value.dynamic==0)
						{
							var list_index = $rootScope.chatlist.length-1;
							var val1 = value.options_list;
							//var val1 = value.options_list;
							$("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
							$("select.r_c_col.r_c_col1.r_c_col_"+list_index).html("");
							
							
							$("select.r_c_op_"+list_index).html("");
							$("select.r_c_op_"+list_index).select2("val","");
							_.forEach(val1[0].value, function(values) {
								////console.log(values);
								
								//$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
								$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
								
								
								
								//$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
								//$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
							}); 
							_.forEach(val1[1].value, function(values) {
								////console.log(values);
								
								//$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
								
								
								
								$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
								//$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
								
								
								
								
								
								
								//$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
							}); 
							
							if(val1[0].value.length > 1)
								$("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val","");
							else
								$("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val",val1[1].value[0]);
							if(val1[1].value.length > 1)
								$("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val","");
							else
								$("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val",val1[1].value[0]);
						}	
						else if(value.dynamic==1 ){
							var list_index = $rootScope.chatlist.length-1;
							var val1 = value.options_list;
							$("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
							
							_.forEach(val1[0].value, function(values) {
								////console.log(values);
								$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append($("<option></option>").attr("value",values).text(values));
								//$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
								
							});
						}
						/*$('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
						$('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
						$("select.r_c_col:last").trigger('change');
						$("select.r_c_row:last").trigger('change');*/
					},1000);
					$scope.showprocessdata(ogdata);
					
					//return false;
				}
				if(value.type=="Delegation Matrix")
				{
					
					$rootScope.pushSystemMsg(0,response);
				
					//$rootScope.pushSystemMsg(0,decryptedData);
					$rootScope.showMsgLoader = false;
					
					// $(".r_c_col").val($(".r_c_col option:first").val());
					// $(".r_c_row").val($(".r_c_row option:first").val());

					// var firstOption = $('.r_c_col option:first');
					// firstOption.attr('selected', true);
					// $('.r_c_col').attr('selectedIndex', 0);
					
					$timeout(function(){
						if(value.dynamic==1 ){
							var list_index = $rootScope.chatlist.length-1;
							var val1 = value.options_list;
							$("select.dele_m.dele_m0.dele_m_"+list_index).html("");
							
							_.forEach(val1[0].value, function(values) {
								////console.log(values);
								$("select.dele_m.dele_m0.dele_m_"+list_index).append($("<option></option>").attr("value",values).text(values));
								//$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
								
							});
							$("select.dele_m.dele_m0.dele_m_"+list_index).select2('val',"");
						}
						/*$('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
						$('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
						$("select.r_c_col:last").trigger('change');
						$("select.r_c_row:last").trigger('change');*/
						
					},1000);
					$scope.showprocessdata(ogdata);
					
					//return false;
				}
				else if(value.type=="DTHyperlink")
				{
					$rootScope.showMsgLoader = false;
					$rootScope.DthResponse(0,response,'');
					
				   /*$timeout(function(){
						var textspeech = decryptedData.tiledlist[0].Text;
						_.each(decryptedData.tiledlist[0].DTHyperlink,function(v,k){
							textspeech += v;
						});
						$.jStorage.set("texttospeak",textspeech);

						$('#mybtn_trigger').trigger('click');
						
					},200);*/
				}
				if(value.type=="top_search")
				{
					$rootScope.pushSystemMsg(0,response);
					$rootScope.showMsgLoader = false;
				}
				else if(value.type=="Instruction")
				{
					
				   $rootScope.InstructionResponse(0,response);  
				   
				}
				if(value.type=="product listing")
				{
					if(chargefound) {
						$scope.askchargej(prevmsg,response);
					}
					else {
						//$rootScope.pushSystemMsg(0,decryptedData);
						
						apiService.getproductlisting({Journey_Name:response.tiledlist[0].Journey_Name}).then(function (imagedata){
							response.tiledlist[0].product_list=imagedata.data.data;
							$rootScope.pushSystemMsg(0,response);
							cl =$rootScope.chatlist.length-1;
							$rootScope.showMsgLoader = false;
							$timeout(function(){
							$('.carousel').carousel({
								interval: false,
								wrap: false
							});
							
							$('.carousel').find('.item').first().addClass('active');
								/*$("a.fancyboxable").fancyboxPlus({
									openEffect: 'fade',
									closeEffect: 'fade',
									closeBtn: true,
									padding: 0,
									helpers: {
										media: {}
									},
									overlayColor:'#000',
									titlePosition:'inside'
								});*/
								$("#myCarousel"+cl).show();
								$("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
							},2000);
							$scope.showprocessdata(ogdata);
						});
					}
					//return false;
				}
			});
				//$rootScope.DthResponse(0,response,'');
            /*apiService.getchargejourney({}).then(function (data){
                if(data.data.data) {
                    var msg3 = {Text:data.data.data,type:"SYS_CHARGE_JOURNEY"};
                    $rootScope.pushSystemMsg(0,msg3); 
                }
            });*/
        }
    };
    $rootScope.pushMsg = function(id,value,answer) {
        $rootScope.displaySubmitButton = false;
        $rootScope.msgSelected = true;
        $rootScope.chatmsgid = id;
        $rootScope.chatmsg = value;
        //console.log("$rootScope.agentconnected", $rootScope.agentconnected)
        if(value !='' || value) {
            if($rootScope.agentconnected)
            {
                //console.log("$rootScope.agentconnected", $rootScope.agentconnected)
                // $rootScope.autocompletelist = [];           
                $rootScope.autocompletelist = [];                
                $scope.sendPrivateMessage(value);
                $rootScope.scrollChatWindow(); 
            }
            else {
                ////console.log(answer,"ans");
                //if(answer == "" || !answer)
                {
                    //if(value != "" || value)
                    {
                        $rootScope.autocompletelist = [];
                        var disp_str = "";
                        if(value=="GSFC FINAL")
                            disp_str="General schedule of features & charges";
                        else
                            disp_str=value;
                        $rootScope.chatlist.push({id:$rootScope.chatlist.length,msg:disp_str,position:"right",gotresponse:false,curTime: $rootScope.getDatetime()});
						var i_ind = $rootScope.chatlist[$rootScope.chatlist.length-1].id;
						
                        str2 = value;
                        str2 = str2.toLowerCase();
                        
                        /*if((str2.includes("charges") || str2.includes("charge") || str2.includes("chrg") || str2.includes("chrgs")) && id !='SYS_CHARGE_JOURNEY') 
                        {
                            /*$scope.askchargej(value);
                            $timeout(function(){
                                //$rootScope.msgSelected = false;
                                //$rootScope.showMsgLoader=true;
                            },1000);
                            
                        }
                        /*if (str2.includes("calculator") || str2.includes("td cal") || str2.includes("rd cal") || str2.includes("calc") )
                        {
                            $rootScope.showTdcal = false;
                            $rootScope.showRdcal = false;
                            $rootScope.showSTD = false;
                            $rootScope.showCTD = false;
                            var automsg = {  type : "SYS_CALC"};
                            $rootScope.chatlist.push({id:id,msg:automsg,position:"left",curTime: $rootScope.getDatetime()});
                            $rootScope.showMsgLoader=false;
                            $rootScope.msgSelected = false;
                            $timeout(function(){
                                $rootScope.autocompletelist = [];
                            },1000);
                            
                        }
                        else if(str2.includes("delegation_matrix") || str2.includes("delegation matrix")) 
                        {
                            $rootScope.getmatrix(id,"Delegation_Matrix");
                            $rootScope.msgSelected = false;
                            $rootScope.showMsgLoader=true;
                        }*/
                        /*else if(str2.includes("gsfc") || str2.includes("GSFC")) 
                        {
                            $rootScope.getmatrix(id,"GSFC");
                            $rootScope.msgSelected = false;
                            $rootScope.showMsgLoader=true;
                        }
                        else*/
                        {
                            $rootScope.getSystemMsg(id,value);
                            $rootScope.msgSelected = false;
                            $rootScope.showMsgLoader=true;
                        }
                        
                        $.jStorage.set("chatlist",$rootScope.chatlist);
                        
                        
                        $rootScope.chatText = "";
                        $rootScope.autolistvalue = "";
                        $rootScope.autolistid = "";
                        $rootScope.chatmsg = "";
                        $rootScope.chatmsgid = "";
                        $rootScope.autocompletelist = [];
                        $rootScope.scrollChatWindow();    
                    }
                }
                /*else {
                    $rootScope.pushAutoMsg(id,value,answer);
                }*/
            }
        }
    };
    
    
    // if($.jStorage.get("showchat"))
    // {
    //     if($rootScope.uipage != 'dashboard')
    //          $rootScope.showChatwindow();
    // }
    // else
    //     $rootScope.minimizeChatwindow();
    $scope.rate_to_dt = function(stagedetails) {
        ////console.log(stagedetails);
        var data = {};
        tiledlist = Array();
        tiledlist.push(stagedetails);
        data.tiledlist = tiledlist;
        // tiledlist = Array();
        // tiledlist[0] = stagedetails;
        $rootScope.pushSystemMsg(0,data);
    };
    $(document).on('change', '.tl_dm', function () {
        var select_index =parseInt($(this).attr("data-dindex"));
        
        var list_index =parseInt($(this).attr("data-index"));
        
        var value=$(this).val();
        var dcount = parseInt($(this).attr("dcount"));
        var Journey_Name=$(this).attr("data-journey");
        var d_key="";
        var m_key="";
        var sel_val="";
        
        if(dcount>1 && select_index < dcount-1)
        {
            //var n_i = select_index+1;
            for(var i = 0 ; i <= select_index ; i++)
            {
                if(select_index<=dcount-1 )
                {
                    var n_i=i+1;
                    
                    //$("select.tl_dm.tl_dm_"+n_i+".tl_dm"+list_index).html("");
                }
                if(i==0)
                {
                    sel_val=$(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val");
                    d_key=$("select.tl_dm.tl_dm_"+i+".tl_dm"+list_index).attr("data-keyv");
                }
                else 
                {
                    sel_val +="|"+$(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val");
                    d_key+="|"+$("select.form-control.tl_dm.tl_dm_"+i+".tl_dm"+list_index).attr("data-keyv");
                }
                m_key = $("select.form-control.tl_dm.tl_dm_"+i+".tl_dm"+list_index).attr("data-mkey");
            }
            for(var i = select_index ; i <= dcount-1 ; i++)
            {
                var n_i = i+1;
				////console.log(n_i,"clearing");
                $("select.tl_dm.tl_dm_"+n_i+".tl_dm"+list_index).html("");
                $("select.tl_dm.tl_dm_"+n_i+".tl_dm"+list_index).select2("val","");
            }
			
            //if(select_index==dcount)
            //if($(".col_opts_"+list_index).length) {}
            //else
            var formData = {dynamic:1,context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),measures_key:m_key,measures_value:"",dimensions_key:d_key,dimensions_value:sel_val,user_id:$rootScope.session_id,auto_id:"",auto_value:"",Journey_Name:Journey_Name};
            var inputDate = new Date();
            apiService.outtablist(formData).then(function (data){
                
                $rootScope.session_object = data.data.session_object;
                var outputDate   = new Date();
                var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                angular.forEach(data.data.tiledlist, function(value, key) {
                    if(value.type=="text")
                    {
                        if(value.option_list)
                        {
                            var ni = select_index+1;
                            _.forEach(value.option_list, function(values) {
                                $("select.form-control.tl_dm.tl_dm_"+ni+".tl_dm"+list_index).append($("<option></option>").attr("value",values).text(values));
                            });
                            $("select.form-control.tl_dm.tl_dm_"+ni+".tl_dm"+list_index).removeAttr("disabled");
                            $("select.form-control.tl_dm.tl_dm_"+ni+".tl_dm"+list_index).select2("val","");
                        }
                    }
                });
            });
        }
        
    });
    $rootScope.$viewcontentmodalInstance1 = {};
    $rootScope.viewcontentCancel = function(){
        $rootScope.$viewcontentmodalInstance1.dismiss('cancel');
    };
    $scope.openviewContentModal = function(copydata,id) {
        ////console.log(d);
        sendobj = {viewdata : copydata,id:id};
        $rootScope.$viewcontentmodalInstance1 = $uibModal.open({
            scope: $rootScope,
            animation: true,
            size: 'lg',
            templateUrl: 'views/modal/viewcontent.html',
            resolve: {
                items: function () {
                return sendobj;
                }
            },
            controller: 'ViewcontentCtrl'
        });
        $timeout(function(){
            $(".tabledata table").removeAttr("width");
            $(".tabledata td").removeAttr("width");
            //$(".tabledata td[colspan='4']").removeAttr("width");
        },1000);
    };
    
    $rootScope.$viewmatrixmodalInstance1 = {};
    $rootScope.viewmatrixCancel = function(){
        $rootScope.$viewmatrixmodalInstance1.dismiss('cancel');
    };
    $scope.openviewmatrixModal = function(copydata) {
        ////console.log(d);
        sendobj = {viewdata : copydata};
        $rootScope.$viewmatrixmodalInstance1 = $uibModal.open({
            scope: $rootScope,
            animation: true,
            size: 'lg',
            templateUrl: 'views/modal/matrix.html',
            resolve: {
                items: function () {
                return sendobj;
                }
            },
            controller: 'ViewmatrixCtrl'
        });
        
    };
    $scope.viewcontent = function(copydata,id){
        $scope.openviewContentModal(copydata,id);
    };
    $scope.copydata = function(copydata,id) {
        /*var aux = document.createElement("input");
        aux.setAttribute("value", copydata);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");

        document.body.removeChild(aux);*/
        tableId = "#table_data"+id+"";
        /*if (document.selection) { //IE
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(document.getElementById(tableId));
            textRange.select();
        } else*/ 
        if (window.getSelection) { //others
            var textRange = document.createRange();
            textRange.selectNode($(tableId)[0]);
            var selection=window.getSelection();
                
            
            
            //selection.removeAllRanges();
            selection.addRange(textRange);

            ////console.log('copy success', document.execCommand('copy'));
            document.execCommand('copy');
            selection.removeAllRanges();

            ////console.log("aa",textRange);
            var selText = textRange.text;
            var selectionRange = window.getSelection ();   
            ////console.log(selectionRange.toString());
                            //var htmltext = selRange.htmlText;
        }
        /*
            var textRange = document.body.createTextRange(); 
            textRange.moveToElementText(document.getElementById(tableId)); */
            //selectionRange.execCommand("Copy");
    };
    $rootScope.submittablist = function(list_index,d_count,m_count,Journey_Name) {
        var d_key="";
        var d_val="";
        var m_key="";
        var m_val="";
        for(var i = 0 ; i <= d_count-1 ; i++)
        {
            if(i==0)
            {
                d_key=$("select.tl_dm.tl_dm_"+i+".tl_dm"+list_index).attr("data-keyv");
                d_val=$(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val");
            }
            else {
                d_key=d_key+"|"+$("select.tl_dm.tl_dm_"+i+".tl_dm"+list_index).attr("data-keyv");
                d_val=d_val+"|"+$(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val");
            }
            if($(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val")=="" || $(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val")=="? undefined:undefined ?" || !$(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val"))
            {
                toastr.error("Please select "+$("select.tl_dm.tl_dm_"+i+".tl_dm"+list_index).attr("data-keyv"), 'Error',{
                    
                });
                //alert("Please select "+$("select.tl_dm.tl_dm_"+i+".tl_dm"+list_index).attr("data-keyv"));
                return false;
            }
            
        }
        for(var i = 0 ; i <= m_count-1 ; i++)
        {
            if(i==0)
            {
                m_key=$("select.tl_ms.tl_ms"+list_index).attr("data-keyv");
                m_val=$(".tl_ms.tl_ms"+list_index).select2("val");
            }
            else {
                m_key=m_key+"|"+$("select.tl_ms.tl_ms"+list_index).attr("data-keyv");
                m_val=m_val+"|"+$(".tl_ms.tl_ms"+list_index).select2("val");
            }
            if($(".tl_ms.tl_ms"+list_index).select2("val")=="" || $(".tl_ms.tl_ms"+list_index).select2("val")=="? undefined:undefined ?" || !$(".tl_ms.tl_ms"+list_index).select2("val"))
            {
                toastr.error("Please select "+$("select.tl_ms.tl_ms"+list_index).attr("data-keyv"), 'Error');
                //alert("Please select "+$("select.tl_ms.tl_ms"+list_index).attr("data-keyv"));
                return false;
            }
            
        }
        d_val=d_val.replace(new RegExp(';',"g"), '!@#');
        m_val=m_val.replace(new RegExp(';',"g"), '!@#');
        var formData = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),measures_key:m_key,measures_value:m_val,dimensions_key:d_key,dimensions_value:d_val,user_id:$rootScope.session_id,auto_id:"",auto_value:"",Journey_Name:Journey_Name};
        var inputDate = new Date();
        apiService.outtablist(formData).then(function (data){
            ////console.log(data);
            $rootScope.session_object = data.data.session_object;
            var outputDate   = new Date();
            var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
            angular.forEach(data.data.tiledlist, function(value, key) {
                    ////console.log(value);
                var topic2 = "";
                if(data.data.tiledlist[0].topic)
                    topic2 = data.data.tiledlist[0].topic;
                var Journey_Name2 = "";
                if(data.data.tiledlist[0].Journey_Name)
                    Journey_Name2 = data.data.tiledlist[0].Journey_Name;
                if(value.type=="text")
                {
                    ////console.log(data.data.tiledlist[0].Text);
                    ////console.log(data.data.tiledlist[0].text);
                    //if(data.data.tiledlist[0].Text != "-")
                    {
                        $rootScope.showMsgLoader = false;
                        $(".tab_list_response"+list_index).html(data.data.tiledlist[0].Text);
                        //$anchorScroll();
                        $timeout(function(){
                            $location.hash("tab_list_response"+list_index);
                            //$anchorScroll("tab_list_response"+list_index);
                        },1000);
                        
                        // $rootScope.pushSystemMsg(0,data.data);
                        // $rootScope.showMsgLoader = false;
                        // $timeout(function(){
                        // 	var textspeech = data.data.tiledlist[0].Text;
                            
                            
                        // 	$.jStorage.set("texttospeak",textspeech);

                        // 	$('#mybtn_trigger').trigger('click');
                            
                        // },200);
                        
                        // return false;
                    }
                }
                //var obj = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,session_id:$rootScope.session_id,user:$rootScope.empcode,user_input:coldata+"|"+rowdata,response:data.data.tiledlist[0],topic:topic2,Journey_Name:Journey_Name2,responsetype:value.type,inputDate:inputDate,outputDate:outputDate,respdiff:respdiff};
                //$rootScope.savehistory(obj);
            });
        });
    };
    $rootScope.ratecardSubmit = function(coldata,rowdata,response_type,journey_name,index) {
        $scope.formData = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,user_input:coldata+"|"+rowdata,auto_id:"",auto_value:"",coldata:coldata,rowdata:rowdata,type:"rate card",journey_name:journey_name,response_type:response_type};
        var inputDate = new Date();
        apiService.ratecardsubmit($scope.formData).then(function (data){
            ////console.log(data);
            var outputDate   = new Date();
            var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
            angular.forEach(data.data.tiledlist, function(value, key) {
                    ////console.log(value);
                var topic2 = "";
                if(data.data.tiledlist[0].topic)
                    topic2 = data.data.tiledlist[0].topic;
                var Journey_Name2 = "";
                if(data.data.tiledlist[0].Journey_Name)
                    Journey_Name2 = data.data.tiledlist[0].Journey_Name;
                if(value.type=="text")
                {
                    $(".ratecardresult_"+index+" span").text(data.data.tiledlist[0].Text);
                    $(".ratecardcontinue"+index).show();
                    $(".ratecardresult"+index).show();
                    ////console.log(data.data.tiledlist[0].text);
                    if(data.data.tiledlist[0].Text != "-")
                    {
                        $rootScope.showMsgLoader = false;
                        // $rootScope.pushSystemMsg(0,data.data);
                        // $rootScope.showMsgLoader = false;
                        // $timeout(function(){
                        // 	var textspeech = data.data.tiledlist[0].Text;
                            
                            
                        // 	$.jStorage.set("texttospeak",textspeech);

                        // 	$('#mybtn_trigger').trigger('click');
                            
                        // },200);
                        
                        // return false;
                    }
                }
                //var obj = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,session_id:$rootScope.session_id,user:$rootScope.empcode,user_input:coldata+"|"+rowdata,response:data.data.tiledlist[0],topic:topic2,Journey_Name:Journey_Name2,responsetype:value.type,inputDate:inputDate,outputDate:outputDate,respdiff:respdiff};
                //$rootScope.savehistory(obj);
            });
        });

    };
    //$scope.faqdtc=0;
    //angular.element(document).ready(function () {
        //$("a.dtfaq").click( function() {
        // $('.dtfaq').click(function(e){
        //     e.preventDefault();
        //     tiledlist = [];
        //     var stage = $(this).attr("data-stage");
        //     var journey = $(this).attr("data-journey");
        //     var dthlink = $(this).text();
        //     tiledlist[0] ={Journey_Name:journey,Stage:stage} ;
        //     //tiledlist[0]['Stage'] = stage;
        //     $rootScope.getDthlinkRes(stage,dthlink,tiledlist);
        // }).click();

        
        
    //});
    /*
    angular.element(document).ready(function () {
        //$(document).unbind("click").on('click', 'a.ratecard', function(e){
        $(document).on('click', 'a.ratecard', function(){
            $rootScope.idleflag=1;
            Idle.setTimeout($rootScope.idletime);
            Idle.watch();
            $rootScope.idlestart=false;
            var dthlink = $(this).text();
            formData = {department:$rootScope.department,session_id: $rootScope.session_id,user: $rootScope.empcode,context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,user_input:dthlink,auto_id:'',auto_value:''};
            apiService.outprocess(formData).then(function (data){
                    $rootScope.fstabs = [];
                        $rootScope.fstabvalue =[];
                        $(".fdashboard").hide();
                        $(".fspanel").hide();
                        $rootScope.seeallTopic();
                        $("ul.nav.nav-list.tree").hide();
                    $rootScope.session_object = data.data.session_object;
                //$rootScope.outprocessclick=1;
                    if(data.data.tiledlist[0].topic)
                         $("#topic").text(data.data.tiledlist[0].topic);
                angular.forEach(data.data.tiledlist, function(value, key) {
                    ////console.log(value);
                    if(value.type=="text")
                    {
                        ////console.log(data.data.tiledlist[0].text);
                        $rootScope.pushSystemMsg(0,data.data);
                        $rootScope.showMsgLoader = false;
                        $timeout(function(){
                            var textspeech = data.data.tiledlist[0].Text;
                            
                            
                            //$.jStorage.set("texttospeak",textspeech);

                            $('#mybtn_trigger').trigger('click');
                            
                        },200);
                        
                        return false;
                    }
                    if(value.type=="rate card")
                    {
                        $rootScope.pushSystemMsg(0,data.data);
                        $rootScope.showMsgLoader = false;
                        
                        // $(".r_c_col").val($(".r_c_col option:first").val());
                        // $(".r_c_row").val($(".r_c_row option:first").val());

                        // var firstOption = $('.r_c_col option:first');
                        // firstOption.attr('selected', true);
                        // $('.r_c_col').attr('selectedIndex', 0);
                        $timeout(function(){
                            $('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
                            $('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
                            $("select.r_c_col:last").trigger('change');
                            $("select.r_c_row:last").trigger('change');
                        },1000);
                        
                        return false;
                    }
                    else if(value.type=="DTHyperlink")
                    {
                       $rootScope.DthResponse(0,data.data,'');  
                       $timeout(function(){
                            var textspeech = data.data.tiledlist[0].Text;
                            _.each(data.data.tiledlist[0].DTHyperlink,function(v,k){
                                textspeech += v;
                            });
                            $.jStorage.set("texttospeak",textspeech);

                            $('#mybtn_trigger').trigger('click');
                            
                        },200);
                    }
                    else if(value.type=="Instruction")
                    {
                        
                       $rootScope.InstructionResponse(0,data.data);  
                       
                    }
                    if(value.type=="product listing")
                    {
                        $rootScope.pushSystemMsg(0,data.data);
                        $rootScope.showMsgLoader = false;
                        cl = $rootScope.chatlist.length-1;
                        $timeout(function(){
                        $('.carousel').carousel({
                            interval: false,
                            wrap: false
                        });
                        $('.carousel').find('.item').first().addClass('active');
                            $("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
                        },2000);
                        
                        return false;
                    }
                });
            });
        });
    });*/
    $rootScope.outprocessdata = function(dthlink,journey) {
        $rootScope.idleflag=1;
        Idle.setTimeout($rootScope.idletime);
        Idle.watch();
		$rootScope.scrollprocess();
        $rootScope.idlestart=false;
        var dtmsg = {Text:dthlink,type:"SYS_DT_RES"};
        var inputDate = new Date();
        $rootScope.chatlist.push({id:$rootScope.chatlist.length,msg:dtmsg,position:"right",gotresponse:false,curTime: $rootScope.getDatetime()});
		var i_ind = $rootScope.chatlist[$rootScope.chatlist.length-1].id;
		
        var cl = $rootScope.chatlist.length-1;
        $rootScope.scrollChatWindow();
        //$rootScope.outprocessclick=1;
        formData = {department:$rootScope.department,session_id: $rootScope.session_id,user: $rootScope.empcode,context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,user_input:dthlink,auto_id:'',auto_value:'',Journey_Name:journey};
        apiService.outprocess(formData).then(function (data){
            var topic2='';
            var outputDate   = new Date();
            var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
            if(data.data.tiledlist[0].topic)
                topic2 = data.data.tiledlist[0].topic;
            var Journey_Name2 = "";
            if(data.data.tiledlist[0].Journey_Name)
                Journey_Name2 = data.data.tiledlist[0].Journey_Name;
            var obj = {
				i_ind:i_ind,
                DTHstage: 0,
                DTHlink: dthlink,
                session_id: $rootScope.session_id,
                user: $rootScope.empcode,
                user_input: '',
                response: data.data.tiledlist[0],
                topic: topic2,
                Journey_Name: Journey_Name2,
                responsetype: data.data.tiledlist[0].type,
                inputDate: inputDate,
                outputDate: outputDate,
                respdiff: respdiff,
                context_id: $rootScope.context_id,
                conversation_id: $rootScope.conversation_id,
				city:$rootScope.city,
				role:$rootScope.role,
				functions:$rootScope.functions,
				empcode:$rootScope.empcode,
				empid:$rootScope.Employee_ID,
				empname:$rootScope.Employee_Name,
				state:$rootScope.state,
				lobname:$rootScope.LOB_name,
				lobcode:$rootScope.LOB_code,
				loccode:$rootScope.LOC_Code,
				department:$rootScope.department,
				division:$rootScope.division,
				segment:$rootScope.segment,
				branch:$rootScope.branch
            };
			//PAN india blank column issue #bugfix 14-11
            // console.log(cl);
            $rootScope.savehistory(obj,cl);
                //$rootScope.chatlist[cl].gotresponse=true;
            ////$rootScope.chatlist[cl].gotresponse=true;
            // $rootScope.fstabs = [];
            // $rootScope.fstabvalue =[];
            // $(".fdashboard").hide();
            // $(".fspanel").hide();
            // $rootScope.seeallTopic();
            // $("ul.nav.nav-list.tree").hide();
            $rootScope.outprocessclick=1;
            angular.forEach(data.data.tiledlist, function(value, key) {
                
                if(value.type=="text")
                {
                    ////console.log(data.data.tiledlist[0].text);
                    $rootScope.pushSystemMsg(0,data.data);
                    $rootScope.showMsgLoader = false;
                    
                    
                    return false;
                }
                if (value.type == "html_form") {
                    $rootScope.pushSystemMsg(0, data.data);
                    $rootScope.showMsgLoader = false;
                }
                if(value.type=="rate card")
                {
                    $rootScope.pushSystemMsg(0,data.data);
                    $rootScope.showMsgLoader = false;
                    
                    // $(".r_c_col").val($(".r_c_col option:first").val());
                    // $(".r_c_row").val($(".r_c_row option:first").val());

                    // var firstOption = $('.r_c_col option:first');
                    // firstOption.attr('selected', true);
                    // $('.r_c_col').attr('selectedIndex', 0);
                    
                    $timeout(function(){
                        if(value.no_drop==2 && value.dynamic==0)
                        {
                            var list_index = $rootScope.chatlist.length-1;
                            var val1 = value.options_list;
                            //var val1 = value.options_list;
                            $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                            $("select.r_c_col.r_c_col1.r_c_col_"+list_index).html("");
                            
                            
                            $("select.r_c_op_"+list_index).html("");
                            $("select.r_c_op_"+list_index).select2("val","");
                            _.forEach(val1[0].value, function(values) {
                                ////console.log(values);
                                
                                //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                $("select.r_c_col.r_c_col0.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                
                                
                                
                                //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                            }); 
                            _.forEach(val1[1].value, function(values) {
                                ////console.log(values);
                                
                                //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                
                                
                                
                                $("select.r_c_col.r_c_col1.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                
                                
                                
                                
                                
                                
                                //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                            }); 
                            
                            if(val1[0].value.length > 1)
                                $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val","");
                            else
                                $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val",val1[1].value[0]);
                            if(val1[1].value.length > 1)
                                $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val","");
                            else
                                $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val",val1[1].value[0]);
                        }	
                        else if(value.dynamic==1 ){
                            var list_index = $rootScope.chatlist.length-1;
                            var val1 = value.options_list;
                            $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                            
                            _.forEach(val1[0].value, function(values) {
                                ////console.log(values);
                                $("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                //$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                
                            });
                        }
                        /*$('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
                        $('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
                        $("select.r_c_col:last").trigger('change');
                        $("select.r_c_row:last").trigger('change');*/
                    },1000);
                    
                    //return false;
                }
                else if(value.type=="DTHyperlink")
                {
                    // console.log(data.data,"outprocessdata");
                    $rootScope.DthResponse(0,data.data,'');  
                    if(data.data.tiledlist[0].DT.length==1) {
                        $timeout(function(){
                            $rootScope.getDthlinkRes(data.data.tiledlist[0].Stage,data.data.tiledlist[0].DT[0],data.data.tiledlist[0]);
                        },1000);
                        
                    }
                    /*$timeout(function(){
                        var textspeech = data.data.tiledlist[0].Text;
                        _.each(data.data.tiledlist[0].DTHyperlink,function(v,k){
                            textspeech += v;
                        });
                        $.jStorage.set("texttospeak",textspeech);

                        $('#mybtn_trigger').trigger('click');
                        
                    },200);*/
                }
                if(value.type=="top_search")
                {
                    $rootScope.pushSystemMsg(0,data.data);
                    $rootScope.showMsgLoader = false;
                }
                else if(value.type=="Instruction")
                {
                    
                   $rootScope.InstructionResponse(0,data.data);  
                   
                }
                if(value.type=="product listing")
                {
					apiService.getproductlisting({Journey_Name:data.data.tiledlist[0].Journey_Name}).then(function (imagedata){
						data.data.tiledlist[0].product_list=imagedata.data.data;
						$rootScope.pushSystemMsg(0,data.data);
						cl =$rootScope.chatlist.length-1;
						$rootScope.showMsgLoader = false;
						$timeout(function(){
						$('.carousel').carousel({
							interval: false,
							wrap: false
						});
						
						$('.carousel').find('.item').first().addClass('active');
							/*$("a.fancyboxable").fancyboxPlus({
								openEffect: 'fade',
								closeEffect: 'fade',
								closeBtn: true,
								padding: 0,
								helpers: {
									media: {}
								},
								overlayColor:'#000',
								titlePosition:'inside'
							});*/
							$("#myCarousel"+cl).show();
							$("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
						},2000);
                    });
					//return false;
                }
            }).catch(function(reason){
                // console.log(reason);
            });
        });
    };
    /*
    angular.element(document).ready(function () {
        //$(document).unbind("click").on('click', 'a.productlisting', function(e){
        
        $(document).on('click', 'a.productlisting', function(){
            Idle.setTimeout($rootScope.idletime);
            Idle.watch();
            $rootScope.idlestart=false;
            var dthlink = $(this).text();
            formData = {department:$rootScope.department,user: $rootScope.empcode,context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,user_input:dthlink,auto_id:'',auto_value:''};
            apiService.outprocess(formData).then(function (data){
                    ////console.log(data);
                
                    if(data.data.tiledlist[0].topic)
                         $("#topic").text(data.data.tiledlist[0].topic);
                angular.forEach(data.data.tiledlist, function(value, key) {
                    ////console.log(value);
                    if(value.type=="text")
                    {
                        ////console.log(data.data.tiledlist[0].text);
                        $rootScope.pushSystemMsg(0,data.data);
                        $rootScope.showMsgLoader = false;
                        $timeout(function(){
                            var textspeech = data.data.tiledlist[0].Text;
                            
                            
                            //$.jStorage.set("texttospeak",textspeech);

                            $('#mybtn_trigger').trigger('click');
                            
                        },200);
                        
                        return false;
                    }
                    if(value.type=="rate card")
                    {
                        $rootScope.pushSystemMsg(0,data.data);
                        $rootScope.showMsgLoader = false;
                        
                        // $(".r_c_col").val($(".r_c_col option:first").val());
                        // $(".r_c_row").val($(".r_c_row option:first").val());

                        // var firstOption = $('.r_c_col option:first');
                        // firstOption.attr('selected', true);
                        // $('.r_c_col').attr('selectedIndex', 0);
                        $timeout(function(){
                            $('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
                            $('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
                            $("select.r_c_col:last").trigger('change');
                            $("select.r_c_row:last").trigger('change');
                        },1000);
                        
                        return false;
                    }
                    else if(value.type=="DTHyperlink")
                    {
                       $rootScope.DthResponse(0,data.data,'');  
                       $timeout(function(){
                            var textspeech = data.data.tiledlist[0].Text;
                            _.each(data.data.tiledlist[0].DTHyperlink,function(v,k){
                                textspeech += v;
                            });
                            $.jStorage.set("texttospeak",textspeech);

                            $('#mybtn_trigger').trigger('click');
                            
                        },200);
                    }
                    else if(value.type=="Instruction")
                    {
                        
                       $rootScope.InstructionResponse(0,data.data);  
                       
                    }
                    if(value.type=="product listing")
                    {
                        $rootScope.pushSystemMsg(0,data.data);
                        $rootScope.showMsgLoader = false;
                        var cl = $rootScope.chatlist.length-1;
                        $timeout(function(){
                        $('.carousel').carousel({
                            interval: false,
                            wrap: false
                        });
                        $('.carousel').find('.item').first().addClass('active');
                        $("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
                        },2000);
                        
                        return false;
                    }
                });
            });
        });
    });*/
    $rootScope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    };
    $scope.getfaqwithprocess = function(query) {
        var q2 = query;
        if(q2 == 'leave_information')
        {
            q2 = "Leave Information";
            //query="leave_information";
        }
        $rootScope.chatlist.push({id:"id",msg:"Know more",position:"right",curTime: $rootScope.getDatetime()});
        
        $rootScope.showMsgLoader=true;
        var inputDate = new Date();
        formData = {context_id: $rootScope.context_id,
            conversation_id: $rootScope.conversation_id,department:$rootScope.department,
                user: $rootScope.empcode,user_input:query,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),auto_id:"",auto_value:"",user_id:$rootScope.session_id};
        apiService.getCategoryFAQ(formData).then( function (response) {
            angular.forEach(response.data.tiledlist, function(value, key) {
                var topic2 = "";
                var outputDate   = new Date();
                var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                if(response.data.tiledlist[0].topic)
                    topic2 = response.data.tiledlist[0].topic;
                var Journey_Name2 = "";
                if(response.data.tiledlist[0].Journey_Name)
                    Journey_Name2 = response.data.tiledlist[0].Journey_Name;
                var obj = {
                    DTHstage: stage,
                    DTHlink: dthlink,
                    session_id: $rootScope.session_id,
                    user: $rootScope.empcode,
                    user_input: '',
                    response: response.data.tiledlist[0],
                    topic: topic2,
                    Journey_Name: Journey_Name2,
                    responsetype: value.type,
                    inputDate: inputDate,
                    outputDate: outputDate,
                    respdiff: respdiff,
                    context_id: $rootScope.context_id,
                    conversation_id: $rootScope.conversation_id
                };
                $rootScope.savehistory(obj);
                if(value.type=="text")
                {
                    $rootScope.pushSystemMsg(0,response.data);
                    $rootScope.showMsgLoader = false;
                    $timeout(function(){   $( "ul.chat li:last-child" ).removeClass('langcase');   },1000);
                    
                    return false;
                }
                if(value.type=="html_form")
                {
                    $rootScope.pushSystemMsg(0,response.data);
                    $rootScope.showMsgLoader=false;
                }
                if(value.type=="DTHyperlink")
                {
                    $rootScope.DthResponse(0,response.data);  
                }
                if(value.type=="statement_file")
                {
                   // var msg = {type:"SYS_STATEMENT",succ_msg:"Here you will be redirected to a payment gateway. At present, this has not been incorporated in the bot."};
                    $rootScope.pushSystemMsg(0,response.data);
                    
                }
                if(value.type=="product listing")
                {
					apiService.getproductlisting({Journey_Name:response.data.tiledlist[0].Journey_Name}).then(function (imagedata){
						response.data.tiledlist[0].product_list=imagedata.data.data;
						$rootScope.pushSystemMsg(0,response.data);
						$rootScope.showMsgLoader = false;
						var cl =$rootScope.chatlist.length-1;
						$timeout(function(){
						$('.carousel').carousel({
							interval: false,
							wrap: false
						});
						$('.carousel').find('.item').first().addClass('active');
						$("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
						},2000);
						
						$timeout(function(){   $( "ul.chat li:last-child" ).removeClass('langcase');   },1000);
						return false;
					});
                }
				
                if(value.type=="faq_with_process")
                {
                    //data.data.tiledlist[0].form_data.DTHlink = data.data.tiledlist[0].stage_details.DT[0];
                    //data.data.tiledlist[0].form_data.DTHstage = data.data.tiledlist[0].stage_details.Stage;
                    $rootScope.pushSystemMsg(0,response.data);
                }
                $rootScope.showMsgLoader = false;
                
            });
        });
    };
    $scope.showprocessdata = function(data) {
        $scope.tablistpr=1;
        if(data.data.tiledlist[0].Script) {
                                    
            $rootScope.script_data = data.data.tiledlist[0].Script;
            $timeout(function(){
                $("div.scriptData").show();
            },500);
            if (!data.data.tiledlist[0].Script || data.data.tiledlist[0].Script.length == 0)
                $rootScope.tabHeight = window.innerHeight - 53;
            else
                $rootScope.tabHeight = 300;
        }
        if(data.data.tiledlist[0].Process) {
            var ele = new Array("Main Process");
            var ele_val = new Array(data.data.tiledlist[0]);
            //$rootScope.journeylist.push(data.data.tiledlist[0].Journey_Name);
            $rootScope.journeylist=[];
            $rootScope.tabvalue.elements = ele;
            $rootScope.tabvalue.element_values = ele_val;
            
            $timeout(function () {
                ////console.log("show process");
                $("#tab_data .nav-tabs li").removeClass("active");
                $("#tab_data .tab-content .tab-pane").removeClass("active");
                $("#tab_data .nav-tabs li").first().show();
                $("#tab_data .tab-content .tab-pane").first().show();
                $("#tab_data .nav-tabs li").first().addClass("active");
                $("#tab_data .tab-content .tab-pane").first().addClass("active");
                /*if (data.tiledlist[0].topic_mapped == 0 && $rootScope.outprocessclick == 1) {
                    $("#tab_data .nav-tabs li").last().show();
                    $("#tab_data .nav-tabs li").last().addClass("active");
                    $("#tab_data .tab-content .tab-pane").last().addClass("active");
                    $("#tab_data").show();
                } else {
                    if (ele[0] == 'Process') {
                        if (ele_val[0].Process) {
                            if (ele_val[0].Process.length > 0) {
                                ////console.log("length>0");
                                $("#tab_data .nav-tabs li").first().show();
                                //$("#tab_data .tab-content .tab-pane").first().show();
                                $("#tab_data .nav-tabs li").first().addClass("active");
                                $("#tab_data .tab-content .tab-pane").first().addClass("active");
                                $("#tab_data").show();
                            } else {
                                
                                    $("#tab_data").hide();
                                //$("#tab_data .nav-tabs li:nth-child(1)").hide();
                                //$("#tab_data .nav-tabs li:nth-child(2)").addClass("active");
                                ////$("#tab_data .tab-content .tab-pane").first().addClass("active");
                                //$("#tab_data .tab-content .tab-pane:nth-child(1)").hide();
                            }
                        } else {
                            ////console.log("No process");
                            $("#tab_data .nav-tabs li:nth-child(1)").hide();
                            if (ele.length > 1)
                                $("#tab_data").show();
                            else
                                $("#tab_data").hide();
                            $("#tab_data .nav-tabs li:nth-child(2)").addClass("active");
                            $("#tab_data .tab-content .tab-pane:nth-child(1)").hide();
                            //$("#tab_data .tab-content .tab-pane").first().addClass("active");
                        }

                    } else {
                        $("#tab_data .nav-tabs li").first().addClass("active");
                        $("#tab_data .tab-content .tab-pane").first().addClass("active");
                        $("#tab_data").show();
                    }
                }*/
                $(".processcontent").show();
                $("#tab_data li a").attr("href","#");
            }, 2000);
        }
    };
	$scope.saveviewfaq = function(faqindex,listindex,key,value,faq) {
		var faqobj = {
			context_id: $rootScope.context_id,
			conversation_id: $rootScope.conversation_id,
			session_id: $rootScope.session_id,
			user: $rootScope.empcode,
			faqindex:faqindex,
			key:key,
			value:value,
			faq:faq,
			listindex:listindex,
			user:$rootScope.empcode,
			empid:$rootScope.Employee_ID,
			empname:$rootScope.Employee_Name, 
			user_input:$rootScope.chatlist[listindex].msg.prevmsg
		};
		//console.log($rootScope.chatlist);
		
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(faqobj), $rootScope.FRONTEND_ENC_KEY).toString();
        apiService.readfaq({data:ciphertext}).then(function (response){
            
        }).catch(function (reason) {
            ////console.log(reason);
            //$rootScope.savehistory(obj,cli);
        });
	};
    $rootScope.showresponse = function(decryptedData,userinput){
        data = {};
        data.data = decryptedData;
        var ogdata=data;
        chargefound =false;
        angular.forEach(decryptedData.tiledlist, function(value, key) {
                            ////console.log(value);
            if(value.type=="text")
            {
                ////console.log(data.data.tiledlist[0].text);
                $rootScope.showMsgLoader = false;
                if(decryptedData.tiledlist[0].Text == "Sorry, I could not understand.")
                {
                    /*if(io.socket.isConnected())
                    {
                        io.socket.get('/user', function (users){
                            Idle.unwatch();
                            var newuser = _.remove(users, function(n) {
                                return n.access_role  == 'maker-livechat' && n.id!=null && n.livechat=='1';
                            });
                            ////console.log(newuser,"lvie agents");
                            if(newuser.length > 0)
                            {
                                $rootScope.agentconnected = true;
                                if($rootScope.agentconnected)
                                {
                                    $rootScope.sendMsgtoagent(sess2.Text);
                                    var outputDate   = new Date();
                                    var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                                    //var obj = {conversationid:$rootScope.conversationid,livechat:1,session_id:$rootScope.session_id,user:$rootScope.email,user_input:prevmsg,response:{},topic:"",Journey_Name:"",responsetype:"",inputDate:inputDate,outputDate:outputDate,respdiff:respdiff};
                                    //$rootScope.savehistory(obj);
                                }
                                //obj.livechat=1;
                                //$rootScope.savehistory(obj);
                            }
                            else
                            {
                                $rootScope.agentconnected = false;
                                
                            }
                        });
                    }*/
                }
                if(decryptedData.tiledlist[0].Text == "Sorry, I could not understand.") {
                    //var fmsg = $scope.getfailuremsg();
                    //decryptedData.tiledlist[0].Text=fmsg.msg;
					console.log("chrg");
                    if(chargefound && userinput ==1) {
                        //$scope.askchargej(prevmsg,decryptedData);
                        $rootScope.getSystemMsg('',"GSFC Final");
                    }
                    else {
                        var fmsg = $scope.getfailuremsg();
                        decryptedData.tiledlist[0].Text=fmsg.msg;
                        $rootScope.pushSystemMsg(0,decryptedData);
                    }
                }
                else {
					
                    $rootScope.pushSystemMsg(0,decryptedData);
				}
                $rootScope.showMsgLoader = false;
                $scope.showprocessdata(ogdata);
                /*$timeout(function(){
                    var textspeech = decryptedData.tiledlist[0].Text;
                    
                    
                    $.jStorage.set("texttospeak",textspeech);

                    $('#mybtn_trigger').trigger('click');
                    
                },200);
                */
                //return false;
            }
            if (value.type == "html_form") {
                $rootScope.pushSystemMsg(0, decryptedData);
                $rootScope.showMsgLoader = false;
            }
            if(value.type=="rate card")
            {
                $rootScope.pushSystemMsg(0,decryptedData);
                $rootScope.showMsgLoader = false;
                
                // $(".r_c_col").val($(".r_c_col option:first").val());
                // $(".r_c_row").val($(".r_c_row option:first").val());

                // var firstOption = $('.r_c_col option:first');
                // firstOption.attr('selected', true);
                // $('.r_c_col').attr('selectedIndex', 0);
                
                $timeout(function(){
                    if(value.no_drop==2 && value.dynamic==0)
                    {
                        var list_index = $rootScope.chatlist.length-1;
                        var val1 = value.options_list;
                        //var val1 = value.options_list;
                        $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                        $("select.r_c_col.r_c_col1.r_c_col_"+list_index).html("");
                        
                        
                        $("select.r_c_op_"+list_index).html("");
                        $("select.r_c_op_"+list_index).select2("val","");
                        _.forEach(val1[0].value, function(values) {
                            ////console.log(values);
                            
                            //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            $("select.r_c_col.r_c_col0.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
                            
                            
                            
                            //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                        }); 
                        _.forEach(val1[1].value, function(values) {
                            ////console.log(values);
                            
                            //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            
                            
                            
                            $("select.r_c_col.r_c_col1.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
                            //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            
                            
                            
                            
                            
                            
                            //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                        }); 
                        
                        if(val1[0].value.length > 1)
                            $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val","");
                        else
                            $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val",val1[1].value[0]);
                        if(val1[1].value.length > 1)
                            $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val","");
                        else
                            $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val",val1[1].value[0]);
                    }	
                    else if(value.dynamic==1 ){
                        var list_index = $rootScope.chatlist.length-1;
                        var val1 = value.options_list;
                        $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                        
                        _.forEach(val1[0].value, function(values) {
                            ////console.log(values);
                            $("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append($("<option></option>").attr("value",values).text(values));
                            //$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            
                        });
                    }
                    /*$('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
                    $('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
                    $("select.r_c_col:last").trigger('change');
                    $("select.r_c_row:last").trigger('change');*/
                },1000);
                $scope.showprocessdata(ogdata);
                //return false;
            }
            else if(value.type=="DTHyperlink")
            {
                $rootScope.showMsgLoader = false;
                if(chargefound && userinput ==1) {
                    $scope.askchargej(prevmsg,decryptedData);
                }
                /*
                if(value.conflict) {
                    
                    if(value.conflicts) {
                        
                        cf=_.find(value.conflicts, function(o) { return o == 'GSFC FINAL'; });
                        if(cf) {
                            if(value.conflicts.length>1) {
                                var evens = _.remove(value.DT, function(n) {
                                    return n=="GSFC FINAL";
                                });
                                value.DT=evens;
                                $scope.askchargej(prevmsg,decryptedData);
                            }
                            if(value.conflicts.length==1) {
                                $rootScope.getSystemMsg('',"GSFC FINAL");
                            }
                        }
                        else {
                            $rootScope.DthResponse(0,decryptedData,'');
                        }
                    }
                }*/	
                else									
                    $rootScope.DthResponse(0,decryptedData,'');
                
               /*$timeout(function(){
                    var textspeech = decryptedData.tiledlist[0].Text;
                    _.each(decryptedData.tiledlist[0].DTHyperlink,function(v,k){
                        textspeech += v;
                    });
                    $.jStorage.set("texttospeak",textspeech);

                    $('#mybtn_trigger').trigger('click');
                    
                },200);*/
            }
            if(value.type=="top_search")
            {
                $rootScope.pushSystemMsg(0,decryptedData);
                $rootScope.showMsgLoader = false;
            }
            else if(value.type=="Instruction")
            {
                
               $rootScope.InstructionResponse(0,decryptedData);  
               
            }
            if(value.type=="product listing")
            {
				apiService.getproductlisting({Journey_Name:decryptedData.tiledlist[0].Journey_Name}).then(function (imagedata){
					decryptedData.tiledlist[0].product_list=imagedata.data.data;
					$rootScope.pushSystemMsg(0,decryptedData);
					cl =$rootScope.chatlist.length-1;
					$rootScope.showMsgLoader = false;
					$timeout(function(){
					$('.carousel').carousel({
						interval: false,
						wrap: false
					});
					
					$('.carousel').find('.item').first().addClass('active');
						/*$("a.fancyboxable").fancyboxPlus({
							openEffect: 'fade',
							closeEffect: 'fade',
							closeBtn: true,
							padding: 0,
							helpers: {
								media: {}
							},
							overlayColor:'#000',
							titlePosition:'inside'
						});*/
						$("#myCarousel"+cl).show();
						$("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
					},2000);
					$scope.showprocessdata(ogdata);
				});
                //return false;
            }
            var topic2 = "";
            if(decryptedData.tiledlist[0].topic)
                topic2 = decryptedData.tiledlist[0].topic;
            var Journey_Name2 = "";
            if(decryptedData.tiledlist[0].Journey_Name)
                Journey_Name2 = decryptedData.tiledlist[0].Journey_Name;
            /*
            var obj = {
                context_id: $rootScope.context_id,
                conversation_id: $rootScope.conversation_id,
                session_id: $rootScope.session_id,
                user: $rootScope.empcode,
                user_input: prevmsg,
                response: decryptedData.tiledlist[0],
                topic: topic2,
                Journey_Name: Journey_Name2,
                responsetype: value.type,
                inputDate: inputDate,
                outputDate: outputDate,
                respdiff: respdiff,
                city:$rootScope.city,
                role:$rootScope.role,
                functions:$rootScope.functions,
                empcode:$rootScope.empcode,
                empid:$rootScope.Employee_ID,
                empname:$rootScope.Employee_Name,
                state:$rootScope.state,
                lobname:$rootScope.LOB_name,
                lobcode:$rootScope.LOB_code,
                loccode:$rootScope.LOC_Code,
                department:$rootScope.department,
                division:$rootScope.division,
                segment:$rootScope.segment,
            };
            if($rootScope.crndata.details)
                obj.crnno=$rootScope.crndata.header.party_id;
            $rootScope.savehistory(obj);
            chargefound = false;*/
        });
    };
    $rootScope.getDthlinkRes = function(stage,dthlink,tiledlist) {
        ////console.log(colno,lineno,dthlink);
        //mysession = $.jStorage.get("sessiondata");
		$rootScope.scrollprocess();
        $rootScope.fstabs = [];
        $rootScope.fstabvalue =[];
        $(".fdashboard").hide();
        $(".fspanel").hide();
        $rootScope.seeallTopic();
        $("ul.nav.nav-list.tree").hide();
        $('span.thumbsdown').css("color", "#036");
        $('.thumbsup').css("color", "#036");			
        $rootScope.idleflag=1;
        Idle.setTimeout($rootScope.idletime);
        Idle.watch();
        $rootScope.idlestart=false;
        $rootScope.script_data=[];
        //$rootScope.tabvalue.elements = [];
        //$rootScope.tabvalue.element_values=[];
        var inputDate = new Date();
        var dtmsg = {Text:dthlink,type:"SYS_DT_RES"};
        $rootScope.chatlist.push({id:$rootScope.chatlist.length,msg:dtmsg,position:"right",gotresponse:false,curTime: $rootScope.getDatetime()});
		var i_ind = $rootScope.chatlist[$rootScope.chatlist.length-1].id;
		
        //console.log(tiledlist);
        var cl_i = $rootScope.chatlist.length-1;
        ////console.log(cl_i);
        $rootScope.scrollChatWindow();
        $.jStorage.set("chatlist",$rootScope.chatlist);
        if($("#chat_window_1").height()==0)
            $rootScope.showChatwindow();
        {
            var dept="";
            if($rootScope.department)
                dept = $rootScope.department;
            var mysession = {
                department:dept,
                user: $rootScope.empcode,
                context_id: $rootScope.context_id,
                conversation_id: $rootScope.conversation_id
            };
            
            dthlink=dthlink.replace(new RegExp("’","g"), '@#$');
            mysession.DTHlink=dthlink;
            //mysession.DTHline=lineno;
            //mysession.DTHcol=colno;
            mysession.DTHstage=stage;
            mysession.tiledlist = angular.copy(tiledlist);
            // formData = {};
            // formData.DTHcol = colno;
            // formData.DTHline = lineno;
            // formData.DTHlink = dthlink;
            var formData = mysession;
            formData.csrfmiddlewaretoken=$rootScope.getCookie("csrftoken");
            formData.user_id=$rootScope.session_id;
            
            //if(tiledlist.FAQ)
                //delete tiledlist.FAQ;
			if(formData.tiledlist.FAQ)
				delete formData.tiledlist.FAQ;

            if(tiledlist.connected_node) {
                var topic2 = "";
                var outputDate   = new Date();
                var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                if(tiledlist.connected_node.topic)
                    topic2 = tiledlist.connected_node.topic;
                var Journey_Name2 = "";
                if(tiledlist.connected_node.Journey_Name)
                    Journey_Name2 = tiledlist.connected_node.Journey_Name;
                var obj = {
					i_ind:i_ind,
                    DTHstage: stage,
                    DTHlink: dthlink,
                    session_id: $rootScope.session_id,
                    user: $rootScope.empcode,
                    user_input: '',
                    response: tiledlist.connected_node,
                    topic: topic2,
                    Journey_Name: Journey_Name2,
                    responsetype: tiledlist.connected_node.type,
                    inputDate: inputDate,
                    outputDate: outputDate,
                    respdiff: respdiff,
                    context_id: $rootScope.context_id,
                    conversation_id: $rootScope.conversation_id
                };
                $rootScope.savehistory(obj,cl_i);
                    //$rootScope.chatlist[cl].gotresponse=true;
                var newdata={};
                newdata.tiledlist = [];
                newdata.tiledlist[0]=tiledlist.connected_node;
                $rootScope.showresponse(newdata,0);
                
                //if(tiledlist.connected_node.type==)
                //$rootScope.DthResponse(0,newdata,dthlink);
            }
            else 
            {
                if(tiledlist.conflict)
                {
                    if(tiledlist.conflict==1)
                    {
                        //formData.tiledlist=tiledlist;
                        l = $rootScope.chatlist.length-1;
                        formData.prevquery=$rootScope.chatlist[l-2].msg;
						
                        apiService.outconflict(formData).then(function (data){
                            
                            $rootScope.session_object = data.data.session_object;
                            angular.forEach(data.data.tiledlist, function(value, key) {
                                var topic2 = "";
                                var outputDate   = new Date();
                                var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                                if(data.data.tiledlist[0].topic)
                                    topic2 = data.data.tiledlist[0].topic;
                                var Journey_Name2 = "";
                                if(data.data.tiledlist[0].Journey_Name)
                                    Journey_Name2 = data.data.tiledlist[0].Journey_Name;
                                var obj = {
									i_ind:i_ind,
                                    DTHstage: stage,
                                    DTHlink: dthlink,
                                    session_id: $rootScope.session_id,
                                    user: $rootScope.empcode,
                                    user_input: '',
                                    response: data.data.tiledlist[0],
                                    topic: topic2,
                                    Journey_Name: Journey_Name2,
                                    responsetype: value.type,
                                    inputDate: inputDate,
                                    outputDate: outputDate,
                                    respdiff: respdiff,
                                    context_id: $rootScope.context_id,
                                    conversation_id: $rootScope.conversation_id
                                };
                                ////console.log(cl_i);
                                $rootScope.savehistory(obj,cl_i);
                                    //$rootScope.chatlist[cl].gotresponse=true;
                                if(value.type=="text")
                                {
                                    ////console.log(data.data.tiledlist[0].text);
                                    
                                    $rootScope.pushSystemMsg(0,data.data);
                                    $rootScope.showMsgLoader = false;
                                    $scope.showprocessdata(data);
                                    
                                    //return false;
                                }
                                if(value.type=="DTHyperlink")
                                {
                                    $rootScope.DthResponse(0,data.data,dthlink);
                                    if(data.data.tiledlist[0].DT.length==1) {
                                        $timeout(function(){
                                            $rootScope.getDthlinkRes(data.data.tiledlist[0].Stage,data.data.tiledlist[0].DT[0],data.data.tiledlist[0]);
                                        },1000);
                                        
                                    }
                                    if(data.data.tiledlist[0].sub_topic_list || data.data.tiledlist[0].sub_topic_list != null)
                                    {
                                        $rootScope.openMenu(data.data.tiledlist[0].sub_topic_list);
                                    }
                                    if(data.data.tiledlist[0].Script || data.data.tiledlist[0].Script != null)
                                    {
                                        // if(data.data.tiledlist[0].Script.length== 0)
                                        //     $rootScope.tabHeight = window.innerHeight-53;
                                        // else
                                        //     $rootScope.tabHeight = 300;
                                        
                                    }
                                    if(data.data.session_obj_data || data.data.session_obj_data != null)
                                        $.jStorage.set("sessiondata",data.data.session_obj_data);
                                    if(data.data.tiledlist[0].topic)
                                        $("#topic").text(data.data.tiledlist[0].topic);
                                    //$.jStorage.set("sessiondata",data.data.session_obj_data);
                                    // if($(".expandable2").hasClass('col-md-8'))
                                    //     $rootScope.rotateoutmenu();
                                }
                                if(value.type=="rate card")
                                {
                                    $rootScope.pushSystemMsg(0,data.data);
                                    $rootScope.showMsgLoader = false;
                                    
                                    // $(".r_c_col").val($(".r_c_col option:first").val());
                                    // $(".r_c_row").val($(".r_c_row option:first").val());

                                    // var firstOption = $('.r_c_col option:first');
                                    // firstOption.attr('selected', true);
                                    // $('.r_c_col').attr('selectedIndex', 0);
                                    $scope.showprocessdata(data);
                                    $timeout(function(){
                                        if(value.no_drop==2 && value.dynamic==0)
                                        {
                                            var list_index = $rootScope.chatlist.length-1;
                                            var val1 = value.options_list;
                                            //var val1 = value.options_list;
                                            $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                                            $("select.r_c_col.r_c_col1.r_c_col_"+list_index).html("");
                                            
                                            
                                            $("select.r_c_op_"+list_index).html("");
                                            $("select.r_c_op_"+list_index).select2("val","");
                                            _.forEach(val1[0].value, function(values) {
                                                ////console.log(values);
                                                
                                                //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                                $("select.r_c_col.r_c_col0.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                                
                                                
                                                
                                                //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                                //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                                            }); 
                                            _.forEach(val1[1].value, function(values) {
                                                ////console.log(values);
                                                
                                                //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                                
                                                
                                                
                                                $("select.r_c_col.r_c_col1.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                                //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                                
                                                
                                                
                                                
                                                
                                                
                                                //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                                            }); 
                                            
                                            if(val1[0].value.length > 1)
                                                $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val","");
                                            else
                                                $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val",val1[1].value[0]);
                                            if(val1[1].value.length > 1)
                                                $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val","");
                                            else
                                                $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val",val1[1].value[0]);
                                        }	
                                        else if(value.dynamic==1 ){
                                            var list_index = $rootScope.chatlist.length-1;
                                            var val1 = value.options_list;
                                            $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                                            
                                            _.forEach(val1[0].value, function(values) {
                                                ////console.log(values);
                                                $("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                                //$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                                
                                            });
                                        }
                                        /*$('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
                                        $('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
                                        $("select.r_c_col:last").trigger('change');
                                        $("select.r_c_row:last").trigger('change');*/
                                    },1000);
                                    
                                    //return false;
                                }
                                if(value.type=="product listing")
                                {
									apiService.getproductlisting({Journey_Name:data.data.tiledlist[0].Journey_Name}).then(function (imagedata){
										data.data.tiledlist[0].product_list=imagedata.data.data;
										$rootScope.pushSystemMsg(0,data.data);
										$rootScope.showMsgLoader = false;
										var cl = $rootScope.chatlist.length-1;
										$timeout(function(){
										$('.carousel').carousel({
											interval: false,
											wrap: false
										});
										$('.carousel').find('.item').first().addClass('active');
										$("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
										},2000);
										$scope.showprocessdata(data);
									});
                                    //return false;
                                }
                                if (value.type == "html_form") {
                                    //$rootScope.pushSystemMsg(0, decryptedData);
                                    
                                    $rootScope.pushSystemMsg(0,data.data);
                                    
                                    $rootScope.showMsgLoader = false;
                                }
                                if(value.Find_Locator) {
                                    $rootScope.nearme();
                                }
                            });
                        });
                    }
                }
                else {
					//if(formData.tiledlist.FAQ)
						//delete formData.tiledlist.FAQ;
                    apiService.getDthlinkRes(formData).then(function (data){
                        
                        $rootScope.session_object = data.data.session_object;
                        angular.forEach(data.data.tiledlist, function(value, key) {
                            if(value.Find_Locator) {
                                $rootScope.nearme();
                            }
                            var topic2 = "";
                            var outputDate   = new Date();
                            var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                            if(data.data.tiledlist[0].topic)
                                topic2 = data.data.tiledlist[0].topic;
                            var Journey_Name2 = "";
                            if(data.data.tiledlist[0].Journey_Name)
                                Journey_Name2 = data.data.tiledlist[0].Journey_Name;
                            var obj = {
								i_ind:i_ind,
                                DTHstage: stage,
                                DTHlink: dthlink,
                                session_id: $rootScope.session_id,
                                user: $rootScope.empcode,
                                user_input: '',
                                response: data.data.tiledlist[0],
                                topic: topic2,
                                Journey_Name: Journey_Name2,
                                responsetype: value.type,
                                inputDate: inputDate,
                                outputDate: outputDate,
                                respdiff: respdiff,
                                context_id: $rootScope.context_id,
                                conversation_id: $rootScope.conversation_id
                            };
                            $rootScope.savehistory(obj,cl_i);
                                //$rootScope.chatlist[cl].gotresponse=true;
                            if(value.type=="text")
                            {
                                ////console.log(data.data.tiledlist[0].text);
                                $rootScope.pushSystemMsg(0,data.data);
                                $rootScope.showMsgLoader = false;
                                
                                $scope.showprocessdata(data);
                                //return false;
                            }
                            if(value.type=="DTHyperlink")
                            {
                                $rootScope.DthResponse(0,data.data,dthlink);
                                if(data.data.tiledlist[0].DT.length==1) {
                                    $timeout(function(){
                                        $rootScope.getDthlinkRes(data.data.tiledlist[0].Stage,data.data.tiledlist[0].DT[0],data.data.tiledlist[0]);
                                    },1000);
                                    
                                }
                                if(data.data.tiledlist[0].sub_topic_list || data.data.tiledlist[0].sub_topic_list != null)
                                {
                                    $rootScope.openMenu(data.data.tiledlist[0].sub_topic_list);
                                }
                                if(data.data.tiledlist[0].Script || data.data.tiledlist[0].Script != null)
                                {
                                    // if(data.data.tiledlist[0].Script.length== 0)
                                    //     $rootScope.tabHeight = window.innerHeight-53;
                                    // else
                                    //     $rootScope.tabHeight = 300;
                                    
                                }
                                if(data.data.session_obj_data || data.data.session_obj_data != null)
                                    $.jStorage.set("sessiondata",data.data.session_obj_data);
                                if(data.data.tiledlist[0].topic)
                                    $("#topic").text(data.data.tiledlist[0].topic);
                                //$.jStorage.set("sessiondata",data.data.session_obj_data);
                                // if($(".expandable2").hasClass('col-md-8'))
                                //     $rootScope.rotateoutmenu();
                            }
                            if(value.type=="rate card")
                            {
                                $rootScope.pushSystemMsg(0,data.data);
                                $rootScope.showMsgLoader = false;
                                
                                // $(".r_c_col").val($(".r_c_col option:first").val());
                                // $(".r_c_row").val($(".r_c_row option:first").val());

                                // var firstOption = $('.r_c_col option:first');
                                // firstOption.attr('selected', true);
                                // $('.r_c_col').attr('selectedIndex', 0);
                                $timeout(function(){
                                if(value.no_drop==2 && value.dynamic==0)
                                {
                                    var list_index = $rootScope.chatlist.length-1;
                                    var val1 = value.options_list;
                                    //var val1 = value.options_list;
                                    $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                                    $("select.r_c_col.r_c_col1.r_c_col_"+list_index).html("");
                                    
                                    
                                    $("select.r_c_op_"+list_index).html("");
                                    $("select.r_c_op_"+list_index).select2("val","");
                                    _.forEach(val1[0].value, function(values) {
                                        ////console.log(values);
                                        
                                        //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                        $("select.r_c_col.r_c_col0.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                        
                                        
                                        
                                        //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                        //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                                    }); 
                                    _.forEach(val1[1].value, function(values) {
                                        ////console.log(values);
                                        
                                        //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                        
                                        
                                        
                                        $("select.r_c_col.r_c_col1.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                        //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                        
                                        
                                        
                                        
                                        
                                        
                                        //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                                    }); 
                                    
                                    if(val1[0].value.length > 1)
                                        $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val","");
                                    else
                                        $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val",val1[1].value[0]);
                                    if(val1[1].value.length > 1)
                                        $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val","");
                                    else
                                        $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val",val1[1].value[0]);
                                }	
                                else if(value.dynamic==1 ){
                                    var list_index = $rootScope.chatlist.length-1;
                                    var val1 = value.options_list;
                                    $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                                    
                                    _.forEach(val1[0].value, function(values) {
                                        ////console.log(values);
                                        $("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                        //$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                        
                                    });
                                }
                                /*$('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
                                $('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
                                $("select.r_c_col:last").trigger('change');
                                $("select.r_c_row:last").trigger('change');*/
                            },1000);
                                $scope.showprocessdata(data);
                                return false;
                            }
                            if(value.type=="product listing")
                            {
								apiService.getproductlisting({Journey_Name:data.data.tiledlist[0].Journey_Name}).then(function (imagedata){
									data.data.tiledlist[0].product_list=imagedata.data.data;
									$rootScope.pushSystemMsg(0,data.data);
									$rootScope.showMsgLoader = false;
									var cl = $rootScope.chatlist.length-1;
									$timeout(function(){
									$('.carousel').carousel({
										interval: false,
										wrap: false
									});
									$('.carousel').find('.item').first().addClass('active');
									$("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
									},2000);
									$scope.showprocessdata(data);
								});
                                //return false;
                            }
                            if (value.type == "html_form") {
                                    //$rootScope.pushSystemMsg(0, decryptedData);
                                
                                $rootScope.pushSystemMsg(0,data.data);
                                
                                $rootScope.showMsgLoader = false;
                            }

                        });
                        // $scope.faqdtc=0;
                    }).catch(function(reason){
                        ////console.log(reason);
                    });
                }
            }
        }
		////console.log($rootScope.chatlist);
		
    };
    
    $rootScope.notedata = [];
    $rootScope.getnotedata=function(value,table) {
        ////console.log(value);
        ////console.log(table);
        formData = {table:table,value:value};
        apiService.getnoteval(formData).then(function (data){
            ////console.log(data);
            if(value.col == 'NTB_New_to_bank_customer')
            {
                ////console.log(data.data.data[0].NTB_New_to_bank_customer);
                $rootScope.notedata = data.data.data[0].NTB_New_to_bank_customer;
            }
            else if(value.col == 'For_Existing_CRN_new_account_opening')
            {
                ////console.log(value);
                ////console.log(data.data.data[0].For_Existing_CRN_new_account_opening);
                $rootScope.notedata = data.data.data[0].For_Existing_CRN_new_account_opening;
            }
            //$rootScope.notedata = data.data.data[0].value;
            ////console.log($rootScope.notedata);
        });
    };
    $rootScope.viewdata = "";
    $rootScope.$viewmodalInstance1 = {};
    $rootScope.openContentModal = function(d) {
        ////console.log(d);
        $rootScope.viewdata = d;
        $rootScope.sendobj = {viewdata : $rootScope.viewdata,contentobj:$rootScope.contentobj};
        $rootScope.$viewmodalInstance1 = $uibModal.open({
            scope: $rootScope,
            animation: true,
            size: 'lg',
            templateUrl: 'views/modal/content.html',
            resolve: {
                items: function () {
                return $rootScope.sendobj;
                }
            },
            controller: 'ViewCtrl'
        });
    };
    $rootScope.viewdata1 = "";
    $rootScope.viewmodalInstance2 = {};
    $rootScope.openpopupModal = function(d,image) {
        
        $rootScope.viewdata = d;
        $rootScope.sendobj = {viewdata : $rootScope,img:image};
        //if(angular.equals({}, $rootScope.viewmodalInstance2))
        ////console.log($(".modal-dialog").is(':visible'));
        if(!$(".modal-dialog").is(':visible'))
        {
            $rootScope.viewmodalInstance2 = $uibModal.open({
                scope: $rootScope,
                animation: true,
                size: 'lg',
                templateUrl: 'views/modal/content2.html',
                resolve: {
                    items: function () {
                    return $rootScope.sendobj;
                    }
                },
                controller: 'View2Ctrl'
            });
        }
        ////console.log($rootScope.viewmodalInstance2);
    };
    $rootScope.contentCancel = function(){
        $rootScope.$viewmodalInstance1.dismiss('cancel');
    };
    $rootScope.contentCancel2 = function(){
        $rootScope.viewmodalInstance2.dismiss('cancel');
        $rootScope.viewmodalInstance2 = {};
    };
    $rootScope.script_data = [];
    $rootScope.popupdata=[];
    $rootScope.oneAtATime = true;
    $rootScope.checkarray = function (data) {
        if (data.constructor === Array)
            return true;
        else
            return false;
    };
    
    
    $scope.tablistpr=0;
    $rootScope.outprocessjourney="";
    $rootScope.outprocessjourneylist=[];
    $rootScope.DthResponse = function(id,data,dthlink) {
        if(data.tiledlist[0].Steps && data.tiledlist[0].Steps=='download')
        {
            var link=document.createElement('a');
            link.href="https://cingulariti.in:8096/rbl_backend/static/images/loan_application_form.pdf";
            link.download="Form.pdf";
            link.click();
            link.remove();
        }
		$rootScope.script_data = [];
		$rootScope.scrollprocess();
        // $rootScope.tabvalue.elements = [];
        // $rootScope.tabvalue.element_values=[];
        $(".processcontent").hide();
        if (!data.tiledlist[0].Script || data.tiledlist[0].Script.length == 0)
            $rootScope.tabHeight = window.innerHeight - 53-80;
        else
            $rootScope.tabHeight = 300;
        $timeout(function(){
            $("#tab_data .tab-content").css("height",$rootScope.tabHeight);
        },500);
        if(!data.tiledlist[0].Text)
            data.tiledlist[0].Text="";
        if(!data.tiledlist[0].DT)
            data.tiledlist[0].DT=[];
        if(data.tiledlist[0].Text=="" && data.tiledlist[0].DT.length==0 && (!data.tiledlist[0].Process || data.tiledlist[0].Process.length == 0) && !data.tiledlist[0].table_data) {
            //data.tiledlist[0].Text="Please go through process";
            var fmsg = $scope.getfailuremsg();
            data.tiledlist[0].Text = fmsg.msg;
            data.hidelist=false;
        }
        else if(data.tiledlist[0].Text=="" && data.tiledlist[0].DT.length==0 && !data.tiledlist[0].table_data){
            data.hidelist=true;
        }
        //if (data.tiledlist[0].DT || data.tiledlist[0].Text != "") 
        {
            //if (data.tiledlist[0].DT.length > 0 ) 
            {
                //if()
                {

                    // var images = Array();
                    // var process = Array();
                    // process = data.tiledlist[0].Process;
                    // var dtstage = data.tiledlist[0].Stage;
                    // var dtstage = dtstage.replace(".", "");
                    // data.tiledlist[0].bgstage = dtstage;
                    // /*_.each(data.tiledlist[0].Process,function(v,k){
                    // 	if (v.indexOf(".png") >= 0) 
                    // });*/
                    //  images = _.remove(process, function(n) {
                    //   return n.indexOf(".png") >= 0;
                    // });
                    // ////console.log(images);
                    // data.tiledlist[0].Process =process;
                    // data.tiledlist[0].images =images; //|| images.length > 0
                    //if (data.tiledlist[0].DT.length > 0 || (data.tiledlist[0].Text != "" && data.tiledlist[0].Text))
                        if(data.tiledlist[0].Systems=="nan")
                            data.tiledlist[0].Systems=[];
                        $rootScope.pushSystemMsg(id, data);
                    if (data.tiledlist[0].Stage != '0') {
                        if (!data.tiledlist[0].Script || data.tiledlist[0].Script.length == 0)
                            $rootScope.tabHeight = window.innerHeight - 53;
                        else
                            $rootScope.tabHeight = 300;
                    }
                    // if(images.length > 0)
                    // {
                    // 	$timeout(function(){
                    // 		$('#myCarousel2').carousel({
                    // 			interval: false,
                    // 			wrap: false
                    // 		});
                    // 		$('#myCarousel2').find('.item').first().addClass('active');
                    // 	},2000);

                    // }
                }
            }
        }
        $rootScope.popupdata = data.tiledlist[0].popupdata;
        $rootScope.collapse_arr = new Array();
		var process = [];
        if(data.tiledlist[0].Process)
            var process = data.tiledlist[0].Process;
        else 
            var process = [];
        // _.each(process,function(v,k){
        //     var res = v.split("!."); 
        //     if(res.length == 1)
        //     {}
        //     else
        //     {
        //         var col_obj = {heading:res[0],collapse:res[1]};
        //         $rootScope.collapse_arr.push(col_obj);
        //         process[k] = col_obj;
        //         $rootScope.tabHeight = window.innerHeight-120-53;
        //     }
        // });
        data.tiledlist[0].Process = process;
        // if((!data.tiledlist[0].Process || data.tiledlist[0].Process.length == 0))
        // {
        //     var ele = new Array();
        //     var ele_val = new Array();
        // }
        // else 
        //{
        var ele = $rootScope.tabvalue.elements;
        var ele_val = $rootScope.tabvalue.element_values;
        var jind = _.findIndex($rootScope.journeylist, function (o) {
            return o == data.tiledlist[0].Journey_Name;
        });
        ////console.log(ele,"tabs");
        ////console.log(ele_val,"tabs ele");
		
        ////console.log(" journey not found",$rootScope.outprocessjourneylist);
        var o_jind=_.findIndex($rootScope.outprocessjourneylist, function (o) {
            return o == data.tiledlist[0].Journey_Name;
        });
		////console.log(o_jind,data.tiledlist[0].Journey_Name);
		if(data.tiledlist[0].conflict) { 
			var ele = new Array();
            var ele_val = new Array();
		}
        else if (jind == -1) {
            
            //if(data.tiledlist[0].topic_mapped)
            if ($rootScope.outprocessclick == 0) {
                
                if(o_jind>-1) {
                    {
                        ele.push(data.tiledlist[0].Journey_Name);
                        ele_val.push(data.tiledlist[0]);
                        $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
                    }
                } 
                else
                {
                    if($scope.tablistpr==1)
                    {
                        $rootScope.tabvalue.elements=[];
                        $rootScope.tabvalue.element_values=[];
                    }
                    if(process.length > 0 )
                    {
                        var ele = new Array("Main Process");
                        var ele_val = new Array(data.tiledlist[0]);
                    }
                    else
                    {
                        var ele = new Array();
                        var ele_val = new Array();
                    }
                    ////console.log("outprocess 0,");
                    //$scope.getprocessdata(data.tiledlist[0]);
                    if(data.tiledlist[0].conflict) {
                        /*if(data.tiledlist[0].conflict==1) {}
                        else 
                            $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);*/
                    }
                    else
                        $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
                }
                //$rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
            } else {
                
                ele.push(data.tiledlist[0].Journey_Name);
                ele_val.push(data.tiledlist[0]);
				////console.log(ele_val);
                if(data.tiledlist[0].conflict) {
                    /*if(data.tiledlist[0].conflict==1) {}
                    else 
                        $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);*/
                }
                else {
                    $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
                    $rootScope.outprocessjourney=data.tiledlist[0].Journey_Name;
                    $rootScope.outprocessjourneylist.push(data.tiledlist[0].Journey_Name);
                }
                //$rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
                /*if (data.tiledlist[0].topic_mapped == 1) {
                    //console.log("topic mapped1");
                    
                        {
                        var ele = new Array("Process");
                        var ele_val = new Array(data.tiledlist[0]);
                        ////console.log("topic mapped1");
                        $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
                        $rootScope.outprocessclick = 0;
                    }
                } else {
                    if(process.length > 0)
                    {
                        //console.log("topic mapped0");
                        if(ele[0]=='Process')
                        {
                            ele_val[0]=data.tiledlist[0];
                        }
                        else 
                        {
                            //console.log("topic unshift");
                            ele.unshift('Process');
                            ele_val.unshift(data.tiledlist[0]);
                        }
                    }
                    ////console.log("topicmapped 0,",$scope.tablistpr);
                    //$rootScope.outprocessclick = 0;
                    if($scope.tablistpr==1)
                    {
                        $rootScope.tabvalue.elements=[];
                        $rootScope.tabvalue.element_values=[];
                    }
                    else {
                        ele.push(data.tiledlist[0].Journey_Name);
                        ele_val.push(data.tiledlist[0]);
                        $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
                    }
                }*/
            }
            ////console.log(ele,"tab");
            // else {
            //     var ele = new Array("Process");
            //     var ele_val = new Array(data.tiledlist[0]);
            //     $rootScope.journeylist=[];
            //     $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
            //     $rootScope.outprocessclick=0;
            //     //console.log("topicmapped not fobd");
            //     // ele.push(data.tiledlist[0].Journey_Name);
            //     // ele_val.push(data.tiledlist[0]);
            //     // $rootScope.journeylist.push(data.tiledlist[0].Journey_Name);
            // }

        } else {
            //if($rootScope.outprocessclick == 0)
                
            if (data.tiledlist[0].Process) {
                ////console.log("exists");
                if (data.tiledlist[0].Process.length > 0) {
                    if ($rootScope.outprocessclick == 1) {}
                        //$rootScope.tabvalue.element_values[$rootScope.tabvalue.element_values.length - 1] = data.tiledlist[0];
                    else {
                        
                        //ele[0]='Process';
                        //ele_val[0]=data.tiledlist[0];
                    }
                        //$rootScope.tabvalue.element_values[0] = data.tiledlist[0];
                    /*if(ele[0]=='Process')
                    {
                        ele_val[0]=data.tiledlist[0];
                    }
                    else 
                    {
                        ele.unshift('Process');
                        ele_val.unshift(data.tiledlist[0]);
                    }*/
                    chjourney=_.findIndex($rootScope.outprocessjourneylist, function (o) {
                        return o == data.tiledlist[0].Journey_Name;
                    });
                    eleind=0;
					//console.log(chjourney,data.tiledlist[0].Journey_Name);
                    if(chjourney > -1) {
                        eleind=_.findIndex(ele, function (o) {
                            return o == data.tiledlist[0].Journey_Name;
                        });
						//console.log(eleind,data.tiledlist[0].Journey_Name);
                        ele_val[eleind]=data.tiledlist[0];
                    }
                    else {
                        ele[0]='Main Process';
                        ele_val[0]=data.tiledlist[0];
                    }
                    /*if(ele.length==0) {
                        ele[0]='Process';
                        ele_val[0]=data.tiledlist[0];
                    }
                    else {
                        ele_val[jind]=data.tiledlist[0];
                    }*/
                }
            }
            else  {
                ////console.log("no process");
                ele_val[0]=data.tiledlist[0];
            }
            ////console.log(ele,"inside 2nd");
        }
        //}
        ////console.log(ele);
        ////console.log(ele,"tabs after add");
        ////console.log(ele_val,"tabs ele after add");
        $rootScope.showMsgLoader = false;
        if (data.tiledlist[0].Script)
            $rootScope.script_data = data.tiledlist[0].Script;
        $rootScope.contentobj = [];
        /*if (data.tiledlist[0].Quik_Tip) {


            ele = new Array("Main Process", "Exception Scenarios");
            ele_val = new Array(data.tiledlist[0], data.tiledlist[0]);
            //if(data.tiledlist[0].Quik_Tip.length == 0)
            {
                $rootScope.getnotedata(data.tiledlist[0].Quik_Tip[0], data.tiledlist[0].Table);
            }
            //var ele_val = new Array(data.tiledlist[0],data.tiledlist[0]);
            // if(!data.tiledlist[0].Script || data.tiledlist[0].Script.length== 0)
            //     $rootScope.tabHeight = window.innerHeight-53;
            // else
            //     $rootScope.tabHeight = 300;
        }
        if (data.tiledlist[0].Address_Change) {
            $rootScope.contentobj.push({
                data: data.tiledlist[0].Address_Change,
                type: "Address_Change"
            });
            // ele.push("Address Change");
            // ele_val.push(data.tiledlist[0]);
            $rootScope.tabHeight = window.innerHeight - 120 - 53;
        }
        if (data.tiledlist[0].Dormant_Activation) {
            $rootScope.contentobj.push({
                data: data.tiledlist[0].Dormant_Activation,
                type: "Dormant_Activation"
            });
            $rootScope.tabHeight = window.innerHeight - 120 - 53;
            // ele.push("Dormant Activation");
            // ele_val.push(data.tiledlist[0]);
        }
        if (data.tiledlist[0].verify_seeding_info) {
            $rootScope.contentobj.push({
                data: data.tiledlist[0].verify_seeding_info,
                type: "verify_seeding_info"
            });
            // ele.push("Address Change");
            // ele_val.push(data.tiledlist[0]);
            $rootScope.tabHeight = window.innerHeight - 120 - 53;
        }
        if (data.tiledlist[0].name_mismatch_table) {
            $rootScope.contentobj.push({
                data: data.tiledlist[0].name_mismatch_table,
                type: "name_mismatch_table"
            });
            // ele.push("Address Change");
            // ele_val.push(data.tiledlist[0]);
            $rootScope.tabHeight = window.innerHeight - 120 - 53;
        }*/
        //if(data.tiledlist[0].Journey_Name && data.tiledlist[0].Journey_Name != '')
        if (jind == -1 && data.tiledlist[0].topic_mapped == 1) {
            formData1 = {
                Journey_Name: data.tiledlist[0].Journey_Name
            };
            apiService.getguidelinedata(formData1).then(function (guidedata) {
                if (guidedata.data.data.length > 0) {
                    ele.push('Guidelines');
                    ele_val.push(guidedata.data.data);
                }
                // $rootScope.tabvalue.elements = [];
                // $rootScope.tabvalue.element_values=[];
                //$rootScope.tabvalue.elements = ele;
                //$rootScope.tabvalue.element_values = ele_val;
                // $rootScope.selectTabIndex = 0;

            });
            formData1 = {
                Journey_Name: data.tiledlist[0].Journey_Name
            };
            apiService.getdiagram(formData1).then(function (d_data) {
                if (d_data.data.data) {
                    Journey_Data = d_data.data.data;
                    var str = JSON.stringify(Journey_Data);
                    str1 = str.replace(/Name/g, 'name');
                    Journey_Data = JSON.parse(str1);
                    ele.push('Diagram');


                    var chart_config = Journey_Data;
                    $scope.chart_config = chart_config;
                    ele_val.push(chart_config);
                    $timeout(function () {

                        $(document).on('click', '.node.nodeExample1', function () {
                            
                        });
                        $(document).on('click', '#rootNode', function (e) {
                            
                        });
                        $(document).on('click', '.nodes .node', function (e) {
                            $(this).find("div.title i").remove();
                            // $(this).find("i.edge.horizontalEdge.rightEdge.fa").click();
                            // $(this).find("i.edge.horizontalEdge.leftEdge.fa").click();
                            var title = $(this).find("div.title").text();
                            title = title.replace('"', "");

                            var $node = $('#selected-node').data('node');
                            
                        });

                    }, 4000);
                    ////console.log(Journey_Data);
                }
            });
        }
        // ele.push('Old Process');
        // ele_val.push(data.tiledlist[0]);
        $(document).on('click', 'li.Process.uib-tab', function () {
            $("div.scriptData").show();
        });
        //$('a.popupdata').click(function(){
        $scope.IsJsonString = function (str) {
            try {
                str = str.replace(/'/g, '"');
                str = str.replace('Information Icon', 'Information_Icon');
                var o = JSON.parse(str);
                if (o && typeof o === "object")
                    return o;

            } catch (e) {
                return false;
            }
            return false;
        };
        $scope.hides = function (n, d) {
            var ooo = $("#diagram-example");
            l_dir = 'left';
            r_dir = 'right';
            ooo.orgchart({
                'hideSiblings': function (n, l_dir) {

                }
            });
            ooo.orgchart({
                'hideSiblings': function (n, r_dir) {

                }
            });
        };
        $(document).on('click', 'li.Diagram.uib-tab', function () {
            $("div.scriptData").hide();
            $timeout(function () {
                //tree = new Treant( $scope.chart_config );
                //var oc = $('#diagram-example').orgchart($scope.chart_config);
                $("#diagram-example").html("");
                $(".charts").css(
                    'opacity', '0'
                );
                var org_i = 0;
                var node_array = [];
                var oc = $('#diagram-example').orgchart({
                    'data': $scope.chart_config,
                    'depth': 0,
                    'nodeContent': 'title',
                    //verticalDepth:0
                    // 'parentNodeSymbol':'',
                    'toggleSiblingsResp': true,
                    'direction': 'l2r',
                    'createNode': function (node, data) {
                        ////console.log(data);

                        node.on('click', function (event) {
                            if (!$(event.target).is('.edge')) {
                                $('#selected-node').val(data.name).data('node', node);
                                $('#selected-node').attr('data-node', node);
                            }
                        });
                        $(".node").find("div.title i").remove();
                        var title = node[0].children[0].innerText;
                        title = title.replace('"', "");

                        // //console.log(title);
                        // //console.log(data.name);
                        if (data.name == title) {
                            $(node).attr('data-attr', encodeURIComponent(JSON.stringify(data)));
                        }
                        if (org_i == 0)
                            data.collapsed = false;
                        else {
                            if (title == dthlink) {
                                data.collapsed = false;
                                node_array.push({
                                    node:data
                                });
                            } else {
                                data.collapsed = true;
                            }
                        }
                        org_i++;
                        ////console.log(data);
                        var secondMenuIcon = $('<i>', {
                            'class': 'fa fa-info-circle second-menu-icon',
                            click: function () {
                                $(this).siblings('.second-menu').toggle();
                            }
                        });
                        otheroptions = [];   
                        otheroptions.push($scope.IsJsonString(data.optionalone));
                        otheroptions.push($scope.IsJsonString(data.optionaltwo));
                        otheroptions.push($scope.IsJsonString(data.optionalthree));
                        otheroptions.push($scope.IsJsonString(data.optionalfour));
                        otheroptions.push($scope.IsJsonString(data.optionalfive));
                        otheroptions.push($scope.IsJsonString(data.optionalsix));
                        otheroptions.push($scope.IsJsonString(data.optionalseven));
                        otheroptions.push($scope.IsJsonString(data.optionaleight));

                        var sys = "";
                        var checks = "";
                        var info = "";
                        var script = "";
                        angular.forEach(otheroptions, function (ov, ok) {
                            if (ov.hasOwnProperty("script"))
                                script = ov.script;
                            if (ov.hasOwnProperty("Information_Icon"))
                                info = ov.Information_Icon;
                            if (ov.hasOwnProperty("checks"))
                                checks = ov.checks;
                            if (ov.hasOwnProperty("system"))
                                sys = ov.system;

                        });
                        var secondMenu = '<div class="second-menu"><p class="systemdata"><span class="charttitle">System:</span>' + sys + '</p>';
                        secondMenu += '<p class="checksdata"><span class="charttitle">Checks:</span>' + checks + '</p>';
                        secondMenu += '<p class="informaiondata"><span class="charttitle">Information:</span>' + info + '</p>';
                        secondMenu += '<p class="scriptdata"><span class="charttitle">Script:</span>' + script + '</p>';
                        secondMenu += '</div>';
                        node.append(secondMenuIcon).append(secondMenu);
                    },

                });
                $timeout(function () {
                    if (node_array.length > 0) {
                        oc.hideSiblings(node_array[0].node, 'left', {

                        });

                        $timeout(function () {
                            oc.hideSiblings(node_array[0].node, 'rigth', {

                            });
                        }, 1000);
                        $timeout(function () {
                            $(".charts").css(
                                'opacity', '1'
                            );
                        }, 3000);
                    } else
                        $(".charts").css(
                            'opacity', '1'
                        );
                }, 2000);
            }, 1000);
        });
        $rootScope.isCollapsed = true;
        ////console.log(data.tiledlist[0]);
        if(!data.tiledlist[0].Process) {
            if($rootScope.outprocessclick==0) {
                if(ele[0]=='Main Process') {
                    _.remove(ele, function(n) {
                        return n == "Main Process";
                    });
                    ele_val.shift();
                }
            }
            /*else 
                $rootScope.outprocessclick=0;*/
        }
        else if(data.tiledlist[0].Process.length == 0) {
            if($rootScope.outprocessclick==0) {
                if(ele[0]=='Main Process') {
                    _.remove(ele, function(n) {
                        return n == "Main Process";
                    });
                    ele_val.shift();
                }
            }
            /*else 
                $rootScope.outprocessclick=0;*/
        }
		console.log(ele);
        $rootScope.tabvalue.elements = ele;
        $rootScope.tabvalue.element_values = ele_val;
        $timeout(function () {
            $("#tab_data .nav-tabs li").removeClass("active");
            $("#tab_data .tab-content .tab-pane").removeClass("active");
            if (data.tiledlist[0].topic_mapped == 0 && $rootScope.outprocessclick == 1) {
                $("#tab_data .nav-tabs li").last().show();
                $("#tab_data .nav-tabs li").last().addClass("active");
                $("#tab_data .tab-content .tab-pane").last().addClass("active");
                $("#tab_data").show();
                $rootScope.outprocessclick=0;
            } else {
				
                if(o_jind>-1) {
                    jind++;
                    chjourney=_.findIndex($rootScope.journeylist, function (o) {
                        return o == data.tiledlist[0].Journey_Name;
                    });
                    eleind=0;
                    if(chjourney > -1) {
                        eleind=_.findIndex(ele, function (o) {
                            return o == data.tiledlist[0].Journey_Name;
                        });
                        eleind++;
                        $("#tab_data .nav-tabs li:nth-child("+eleind+")").addClass("active");
                        $("#tab_data .tab-content .tab-pane:nth-child("+eleind+")").addClass("active");
                    }
                    else {
                        $("#tab_data .nav-tabs li:nth-child(1)").addClass("active");
                        $("#tab_data .tab-content .tab-pane:nth-child(1)").addClass("active");
                    }
                    
                    $("#tab_data").show();
                }
                else if(jind>-1) {
                    ////console.log(jind);
                    jind++;
                    chjourney=_.findIndex($rootScope.outprocessjourneylist, function (o) {
                        return o == data.tiledlist[0].Journey_Name;
                    });
                    eleind=0;
                    if(chjourney > -1) {
                        eleind=_.findIndex(ele, function (o) {
                            return o == data.tiledlist[0].Journey_Name;
                        });
                        eleind++;
                        $("#tab_data .nav-tabs li:nth-child("+eleind+")").addClass("active");
                        $("#tab_data .tab-content .tab-pane:nth-child("+eleind+")").addClass("active");
                    }
                    else {
						$("#tab_data").find('.uibcollapsecontent2').hide();
							$("#tab_data").find(".uibcollapseheader2").find("i").removeClass("glyphicon-chevron-down");
							$("#tab_data").find(".uibcollapseheader2").find("i").addClass("glyphicon-chevron-right");

                        $("#tab_data .nav-tabs li:nth-child(1)").addClass("active");
                        $("#tab_data .tab-content .tab-pane:nth-child(1)").addClass("active");
                    }
                    
                    $("#tab_data").show();
                }
                else if (ele[0] == 'Main Process') {
                    if (ele_val[0].Process) {
                        
                        if (ele_val[0].Process.length > 0) {
							                            ////console.log("length>0");
                            $("#tab_data .nav-tabs li").first().show();
                            //$("#tab_data .tab-content .tab-pane").first().show();
                            $("#tab_data .nav-tabs li").first().addClass("active");
                            $("#tab_data .tab-content .tab-pane").first().addClass("active");
                            $("#tab_data").show();
                        } else {
                            ////console.log("length<0");
                            /*if(ele.length > 1)
                            {
                                $("#tab_data .nav-tabs li:nth-child(1)").hide();
                                $("#tab_data .tab-content .tab-pane:nth-child(1)").hide();
                                $("#tab_data .nav-tabs li:nth-child(2)").addClass("active");
                                $("#tab_data .tab-content .tab-pane:nth-child(2)").addClass("active");
                                $("#tab_data").show();
                            }
                            else*/
                                $("#tab_data").hide();
                            //$("#tab_data .nav-tabs li:nth-child(1)").hide();
                            //$("#tab_data .nav-tabs li:nth-child(2)").addClass("active");
                            ////$("#tab_data .tab-content .tab-pane").first().addClass("active");
                            //$("#tab_data .tab-content .tab-pane:nth-child(1)").hide();
                        }
                    } else {
                        ////console.log("No process");
                        $("#tab_data .nav-tabs li:nth-child(1)").hide();
                        if (ele.length > 1)
                            $("#tab_data").show();
                        else
                            $("#tab_data").hide();
                        $("#tab_data .nav-tabs li:nth-child(2)").addClass("active");
                        $("#tab_data .tab-content .tab-pane:nth-child(1)").hide();
                        //$("#tab_data .tab-content .tab-pane").first().addClass("active");
                    }

                } else {
                    $("#tab_data .nav-tabs li").first().addClass("active");
                    $("#tab_data .tab-content .tab-pane").first().addClass("active");
                    $("#tab_data").show();
                }
            }
            
            //tab auto resize code
            /*
            var numberOfTabs=$('.collapseheading').length;
            var tabs=$('.collapseheading');
            var tabContainer=$(".nav-tabs");
            var tabsTotalWidth=0;
            for(var i=0; i < numberOfTabs;i++)
            {
                tabsTotalWidth= tabsTotalWidth + $(tabs[i]).width();
                
            }
            if((tabsTotalWidth + 25 )>tabContainer.width()){
            tabs.css("width",tabContainer.width()/numberOfTabs);
            }
            else{
                tabs.css("width","auto");
            }
                    
            //end of tab auto-resize code*/
            $(".processcontent").show();
            $("#tab_data li a").attr("href","#");
			////console.log($rootScope.tabvalue.element_values);
        }, 1000);
    };
    $rootScope.showdashboard = function() {
        $rootScope.minimizeChatwindow();
        $rootScope.tabvalue.elements = [];
        $rootScope.tabvalue.element_values=[];
        $rootScope.fstabs = [];
        $rootScope.fstabvalue =[];
        $(".fdashboard").show();
        $(".fspanel").hide();
		$rootScope.script_data=[];
    };
    
    $rootScope.InstructionResponse = function(id,data) {
        $rootScope.pushSystemMsg(id,data);
        ////console.log(data);
        $('#myCarousel').carousel({
            interval: false,
            wrap: false
        });
        $('#myCarousel').find('.item').first().addClass('active');
        $rootScope.showMsgLoader = false; 
    };
    $rootScope.fstabs =[];
    $rootScope.fstabvalue =[];
    $scope.IsJsonString = function (str) {
        try {
            str = str.replace(/'/g, '"');
            str = str.replace('Information Icon', 'Information_Icon');
            var o = JSON.parse(str);
            if (o && typeof o === "object")
                return o;

        } catch (e) {
            return false;
        }
        return false;
    };
    $rootScope.downloadfile=function(url){
        $scope.URL = $rootScope.serverip+"/cingulariti/uploads/"+url;
      $scope.ORIGINAL_SIZE = 473831;
      $scope.info = "";

      
        // Resetting headers to Accept */* is necessary to perform a simple cross-site request
        // (see https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Simple_requests)
        /*delete $http.defaults.headers.common['X-Requested-With'];
        $http.get($scope.URL, {
          responseType: "arraybuffer"
        }).then(function(data) {
          $scope.info =
            "Read '" + $scope.URL + "' with " + data.byteLength + " bytes in a variable of type '" + typeof(data) + "'. The original file has " + $scope.ORIGINAL_SIZE + " bytes."

// to download in IE >10 versions
          // Try using msSaveBlob if supported
          //console.log("Trying saveBlob method ...");
          var blob = new Blob([data], {
            //type: 'image/png'
          });
          //console.log(blob);
          if (navigator.msSaveBlob)
            navigator.msSaveBlob(blob, url);
          else {
            // Try using other saveBlob implementations, if available
            var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
            if (saveBlob === undefined) throw "Not supported";
            saveBlob(blob, filename);
          }
          //console.log("saveBlob succeeded");


        }).
        catch(function(data, status) {
          $scope.info = "Request failed with status: " + status;
        });*/
    };

    $rootScope.showdocumentnew = function(obj){
        //console.log("----------showdocumentnew----------", obj)

        if(obj['children']){
            // //console.log("----------showdocumentnewChild----------")
            for(var j=0;j<obj.children.length;j++){
                // //console.log("----------showdocumentnewChildLoop----------", obj)
                if (obj.children[j].name === "Document File" && !obj.children[j].children){
                    // //console.log("----------showdocumentnewDocFile----------", obj)
                    $rootScope.showdocs(obj);
                    // $rootScope.showdocumentnew(obj.children[j]);
                }

            }

        }

    }

    $rootScope.showdocs = function(obj) {
        var ele = Array();
        var eleval=Array();
        ele.push("Documents");
        $rootScope.fstabs=ele;
        eleval.push({docs:obj.title});
        $rootScope.fstabvalue=eleval;
        //console.log($rootScope.fstabvalue, "--------------newdata--------------");
        $(".fspanel").hide();
        if($rootScope.fstabvalue.length>0)
        {            
            //console.log("inmsideeeeeeeeeeeeee")
            $rootScope.fstabs=["Documents"];
            $rootScope.fstabvalue=[{docs:$rootScope.docsA}];
            $(".fspanel").show();
        }
        // $(".fspanel").show();
    };
    $rootScope.docss=[];
    $rootScope.docss2=[];
    function findRecurse(obj){
        if (obj.name === 'Document File'){
            $rootScope.docss2.push(obj);
            // //console.log("$rootScope.docss2", $rootScope.docss2)
        }


        var result;
        if(obj.children) {
            for(var i=0;i<obj.children.length;i++){
                // //console.log(obj.children)
                result = findRecurse(obj.children[i]);
                // //console.log("result", result);
                if(result) 
                    return result;
            }
            return [];
        }
    }
    function recurse(obj){
        var abc=  "";
        var title = [];
        for (var i = 0; i <= obj.length-1; i++) {
              
            ////console.log(arr.children[i].name);
            if (obj[i].name=='Document File') {
                abc+=obj[i].title;
                title.push({title:obj[i].title});
            } 
            if(obj[i].children)
            {
                ret=recurse(obj[i].children);
                if(ret.length > 0)
                    title=title.concat(ret);
            }
        }
        return title;
    }
    function flatten (arr) {
      //var newArr = [];
      ////console.log(arr,"newobj");
      ////console.log(newArr,"before concat");
      //newArr=newArr.concat(newArr1);
      var title = [];
      //abc += newArr1;
      ////console.log(newArr,"After concat");
        if (arr.name=='Document File') {
            //newArr.push(arr.title);
            abc+=arr.title;
            title.push({title:arr.title});
        } 
        if(arr.children) {
            obj = arr.children;
            ret=recurse(obj);
            if(ret.length > 0)
                title=title.concat(ret);
        }
      ////console.log(abc);
      return title;
    }
    function getdocs(obj,docs1) {
        docs=[];
        docs.concat(docs1);
        ////console.log(docs1);
        if(obj.name=='Document File')
            docs.push(obj.title);
        if(obj.children)
        angular.forEach(obj.children, function(value, key) {
            docs=(getdocs(value,docs));
        });
        return docs;
        /*angular.forEach(obj.children, function(value, key) {
            ////console.log(value);
            if(value.name=='Document File')
                $rootScope.docss.push(value.title);
                //return value.title;
                
            if(value.children)
            {
                return getdocs(value,$rootScope.docss);
            }   
            ////console.log(value);
        });*/
        //return docs;
    }

    $rootScope.getchilddoc = function(name,obj) {
        // //console.log(obj, "----obj----");
        // //console.log("-----dep-----",$rootScope.department);
        $(".fspanel").hide();
        var docs = [];
        $rootScope.docss=[];
        doc1=_.filter(obj, function(item) { 
           return item.name === "Document File";
        });
        // //console.log(doc1);
        abc=flatten(obj);
        docs=docs.concat(abc);
        $rootScope.docsA = docs;
        doc2 = findRecurse(obj);
        // //console.log(abc, "-------abc--------");
        // //console.log(docs, "------00000------");
        // if(docs.length>0)
        if(docs.length>0 && obj.name=="Document File")
        {
            $rootScope.fstabs=["Documents"];
            $rootScope.fstabvalue=[{docs:docs}];
            $(".fspanel").show();
        }
    };
    $rootScope.openMenu = function(submenu) {
        var prev = "";
        $("#topiclist li").hide();
        $(".list-group .nav .nav-list li").each(function(){
            ////console.log("inside");
            $(this).find(".section_last").removeClass("active");
        });
        _.each(submenu, function(value, key) {
            ////console.log(value);
            ////console.log(_.size(submenu));
            
            if( value != "")
            {   
                if(submenu[0] == "Locker")
                {
                    //value=value.replace(" ","_");
                    if(key==0)
                        prev +=value;
                    else
                        prev +=" "+value; 
                }
                else
                    prev +=value+" "; 
                ////console.log(value);
                $(".list-group a[id='"+prev+"']").parent().show();
                $(".list-group a[id='"+prev+"']").parent().children(".tree").find("li").show();
                
                if(submenu.length != (key+1))
                {
                    ////console.log(prev);
                    if($(".list-group a[id='"+prev+"']").parent().children('ul.tree').is(':visible')) {}
                    else
                    {
                        $(".list-group a[id='"+prev+"']").parent().children('ul.tree').toggle(300);
                    }
                    $(".list-group a[id='"+prev+"']").parent().find('.triangle').toggleClass('glyphicon-triangle-bottom').toggleClass('glyphicon-triangle-right');
                }
                if($( ".list-group a[id='"+prev+"']" ).hasClass( "section_last" ))
                {   
                    ////console.log("hasclass");
                    $(".list-group a[id='"+prev+"']").addClass("active");
                }
                if(submenu.length == (key+1))
                {
                    ////console.log("last");
                    $(".list-group a[id='"+prev+"']").parent().children('ul.tree').toggle(300);
                }
            }
            
        });
        
    };
    $rootScope.htmlToPlaintext=function(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
    $rootScope.hovered = function(hovering){
        $timeout(function() {
            ////console.log('update with timeout fired');
            if(hovering.objHovered==true){
                hovering.popoverOpened2=true;
            }
        }, 500);
    };
    $rootScope.getSearch = function(searchtext){
        ////console.log(searchtext);
        $rootScope.pushMsg(0,searchtext,"");
    };
    $rootScope.getNumber = function(number) {
        return new Array(number);
    };
    angular.element(document).ready(function() {
        
        $(document).on('change', '.col_opts', function () {
            var select_index =parseInt($(this).attr("data-dindex"));
            
            var list_index =parseInt($(this).attr("data-index"));
            
            var value=$(this).val();
            var dcount = parseInt($(this).attr("dcount"));
            var journey_name=$(this).attr("data-journey");
            var response_type =$(this).attr("datartype");
            var options =$(this).attr('data-key')+"|"+value;
            var sel_val="";
            //if(dcount>2)
            {
                //var n_i = select_index+1;
                for(var i = 0 ; i <= dcount-1 ; i++)
                {
                    
                    if(i==0)
                    {
                        sel_val=$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).val();
                    }
                    else 
                        sel_val +="|"+$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).val();
                    
                }
                //if(select_index==dcount)
                    $rootScope.ratecardSubmit3(sel_val,select_index,list_index,dcount,journey_name,response_type,options);
            }
            
        });
        $(document).on('change', '.r_c_cols', function () { // for dynamic 1
            var select_index =parseInt($(this).attr("data-dindex"));
            
            var list_index =parseInt($(this).attr("data-index"));
            
            var value=$(this).val();
            var dcount = parseInt($(this).attr("dcount"));
            var journey_name=$(this).attr("data-journey");
            var response_type =$(this).attr("datartype");
            var options =$("select.r_c_ops_"+list_index).val();
            var sel_val="";
            //if(dcount>2)
            {
                //var n_i = select_index+1;
                for(var i = 0 ; i <= select_index ; i++)
                {
                    if(select_index<dcount-1 && i>select_index )
                    {
                        var n_i=i+1;
                        $("select.form-control.r_c_cols.r_c_cols"+n_i+".r_c_cols_"+list_index).html("");
                        $("select.form-control.r_c_cols.r_c_cols"+n_i+".r_c_cols_"+list_index).select2("val","");
                    }
                    if(i==0)
                    {
                        sel_val=$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).val();
                    }
                    else 
                        sel_val +="|"+$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).val();
                    if(i == select_index)
                    {
                        //console.log("selcted",select_index);
                        var n_i=i+1;
                        $("select.form-control.r_c_cols.r_c_cols"+n_i+".r_c_cols_"+list_index).html("");
                        $("select.form-control.r_c_cols.r_c_cols"+n_i+".r_c_cols_"+list_index).select2("val","");
                    }
                    else
                    {
                        $(".nxtdd"+n_i+".nxtdd_"+list_index).removeClass('hiderc');
                    }
                }
				$timeout(function() {
					for(var i = (select_index+1) ; i <= dcount-1 ; i++)
					{
						////console.log(i,"clearing");
							
						$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).html("");
						$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).select2("val","");
						
					}
					if($(".col_opts_"+list_index).length) {}
					else if(select_index < dcount-1)
						$rootScope.ratecardSubmit3(sel_val,select_index,list_index,dcount,journey_name,response_type,"");
				},500);
				
                //if(select_index==dcount)
                
            }
            
        });
        $(document).on('change', '.r_c_op', function () {
            var select_index =parseInt($(this).attr("data-dindex"));
            
            var list_index =parseInt($(this).attr("data-index"));
            
            var value=$(this).val();
            var dcount = parseInt($(this).attr("dcount"));
            var journey_name=$(this).attr("data-journey");
            var response_type =$(this).attr("datartype");
            var options =$("select.r_c_op_"+list_index).val();
            ////console.log("option changed");
            if(dcount==2)
            {
                var val1 = $("select.form-control.r_c_col.r_c_col0.r_c_col_"+list_index).val();
                var val2 = $("select.form-control.r_c_col.r_c_col1.r_c_col_"+list_index).val();
                
                if(val1 && val2 )
                    $rootScope.ratecardSubmit2(val1,val2,select_index,list_index,dcount,journey_name,response_type,options);
            }
        });
        $(document).on('change', '.r_c_col', function () { // for dynamic 0
            var select_index =parseInt($(this).attr("data-dindex"));
            
            var list_index =parseInt($(this).attr("data-index"));
            
            var value=$(this).val();
            var dcount = parseInt($(this).attr("dcount"));
            var journey_name=$(this).attr("data-journey");
            var response_type =$(this).attr("datartype");
            var options =$("select.r_c_op_"+list_index).val();
            if(dcount==2)
            {
                var val1 = $("select.form-control.r_c_col.r_c_col0.r_c_col_"+list_index).val();
                var val2 = $("select.form-control.r_c_col.r_c_col1.r_c_col_"+list_index).val();
                ////console.log(val1,'val1');
                ////console.log(val2,'val2');
                //if(val1  && val2 )
                    //$rootScope.ratecardSubmit2(val1,val2,select_index,list_index,dcount,journey_name,response_type,"");
            }

            
        });
        /*$(document).on('change', '.dele_m', function () {
            var select_index =parseInt($(this).attr("data-dindex"));
            
            var list_index =parseInt($(this).attr("data-index"));
            var Journey_Name=$(this).attr("data-journey");
            var value=$(this).val();
            var dcount = parseInt($(this).attr("dcount"));
            $rootScope.getmatrixdata(select_index,Journey_Name,list_index,dcount);

        });*/
    });
    $(document).on('change', '.dele_m', function () { // for dynamic 1
        var select_index =parseInt($(this).attr("data-dindex"));
        
        var list_index =parseInt($(this).attr("data-index"));
        
        var value=$(this).val();
        var dcount = parseInt($(this).attr("dcount"));
        var journey_name=$(this).attr("data-journey");
        var response_type =$(this).attr("datartype");
        var options =$("select.r_c_ops_"+list_index).val();
        var sel_val="";
        //if(dcount>2)
        {
            //var n_i = select_index+1;
            for(var i = 0 ; i <= select_index ; i++)
            {
                if(select_index<dcount-1 && i>select_index )
                {
                    var n_i=i+1;
                    $("select.form-control.dele_m.dele_m"+n_i+".dele_m"+list_index).html("");
                    $("select.form-control.dele_m.dele_m"+n_i+".dele_m_"+list_index).select2("val","");
                }
                if(i==0)
                {
                    sel_val=$("select.form-control.dele_m.dele_m"+i+".dele_m_"+list_index).val();
                }
                else 
                    sel_val +="|"+$("select.form-control.dele_m.dele_m"+i+".dele_m_"+list_index).val();
                if(i == select_index)
                {
                    ////console.log("selcted",select_index);
                    var n_i=i+1;
                    $("select.form-control.dele_m.dele_m"+n_i+".dele_m_"+list_index).html("");
                    $("select.form-control.dele_m.dele_m"+n_i+".dele_m_"+list_index).select2("val","");
                }
                else
                {
                    $(".nxtdd"+n_i+".nxtdd_"+list_index).removeClass('hiderc');
                }
            }
			for(var i = select_index ; i <= dcount-1 ; i++)
            {
                var n_i = i+1;
				////console.log(n_i,"clearing");
                $("select.form-control.dele_m.dele_m"+n_i+".dele_m_").html("");
                $("select.form-control.dele_m.dele_m"+n_i+".dele_m_"+list_index).select2("val","");
            }
            //if(select_index==dcount)
                ////console.log(sel_val);
            //if($(".col_opts_"+list_index).length) {}
            //else 
                if(select_index < dcount-1)
                    $rootScope.delegationsubmit(sel_val,select_index,list_index,dcount,journey_name,response_type,"");
        }
        
    });
    $rootScope.resetmatrix = function(list_index,dcount) {
        for(var i = 1 ; i <= dcount-1 ; i++)
        {
            $("select.form-control.dele_m.dele_m_"+i+".dele_m"+list_index).html("");
            $("select.form-control.dele_m.dele_m_"+i+".dele_m"+list_index).val("");
            $("select.form-control.dele_m.dele_m_"+i+".dele_m"+list_index).select2("val","");
        }
        $(".delresponse"+list_index).html("");
        $(".delresponse"+list_index).hide("");
        $("select.form-control.dele_m.dele_m_0.dele_m"+list_index).val("");
        $("select.form-control.dele_m.dele_m_0.dele_m"+list_index).select2("val","");
    };
    $rootScope.resetoned = function(list_index,dcount) {
        for(var i = 0 ; i <= dcount-1 ; i++)
        {
            //$("select.form-control.r_c_col.r_c_col"+i+".r_c_col_"+list_index).html("");
            
            
            
            // live
            //$("select.form-control.r_c_col.r_c_col"+i+".r_c_col_"+list_index).val("");
            //$("select.form-control.r_c_col.r_c_col"+i+".r_c_col_"+list_index).select2("val","");
        }
        $("select.form-control.r_c_col_"+list_index).val("");
        $("select.form-control.r_c_col_"+list_index).select2("val","");
        //$(".ratecardresult_"+list_index).html("");
        $(".ratecardresult"+list_index).hide();
    };
    $rootScope.resetmultirc = function(list_index,dcount) {
        for(var i = 1 ; i <= dcount-1 ; i++)
        {
            $("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).html("");
            
            
            //$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).val("");
            //$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).select2("val","");
        }
        $(".nxtdd_"+list_index).hide();
        $(".nxtdd0.nxtdd_"+list_index).show();
        $(".resetfilter2").hide();
        $("select.form-control.r_c_cols_"+list_index).val("");
        $("select.form-control.r_c_cols_"+list_index).select2("val","");
        //$(".ratecardresult_"+list_index).html("");
        $(".ratecardresults"+list_index).hide();
    };
    $rootScope.submitmatrix= function(list_index,tiledlist) {
        var select_index =parseInt(tiledlist.no_drop-1);
        ////console.log(select_index);
        var dcount = parseInt(tiledlist.no_drop);
        var journey_name=tiledlist.Journey_Name;
        if(tiledlist.dynamic==1) {
            //var select_index =parseInt(tiledlist.no_drop-1);
            
            //var list_index =parseInt($(this).attr("data-index"));
            
            //var value=$(this).val();
            //var dcount = parseInt(tiledlist.no_drop-1);
            
            var response_type =tiledlist.response_type;
            var options =$("select.r_c_ops_"+list_index).val();
            var sel_val="";
            //if(dcount>2)
            {
                //var n_i = select_index+1;
                for(var i = 0 ; i <= select_index ; i++)
                {
                    
                    if(select_index<dcount-1 && i>select_index )
                    {
                        var n_i=i+1;
                        $("select.form-control.dele_m.dele_m"+n_i+".dele_m_"+list_index).html("");
                        $("select.form-control.dele_m.dele_m"+n_i+".dele_m_2"+list_index).select2("val","");
                    }
                    if(i==select_index){
                        ////console.log("last");
                        sel_val += "|"+ ($('.rzslider_m_'+list_index+' span.rz-bubble.rz-model-value')[0].innerHTML);
                    }
                    if(i==0)
                    {
                        sel_val=$("select.form-control.dele_m.dele_m"+i+".dele_m_"+list_index).val();
                    }
                    else if(i != select_index)
                        sel_val +="|"+$("select.form-control.dele_m.dele_m"+i+".dele_m_"+list_index).val();
                    if(i == select_index)
                    {
                        ////console.log("selcted",select_index);
                        var n_i=i+1;
                        $("select.form-control.dele_m.dele_m"+n_i+".dele_m_"+list_index).html("");
                        $("select.form-control.dele_m.dele_m"+n_i+".dele_m_"+list_index).select2("val","");
                    }
                    else
                    {
                        $(".nxtdd"+n_i+".nxtdd_"+list_index).removeClass('hiderc');
                    }
                }
                for(var j = 0 ; j <= dcount-1 ; j++) {
                    if(j < (dcount)) 
                    {
                        //var n_in = i+1;
                        if($("select.form-control.dele_m.dele_m"+j+".dele_m_"+list_index).select2("val")=="" || $("select.form-control.dele_m.dele_m"+j+".dele_m_"+list_index).select2("val")=="? undefined:undefined ?" || !$("select.form-control.dele_m.dele_m"+j+".dele_m_"+list_index).select2("val"))
                        {
                            toastr.error("Please select "+tiledlist.options_list[j].key, 'Error');
                            //alert("Please select "+tiledlist.options_list[j].key);
                            return false;
                        }
                    }
                }
                //if(select_index==dcount)
                //if($(".col_opts_"+list_index).length) {}
                //else
                    $rootScope.delegationsubmit(sel_val,select_index,list_index,dcount,journey_name,response_type,"");
            }
        }
    };
    $rootScope.submitratecardone = function(list_index,tiledlist) {
        var select_index =parseInt(tiledlist.no_drop-1);
        var dcount = parseInt(tiledlist.no_drop);
        var journey_name=tiledlist.Journey_Name;
        if(tiledlist.dynamic==0) {
            
            
            //var list_index =parseInt($(this).attr("data-index"));
            
            //var value=$(this).val();
            
            var response_type ="";
            var options =$("select.r_c_op_"+list_index).val();
            if(dcount==2)
            {
                var val1 = $("select.form-control.r_c_col.r_c_col0.r_c_col_"+list_index).val();
                var val2 = $("select.form-control.r_c_col.r_c_col1.r_c_col_"+list_index).val();
                ////console.log(val1,'val1');
                ////console.log(val2,'val2');
                if($("select.form-control.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val")=="" || $("select.form-control.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val")=="? undefined:undefined ?" || !$("select.form-control.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val"))
                {
                    toastr.error("Please select "+tiledlist.options_list[0].key, 'Error');
                    //alert("Please select "+tiledlist.options_list[0].key);
                    return false;
                }
                if($("select.form-control.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val")=="" || $("select.form-control.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val")=="? undefined:undefined ?" || !$("select.form-control.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val"))
                {
                    toastr.error("Please select "+tiledlist.options_list[1].key, 'Error');
                    //alert("Please select "+tiledlist.options_list[1].key);
                    return false;
                }
                $(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val")=="" || $(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val")=="? undefined:undefined ?" || !$(".tl_dm.tl_dm_"+i+".tl_dm"+list_index).select2("val")
                if(val1  && val2 )
                    $rootScope.ratecardSubmit2(val1,val2,select_index,list_index,dcount,journey_name,response_type,"");
            }
        }
        if(tiledlist.dynamic==1) {
            //var select_index =parseInt(tiledlist.no_drop-1);
            
            //var list_index =parseInt($(this).attr("data-index"));
            
            //var value=$(this).val();
            //var dcount = parseInt(tiledlist.no_drop-1);
            
            var response_type =tiledlist.response_type;
            var options =$("select.r_c_ops_"+list_index).val();
            var sel_val="";
            //if(dcount>2)
            {
                //var n_i = select_index+1;
                for(var i = 0 ; i <= select_index ; i++)
                {
                    
                    if(select_index<dcount-1 && i>select_index )
                    {
                        var n_i=i+1;
                        $("select.form-control.r_c_cols.r_c_cols"+n_i+".r_c_cols_"+list_index).html("");
                        $("select.form-control.r_c_cols.r_c_cols"+n_i+".r_c_cols_2"+list_index).select2("val","");
                    }
                    if(i==0)
                    {
                        sel_val=$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).val();
                    }
                    else 
                        sel_val +="|"+$("select.form-control.r_c_cols.r_c_cols"+i+".r_c_cols_"+list_index).val();
                    if(i == select_index)
                    {
                        ////console.log("selcted",select_index);
                        var n_i=i+1;
                        $("select.form-control.r_c_cols.r_c_cols"+n_i+".r_c_cols_"+list_index).html("");
                        $("select.form-control.r_c_cols.r_c_cols"+n_i+".r_c_cols_"+list_index).select2("val","");
                    }
                    else
                    {
                        $(".nxtdd"+n_i+".nxtdd_"+list_index).removeClass('hiderc');
                    }
                }
                for(var j = 0 ; j <= dcount-1 ; j++) {
                    if(j < (dcount)) 
                    {
                        //var n_in = i+1;
                        if($("select.form-control.r_c_cols.r_c_cols"+j+".r_c_cols_"+list_index).select2("val")=="" || $("select.form-control.r_c_cols.r_c_cols"+j+".r_c_cols_"+list_index).select2("val")=="? undefined:undefined ?" || !$("select.form-control.r_c_cols.r_c_cols"+j+".r_c_cols_"+list_index).select2("val"))
                        {
                            toastr.error("Please select "+tiledlist.options_list[j].key, 'Error');
                            //alert("Please select "+tiledlist.options_list[j].key);
                            return false;
                        }
                    }
                }
                //if(select_index==dcount)
                if($(".col_opts_"+list_index).length) {}
                else
                    $rootScope.ratecardSubmit3(sel_val,select_index,list_index,dcount,journey_name,response_type,"");
            }
        }
    };
    $rootScope.ratecardSubmit3 = function(sel_val,select_index,list_index,dcount,journey_name,response_type,options) {
        sel_val=sel_val.replace(new RegExp(';',"g"), '!@#');
        formData = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,user_input:sel_val,auto_id:"",auto_value:"",type:"rate card",Journey_Name:journey_name,response_type:'rc_further_query',value:options};
        var inputDate = new Date();
        apiService.ratecardsubmit(formData).then(function (data){
            ////console.log(data);
            var outputDate   = new Date();
            var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
            angular.forEach(data.data.tiledlist, function(value, key) {
                    ////console.log(value);
                var topic2 = "";
                if(data.data.tiledlist[0].topic)
                    topic2 = data.data.tiledlist[0].topic;
                var Journey_Name2 = "";
                if(data.data.tiledlist[0].Journey_Name)
                    Journey_Name2 = data.data.tiledlist[0].Journey_Name;
                if(value.type=="rate card")
                {
                    //$(".ratecardresult_"+list_index+" span").text(data.data.tiledlist[0].value);
                    //$(".ratecardcontinue"+list_index).show();
                    var ni = select_index+1;
                    if(!options)
                    {
                        if(ni<dcount)
                        {
                            $(".ratecardresults"+list_index).hide();
                            var ni = select_index+1;
                            //$("select.r_c_op_"+list_index).html("");
                            //$("select.r_c_op_"+list_index).select2("val","");
                            var val1 = value.options_list;
                            _.forEach(val1[0].value, function(values) {
                                //$("select.form-control.r_c_cols.r_c_cols"+ni+".r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                $("select.form-control.r_c_cols.r_c_cols"+ni+".r_c_cols_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                
                            });
                            $("select.form-control.r_c_cols.r_c_cols"+ni+".r_c_cols_"+list_index).select2("val","");
                            $(".nxtdd"+ni+".nxtdd_"+list_index).show();
                            $rootScope.scrollChatWindow();
                        }
                        else if(ni==dcount)
                        {
                            var multiop="";
                            var optk=0;
                            var val11=value;
                            ////console.log(val11);
                            _.forEach(val11.value, function(values) {
                                
                                var selectd="";
                                multiop += "<div class='col-md-12'>";
                                multiop += "<label>"+values.key+":"+values.value+"</label>";
                                if(val11.value_opt)
                                {
                                    /*selectd="<select ui-select2='{ allowClear: true}' class='form-control col_opts col_opts_"+list_index+"' dcount='"+dcount+"' data-key='"+values.key+"' data-value='"+values.value+"' data-index='"+list_index+"' datartype='"+response_type+"' data-journey='"+value.Journey_Name+"'>";
                                    _.forEach(val11.value_opt[optk].value, function(values2){
                                        selectd += "<option value='"+values2+"'>"+values2+"</option>";
                                    });
                                    selectd +="</select>";*/
                                }
                                
                                multiop += selectd;
                                multiop += "</div>";
                                optk++;
                            });
                            $(".ratecardresults"+list_index).hide();
                            $timeout(function(){
                                $(".ratecardresults"+list_index).show();
                            }, 500);
                            //$(".resetfilter"+list_index).show();
                            $(".rate-cardresults"+list_index).html(multiop);
                            $rootScope.scrollChatWindow();
                            //rate-cardresults
                        }
                        //$("select.r_c_op_"+list_index).val(value.value);
                        //$("select.r_c_op_"+list_index).select2('val',value.value);
                    }
                    else {
                        for(var k=0 ; k <= dcount-1 ; k++ )
                        {
                            $("select.r_c_cols.r_c_cols"+k+".r_c_cols_"+list_index).html("");
                            $("select.r_c_cols.r_c_cols"+k+".r_c_cols_"+list_index).val("");
                            $("select.r_c_cols.r_c_cols"+k+".r_c_cols_"+list_index).select2("val","");
                            var vals = value.options_list;
                            _.forEach(vals[k].value, function(values) {
                                
                                //$("select.r_c_cols.r_c_cols"+k+".r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                $("select.r_c_cols.r_c_cols"+k+".r_c_cols_"+list_index).append($("<option></option>").attr("value",values).text(values));
                            });
                        }
                        
                        
                    }
                    ////console.log(data.data.tiledlist[0].text);
                    if(data.data.tiledlist[0].Text != "-")
                    {
                        $rootScope.showMsgLoader = false;
                        // $rootScope.pushSystemMsg(0,data.data);
                        // $rootScope.showMsgLoader = false;
                        // $timeout(function(){
                        // 	var textspeech = data.data.tiledlist[0].Text;
                            
                            
                        // 	$.jStorage.set("texttospeak",textspeech);

                        // 	$('#mybtn_trigger').trigger('click');
                            
                        // },200);
                        
                        // return false;
                    }
                }
                var obj = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,session_id:$rootScope.session_id,user:$rootScope.empcode,user_input:coldata+"|"+rowdata,response:data.data.tiledlist[0],topic:topic2,Journey_Name:Journey_Name2,responsetype:value.type,inputDate:inputDate,outputDate:outputDate,respdiff:respdiff};
                //$rootScope.savehistory(obj);
            });
        });
    };
    $rootScope.ratecardSubmit2 = function(val1,val2,select_index,list_index,dcount,journey_name,response_type,options) {
        val1=val1.replace(new RegExp(';',"g"), '!@#');
        val2=val2.replace(new RegExp(';',"g"), '!@#');
        formData = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,user_input:val1+"|"+val2,auto_id:"",auto_value:"",type:"rate card",Journey_Name:journey_name,response_type:'rc_further_query',value:options};
        var inputDate = new Date();
        apiService.ratecardsubmit(formData).then(function (data){
            ////console.log(data);
            var outputDate   = new Date();
            var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
            angular.forEach(data.data.tiledlist, function(value, key) {
                    ////console.log(value);
                var topic2 = "";
                if(data.data.tiledlist[0].topic)
                    topic2 = data.data.tiledlist[0].topic;
                var Journey_Name2 = "";
                if(data.data.tiledlist[0].Journey_Name)
                    Journey_Name2 = data.data.tiledlist[0].Journey_Name;
                if(value.type=="rate card")
                {
                    //$(".ratecardresult_"+list_index+" span").text(data.data.tiledlist[0].value);
                    $(".ratecardcontinue"+list_index).show();
                    // $(".ratecardresult"+list_index).hide();
                    $(".ratecardresult"+list_index).show();
                    //$(".resetfilter"+list_index).show();
                    if(val1 !='' && val2 !='' && !options)
                    {
                        $("select.r_c_op_"+list_index).html("");
                        $("select.r_c_op_"+list_index).select2("val","");
                        _.forEach(value.options_list, function(values) {
                            $("select.r_c_op_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                        });
                        $("select.r_c_op_"+list_index).val(value.value);
                        $("select.r_c_op_"+list_index).select2('val',value.value);
                        $(".ratecardresult_"+list_index+" p span").text(value.value);
                    }
                    else {
                        //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).val(value.options_list[0]);
                        //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).val(value.options_list[1]);
                        $("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
                        //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).html("");
                        
                        
                        //$("select.r_c_op_"+list_index).html("");
                        //$("select.r_c_op_"+list_index).select2("val","");
                        var vals = value.options_list;
                        _.forEach(vals[0].value, function(values) {
                            ////console.log(values);
                            
                            $("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            //$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                        }); 
                        /*
                        _.forEach(vals[1].value, function(values) {
                            ////console.log(values);
                            
                            //$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            $("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                        }); 
                        $("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val","");*/
                        $("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val","");
                        
                    }
                    ////console.log(data.data.tiledlist[0].text);
                    if(data.data.tiledlist[0].Text != "-")
                    {
                        $rootScope.showMsgLoader = false;
                        // $rootScope.pushSystemMsg(0,data.data);
                        // $rootScope.showMsgLoader = false;
                        // $timeout(function(){
                        // 	var textspeech = data.data.tiledlist[0].Text;
                            
                            
                        // 	$.jStorage.set("texttospeak",textspeech);

                        // 	$('#mybtn_trigger').trigger('click');
                            
                        // },200);
                        
                        // return false;
                    }
                }
                var obj = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,session_id:$rootScope.session_id,user:$rootScope.empcode,user_input:coldata+"|"+rowdata,response:data.data.tiledlist[0],topic:topic2,Journey_Name:Journey_Name2,responsetype:value.type,inputDate:inputDate,outputDate:outputDate,respdiff:respdiff};
                //$rootScope.savehistory(obj);
            });
        });

    };
    $rootScope.delegationsubmit = function(sel_val,select_index,list_index,dcount,journey_name,response_type,options) {
        ////console.log("insdie delegation submit",sel_val);
        
        /*var values = [];
        var val_string = "";
        for(var i = 0 ; i <= select_index ; i++)
        {
            if(i==0)
                val_string = $("select.dele_m_"+i+".dele_m"+list_index).val();
            else 
                val_string =val_string+"|"+$("select.dele_m_"+i+".dele_m"+list_index).val();
            values.push($("select.dele_m_"+i+".dele_m"+list_index).val());
            if(i<dcount)
            {
                var nextindex = select_index;
                nextindex++;
                $("select.dele_m_"+nextindex+".dele_m"+list_index).html("");
                $("select.dele_m_"+nextindex+".dele_m"+list_index).select2("val","");
            }
        }*/
        ////console.log(values,'options');
        
        
    sel_val=sel_val.replace(new RegExp(';',"g"), '!@#');
    //console.log(sel_val);
    formData = {context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,user_input:sel_val,auto_id:"",auto_value:"",type:"rate card",Journey_Name:journey_name,response_type:'rc_further_query',value:options};
    //formData1 = {department:$rootScope.department,user: $rootScope.empcode,context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,Journey_Name:Journey_Name,options_dm:options};
        apiService.outmatrix(formData).then(function (resdata){
            ////console.log(resdata);
            $rootScope.session_object = resdata.data.session_object;
            
            angular.forEach(resdata.data.tiledlist, function(value, key) {
                ////console.log(value);
                /*if(value.type=="Delegation Matrix")
                {
                    var ni = select_index+1;
                    if(ni < dcount)
                    {
                        //if(ni)
                            ////console.log("11st loop",list_index);
                        ////console.log("11st ni",ni);
                        _.forEach(value.options_list, function(values) {
                            ////console.log(values);
                            //$("select.form-control.dele_m.dele_m_"+ni+".dele_m"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            $("select.form-control.dele_m.dele_m_"+ni+".dele_m"+list_index).append($("<option></option>").attr("value",values).text(values));
                            //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                        }); 
                    }
                    else {
                        ////console.log("2nd loop");
                        var table="";
                        var trdata="";
                        table +="<table class='table table-bordered'>";
                        
                        trdata +="<tr>";
                        
                        table+="<th>"+values[dcount-1]+"</th>";
                        table+="</tr>";
                        trdata+="<tr><td>"+value.value+"</td></tr>";
                        table+=trdata; 
                        table +="</table>";
                        $(".delresponse"+list_index).html(table);
                        
                    }
                }*/
                if(value.type=="Delegation Matrix")
                {
                    //console.log(select_index);
                    $rootScope.chatlist[list_index].slidervalues=[];
                    //if(value.options_list[0] && value.options_list[0].key=='Value'){
                    //if(value.options_list[0] && value.options_list[0].key=='Value')
                    if(select_index ==  dcount-2)
                    {
                        ////console.log("--------------------inside key==value");
                        $rootScope.delegationSlider = {
                            value:0,
                            options: {
                                floor:_.min(value.options_list[0].value),
                                ceil:_.max(value.options_list[0].value),
                                stepsArray:value.options_list[0].value,
                                onEnd: function() {

                                    var sliderRowIndex=parseInt($('.rzslider').attr('rowIndex'));
                                    var sliderCharRes = JSON.parse($('.rzslider').attr( 'chatRes' ))
                                    $rootScope.submitmatrix(sliderRowIndex ,sliderCharRes);
                                    ////console.log("slider value chanaged");
                                }
                            },
                        };
                        
                        $rootScope.chatlist[list_index].slideroption = {
                            //value:0,
                            value:value.options_list[0].value[0],
                            options: {
                                //floor:_.min(value.options_list[0].value),
                                //ceil:_.max(value.options_list[0].value),
                                floor:(value.options_list[0].value[0]),
                                ceil:(value.options_list[0].value[value.options_list[0].value.length-1]),
                                //showTicksValues:true,
                                showTicks:true,
                                stepsArray:value.options_list[0].value,
                                onEnd: function() {

                                    var sliderRowIndex=parseInt($('.rzslider').attr('rowIndex'));
                                    var sliderCharRes = JSON.parse($('.rzslider_m_'+list_index).attr( 'chatRes' ))
                                    $rootScope.submitmatrix(list_index ,sliderCharRes);
                                    ////console.log("slider value chanaged");
                                }
                            },
                        };
                          $timeout(function() {
                            $scope.$broadcast('rzSliderForceRender');
                            $timeout(function(){
                                ////console.log("loaded slider");
                                $rootScope.submitmatrix(list_index ,resdata.data.tiledlist[0]);
                            },2000);
                          },1000);
                        
                    }
                    //$(".ratecardresult_"+list_index+" span").text(data.data.tiledlist[0].value);
                    //$(".ratecardcontinue"+list_index).show();
                    
                    var ni = select_index+1;
                    
                    if(!options)
                    {
                        ////console.log("inside 1")
                        if(ni<dcount)
                        {
                            ////console.log("inside 2");
                            $(".matrixresults"+list_index).hide();
                            var ni = select_index+1;
                            //$("select.r_c_op_"+list_index).html("");
                            //$("select.r_c_op_"+list_index).select2("val","");
                            var val1 = value.options_list;
                            _.forEach(val1[0].value, function(values) {
                                //$("select.form-control.r_c_cols.r_c_cols"+ni+".r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                $("select.form-control.dele_m.dele_m"+ni+".dele_m_"+list_index).append($("<option></option>").attr("value",values).text(values));
                                
                            });
                            $("select.form-control.dele_m.dele_m"+ni+".dele_m_"+list_index).select2("val","");
                            $(".nxtdd"+ni+".nxtdd_"+list_index).show();
                            //$rootScope.scrollChatWindow();
                        }
                        else if(ni==dcount)
                        {
                            var multiop="";
                            var optk=0;
                            var val11=value;
                            $rootScope.chatlist[list_index].slidervalues=val11.value;
                            ////console.log(val11,"------------------------val11")
                            _.forEach(val11.value, function(values) {
                                if(values.key=='Text'){
                                
                                

                                /*(if(val11.value_opt)
                                {
                                    selectd="<select ui-select2='{ allowClear: true}' class='form-control col_opts col_opts_"+list_index+"' dcount='"+dcount+"' data-key='"+values.key+"' data-value='"+values.value+"' data-index='"+list_index+"' datartype='"+response_type+"' data-journey='"+value.Journey_Name+"'>";
                                    _.forEach(val11.value_opt[optk].value, function(values2){
                                        selectd += "<option value='"+values2+"'>"+values2+"</option>";
                                    });
                                    selectd +="</select>";
                                }*/
                                
                                //multiop += selectd;
                                // multiop += "</div>";
                                }
                                else{

                                
                                    var selectd="";
                                    multiop += "<div class='col-md-12'>";
                                    multiop += "<label>"+values.Role+"</label>";
                                    
                                    /*(if(val11.value_opt)
                                    {
                                        selectd="<select ui-select2='{ allowClear: true}' class='form-control col_opts col_opts_"+list_index+"' dcount='"+dcount+"' data-key='"+values.key+"' data-value='"+values.value+"' data-index='"+list_index+"' datartype='"+response_type+"' data-journey='"+value.Journey_Name+"'>";
                                        _.forEach(val11.value_opt[optk].value, function(values2){
                                            selectd += "<option value='"+values2+"'>"+values2+"</option>";
                                        });
                                        selectd +="</select>";
                                    }*/
                                    
                                    //multiop += selectd;
                                    multiop += "</div>";
                                }
                                optk++;
                            });
                            $(".matrixresults"+list_index).show();
                                //$(".resetfilter"+list_index).show();
                            //$(".matrix-result"+list_index).html(multiop);
                        
                            
                            //$rootScope.scrollChatWindow();
                            //rate-cardresults
                        }
                        //$("select.r_c_op_"+list_index).val(value.value);
                        //$("select.r_c_op_"+list_index).select2('val',value.value);
                    }
                    else {
                        for(var k=0 ; k <= dcount-1 ; k++ )
                        {
                            $("select.dele_m.dele_m"+k+".dele_m_"+list_index).html("");
                            $("select.dele_m.dele_m"+k+".dele_m_"+list_index).val("");
                            $("select.dele_m.dele_m"+k+".dele_m_"+list_index).select2("val","");
                            var vals = value.options_list;
                            _.forEach(vals[k].value, function(values) {
                                
                                //$("select.r_c_cols.r_c_cols"+k+".r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                                $("select.dele_m.dele_m"+k+".dele_m_"+list_index).append($("<option></option>").attr("value",values).text(values));
                            });
                        }
                        
                        
                    }
                    ////console.log(data.data.tiledlist[0].text);
                    if(resdata.data.tiledlist[0].Text != "-")
                    {
                        $rootScope.showMsgLoader = false;
                        // $rootScope.pushSystemMsg(0,data.data);
                        // $rootScope.showMsgLoader = false;
                        // $timeout(function(){
                        // 	var textspeech = data.data.tiledlist[0].Text;
                            
                            
                        // 	$.jStorage.set("texttospeak",textspeech);

                        // 	$('#mybtn_trigger').trigger('click');
                            
                        // },200);
                        
                        // return false;
                    }
                }
            });
        }).catch(function(reason){
            //console.log(reason);
        });
    };
    $rootScope.getmatrixdata=function(select_index,Journey_Name,list_index,dcount) {
        //console.log("get matrix data");
        var values = [];
        var val_string = "";
        for(var i = 0 ; i <= select_index ; i++)
        {
            if(i==0)
                val_string = $("select.dele_m_"+i+".dele_m"+list_index).val();
            else 
                val_string =val_string+"|"+$("select.dele_m_"+i+".dele_m"+list_index).val();
            values.push($("select.dele_m_"+i+".dele_m"+list_index).val());
            if(i<dcount)
            {
                var nextindex = select_index;
                nextindex++;
                $("select.dele_m_"+nextindex+".dele_m"+list_index).html("");
                $("select.dele_m_"+nextindex+".dele_m"+list_index).select2("val","");
            }
        }
        ////console.log(values,'options');
        formData1 = {department:$rootScope.department,user: $rootScope.empcode,context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,Journey_Name:Journey_Name,options_dm:val_string};
        apiService.outmatrix(formData1).then(function (resdata){
            $rootScope.session_object = resdata.data.session_object;
            angular.forEach(resdata.data.tiledlist, function(value, key) {
                if(value.type=="matrix")
                {
                    var ni = select_index+1;
                    if(ni < dcount)
                    {
                        //if(ni)
                            ////console.log("11st loop",list_index);
                        ////console.log("11st ni",ni);
                        _.forEach(value.options_list, function(values) {
                            ////console.log(values);
                            //$("select.form-control.dele_m.dele_m_"+ni+".dele_m"+list_index).append("<option value='"+values+"'>"+values+"</option>");
                            $("select.form-control.dele_m.dele_m_"+ni+".dele_m"+list_index).append($("<option></option>").attr("value",values).text(values));
                            //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                        }); 
                    }
                    else {
                        ////console.log("2nd loop");
                        var table="";
                        var trdata="";
                        table +="<table class='table table-bordered'>";
                        
                        trdata +="<tr>";
                        
                        table+="<th>"+values[dcount-1]+"</th>";
                        table+="</tr>";
                        trdata+="<tr><td>"+value.value+"</td></tr>";
                        table+=trdata; 
                        table +="</table>";
                        $(".delresponse"+list_index).html(table);
                        
                    }
                }
            });
        });
    };
    $rootScope.getmatrix = function(id,value) {
        //console.log("get matrix");
        $(".fdashboard").hide();
        var prevmsg = value;
        var mysessiondata = {};
        //mysessiondata = mysessiondata.toObject();
        //mysessiondata.data = {id:parseInt(id),Text:value};
        //mysessiondata.data = {id:id,Text:value};
        sess2 = {id:id,Text:value};
        $rootScope.script_data=[];
        $rootScope.tabvalue.elements = [];
        $rootScope.tabvalue.element_values=[];
        ////console.log(mysessiondata);
        //$rootScope.formData = mysessiondata;
        ////console.log($rootScope.session_id);
        var jformData= { Journey_Name:value };
        apiService.getdropdowncount(jformData).then(function (data){
            $rootScope.showMsgLoader=false;
            if(data.data.data)
            {
                var opt = new Array();
                formData1 = {department:$rootScope.department,user: $rootScope.empcode,context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,Journey_Name:value,options_dm:"",user_input:value,auto_id:"",auto_value:""};
                var new_object = $.extend({}, mysessiondata, formData1);
                //$.extend(formData1, mysessiondata);
                formData = new_object;
                ////console.log(formData);
                $timeout(function(){
                    $(".chatinput").val("");
                });
                
                var inputDate = new Date();
                
                // io.socket.on('user', function gotHelloMessage (data) {
                // //console.log('User alert!', data);
                // });
                //io.socket.get('/Livechat/addconv');
                
                apiService.outmatrix(formData1).then(function (resdata){
                    $rootScope.session_object = resdata.data.session_object;
                    angular.forEach(resdata.data.tiledlist, function(value, key) {
                    ////console.log(value);
                        if(value.type=="matrix")
                        {
                            ////console.log(data.data.tiledlist[0].text);
                            
                            
                            //return false;
                            var c = data.data.data.dim_cols+data.data.data.dim_rows;
                            var automsg = {
                                type: "delegation_matrix",
                                firstdata:value.options_list,
                                dcount:c,
                                drdata:data.data.data
                                //journeydata:data.data.data
                            };
                            resdata.data.tiledlist[0].firstdata=value.options_list;
                            resdata.data.tiledlist[0].dcount=c;
                            resdata.data.tiledlist[0].drdata=data.data.data;
                            /*$rootScope.chatlist.push({
                                id: id,
                                msg: automsg,
                                position: "left",
                                curTime: $rootScope.getDatetime()
                            });*/
                            $rootScope.pushSystemMsg(0,resdata.data);
                            var cl = $rootScope.chatlist.length-1;
                            $timeout(function(){
                                _.forEach(value.options_list, function(values) {
                                    //$("select.dele_m_0.dele_m"+cl).append("<option value='"+values+"'>"+values+"</option>");
                                    $("select.dele_m_0.dele_m"+cl).append($("<option></option>").attr("value",values).text(values));
                                    //$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
                                });
                            },1000);
                             
                            $rootScope.showMsgLoader = false;
                            $timeout(function () {
                                $rootScope.autocompletelist = [];
                            }, 1000);
                        }
                    });
                });
            }
        });
    };
    $scope.htmlformsubmit = function(formname,formdata,fieldvalue,rowindex,Journey_Name,tiledlist,faqindex) {
        ////console.log(formdata,"formdata");
        // //console.log(formname,"formname");
        ////console.log(fieldvalue,"fieldvalue");
        var valid = 1;
        var fd1 = {};
        angular.forEach(formdata, function(value, key) {
            ////console.log(value);
            
            if(value.name=='mobile' || value.name=='mobileno' || value.name=='phone' || value.name=='phoneno') {
                if(fieldvalue[value.name].length == 10) {}
                else {
                    toastr.error("Please enter 10 digit mobile number", 'Error');
                    return false;
                }
            }
            if(value.type=='date')
            {
                ////console.log(fieldvalue[value.name]);
                var datevalue = fieldvalue[value.name];
                var dt = new Date(fieldvalue[value.name]);
                var date = dt.getDate();
                var month = dt.getMonth();
                var year = dt.getFullYear();
                month= month+1;
                if (month.toString().length == 1) {
                    month = "0" + month
                }
                if (date.toString().length == 1) {
                    date = "0" + date
                }
                var dob= date.toString() + "-" + month.toString() + "-" +year.toString();
                //fieldvalue[value.name]=dob;
                fd1[value.name]=dob;
                /*var today = new Date();
                if(dt.withoutTime() < (today.withoutTime()))
                {
                    valid = 0;
                    alert("Please Enter Valid Date");
                    //return false;
                }*/
                
            }
            else if(value.type=='file')
                fd1[value.name]=$scope.uploadimages;
            else 
                fd1[value.name]=fieldvalue[value.name];
        });
        ////console.log(tiledlist.Type);
        if(tiledlist.Type=="Calculators")
        {
            var formData1 = {tiledlist:tiledlist,Journey_Name:Journey_Name,context_id: $rootScope.context_id,
            conversation_id: $rootScope.conversation_id,customer_name:$rootScope.fname,customer_id:$rootScope.email,user_input:"",csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),auto_id:"",auto_value:"",user_id:$rootScope.session_id,form_name:formname};
            var mergedObject = angular.extend(formData1, fd1);
            apiService.calculate(mergedObject).then(function (data) {
                ////console.log(data);
                if(data.data.data)
                {
                    $(".calc_res"+rowindex+"_"+faqindex+" p").html(data.data.data);
                }
            });
        }
        else if(valid == 1) {
        var formData1 = {Journey_Name:Journey_Name,context_id: $rootScope.context_id,
            conversation_id: $rootScope.conversation_id,customer_name:$rootScope.fname,customer_id:$rootScope.email,user_input:"",csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),auto_id:"",auto_value:"",user_id:$rootScope.session_id,form_name:formname};

        var mergedObject = angular.extend(formData1, fd1);
        if(tiledlist.stage_details) {
            mergedObject.DTHlink = tiledlist.stage_details.DT[0];
            mergedObject.DTHstage = tiledlist.stage_details.Stage;
            mergedObject.Journey_Name = tiledlist.stage_details.Journey_Name;
            mergedObject.tiledlist = angular.copy(tiledlist);
            apiService.getDthlinkRes(mergedObject).then( function (response) {

                if(response.data.session_object)
                    $rootScope.session_object = response.data.session_object;
                angular.forEach(response.data.tiledlist, function(value, key) {
                    console.log(value);
                    if(value.type=="DTHyperlink")
                    {
                        // if($scope.uploadimages.length>0)
                        //     response.data.tiledlist[0]['uploadimages']=$scope.uploadimages;
                        $scope.uploadimages=[];
                        $rootScope.DthResponse(0,response.data);
                        console.log(response.data);
                    }
                    if(value.type=="order_status")
                    {
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    if(value.type=="text")
                    {
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    if(value.type=="html_form")
                    {
                        response.data.tiledlist[0].form_data.DTHlink = response.data.tiledlist[0].stage_details.DT[0];
                        response.data.tiledlist[0].form_data.DTHstage = response.data.tiledlist[0].stage_details.Stage;
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    $rootScope.showMsgLoader = false;
                });
            });
        }
        ////console.log(mergedObject);
        //$.jStorage.get("DT");
        //$.jStorage.get("Stage");
        /*
        if($.jStorage.get("DT") && $.jStorage.get("DT") != '')
        {
            mergedObject['DTHlink'] = $.jStorage.get("DT");
            mergedObject['DTHstage'] = $.jStorage.get("Stage");
            apiService.getDthlinkRes(mergedObject).then( function (response) {
                $rootScope.session_object = response.data.session_object;
                angular.forEach(response.data.tiledlist, function(value, key) {
                    if(value.type=="DTHyperlink")
                    {
                        if($scope.uploadimages.length>0)
                            response.data.tiledlist[0]['uploadimages']=$scope.uploadimages;
                        $scope.uploadimages=[];
                        $rootScope.DthResponse(0,response.data);
                        //console.log(response.data);
                    }
                    if(value.type=="order_status")
                    {
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    if(value.type=="text")
                    {
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    if(value.type=="html_form")
                    {
                        response.data.tiledlist[0].form_data.DTHlink = response.data.tiledlist[0].stage_details.DT[0];
                        response.data.tiledlist[0].form_data.DTHstage = response.data.tiledlist[0].stage_details.Stage;
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    $rootScope.showMsgLoader = false;
                });
            });
        }
    
        else if(formdata.DTHstage || formdata.DTHstage != '')
        {
            mergedObject['DTHlink'] = formdata.DTHlink;
            mergedObject['DTHstage'] = formdata.DTHstage;
            apiService.getDthlinkRes(mergedObject).then( function (response) {
                $rootScope.session_object = response.data.session_object;
                angular.forEach(response.data.tiledlist, function(value, key) {
                    if(value.type=="DTHyperlink")
                    {
                        if($scope.uploadimages.length>0)
                            response.data.tiledlist[0]['uploadimages']=$scope.uploadimages;
                        $scope.uploadimages=[];
                        $rootScope.DthResponse(0,response.data);
                        //console.log(response.data);
                    }
                    if(value.type=="order_status")
                    {
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    if(value.type=="text")
                    {
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    if(value.type=="html_form")
                    {
                        response.data.tiledlist[0].form_data.DTHlink = response.data.tiledlist[0].stage_details.DT[0];
                        response.data.tiledlist[0].form_data.DTHstage = response.data.tiledlist[0].stage_details.Stage;
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    $rootScope.showMsgLoader = false;
                });
            });
        }*/
        else {
            apiService.htmlformsubmit(mergedObject).then( function (response) {
                $rootScope.session_object = response.data.session_object;
                angular.forEach(response.data.tiledlist, function(value, key) {
                    if(value.type=="DTHyperlink")
                    {
                        $rootScope.DthResponse(0,response.data);
                    }
                    if(value.type=="order_status")
                    {
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    if(value.type=="text")
                    {
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    if(value.type=="html_form")
                    {
                        response.data.tiledlist[0].form_data.DTHlink = response.data.tiledlist[0].stage_details.DT[0];
                        response.data.tiledlist[0].form_data.DTHstage = response.data.tiledlist[0].stage_details.Stage;
                        $rootScope.pushSystemMsg(0,response.data);
                    }
                    $rootScope.showMsgLoader = false;
                });
            });
        }
        }
    };
    $scope.getfailuremsg = function() {
        //$scope.lastfailure
        //$scope.failuremsg
        var msgindex=_.findIndex($scope.failuremsg, function(o) { return o.msg == $scope.lastfailure.msg; });
        ////console.log($scope.lastfailure,"lastmsg");
        ////console.log(msgindex,"msgindex");
        if(msgindex == -1) {
            $scope.lastfailure=$scope.failuremsg[0];
            return $scope.failuremsg[0];
        }
        else {
            if($scope.failuremsg.length-1 == msgindex) {
                $scope.lastfailure=$scope.failuremsg[0];
                return $scope.failuremsg[0];
            }
            else {
                $scope.lastfailure=$scope.failuremsg[msgindex+1];
                return $scope.failuremsg[msgindex+1];
            }
        }
    };
    
    $rootScope.showDT = function(rowindex) {
        $(".viewprocess"+rowindex).hide();
        $(".dts"+rowindex).show();
    };
    $rootScope.faqtoggle = function(rowindex) {
        $(".faqmore"+rowindex).hide();	
        $(".viewquesans"+rowindex).show();
    };
    $rootScope.getSystemMsg = function(id,value){
        ////console.log("id",id);
        //CsrfTokenService.getCookie("csrftoken").then(function(token) {
            //$rootScope.formData = {user_id:1164,user_input:value,auto_id:parseInt(id),auto_value:value,'csrfmiddlewaretoken':token};
        //var mysessiondata = $.jStorage.get("sessiondata");
        ////console.log($rootScope.idletime,"idle time");
        var cl = $rootScope.chatlist.length-1;
        $scope.tablistpr=0;
		$rootScope.outprocessclick=0;
        $rootScope.fstabs = [];
        $rootScope.fstabvalue =[];
        $rootScope.outprocessjourney="";
        $rootScope.outprocessjourneylist=[];
        $(".fdashboard").hide();
        $(".fspanel").hide();
        $rootScope.seeallTopic();
		$rootScope.scrollprocess();
        $("ul.nav.nav-list.tree").hide();
        $('span.thumbsdown').css("color", "#036");
        $('.thumbsup').css("color", "#036");
        $rootScope.idleflag=1;
        Idle.setTimeout($rootScope.idletime);
        Idle.watch();
        $rootScope.idlestart=false;
        $(".fdashboard").hide();
        var prevmsg = value;
        var chargefound=false;
        chrgstr = prevmsg.toLowerCase();
        chrgarr = chrgstr.split(" ");
		var i_ind = $rootScope.chatlist[$rootScope.chatlist.length-1].id;
		////console.log(chrgarr);
		if(chrgstr.includes('General schedule of features & charges') || chrgstr.includes('gsfc') || chrgstr.includes('gsfc final'))
			chargefound=false;
		else if(chrgstr.includes('average monthly balance') ) {
			////console.log("inside amb");
			chargefound=true;
		}
		else if(chrgstr.includes('minimum balance') || chrgstr.includes('min balance') || chrgstr.includes('min bal')) {
			////console.log("inside amb");
			chargefound=true;
		}
		else {
			c_index=_.findIndex(chrgarr, function(o) { return o == 'charges' || o == 'charge' || o == 'chrg' ||  o == 'chrgs' || o=='amb'; });
			//if((chrgstr.includes("charges ") || chrgstr.includes(" charges") || chrgstr.includes(" charges ") || chrgstr.includes("charge ") || chrgstr.includes(" charge") || chrgstr.includes(" charge ") || chrgstr.includes(" chrg") || chrgstr.includes(" chrg ") || chrgstr.includes(" chrgs") || chrgstr.includes(" chrgs ")) && id !='SYS_CHARGE_JOURNEY') 
			if(c_index > -1)
			{
				////console.log("inside amb");
				chargefound=true;
			}
		}
        if(chrgarr.length == 1) {
            if(chrgarr[0]=="logout" || chrgarr[0]=="close" || chrgarr[0]=="exit" || chrgarr[0]=="signout") {
                $rootScope.logout();
                return false;
            }
            
        }
        ////console.log(chargefound);
        var mysessiondata = {};
            //mysessiondata = mysessiondata.toObject();
            //mysessiondata.data = {id:parseInt(id),Text:value};
            //mysessiondata.data = {id:id,Text:value};
            sess2 = {id:id,Text:value};
            $rootScope.script_data=[];
            $rootScope.tabvalue.elements = [];
            $rootScope.tabvalue.element_values=[];
            ////console.log(mysessiondata);
            //$rootScope.formData = mysessiondata;
            ////console.log($rootScope.session_id);
            formData1 = {department:$rootScope.department,user: $rootScope.empcode,context_id: $rootScope.context_id,conversation_id: $rootScope.conversation_id,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id,user_input:value,auto_id:id,auto_value:$rootScope.autolistvalue};
            var new_object = $.extend({}, mysessiondata, formData1);
            //$.extend(formData1, mysessiondata);
            $rootScope.formData = new_object;
            $timeout(function(){
                $(".chatinput").val("");
            });
            
            var inputDate = new Date();
            
            // io.socket.on('user', function gotHelloMessage (data) {
            // //console.log('User alert!', data);
            // });
            //io.socket.get('/Livechat/addconv');
            /*if($rootScope.department == undefined || $rootScope.department == null ){//
                var msg3 = {Text:"You are not authorized to query this bot since you are not mapped to any department. Please connect with the system admin",type:"SYS_EMPTY_RES"};
                $rootScope.pushSystemMsg(0,msg3); 
                $timeout(function() {
                    $rootScope.showMsgLoader = false;
                },500);
                
            }
            else*/
            {
                
            apiService.getnewquestion({user_input:value.toLowerCase()}).then(function (unansdata){
                if(unansdata.data.data)
                    $rootScope.formData.user_input=unansdata.data.data.query;
                $timeout(function(){
                    
                
                    apiService.getSysMsg($rootScope.formData).then(function (data){
                        ////console.log(data);
                        // Do your operations
                        $rootScope.session_object = data.data.session_object;
                        var outputDate   = new Date();
                        var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                        // var ci_t = data.data.data;
                        // var a = ci_t.toString().replace(" ", "+");
                        // var b=a.replace(" ", "+");
                        // var bytes = CryptoJS.AES.decrypt((b),$rootScope.FRONTEND_ENC_KEY);
                        // // //console.log(ciphertext);
                        // //console.log(bytes);
                        // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                        //  //console.log(decryptedData);
                        var ogdata=data;
                        decryptedData = data.data;
                        data = decryptedData;
                            if(decryptedData.tiledlist[0].topic)
                                 $("#topic").text(decryptedData.tiledlist[0].topic);
                        data.prevmsg = prevmsg;
						var unanstag = 0;
                        angular.forEach(decryptedData.tiledlist, function(value, key) {
                            ////console.log(value);
							if(value.unanswered) {
								unanstag=1;
							}
                            if(value.type=="text")
                            { 
                                ////console.log(data.data.tiledlist[0].text);
                                $rootScope.showMsgLoader = false;

                                if(decryptedData.tiledlist[0].Text == "Sorry, I could not understand.")
                                {

                                    //console.log("----------------connecting live agent--------------");
                                    $scope.noRephrase=$scope.noRephrase+1;
                                   /*if($scope.noRephrase>1){
                                    $scope.liveChat(obj, cl);
                                   }*/ // live_chat_comment
                                    /*if(io.socket.isConnected())
                                    {
                                        io.socket.get('/user', function (users){
                                            Idle.unwatch();
                                            var newuser = _.remove(users, function(n) {
                                                return n.access_role  == 'maker-livechat' && n.id!=null && n.livechat=='1';
                                            });
                                            ////console.log(newuser,"lvie agents");
                                            if(newuser.length > 0)
                                            {
                                                $rootScope.agentconnected = true;
                                                if($rootScope.agentconnected)
                                                {
                                                    $rootScope.sendMsgtoagent(sess2.Text);
                                                    var outputDate   = new Date();
                                                    var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                                                    //var obj = {conversationid:$rootScope.conversationid,livechat:1,session_id:$rootScope.session_id,user:$rootScope.email,user_input:prevmsg,response:{},topic:"",Journey_Name:"",responsetype:"",inputDate:inputDate,outputDate:outputDate,respdiff:respdiff};
                                                    //$rootScope.savehistory(obj);
                                                }
                                                //obj.livechat=1;
                                                //$rootScope.savehistory(obj);
                                            }
                                            else
                                            {
                                                $rootScope.agentconnected = false;
                                                
                                            }
                                        });
                                    }*/
                                }
                                if(decryptedData.tiledlist[0].Text == "Sorry, I could not understand.") {
                                    //var fmsg = $scope.getfailuremsg();
                                    //decryptedData.tiledlist[0].Text=fmsg.msg;
									
                                    if(chargefound) {
                                        //$scope.askchargej(prevmsg,decryptedData);
                                        $rootScope.getSystemMsg('',"GSFC Final");
                                    }
                                    else {
                                        var fmsg = $scope.getfailuremsg();
                                        decryptedData.tiledlist[0].Text=fmsg.msg;
                                        $rootScope.pushSystemMsg(0,decryptedData);
                                    }
                                }
								else if(decryptedData.tiledlist[0].Text == "Please elaborate further to get a response.")
								{
									if(chargefound) {
										$scope.askchargej(prevmsg,decryptedData);
									}
									else
										$rootScope.pushSystemMsg(0,decryptedData);
								}
								else if(chargefound) {
									$scope.askchargej(prevmsg,decryptedData);
								}
                                else {
									
                                    $rootScope.pushSystemMsg(0,decryptedData);
								}
                                $rootScope.showMsgLoader = false;
                                $scope.showprocessdata(ogdata);
                                /*$timeout(function(){
                                    var textspeech = decryptedData.tiledlist[0].Text;
                                    
                                    
                                    $.jStorage.set("texttospeak",textspeech);

                                    $('#mybtn_trigger').trigger('click');
                                    
                                },200);
                                */
                                //return false;
                            }
                            if (value.type == "html_form") {
                                //$rootScope.pushSystemMsg(0, decryptedData);
								if(chargefound) {
									$scope.askchargej(prevmsg,decryptedData);
								}
                                else {
									$rootScope.pushSystemMsg(0,decryptedData);
								}
                                $rootScope.showMsgLoader = false;
                            }
                            if(value.type=="rate card")
                            {
								if(chargefound) {
									$scope.askchargej(prevmsg,decryptedData);
								}
                                else {
									$rootScope.pushSystemMsg(0,decryptedData);
								
									//$rootScope.pushSystemMsg(0,decryptedData);
									$rootScope.showMsgLoader = false;
									
									// $(".r_c_col").val($(".r_c_col option:first").val());
									// $(".r_c_row").val($(".r_c_row option:first").val());

									// var firstOption = $('.r_c_col option:first');
									// firstOption.attr('selected', true);
									// $('.r_c_col').attr('selectedIndex', 0);
									
									$timeout(function(){
										if(value.no_drop==2 && value.dynamic==0)
										{
											var list_index = $rootScope.chatlist.length-1;
											var val1 = value.options_list;
											//var val1 = value.options_list;
											$("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
											$("select.r_c_col.r_c_col1.r_c_col_"+list_index).html("");
											
											
											$("select.r_c_op_"+list_index).html("");
											$("select.r_c_op_"+list_index).select2("val","");
											_.forEach(val1[0].value, function(values) {
												////console.log(values);
												
												//$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
												$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
												
												
												
												//$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
												//$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
											}); 
											_.forEach(val1[1].value, function(values) {
												////console.log(values);
												
												//$("select.r_c_col.r_c_col0.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
												
												
												
												$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append($("<option></option>").attr("value",values).text(values));
												//$("select.r_c_col.r_c_col1.r_c_col_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
												
												
												
												
												
												
												//$("select.dele_m_"+select_index+".dele_m"+list_index).select2('data', {id: value, text: value});
											}); 
											
											if(val1[0].value.length > 1)
												$("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val","");
											else
												$("select.r_c_col.r_c_col0.r_c_col_"+list_index).select2("val",val1[1].value[0]);
											if(val1[1].value.length > 1)
												$("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val","");
											else
												$("select.r_c_col.r_c_col1.r_c_col_"+list_index).select2("val",val1[1].value[0]);
										}	
										else if(value.dynamic==1 ){
											var list_index = $rootScope.chatlist.length-1;
											var val1 = value.options_list;
											$("select.r_c_col.r_c_col0.r_c_col_"+list_index).html("");
											
											_.forEach(val1[0].value, function(values) {
												////console.log(values);
												$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append($("<option></option>").attr("value",values).text(values));
												//$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
												
											});
										}
										/*$('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
										$('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
										$("select.r_c_col:last").trigger('change');
										$("select.r_c_row:last").trigger('change');*/
									},1000);
									$scope.showprocessdata(ogdata);
								}
                                //return false;
                            }
                            if(value.type=="Delegation Matrix")
                            {
								if(chargefound) {
									$scope.askchargej(prevmsg,decryptedData);
								}
                                else {
									$rootScope.pushSystemMsg(0,decryptedData);
								
									//$rootScope.pushSystemMsg(0,decryptedData);
									$rootScope.showMsgLoader = false;
									
									// $(".r_c_col").val($(".r_c_col option:first").val());
									// $(".r_c_row").val($(".r_c_row option:first").val());

									// var firstOption = $('.r_c_col option:first');
									// firstOption.attr('selected', true);
									// $('.r_c_col').attr('selectedIndex', 0);
									
									$timeout(function(){
										if(value.dynamic==1 ){
											var list_index = $rootScope.chatlist.length-1;
											var val1 = value.options_list;
											$("select.dele_m.dele_m0.dele_m_"+list_index).html("");
											
											_.forEach(val1[0].value, function(values) {
												////console.log(values);
												$("select.dele_m.dele_m0.dele_m_"+list_index).append($("<option></option>").attr("value",values).text(values));
												//$("select.r_c_cols.r_c_cols0.r_c_cols_"+list_index).append("<option value='"+values+"'>"+values+"</option>");
												
											});
											$("select.dele_m.dele_m0.dele_m_"+list_index).select2('val',"");
										}
										/*$('select.r_c_col:last option:nth-child(2)').attr("selected", "selected");
										$('select.r_c_row:last option:nth-child(2)').attr("selected", "selected");
										$("select.r_c_col:last").trigger('change');
										$("select.r_c_row:last").trigger('change');*/
										
									},1000);
									$scope.showprocessdata(ogdata);
								}
                                //return false;
                            }
                            else if(value.type=="DTHyperlink")
                            {
                                $rootScope.showMsgLoader = false;
                                if((!_.has(value,'DT')) && (!_.has(value,'Process')) && (!_.has(value,'Text')) && (!_.has(value,'Script')) && (!_.has(value,'FAQ')))
									unanstag=1;
								
								if(chargefound) {
                                    $scope.askchargej(prevmsg,decryptedData);
                                }
                                else									
                                    $rootScope.DthResponse(0,decryptedData,'');
                                
                               /*$timeout(function(){
                                    var textspeech = decryptedData.tiledlist[0].Text;
                                    _.each(decryptedData.tiledlist[0].DTHyperlink,function(v,k){
                                        textspeech += v;
                                    });
                                    $.jStorage.set("texttospeak",textspeech);

                                    $('#mybtn_trigger').trigger('click');
                                    
                                },200);*/
                            }
                            if(value.type=="top_search")
                            {
                                $rootScope.pushSystemMsg(0,decryptedData);
                                $rootScope.showMsgLoader = false;
                            }
                            else if(value.type=="Instruction")
                            {
                                
                               $rootScope.InstructionResponse(0,decryptedData);  
                               
                            }
                            if(value.type=="product listing")
                            {
								if(chargefound) {
									$scope.askchargej(prevmsg,decryptedData);
								}
                                else {
									//$rootScope.pushSystemMsg(0,decryptedData);
									
									apiService.getproductlisting({Journey_Name:decryptedData.tiledlist[0].Journey_Name}).then(function (imagedata){
										decryptedData.tiledlist[0].product_list=imagedata.data.data;
										$rootScope.pushSystemMsg(0,decryptedData);
										cl =$rootScope.chatlist.length-1;
										$rootScope.showMsgLoader = false;
										$timeout(function(){
										$('.carousel').carousel({
											interval: false,
											wrap: false
										});
										
										$('.carousel').find('.item').first().addClass('active');
											/*$("a.fancyboxable").fancyboxPlus({
												openEffect: 'fade',
												closeEffect: 'fade',
												closeBtn: true,
												padding: 0,
												helpers: {
													media: {}
												},
												overlayColor:'#000',
												titlePosition:'inside'
											});*/
											$("#myCarousel"+cl).show();
											$("#myCarousel"+cl+" .img-box2 a").attr("data-fancybox","imggroup"+cl);
										},2000);
										$scope.showprocessdata(ogdata);
									});
								}
                                //return false;
                            }
                            var topic2 = "";
                            if(decryptedData.tiledlist[0].topic)
                                topic2 = decryptedData.tiledlist[0].topic;
                            var Journey_Name2 = "";
                            if(decryptedData.tiledlist[0].Journey_Name)
                                Journey_Name2 = decryptedData.tiledlist[0].Journey_Name;
                            
                            var obj = {
                                context_id: $rootScope.context_id,
                                conversation_id: $rootScope.conversation_id,
                                session_id: $rootScope.session_id,
                                user: $rootScope.empcode,
                                user_input: prevmsg,
                                response: decryptedData.tiledlist[0],
                                topic: topic2,
                                Journey_Name: Journey_Name2,
                                responsetype: value.type,
                                inputDate: inputDate,
                                outputDate: outputDate,
                                respdiff: respdiff,
                                city:$rootScope.city,
                                role:$rootScope.role,
                                functions:$rootScope.functions,
                                empcode:$rootScope.empcode,
                                empid:$rootScope.Employee_ID,
                                empname:$rootScope.Employee_Name,
                                state:$rootScope.state,
                                lobname:$rootScope.LOB_name,
                                lobcode:$rootScope.LOB_code,
                                loccode:$rootScope.LOC_Code,
                                department:$rootScope.department,
                                division:$rootScope.division,
                                segment:$rootScope.segment,
								branch:$rootScope.branch,
								i_ind:i_ind
                            };
                            if($rootScope.crndata.details)
                                obj.crnno=$rootScope.crndata.header.party_id;
							if(unanstag)
								obj.unanswered=1;
							unanstag = 0;
                            $rootScope.savehistory(obj,cl);
                                //$rootScope.chatlist[cl].gotresponse=true;
                            chargefound = false;
                        });
                        


                        // apiService.getttsSpeech({text:data.data.data.tiledlist[0].Script[0]}).then(function (data){

                        // });
                        // $('#mybtn_trigger').bind('click', function(event, textspeech) {
                           

                        // }); 
                        // var msg = new SpeechSynthesisUtterance(data.data.data.tiledlist[0].Script[0]);
                        // window.speechSynthesis.speak(msg);
                        // var speech = new SpeechSynthesisUtterance();
                        // speech.text = data.data.data.tiledlist[0].Script[0];
                        // speech.volume = 1; // 0 to 1
                        // speech.rate = 1; // 0.1 to 9
                        // speech.pitch = 1; // 0 to 2, 1=normal
                        // speech.lang = "en-US";
                        // speechSynthesis.speak(speech);
                        // tts.speech({
                        //     src: data.data.data.tiledlist[0].Script[0],
                        //     hl: 'en-us',
                        //     r: 0, 
                        //     c: 'mp3',
                        //     f: '44khz_16bit_stereo',
                        //     ssml: false,
                           
                        // });
                        // $http({
                        //     url: "http://api.voicerss.org/?key=5a1cc1a178c24b89ba23fd6e3b1bb6c5&hl=en-us&src="+data.data.data.tiledlist[0].topic,
                        //     method: 'POST',
                        //     //data:(formData),
                        //     withCredentials: false,
                        //     //headers: {'Content-Type': 'application/json','X-CSRFToken': "Vfpx6pWJYBx7dbX35vwXm7P9xj3xNPyUJbSx9IlwgcRHReN974ZC5rEbvgpRQdY2"},
                        // }).then(function (data){
                        //    //console.log(data); 
                        //     // var audioElement = document.getElementById('ttsaudio');
                        //     // audioElement.setAttribute('src', src);
                        //     // // Load src of the audio file
                        //     // audioElement.load();
                        //     // audioElement.play();
                        //     // output =  '<audio id="ttsaudio1">';
                        //     // // you can add more source tag
                        //     // output +=  '<source src='+data.data+'" type="audio/mp3" />';
                        //     // output +=  '</audio>';
                        //     //  //var newAudio = $(createAudio(src));
                        //     // $("#ttsaudio").replaceWith(output);
                        //     // $("#ttsaudio1").load();
                        //     // $("#ttsaudio1").play();
                        // });
                            
                        if(decryptedData.tiledlist[0].sub_topic_list || decryptedData.tiledlist[0].sub_topic_list != null)
                        {
                            $rootScope.openMenu(decryptedData.tiledlist[0].sub_topic_list);
                        }
                        if(decryptedData.tiledlist[0].Script || decryptedData.tiledlist[0].Script != null)
                        {
                            if(decryptedData.tiledlist[0].Script.length== 0)
                                $rootScope.tabHeight = window.innerHeight-53;
                            else
                                $rootScope.tabHeight = window.innerHeight-53;;
                            
                        }
                        if(decryptedData.session_obj_data || decryptedData.session_obj_data != null)
                            $.jStorage.set("sessiondata",decryptedData.session_obj_data);
                        // if($(".expandable2").hasClass('col-md-8'))
                        //      $rootScope.rotateoutmenu();
                    }).catch(function (reason) {
                        //console.log(reason);
                        // var msg = {Text:"Sorry I could not understand",type:"SYS_EMPTY_RES"};
                        // $rootScope.pushSystemMsg(0,msg); 
                        
                        //chargefound = false;
                        var outputDate   = new Date();
                        var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                        var obj = {
                            context_id: $rootScope.context_id,
                            conversation_id: $rootScope.conversation_id,
                            session_id: $rootScope.session_id,
                            user: $rootScope.empcode,
                            user_input: sess2.Text,
                            response: {},
                            topic: "",
                            Journey_Name: "",
                            responsetype: "",
                            inputDate: inputDate,
                            outputDate: outputDate,
                            respdiff: respdiff,
                            unanswered: 1,
                            city:$rootScope.city,
                            role:$rootScope.role,
                            functions:$rootScope.functions,
                            empcode:$rootScope.empcode,
                            empid:$rootScope.Employee_ID,
                            empname:$rootScope.Employee_Name,
                            state:$rootScope.state,
                            lobname:$rootScope.LOB_name,
                            lobcode:$rootScope.LOB_code,
                            loccode:$rootScope.LOC_Code,
                            department:$rootScope.department,
							division:$rootScope.division,
							segment:$rootScope.segment,
							branch:$rootScope.branch
                            //livechat:1
                        };
                        
                        ////console.log(io.socket.isConnected());
                        $rootScope.showMsgLoader=false;
                        
                        //else
                        {
                            var msg3;
                            $rootScope.savehistory(obj,cl);
                                //$rootScope.chatlist[cl].gotresponse=true;
                            $rootScope.agentconnected = false;
                            ////console.log(reason.status);
                            ////console.log(reason);

                            if(reason.status === 401 || reason.status === -1){
                                 msg3 = {Text:"Sorry I am unable to connect to the server for resolving your query. Please try after sometime",type:"SYS_EMPTY_RES"};
                            }else{
                                if(chargefound) {
                                    //$scope.askchargej(prevmsg,decryptedData);
                                    $rootScope.getSystemMsg('',"GSFC Final");
                                    //chargefound=false;
                                }
                                else {
                                    var fmsg = $scope.getfailuremsg();
                                    msg3 = {Text:fmsg.msg,type:"SYS_EMPTY_RES"};


                                    //console.log("----------------connecting live agent (inside catch)--------------");
                                    $scope.noRephrase = $scope.noRephrase + 1;
                                    /*if ($scope.noRephrase > 1) {
                                        //console.log("----------------connecting live agent (inside catch and catch)--------------");

                                       // $scope.searchingForAgent = true;
                                        $timeout(function () {
                                            $scope.liveChat(obj, cl);

                                        }, 2000)
                                    }*/ //live_chat_comment
                                }
                            }
                            if(!chargefound) {
								$rootScope.pushSystemMsg(0,msg3); 
								
                            }
							chargefound=false;
                        }
                    });
                },500);
            });
        }	
        //});
        $rootScope.autocompletelist = [];
    };
    
    $scope.lastagentid = "";
    $rootScope.lastagentmsg = false;
    
    $rootScope.endConversation = function(byrole) {
        //byrole-1->user,2-> chat agent
        var disconnectby = "";
        var endmsg="";
        // debugger;
            $scope.endLiveChat();
        if(byrole == 2)
        {
            disconnectby=$scope.lastagentid;
            endmsg = "Your chat was terminated by "+$rootScope.connectedAgentName+".";
        }
        else
        {
            disconnectby=$rootScope.id;
            // endmsg = "Your Chat has ended.";

            endmsg = "Your have ended the chat";
            // debugger;
            $scope.endLiveChat();

             // ---------------
			 /*
             livechatapi.userlogOut({
                'user_empcode': $rootScope.empcode,
                'domain_login_id':$rootScope.connectedAgentName
            },function(data){
				////console.log("live user logout ",data);

            })*/ //live_chat_comment

        }
        var msg = {Text:endmsg,type:"SYS_CONV_END"};
        $rootScope.pushSystemMsg(0,msg); 
        
        $rootScope.agentconnected = false;
        $rootScope.lastagentmsg = false;
        var formData= {disconnectby:disconnectby,from_id:$rootScope.id,to_id:$rootScope.lastagent,socketid:$.jStorage.get("socketId")};
        /*apiService.disconnectuser(formData).then(function (data){

        });*/
    };
    $rootScope.Speaktext = function() {
        ////console.log(text);
        var _iOS9voices = [
            { "data-name": "Maged", voiceURI: "com.apple.ttsbundle.Maged-compact", "data-lang": "ar-SA", localService: true, "default": true },
            { "data-name": "Zuzana", voiceURI: "com.apple.ttsbundle.Zuzana-compact", "data-lang": "cs-CZ", localService: true, "default": true },
            { "data-name": "Sara", voiceURI: "com.apple.ttsbundle.Sara-compact", "data-lang": "da-DK", localService: true, "default": true },
            { "data-name": "Anna", voiceURI: "com.apple.ttsbundle.Anna-compact", "data-lang": "de-DE", localService: true, "default": true },
            { "data-name": "Melina", voiceURI: "com.apple.ttsbundle.Melina-compact", "data-lang": "el-GR", localService: true, "default": true },
            { "data-name": "Karen", voiceURI: "com.apple.ttsbundle.Karen-compact", "data-lang": "en-AU", localService: true, "default": true },
            { "data-name": "Daniel", voiceURI: "com.apple.ttsbundle.Daniel-compact", "data-lang": "en-GB", localService: true, "default": true },
            { "data-name": "Moira", voiceURI: "com.apple.ttsbundle.Moira-compact", "data-lang": "en-IE", localService: true, "default": true },
            { "data-name": "Samantha (Enhanced)", voiceURI: "com.apple.ttsbundle.Samantha-premium", "data-lang": "en-US", localService: true, "default": true },
            { "data-name": "Samantha", voiceURI: "com.apple.ttsbundle.Samantha-compact", "data-lang": "en-US", localService: true, "default": true },
            { "data-name": "Tessa", voiceURI: "com.apple.ttsbundle.Tessa-compact", "data-lang": "en-ZA", localService: true, "default": true },
            { "data-name": "Monica", voiceURI: "com.apple.ttsbundle.Monica-compact", "data-lang": "es-ES", localService: true, "default": true },
            { "data-name": "Paulina", voiceURI: "com.apple.ttsbundle.Paulina-compact", "data-lang": "es-MX", localService: true, "default": true },
            { "data-name": "Satu", voiceURI: "com.apple.ttsbundle.Satu-compact", "data-lang": "fi-FI", localService: true, "default": true },
            { "data-name": "Amelie", voiceURI: "com.apple.ttsbundle.Amelie-compact", "data-lang": "fr-CA", localService: true, "default": true },
            { "data-name": "Thomas", voiceURI: "com.apple.ttsbundle.Thomas-compact", "data-lang": "fr-FR", localService: true, "default": true },
            { "data-name": "Carmit", voiceURI: "com.apple.ttsbundle.Carmit-compact", "data-lang": "he-IL", localService: true, "default": true },
            { "data-name": "Lekha", voiceURI: "com.apple.ttsbundle.Lekha-compact", "data-lang": "hi-IN", localService: true, "default": true },
            { "data-name": "Mariska", voiceURI: "com.apple.ttsbundle.Mariska-compact", "data-lang": "hu-HU", localService: true, "default": true },
            { "data-name": "Damayanti", voiceURI: "com.apple.ttsbundle.Damayanti-compact", "data-lang": "id-ID", localService: true, "default": true },
            { "data-name": "Alice", voiceURI: "com.apple.ttsbundle.Alice-compact", "data-lang": "it-IT", localService: true, "default": true },
            { "data-name": "Kyoko", voiceURI: "com.apple.ttsbundle.Kyoko-compact", "data-lang": "ja-JP", localService: true, "default": true },
            { "data-name": "Yuna", voiceURI: "com.apple.ttsbundle.Yuna-compact", "data-lang": "ko-KR", localService: true, "default": true },
            { "data-name": "Ellen", voiceURI: "com.apple.ttsbundle.Ellen-compact", "data-lang": "nl-BE", localService: true, "default": true },
            { "data-name": "Xander", voiceURI: "com.apple.ttsbundle.Xander-compact", "data-lang": "nl-NL", localService: true, "default": true },
            { "data-name": "Nora", voiceURI: "com.apple.ttsbundle.Nora-compact", "data-lang": "no-NO", localService: true, "default": true },
            { "data-name": "Zosia", voiceURI: "com.apple.ttsbundle.Zosia-compact", "data-lang": "pl-PL", localService: true, "default": true },
            { "data-name": "Luciana", voiceURI: "com.apple.ttsbundle.Luciana-compact", "data-lang": "pt-BR", localService: true, "default": true },
            { "data-name": "Joana", voiceURI: "com.apple.ttsbundle.Joana-compact", "data-lang": "pt-PT", localService: true, "default": true },
            { "data-name": "Ioana", voiceURI: "com.apple.ttsbundle.Ioana-compact", "data-lang": "ro-RO", localService: true, "default": true },
            { "data-name": "Milena", voiceURI: "com.apple.ttsbundle.Milena-compact", "data-lang": "ru-RU", localService: true, "default": true },
            { "data-name": "Laura", voiceURI: "com.apple.ttsbundle.Laura-compact", "data-lang": "sk-SK", localService: true, "default": true },
            { "data-name": "Alva", voiceURI: "com.apple.ttsbundle.Alva-compact", "data-lang": "sv-SE", localService: true, "default": true },
            { "data-name": "Kanya", voiceURI: "com.apple.ttsbundle.Kanya-compact", "data-lang": "th-TH", localService: true, "default": true },
            { "data-name": "Yelda", voiceURI: "com.apple.ttsbundle.Yelda-compact", "data-lang": "tr-TR", localService: true, "default": true },
            { "data-name": "Ting-Ting", voiceURI: "com.apple.ttsbundle.Ting-Ting-compact", "data-lang": "zh-CN", localService: true, "default": true },
            { "data-name": "Sin-Ji", voiceURI: "com.apple.ttsbundle.Sin-Ji-compact", "data-lang": "zh-HK", localService: true, "default": true },
            { "data-name": "Mei-Jia", voiceURI: "com.apple.ttsbundle.Mei-Jia-compact", "data-lang": "zh-TW", localService: true, "default": true }
            ];
        var voices = window.speechSynthesis.getVoices();
        ////console.log(voices);
        var textspeech = $rootScope.htmlToPlaintext($.jStorage.get("texttospeak"));
        ////console.log(textspeech);
        var speech = new SpeechSynthesisUtterance(textspeech);
        //speech.text = $.jStorage.get("texttospeak");
        //speech.text = "Hello";
        speech.volume = 1; // 0 to 1
        speech.rate = 1; // 0.1 to 9
        speech.pitch = 1; // 0 to 2, 1=normal
        speech.lang = "en-US";
        //speech.lang = {lang: 'en-US', desc: 'English (United States)'};
        //speech.voice = voices[8]; 
        speech.voiceURI = 'native';
        //speechSynthesis.speak(speech);
        //speech.text = textspeech;
        ////console.log(speech);
        //window.speechSynthesis.speak(speech);
        $.jStorage.set("texttospeak","");

        // tts.speech({
        //     src: textspeech,
        //     hl: 'en-us',
        //     r: 0, 
        //     c: 'mp3',
        //     f: '44khz_16bit_stereo',
        //     ssml: false,
            
        // });
    };
    
    
    $rootScope.tappedKeys = '';

    $rootScope.onKeyUp = function(e){
        if($rootScope.chatText.length > 0){
            $rootScope.displaySubmitButton = true;
        } else{
            $rootScope.displaySubmitButton = false;
        }
        //if(e.key == "ArrowDown" || e.key == "ArrowUp")
        if(e.which == 40 )
        {
            if($("ul#ui-id-1 li.active").length > 0) {
                var storeTarget	= $('ul#ui-id-1').find("li.active").next();
                $("ul#ui-id-1 li.active").removeClass("active");
                storeTarget.focus().addClass("active");
                $(".chatinput").val(storeTarget.text());
                $rootScope.autolistid = $(storeTarget).attr("data-id");
                $rootScope.autolistvalue = $(storeTarget).attr("data-value");
                $rootScope.answers = $(storeTarget).attr("data-answers");
                $timeout(function(){
                    // var o_ele = "#suggestionList .ui-widget.ui-widget-content";
                    // //console.log(o_ele.scrollHeight > o_ele.clientHeight);
                    // if(o_ele.scrollHeight > o_ele.clientHeight)
                    // {
                    //     var ulHeight = $("#suggestionList .ui-widget.ui-widget-content").height();
                    //     $('#suggestionList .ui-widget.ui-widget-content').animate({scrollTop: ulHeight});
                    // }
                    
                });
            }
            else
            {
                $('ul#ui-id-1').find("li:first").focus().addClass("active");
                var storeTarget	= $('ul#ui-id-1').find("li.active");
                $(".chatinput").val($('ul#ui-id-1').find("li:first").text());
                $rootScope.autolistid = $('ul#ui-id-1').find("li:first").attr("data-id");
                $rootScope.autolistvalue = $('ul#ui-id-1').find("li:first").attr("data-value");
                $rootScope.answers = $(storeTarget).attr("data-answers");
            }
            return;
        }
        if(e.which == 38 )
        {
            if($("ul#ui-id-1 li.active").length!=0) {
                var storeTarget	= $('ul#ui-id-1').find("li.active").prev();
                $("ul#ui-id-1 li.active").removeClass("active");
                storeTarget.focus().addClass("active");
                $(".chatinput").val(storeTarget.text());
                $rootScope.autolistid = $(storeTarget).attr("data-id");
                $rootScope.autolistvalue = $(storeTarget).attr("data-value");
                $rootScope.answers = $(storeTarget).attr("data-answers");
            }
            else
            {
                $('ul#ui-id-1').find("li:last").focus().addClass("active");
                var storeTarget	= $('ul#ui-id-1').find("li.active");
                $(".chatinput").val($('ul#ui-id-1').find("li:last").text());
                $rootScope.autolistid = $('ul#ui-id-1').find("li:last").attr("data-id");
                $rootScope.autolistvalue = $('ul#ui-id-1').find("li:last").attr("data-value");
                $rootScope.answers = $(storeTarget).attr("data-answers");
            }
            
            return;
        }
        if(e.which == 13)
        {
			if ((/\S/.test($(".chatinput").val()))) {
				if($(".chatinput").val() != '')
					$rootScope.chatEnterDisabled=true;
				if( $rootScope.answers )
				{
					if($rootScope.answers !='' ) {
						
						$rootScope.pushAutoMsg($rootScope.autolistid,($(".chatinput").val()).replace(/[^\x00-\x7F]/g, ""),$rootScope.answers);
						$rootScope.autocompletelist = [];
					}
				}
				else if(($rootScope.autolistid=="" || $rootScope.autolistid == null || $rootScope.autolistid == 0) )
				{
					
					if($(".chatinput").val() != '') {
						
						 $rootScope.pushMsg("",($(".chatinput").val()).replace(/[^\x00-\x7F]/g, ""),"");
						 $(".chatinput").val("");
					}
				}
				else {
					if( $(".chatinput").val() != '')
						$rootScope.pushMsg($rootScope.autolistid,($(".chatinput").val()).replace(/[^\x00-\x7F]/g, ""),"");
				}
				$rootScope.autocompletelist = [];
			}
        }
        if(e.which == 8)
        {
            
            if($(".chatinput").val()=="")
            {
                $rootScope.autocompletelist = [];
                $rootScope.chatText = "";
            }
            
        }
        if(e.which == 32)
        {
            $rootScope.getAutocomplete($rootScope.chatText);
        }
        /*
        else {
            var num_words = $(".chatinput").val().trim().split(/\s+/).length;
            if(num_words > 3) {
                return false;
            }
            else {
                
            }
        }*/
        var content = $(".chatinput").val();
        var num_words = $(".chatinput").val().trim().split(/\s+/).length;
        ////console.log(num_words);
        if(num_words > 250) {
            contentarr = content.split(" ");
            ////console.log(contentarr);
            splitstr="";
            for(i = 0 ; i < 250 ; i++) {
                if(i==0)
                    splitstr = contentarr[i];
                else 
                    splitstr+=' '+contentarr[i];
            }
            //$(".chatinput").val(splitstr);
            $timeout(function(){
                $rootScope.chatText=splitstr;
                $(".chatinput").val(splitstr);
            },500);
            //var lastIndex = content.lastIndexOf(" ");
            //$(".chatinput").val(content.substring(0, lastIndex));
            return false;
        }
        else {
            ////console.log("<250");
            /*$timeout(function(){
                $rootScope.chatText=content;
                $(".chatinput").val(content);
            },500);*/
            
            
        }
    };
    
    // --------------
    $rootScope.enterChatMessage=function(){
        ////console.log($rootScope.chatText);
        ////console.log($(".chatinput").val());
        if($rootScope.chatText !='') {
            $rootScope.chatEnterDisabled=true;
            if( $rootScope.answers )
            {
                $rootScope.pushAutoMsg($rootScope.autolistid,$(".chatinput").val(),$rootScope.answers);
                $rootScope.autocompletelist = [];
            }
            else if(($rootScope.autolistid=="" || $rootScope.autolistid == null || $rootScope.autolistid == 0) )
            {
                
                 
                 $rootScope.pushMsg("",$(".chatinput").val(),"");
                 $(".chatinput").val("");
            }
            else {
                
                $rootScope.pushMsg($rootScope.autolistid,$(".chatinput").val(),"");
            }
            $rootScope.autocompletelist = [];
        }
    };

    $rootScope.toggleMenu=function(){
        $rootScope.menuOpen=!$rootScope.menuOpen;
    };
    $rootScope.result_sr = function(output) {
        $timeout(function () {
            $('#sr_details').html(output.Output.Result);
        },200);
    };
    $rootScope.result_crn = function(output) {
        $timeout(function () {
            $('#crn_details').html(output);
        },200);
    };
    
    $rootScope.crnSubmit = function(crnno) {
        $scope.userid=$rootScope.id;
        var datatype = 'CRN';
        var xmldata = '<Request xmlns="http://www.kotak.com/schemas/Online_Merchant_Boarding/BCIF_Customer_Info.xsd"><sourceappcode>KMBOT</sourceappcode><RqUID>SNAPCHAT123456</RqUID><action_type>CRN_BASIC_DTLS</action_type><party_id>'+crnno+'</party_id></Request>';
        $scope.formData = {user_input:crnno,xmldata:xmldata, number_type:datatype,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id};
        /*
        var xhr;
        if(window.XMLHttpRequest) {
            xhr= new XMLHttpRequest();
        }
        else if(window.ActiveXObject) {
            xhr = new ActivexObject("Microsoft.XMLHTTP");
        }
        xhr.open("get","http://10.10.19.191:4220",true);
        xhr.setRequestHeader("Content-Type","application/xml");
        xhr.send(xmldata);
        
        var url="http://10.10.19.191:4220";
        //console.log(url);
        $.ajax({
            url: url,
            dataType: "xml",
            async: false,
            cache: false,
            //timeout: 3000,
            //headers:{'Content-Type': 'text/xml'},
            contentType:"text/xml",
            type:"POST",
            data:xmldata,
            //data:"<party_id>"+crnno+"</party_id>",
            crossDomain:true,
            //method: "POST",
             success: function (data) {
                 //console.log(data,"Data");
                
             },
        });*/
        apiService.crnsubmit($scope.formData).then(function (callback){
            //rootScope.session_object = callback.data.session_object;
            //$rootScope.result_crn(callback.data.Response);
            $rootScope.crndata = callback.data.Response;
            ////console.log(callback);
            $rootScope.chatlist.push({id:$rootScope.chatlist.length,msg:"CRN Query:"+crnno,gotresponse:false,position:"right",curTime: $rootScope.getDatetime()});
			var i_ind = $rootScope.chatlist[$rootScope.chatlist.length-1].id;
			
            var cl = $rootScope.chatlist.length-1;
            var msg3 = {Text:callback.data.Response,type:"SYS_CRN"};
            $rootScope.pushSystemMsg(0,msg3); 
            $timeout(function(){
                //angular.element("#chattab").triggerHandler("click");
                $("#chatTabs li").removeClass('active');
                $("#chatTabs li").first().addClass('active');
                $(".chatbody .tab-content .tab-pane").removeClass("active");
                $(".chatbody .tab-content .tab-pane").removeClass("ng-hide");
                $(".chatbody .tab-content .tab-pane").first().addClass("active");
                $rootScope.scrollChatWindow();
                ////console.log("chat  tab");
            },500);
            var inputDate   = new Date();
            var outputDate   = new Date();
            if($rootScope.crndata.details)
            {
                var respdiff = (outputDate.getTime() - inputDate.getTime()) / 1000;
                var obj = {
					i_ind:i_ind,
                    context_id: $rootScope.context_id,
                    conversation_id: $rootScope.conversation_id,
                    session_id: $rootScope.session_id,
                    user: $rootScope.empcode,
                    user_input: "CRN Query:"+crnno,
                    response:msg3 ,
                    topic: "",
                    Journey_Name: "",
                    responsetype: "CRN_QUERY",
                    inputDate: inputDate,
                    outputDate: outputDate,
                    respdiff: respdiff,
                    city:$rootScope.city,
                    role:$rootScope.role,
                    functions:$rootScope.functions,
                    empcode:$rootScope.empcode,
                    empid:$rootScope.Employee_ID,
                    empname:$rootScope.Employee_Name,
                    state:$rootScope.state,
                    lobname:$rootScope.LOB_name,
                    lobcode:$rootScope.LOB_code,
                    loccode:$rootScope.LOC_Code,
                    department:$rootScope.department,
                    crnno:crnno,
                    division:$rootScope.division,
                    segment:$rootScope.segment,
                };
                    
                    
                $rootScope.savehistory(obj,cl);
                    //$rootScope.chatlist[cl].gotresponse=true;
            }
            formData = {session_id:$rootScope.session_id,crnno:crnno,conversation_id:$rootScope.conversation_id};
            apiService.tagwithcrn(formData).then(function (callback){
                
            });
            apiService.gettaggedcrn(formData).then(function (callback){
                //$rootScope.result_crn(callback.data.Response);
                $rootScope.crnconver = callback.data.data;
                ////console.log(callback);
            });
        });
    };
    
    $rootScope.srnSubmit = function(srno,crnno) { 
        ////console.log(crnno+"crnno,sr"+srno);
        $rootScope.userid=$rootScope.id;
        var datatype = 'SR';
        $scope.formData = {user_input:srno, number_type:datatype,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$rootScope.session_id};
        ////console.log($scope.formData);
        apiService.crnsubmit($scope.formData).then(function (callback){
            ////console.log(callback,"crn");
            $rootScope.result_sr(callback.data);
        });
    };
    $rootScope.likeChatClick = function(){
        $timeout(function(){
            $('span.thumbsup').css("color", "#008000");
            $('.thumbsdown').css("color", "#444");
        },200);
        if($rootScope.agentconnected){
            //console.log("--------------"+$rootScope.connectedAgentName+" "+$rootScope.Employee_ID);
            private_socket.emit('like_suggest', {
                "agent_email": $rootScope.connectedAgentName,
                "user_email": $rootScope.Employee_ID,
            })
            toastr.success("Thank you for your feedback", '');
        } else if(!$rootScope.agentconnected){
            var formData = {
                session_id:$rootScope.session_id,user:$rootScope.empcode, conversation_id: $rootScope.conversation_id,
            };
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(formData), $rootScope.FRONTEND_ENC_KEY).toString();
            apiService.like({data:ciphertext}).then(function (response){
                toastr.success("Thank you for your feedback", '');
            });
        }
    };
    $rootScope.selectedFeedback = "";
    $rootScope.feedbacklist = [];
    $rootScope.feedbacklist =  [
        //{id:"",name:"Choose a Feedback"},
        {id:"1",name:"Incorrect response"},
        {id:"2",name:"Incomplete response"},
        {id:"3",name:"Unable to comprehend answer"},
        // {id:"3",name:"Free text"},
        {id:"4",name:"Received no reply"},
    ];
    $rootScope.selectedFeedback = $rootScope.feedbacklist[0];
    $rootScope.selectedFeedbackval = $rootScope.selectedFeedback.id;
    $rootScope.$dislikemodalInstance = {};
    $rootScope.dislikesuggestionerror = 0;
    $rootScope.dislikeChatClick = function(){
        
        if($rootScope.chatlist.length > 1 && !$rootScope.agentconnected)
        {
            // var chatlist = $.jStorage.get('chatlist');
            // ////console.log(chatlist);
            // var chat_list = _.remove(chatlist, function(n) {
            //     return n.position  == 'right';
            // });
            // // //console.log(chatlist);
            // ////console.log(chat_list);
            // $rootScope.int_chat_list =chat_list;
            $rootScope.$dislikemodalInstance = $uibModal.open({
                scope: $rootScope,
                animation: true,
                size: 'sm',
                templateUrl: 'views/modal/dislikechat.html',
                resolve: {
                    items: function () {
                        return $rootScope.chatlist;
                    }
                },
                //controller: 'CommonCtrl'
            });
            $timeout(function(){ 
                $('span.thumbsdown').css("color", "#ed232b");
                $('.thumbsup').css("color", "#444");
            },200);
            //toastr.success("Thank you for your feedback", '');
        } else if($rootScope.agentconnected){
            //console.log("--------------"+$rootScope.connectedAgentName+" "+$rootScope.Employee_ID);
            private_socket.emit('dislike_suggest', {
                "agent_email": $rootScope.connectedAgentName,
                "user_email": $rootScope.Employee_ID,
            })
            $timeout(function(){ 
                $('span.thumbsdown').css("color", "#ed232b");
                $('.thumbsup').css("color", "#444");
            },200);
            toastr.success("Thank you for your feedback", '');
        }
        else 
            toastr.error("Please initiate a conversation to dislike it!", 'Error');
            //alert("Please initiate a conversation to dislike it!");
    };
    $rootScope.dislikeCancel = function() {
        ////console.log("dismissing");
        $scope.$dislikemodalInstance.dismiss('cancel');
        $('span.thumbsdown').css("color", "#444");
    };
    $rootScope.dislikesuggestionsubmit = function(suggestion){
        ////console.log("suggestion",suggestion);
        if(suggestion == '' || suggestion == '1')
        {
            toastr.error("Please select Feedback", 'Error');
            //alert("Please select Feedback");
        }
        else {
            if($("input[name='interactions[]']:checked").length == 0)
                toastr.error("Please select Interaction", 'Error');
                //alert("Please Select Interaction");
            else {
                var c_index = Array();
				var v_index = Array();
				var iind = Array();
                $.each($("input[name='interactions[]']:checked"), function(k,v) {
                    // //console.log(k);
                    // //console.log(v);
                    // //console.log($(v).attr('data-index'));
                    
                    c_index.push($(v).attr('data-index'));
					v_index.push($(v).attr('data-value'));
					iind.push($(v).attr('data-iind'));
                });
                var formData = {
                    feedback:suggestion,interactions:c_index,session_id:$rootScope.session_id,user:$rootScope.empcode,conversation_id: $rootScope.conversation_id,interactions_v:v_index,iind:iind
                };
                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(formData), $rootScope.FRONTEND_ENC_KEY).toString();
                apiService.dislike({data:ciphertext}).then(function (response){
                    toastr.success("Thank you for your feedback", '');
                });
                $rootScope.dislikesuggestionSuccess = 1;
                $timeout(function(){
                    $rootScope.dislikesuggestionSuccess = 0;
                    $rootScope.dislikeCancel();
                },500);
                $('span.thumbsdown').css("color", "#444");
            }
        }
    };
    
   $timeout(function(){
        //$('#chatTabs a:last').tab('show');
   },200);






   

    //-------------------------------  live chat ------------------------------------------

    $scope.agentConnetedShow=false
    $scope.noRephrase = 0;


    var username = "mhs";
    var chathistory = null;
    var agent = "None";
    var useremail = "mhs@gmail.com";

    //console.log(username, agent, useremail);
	//var io=io();
    var socket = io.connect(liveChatUrl,{reconnection:false});

    // var private_socket = io.connect('http://127.0.0.1:5000/private');
    var private_socket = io.connect(liveChatUrl + 'private',{reconnection:false});
    var live_socket = io.connect(liveChatUrl + $rootScope.agent_empcode,{reconnection:false});
    //console.log(liveChatUrl + 'private');

    $scope.liveChat = function (obj, cl) {
        // $rootScope.LiveChatList = null;
        //$rootScope.chatlist
		//console.log("session details",$rootScope.sessionDetails)
        var sessiondata = angular.copy($rootScope.sessionDetails);
        delete sessiondata.MyTeam;
        delete sessiondata.BACKEND_API_KEY;
        delete sessiondata.B_TOKEN_KEY;
        delete sessiondata.FRONTEND_ENC_KEY;
        //delete sessiondata.sessionid;

        sessiondata.session_id=$rootScope.session_id;
        sessiondata.department = (typeof(sessiondata.department)=='string')? sessiondata.department.split(',') : sessiondata.department ;
        sessiondata.user= $rootScope.empcode;
        sessiondata.conversation_id=$rootScope.conversation_id;

        livechatapi.userlogin(
            //{
        //     "conversation_id": $rootScope.conversation_id,
        //     "session_id": $rootScope.session_id,
        //     "user": $rootScope.empcode,
        //     "department": $.jStorage.get('department').split(',')
        //}
        sessiondata, function (data) {

            //console.log("user login to live agent", data.data);
            if (data.data.empcode) {
                $scope.searchingForAgent=true;
                $rootScope.agentconnected = true;


                obj.livechat = 1;
                obj.livechatagentid = data.data.empid;
                obj.livechatagentname = data.data.empname,
                    $rootScope.savehistory(obj, cl);
                $rootScope.connectedAgentName = data.data.empcode;
           
                
                $timeout(function(){
                    $scope.agentConnetedShow=true;
                }, 3000)
                $timeout(function(){
                    $scope.searchingForAgent = false;
                    // $scope.agentConnetedShow=false;
                    $rootScope.chatlist.push({
                        "agent_email": "",
                        "date": {
                            "$date": new Date()
                        },
                        "from_id": "",
                        "fromname": "",
                        "message": "Hi, I am " + $rootScope.connectedAgentName + " and I will be assisting you today!",
                        "to_id": "",
                        "toname": "",
                        "type": "agent",
                        "user_email": "",
                        "userdetails": {
                            "browser": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
                            "url": "http://127.0.0.1:5000/"
                        }
                    })
                    $rootScope.scrollChatWindow();
                },3000)
                $timeout(function(){
                    $scope.agentConnetedShow=false;
                }, 6000)
                $rootScope.scrollChatWindow();
            } else {
                $scope.searchingForAgent = false;
                //$scope.agentChatMessage = "No live agent available";
                $timeout(function () {
                    $scope.agentChatMessage = false;
                }, 3000);
                $rootScope.scrollChatWindow();
            }





        })
    }


    // $scope.privateMessage = {};
    // $scope.user = username;
    $scope.sendPrivateMessage = function (message) {
        // if ($scope.privateMessage.message !== "") {
        //     if (agent == "None") {
        //         //console.log("#####");
        //         private_socket.emit('private_message', {
        //             "date": new Date(),
        //             "from_id": useremail,
        //             "fromname": username,
        //             "message": message,
        //             "to_id": "none",
        //             "toname": "none",
        //             "type": "user",
        //             "agent_email": "",
        //             "user_email": useremail,
        //             "user_details": {
        //                 "url": window.location.href,
        //                 "browser": window.navigator.userAgent
        //             }
        //         });
        //     } else {
        private_socket.emit('second_private_message', {

            agent_empcode: $rootScope.connectedAgentName,
            date: new Date(),
            from_empcode: $rootScope.empcode,
            message: message,
            to_empcode: $rootScope.connectedAgentName,
            type: "user",
            user_empcode: $rootScope.empcode,
            user_details: {}
        })
        // }
        // }
        // $scope.privateMessage.message = "";
        // //console.log('input', $scope.privateMessage.message);
    }

    // verify our websocket connection is established
    socket.on('connect', function () {
        //console.log('Websocket connected!');
    });
    socket.on('disconnect', function () {
        //console.log('Websocket disconnected!');
        socket.emit('disconnected');
    });
	$timeout(function() {
		socket.disconnect(true);
		//io.emit('end');
		//console.log("disconnect");
		socket.close();
	},1000);
	//live_chat_comment
    // private_socket.on('new_private_message', function (msg) {
    //     var username = $('#username').text();

    //     //console.log('new_private_message', msg, agent, username);
    //     if (msg.fromname == username || msg.toname == username) {
    //         //console.log('new_private_message');

    //         //console.log(msg);
    //         agent = msg.agent_email;
    //         //console.log($rootScope.liveChatHistory, "chat history");
    //         $rootScope.liveChatHistory.chatlist.push(msg);
    //              }
    //     $scope.$digest();
    // });



    private_socket.on('user_ongoing_chat', function (msg) {
        //console.log("user_ongoing_chat", msg);
        // scrollbottom();
        // var username = $('#username').text();

        if (msg.user_empcode == $rootScope.empcode) {
            //console.log('new_private_message');

            //console.log(msg);
            // agent = msg.agent_email;
            //console.log($rootScope.chatlist, "chat history");
             $rootScope.chatlist.push(msg);
            $rootScope.scrollChatWindow();

        }
        $scope.$digest();

    });



    private_socket.on('offline_message', function (msg) {
        //console.log('offline message !', msg);
        // window.location.href = 'off';
    });





    private_socket.on('agent_end_chat', function (endUser) {
        //to end chat
        //console.log("agent end chat", endUser);
        if (endUser.user_empcode == $rootScope.empcode) {
            $scope.agentDisconnected = true;
            if ($scope.agentconnected)
                $rootScope.endConversation(2);
        }
        $scope.$digest();
    });


    $scope.endLiveChat = function () {
        // debugger;
        // var name = $('.agentname').text();
        // //console.log("end chat", user);
        private_socket.emit('end_user_message', {
            agent_empcode: $rootScope.connectedAgentName,
            date: new Date(),
            from_empcode: $rootScope.empcode,
            message: "ending chat",
            to_empcode: $rootScope.connectedAgentName,
            type: "end_chat",
            user_empcode: $rootScope.empcode,
            user_details: {}
        });

    }

    $scope.$on('$destroy', function () {
        // $scope.agentlogout();

       
    })
})
myApp.controller('AgentdashboardCtrl', function ($scope, $window, $rootScope, $resource, TemplateService, NavigationService, CsrfTokenService, $timeout, $http, apiService, $state, $uibModal, Menuservice, $cookies, $sce, $location, $document, Idle, livechatapi) {
    $scope.template = TemplateService.getHTML("content/agentdashboard.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.failuremsg = [{
            msg: "Sorry, I did not catch that. Could you please rephrase the sentence and try again?"
        },
        {
            msg: "Oops! I dont't think I can answer that,Can you rephrase your question?"
        },
        //{msg:"No hard feelings but I don't think I can answer that"},
        {
            msg: "Well, I haven't heard that before can you put it in another way?"
        },
    ];

    //--------data initilize for live chat ----------------




    $rootScope.liveChatHistory = [];
    $scope.messages = [];
    $scope.selectedUser = {};
    // $scope.toggleText = "break";

    // $scope.agentOnline = agentlist;
    $scope.agentReplay = {};
    $scope.agentReplay.text = "";



    var rightcolor = "#768670";
    var leftcolor = "#222222";

    //assigning custom color in chatbox
    $(document).ready(function () {
        //console.log("ready!");
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ".right-chat { background-color:" + rightcolor + ";}  .right-chat:after{border-color: transparent " + rightcolor + ";}";
        style.innerHTML += ".left-chat { background-color:" + leftcolor + "}   .left-chat:after{border-color: transparent " + leftcolor + ";}";
        document.getElementsByTagName('head')[0].appendChild(style);
        // document.getElementById('someElementId').className = 'cssClass';
    })

    //--------end of data initilize for live chat ----------------
    $rootScope.getallsession = false;
    $scope.getsessiondata = function () {

        var formData = {
            data: $.jStorage.get("accesstoken")
        };
        apiService.getsessiondata(formData).then(function (callback2) {

            var bytes = CryptoJS.AES.decrypt((callback2.data.data), $rootScope.m_k);
            var callback3 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            var callback = {};
            callback.data = {};
            callback.data.data = callback3;
            if (callback.data.data) {
                //console.log("inside session data");
                $rootScope.BACKEND_API_KEY = callback.data.data.BACKEND_API_KEY;
                $rootScope.FRONTEND_ENC_KEY = callback.data.data.FRONTEND_ENC_KEY;
                $rootScope.getallsession = true;

                $rootScope.id = callback.data.data._id;
                $rootScope.fname = callback.data.data['Employee Name'];
                $rootScope.lname = "";
                $rootScope.email = callback.data.data['Email Address'];
                $rootScope.branch = callback.data.data.branchname;

                $rootScope.sessionid = callback.data.data.sessionid;

                $rootScope.city = callback.data.data['PCITY'];
                $rootScope.role = callback.data.data['New Role'];
                $rootScope.functions = callback.data.data['Function'];
                $rootScope.empcode = callback.data.data['DOMAIN LOGIN ID'];
                $rootScope.Employee_ID = callback.data.data['Employee ID'];
                $rootScope.Employee_Name = callback.data.data['Employee Name'];
                $rootScope.state = callback.data.data['State'];
                $rootScope.LOB_name = callback.data.data['LOB name'];
                $rootScope.LOB_code = callback.data.data['LOB Code'];
                $rootScope.LOC_Code = callback.data.data['LOC Code'];
                $rootScope.division = callback.data.data['Division'];
                $rootScope.segment = callback.data.data['Business Segment'];
                if (callback.data.data.department) {
                    $rootScope.department = callback.data.data.department;
                    //$.jStorage.set("department",callback.data.data.department);
                }
                if (callback.data.data.user_type) {
                    if (callback.data.data.user_type.toLowerCase() == 'maker') {
                        if (callback.data.data.live_chat == 'Yes') {
                            $rootScope.access_role = "maker-livechat";
                            $rootScope.live_chat = true;
                            //$.jStorage.set("access_role", "maker-livechat");
                            //$.jStorage.set("live_chat", true);
                        } else {
                            $rootScope.access_role = "maker";
                            //$.jStorage.set("access_role", "maker");
                        }
                    } else if (callback.data.data.user_type.toLowerCase() == 'checker') {
                        if (callback.data.data.live_chat == 'Yes') {
                            $rootScope.access_role = "checker-livechat";
                            $rootScope.live_chat = true;
                            //$.jStorage.set("access_role", "checker-livechat");
                            //$.jStorage.set("live_chat", true);
                        } else {
                            $rootScope.access_role = "checker";
                            //$.jStorage.set("access_role", "checker");
                        }
                    } else {
                        $rootScope.access_role = callback.data.data.user_type.toLowerCase();
                        //$.jStorage.set("access_role", callback.data.data.user_type.toLowerCase());
                    }
                } else {
                    $rootScope.access_role = "user";
                    //$.jStorage.set("access_role", "user");
                }

   
              
                //----------------  agent login code
                // if(callback.data.data.live_chat=='No')
                // {
                //     $state.go("dashboard");
                // }
                var sessiondata = callback.data.data;
                delete sessiondata.MyTeam;
                delete sessiondata.BACKEND_API_KEY;
                delete sessiondata.B_TOKEN_KEY;
                sessiondata.department = sessiondata.department.split(',')
                //console.log("agent login");
                livechatapi.agentLogin({
                    // "emp_code": $rootScope.empcode
                    data: sessiondata
                }, function (data) {
                    //console.log("inside agent login", data);

                    $rootScope.liveChatHistory = data.data.chat;
                    $scope.breakStatus = data.data.break_status;
                    // //console.log("push chat history",$rootScope.liveChatHistory,$rootScope.liveChatHistory[0],chathistory[0],chathistory[0].chatlist);
                    // $rootScope.liveChatHistory[0].chatlist= $rootScope.liveChatHistory[0].chatlist.concat(chathistory[0].chatlist);
                    //console.log("after", $rootScope.liveChatHistory);
                })
            }


        });

    };



    $scope.getsessiondata();
    $rootScope.idleflag = 2;
    Idle.setTimeout(300);
    Idle.watch();
    $rootScope.idlestart = false;
    angular.element(document).ready(function () {
        $rootScope.uipage = "agentdashboard";
        /*if ($.jStorage.get("afirstreload"))
            $scope.firstreload = true;
        else {
            $.jStorage.set("afirstreload", true);
            location.reload();
        }*/
    });
    $rootScope.access_role = $rootScope.access_role;
    $scope.firstreload = false;
    $scope.scrollagentChatWindow = function (id) {
        $timeout(function () {
            var chatHeight = $("#collapseExampleprivate-room-" + id + " .private_conv").height();
            $("#collapseExampleprivate-room-" + id + " .private_conv").animate({
                scrollTop: chatHeight
            });
        });
    };


    angular.element(document).ready(function () {
        $timeout(function () {
            // $scope.chatpanelheight = $("#chat_window_1").height()-130;
            $scope.agentpanelheight = $(window).height() - 55 - 90;
            $scope.agentwindowpanelheight = $(window).height() - 55;
        }, 2000);
    });

    //-----------------------------------live chat ----------------------------------------------------

    //console.log(liveChatUrl);
    var socket = io.connect(liveChatUrl);

    // verify our websocket connection is established
    socket.on('connect', function () {
        //console.log('Websocket connected!');
    });

    var private_socket = io.connect(liveChatUrl + 'private');
    $rootScope.private_live_socket = private_socket;

    // var private_socket = io.connect(liveChatUrl + 'private');

    function scrollbottom() {
        setTimeout(function () {
            $('.message-panel').scrollTop($('.message-panel')[0].scrollHeight);
        }, 500);
    }


    /////--------------Logout ------------------------
    $scope.agentlogout = function () {
        // var name = $('.agentname').text();
        //console.log("Log Out Chat", $rootScope.liveChatHistory);

        for (var i = 0; i < $rootScope.liveChatHistory.length; i++) {
            private_socket.emit('end_user_message', {

                agent_empcode: $rootScope.empcode,
                date: new Date(),
                from_empcode: $rootScope.empcode,
                message: "ending chat",
                to_empcode: $rootScope.liveChatHistory[i].user,
                type: "end_chat",
                user_empcode: $rootScope.liveChatHistory[i].user,
                user_details: {}
            });
        }

        livechatapi.agentLogout({
            'domain_login_id': $rootScope.empcode
        }, function (data) {
            //console.log("agent logout", data)
        })

    }

    $scope.getChat = function (user) {
        //console.log("change chat", user)
        $scope.selectedUser = user;

    }

    $scope.removeUser = function (user) {
        //console.log("remove user")
        for (var i = 0; i < $rootScope.liveChatHistory.length; i++) {
            if ($rootScope.liveChatHistory[i].user == user.user) {

                $rootScope.liveChatHistory.splice(i, 1);
                //console.log("remove array", $rootScope.liveChatHistory);
                $scope.selectedUser = {};
            }
        }
    }

    private_socket.on('agent_ongoing_chat', function (msg) {
        $scope.agentReplay.text = null;
        //console.log("agent_ongoing_chat", msg);
        // //console.log("first check", agentemail, msg.agent_email);
        if ($rootScope.empcode == msg.agent_empcode) {
            // //console.log("1111111111111");
            for (var i = 0; i < $rootScope.liveChatHistory.length; i++) {
                if ($rootScope.liveChatHistory[i].user == msg.user_empcode) {
                    // //console.log("22222222222222222");
                    $rootScope.liveChatHistory[i].chatlist.push(msg)
                }
            }
        }
        // //console.log("333333333333333");

        $scope.$digest();

        function scrollbottom() {
            setTimeout(function () {
                // //console.log("44444444444444444");
                $('.message-panel').scrollTop($('.message-panel')[0].scrollHeight);
            }, 500);
        }

        scrollbottom();
        //console.log("full list of chatlist", $rootScope.liveChatHistory);
    });


    private_socket.on('user_end_chat', function (endUser) {
        //to end chat
        // debugger;
        //console.log("inside user end chat", endUser);

        for (var i = 0; i < $rootScope.liveChatHistory.length; i++) {
            if ($rootScope.liveChatHistory[i].user == endUser.user_empcode) {
                //console.log("found user name", $rootScope.liveChatHistory[i]);
                $rootScope.liveChatHistory[i].isChatEnd = true;
                if ($rootScope.liveChatHistory[i].user == $scope.selectedUser.user) {
                    $scope.selectedUser.isChatEnd = true;
                }
                //console.log($rootScope.liveChatHistory);
            }
        }
        // //console.log(msg);
        $scope.$digest();

    });

    $scope.sendMessage = function (msg, user) {
        if ($scope.agentReplay.text !== "" && $scope.agentReplay.text !== null) {
            //console.log('inside send message', msg, user, user.user);
            private_socket.emit('second_private_message', {

                agent_empcode: $rootScope.empcode,
                date: new Date(),
                from_empcode: $rootScope.empcode,
                message: msg,
                to_empcode: user.user,
                type: "agent",
                user_empcode: user.user,
                user_details: {}
            });
        }
        $scope.agentReplay.text = "";

        // //console.log("Agent Msg Clear Input", $scope.agentReplay.text);
    }


    $scope.keyDownFunc = function ($event, msg, user) {
        var keycode = $event.which || $event.keycode;
        if (keycode === 13) {
            $scope.sendMessage(msg, user);
        }

        if ($event.keyCode !== 18 && $event.altKey) {

            var alphaKey = $event.keyCode;
            livechatapi.sendKeys(alphaKey, function (data) {

                $scope.agentReplay.text = "";
                $scope.agentReplay.text = data.data.message;
            })
        }

    };

    $scope.endChat = function (user) {
        // var name = $('.agentname').text();
        //console.log("end chat", user);
        private_socket.emit('end_user_message', {
            agent_empcode: $rootScope.empcode,
            date: new Date(),
            from_empcode: $rootScope.empcode,
            message: "ending chat",
            to_empcode: user.user,
            type: "end_chat",
            user_empcode: user.user,
            user_details: {}
        });
    }


    $scope.transferAgent = function (agent, selectedUser) {
        // //console.log(agent, selectedUser,selectedUser.chatlist[1].toname);
        private_socket.emit('second_private_message', {
            agent_empcode: $rootScope.empcode,
            date: new Date(),
            from_empcode: $rootScope.empcode,
            message: msg,
            to_empcode: selectedUser.user,
            type: "transfer",
            user_empcode: selectedUser.user,
            user_details: {}
        });
        private_socket.emit('transer_agent', {
            agent_empcode: $rootScope.empcode,
            date: new Date(),
            from_empcode: $rootScope.empcode,
            message: msg,
            to_empcode: selectedUser.user,
            type: "transfer",
            user_empcode: selectedUser.user,
            user_details: {}
        })

        $scope.selectedUser.isChatEnd = true;
    }



    $scope.getLiveAgent = function () {
        // $scope.agentOnline=[]
        livechatapi.getAgentOnline(function (data) {
            //console.log("inside agent online", data);
            $scope.agentOnline = data.data;
            //console.log($scope.agentOnline);

        })
    }



    private_socket.on('agent_list', function (list) {
        //console.log("agent list", list);
        $scope.$digest();

    });

    private_socket.on('agent_new_chat', function (msg) {
        //console.log("agent_new_chat", msg)
        if ($rootScope.empcode == msg.agent) {

            $rootScope.liveChatHistory.push(msg);
        }
        $scope.$digest();

    });


    // $scope.break = function () {
    //     var name = $('.agentname').text();
    //     //console.log(name);
    //     private_socket.emit('break_message', {
    //         "agentname": name,
    //     });
    // }

    // $scope.changeButtonTxt = true;

    // $scope.$watch('changeButtonTxt', function () {
    //     $scope.toggleText = $scope.changeButtonTxt ? 'Break' : 'Resume';
    // })

    $scope.break = function () {
        // var name = $('.agentname').text();
        // //console.log(name);
        // private_socket.emit('break_message', {
        //     "emp_code": $rootScope.emp_code,
        // });
        livechatapi.agentBreakStatus({
            'domain_login_id': $rootScope.empcode
        }, function (data) {
            //console.log("agent status", data.data);

             $scope.breakStatus=data.data.break;

        })

        // $scope.breakStatus = !$scope.breakStatus;


    }

    $scope.$on('$destroy', function () {
        $scope.agentlogout();
    })


    //     $scope.encrypt=function(data){
    // //console.log("encryption key",$rootScope.FRONTEND_ENC_KEY);
    // return CryptoJS.AES.encrypt(JSON.stringify(data), "123").toString();
    //     }

    //     $scope.decrypt=function(data){
    //         //console.log("decryption key",$rootScope.FRONTEND_ENC_KEY);
    // return CryptoJS.AES.decrypt((data),"123");
    //     }

    //     //console.log("crytp test");
    //     var en= $scope.encrypt("mahesh");
    //     //console.log("encrypt for mahesh",en);
    //     //console.log("decrypt for mahesh ", $scope.decrypt(en));

    $scope.selectedUser.enableAgentEndChatMsg=false;
    $rootScope.agentEndConversation = function(no) {

        $scope.selectedUser.enableAgentEndChatMsg=true;
        //console.log("--------------------$scope.selectedUser---------- ",$scope.selectedUser);
        $rootScope.agentendmsg="";
        if(no === 1){
            //console.log("-------------Agent End----------- ");
            $rootScope.agentendmsg = "You have ended the Chat.";
        }
        else if(no === 2)
        {
            //console.log("-------------Agent User End----------- ");
            $rootScope.agentendmsg = "Your chat was terminated by "+$scope.selectedUser.user+".";
        }
            
        // $timeout(function() {
            // $rootScope.enableAgentEndChatMsg=false;
        // }, 3000);
    };


    $window.onbeforeunload = function (e) {
        e.preventDefault();
        // var confirmation = {};
        // confirmation.message = "All data willl be lost.";
        if (e.defaultPrevented) {
        //     return "All data willl be lost.";
            $rootScope.logout();
        }
        // $window.alert("Hello");
        $rootScope.logout();
        //console.log("Browser Closing-------------X_X_X_X_X_X_X_", e);
        debugger;
    };
    
    $window.onunload = function () {
        //console.log("Browser Closing-------------X_X_X_X_X_X_X_", e);
        debugger;
    };

})
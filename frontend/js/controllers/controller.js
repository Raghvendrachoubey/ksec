var globalLocale = moment.locale('hi');
var localLocale = moment();



myApp.controller('HomeCtrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state,$cookies,$location) {
        $scope.template = TemplateService.getHTML("content/home.html");
        TemplateService.title = "Home"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();

        $rootScope.uipage = "home";
        $scope.mySlides = [
            'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
            'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
        ];
        angular.element(document).ready(function() {
            new WOW().init();
            // if(!$rootScope.rotated)
            // {
            //     $timeout(function(){
            //         $rootScope.rotateoutmenu();
            //     },500);   
            // }
                //$( ".c-hamburger" ).trigger( "click" ); 
                
        });
        
        angular.element(document).ready(function () {            
            /*
            $scope.setdisconnectsocket = function(){
                var formData= {from_id:$rootScope.id};
                apiService.setdisconnectsocket(formData).then(function (data){

                });
            };

            $scope.setdisconnectsocket();
            apiService.get_session({}).then( function (response) {
                //$cookies.put("csrftoken",response.data.csrf_token);
                $cookies.put("session_id",response.data.session_id);
                $.jStorage.set("csrftoken",response.data.csrf_token);
                $rootScope.session_id =response.data.session_id;
                ////console.log(response.data);
            });*/
            var mydiv = "Hello How are you <blargh src='image.jpg' /> see you tomorrow";
            // var firstImage = mydiv.getElementsByTagName('img')[0]
            // var imgSrc = firstImage ? firstImage.src : "";
            // // or, if you want the unresolved src, as it appears in the original HTML:
            // var rawImgSrc = firstImage ? firstImage.getAttribute("src") : "";
            // //console.log(rawImgSrc);

            // var src =$(mydiv).find("blargh:first").attr("src");
            // //console.log(src);
            //$(content.replace("", "<img")).find("blargh:first").attr("src")
            var post = "Hello How are you <blargh src='image.jpg' /> see you tomorrow";
            //var firstimg = $(post).find('img:first').attr('src'); 
            ////console.log(firstimg,"img");
            // var str = '<img src="/quizs-schol/headimages/4194.png?id=51a2f7aec61ac" style="height:30px; width:40px;"> Online free quiz';
            // var imgs = $("<div>" +str +"</div>").find("img"); 
            // //console.log(imgs);
            // //console.log(str);
            // if($rootScope.uipage =='login'  && !angular.isUndefined($rootScope.uipage))
            // $rootScope.showChatwindow();
        });
        
        var tour = {
            id: "header",
            showPrevButton: true,
            showNextButton: true,
            steps: [
                {
                    title: "News",
                    content: "News",
                    target: 'marquee',
                    placement: "bottom"
                },
                {
                    title: "Chat",
                    content: "This is the header of my page.",
                    target:"div#chatImage",
                    placement: "left",
                    fixedElement:true,
                    delay:1000,
                    onNext:function(){
                        $rootScope.showChatwindow();
                    }
                    // yOffset: 30,
                    // xOffset: '50',
                    // arrowOffset: 'center'
                },
                {
                    title: "Start chatting",
                    content: "Begin conversation",
                    target: 'input#userMsg',
                    placement: "top",
                    delay:1000,
                    onPrev:function(){
                        $rootScope.minimizeChatwindow();
                    }
                },
                
            ]
        };

        // Start the tour!
        
        // $scope.IntroOptions = {
        //     steps:[
        //     {
        //         element: document.querySelector('#stepclick1'),
        //         intro: "Click here to begin.",
        //         position: 'top',
        //         onchange: function(){
        //             //do something interesting here...
        //             overlay = document.getElementsByClassName("introjs-tooltip");
        //             for(i=0; i<overlay.length; i++) {
        //                 overlay[i].style.bottom = '10px';
        //                 overlay[i].style.right = '10px';
        //                 overlay[i].style.position = 'fixed';
        //                 //Set css properties like this.
        //                 //console.log(targetElement);
        //             }
        //             $rootScope.showChatwindow();
        //         },
                
        //     },
        //     {
        //         element: document.querySelectorAll('#chat_window_1')[0],
        //         intro: "<strong>You</strong> can also <em>include</em> HTML",
        //         position: 'right'
        //     },
        //     // {
        //     //     element: document.querySelectorAll('#step2')[0],
        //     //     intro: "<strong>You</strong> can also <em>include</em> HTML",
        //     //     position: 'right'
        //     // },
        //     // {
        //     //     element: '#step3',
        //     //     intro: 'More features, more fun.',
        //     //     position: 'left'
        //     // },
        //     // {
        //     //     element: '#step4',
        //     //     intro: "Another step.",
        //     //     position: 'bottom'
        //     // },
        //     // {
        //     //     element: '#step5',
        //     //     intro: 'Get it, use it.'
        //     // }
        //     ],
        //     showStepNumbers: false,
        //     showBullets: false,
        //     exitOnOverlayClick: true,
        //     exitOnEsc:true,
        //     nextLabel: 'next',
        //     prevLabel: '<span style="color:green">Previous</span>',
        //     skipLabel: 'Exit',
        //     doneLabel: 'Thanks'
        // };
        
        // $scope.CompletedEvent = function(){
        //     //console.log('[directive] completed Event');
        // };
        // $scope.ExitEvent= function(){
        //     //console.log('[directive] exit Event');
        // };
        // $scope.ChangeEvent = function(){
        //     //console.log('[directive] change Event');
        // };
        // $scope.BeforeChangeEvent= function(){
        //     //console.log('[directive] beforeChange Event');
        // };
        // $scope.AfterChangeEvent= function(){
            
        //     //console.log('[directive] after change Event');
        // };
        // $scope.clearAndStartNewIntro = function(){
        //     $scope.IntroOptions = {
        //         steps:[
        //             {
        //                 element: document.querySelector('#stepclick1'),
        //                 intro: "Click here to begin.",
        //                 position: 'top',
                        
        //                 onchange: function(){
        //                     //do something interesting here...
        //                     $rootScope.showChatwindow();
                            
        //                 },
        //             },
        //         // {
        //         //     element: document.querySelector('#step1'),
        //         //     intro: "After being cleared, step 1"
        //         // },
        //         // {
        //         //     element: '#step2',
        //         //     intro: 'Setup and details :)',
        //         //     position: 'right'
        //         // },
        //         // {
        //         //     element: '.jumbotron',
        //         //     intro: 'We added a small feature, adding <pre>ng-intro-disable-button</pre> your buttons will be disabled when introJs is open :) <br><p style="color:red">if you\'re using anchor tags, you should prevent ng-click manually. </p> <p> <a target="_blank" href="https://github.com/mendhak/angular-intro.js/wiki/How-to-prevent-a-ng-click-event-when-a-tag--a--is-disabled%3F">click here for more details.</a></p>'
        //         // }
        //         ],
        //         showStepNumbers: true,
        //         showBullets: true,
        //         exitOnOverlayClick: false,
        //         exitOnEsc:false,
        //         nextLabel: '<strong style="color:green">Next!</strong>',
        //         prevLabel: '<span style="color:red">Previous</span>',
        //         skipLabel: 'Skip',
        //         doneLabel: 'Done'
        //     };
        
            
        //     ngIntroService.clear();
        //     ngIntroService.setOptions($scope.IntroOptions);
            
        //     ngIntroService.onComplete(function(){
        //         //console.log('update some cookie or localstorage.')
        //     });
            
        //     ngIntroService.onExit(function(){
        //         //console.log("[service] exit");
        //     });
            
        //     ngIntroService.onBeforeChange(function(){
        //         //console.log("[service] before change");
        //     });
            
        //     ngIntroService.onChange(()=>{
        //         //console.log("[service] on change");
        //     });
            
        //     ngIntroService.onAfterChange(()=>{
                
        //         //console.log("[service] after Change");
        //     });
            
        //     ngIntroService.start();
        // };


        $rootScope.checkDevice = function (){
            //window.mobileAndTabletcheck = function() {
                var check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            //};
        };
        $rootScope.access_role = $rootScope.access_role;
        angular.element(document).ready(function () {
            option ={};
            //hopscotch.startTour(tour);
            // ngIntroService.setOptions($scope.IntroOptions);
            // ngIntroService.onAfterChange(function(targetElement) {
            //     if(targetElement == 'stepclick1'){
            //         overlay = document.getElementsByClassName("introjs-tooltip");
            //         for(i=0; i<overlay.length; i++) {
            //             overlay[i].style.bottom = '10px';
            //             overlay[i].style.right = '10px';
            //             overlay[i].style.position = 'fixed';
            //             //Set css properties like this.
            //             //console.log(targetElement);
            //         }
            //     }
            // });
            // var introindex=ngIntroService.start();



            
            // introindex.start().onbeforechange(function () {

            //     if (introindex._currentStep == "2") {
            //         alert("This is step 2")
            //     } 
            // });
            // ngIntroService.onChange(function(targetElement) {  
            // //console.log(targetElement); 
            // });
        });
        $rootScope.checkCollapsed = function()
        {
            if($rootScope.checkDevice() && $(".navbar-toggle").hasClass("collapsed"))
            {   
                ////console.log("is mobile");
                $rootScope.minimizeChatwindow();
            }
        };
        
        

        
        ////console.log($.jStorage.get("notloggedin"));
        angular.element(document).ready(function () {
            /*if(!$.jStorage.get('firstreload'))
            {
                $.jStorage.set('firstreload',true);
                location.reload();
            }*/
            if(!$.jStorage.get("notloggedin"))
            {
                
            }
        });
        $rootScope.disconnect = function() {
            // userdata = {sid:$rootScope.id,name:$rootScope.fname+' '+$rootScope.lname,access_role:$rootScope.access_role,id:window.me.id};
            //     io.socket.post("/user/disconnect",{query:userdata}, function(data){
            //         //console.log(data);
            //     });
            //io.socket.reconnects = true;
            // end of workaround
            //io.sails.connect();


            
        };
    })
    myApp.controller('DashboardCtrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state) {
        $scope.template = TemplateService.getHTML("content/dashboard.html");
        TemplateService.title = "Dashboard"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $rootScope.uipage="dashboard";
        angular.element(document).ready(function () {
            $.jStorage.set('firstreload',false);
        });
        $timeout(function(){
            $rootScope.rotateoutmenu();
        },500);
    })
    myApp.controller('Dashboard2Ctrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state) {
        $scope.template = TemplateService.getHTML("content/dashboard2.html");
        TemplateService.title = "Dashboard"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $rootScope.uipage="dashboard";
        angular.element(document).ready(function () {
            $.jStorage.set('firstreload',false);
        });
        $timeout(function(){
            $rootScope.rotateoutmenu();
        },500);
    })
    myApp.controller('Dashboard4Ctrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state) {
        $scope.template = TemplateService.getHTML("content/dashboard4.html");
        TemplateService.title = "Dashboard"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $rootScope.uipage="dashboard";
        angular.element(document).ready(function () {
            $.jStorage.set('firstreload',false);
        });
        $timeout(function(){
            $rootScope.rotateoutmenu();
        },500);
    })
    myApp.controller('ProfileCtrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state,$cookies) {
        $scope.myemail = $rootScope.empcode;
        angular.element(document).ready(function() {
            $(document).on('change', '.fromdate', function(){
            //$(".fromdate").change(function() {
                $scope.getdashboarddata();
            });
            $(document).on('change', '.todate', function(){
            //$(".todate").change(function() {
                $scope.getdashboarddata();
            });
            $(document).on('change', '.datefilter2', function(){
            //$(".datefilter2").change(function() {
                $scope.getdashboarddata();
            });
            $(document).on('change', '.userlist', function(){
            //$(".userlist").change(function() {
                
                $scope.getdashboarddata();
            });
        });
        $scope.getdashboarddata = function() {
            fromdate=$(".fromdate").val();
            todate=$(".todate").val();
            datefilter2=$(".datefilter2").val();
            var date_filter = "";
            var date_filter2 = "";
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
            var today = yyyy+'-'+mm+'-'+dd;
            //datefilter 1= today, 2 = last 30 day 
            if(datefilter2 == '')
            {

            }
            else {
                if(datefilter2=='1')
                    date_filter=today;
                else if(datefilter2=='2')
                {
                    date_filter2 = moment().subtract(31, "days").format("YYYY-MM-DD");
                }
            }
            
            formData={user:$('.userlist').val(),empcode:$rootScope.empcode,fromdate:fromdate,todate:todate,date_filter:date_filter,date_filter2_todate:today,date_filter2_fromdate:date_filter2,date_filter_type:datefilter2};

            apiService.getdashboarddata(formData).then( function (response) {
                $(".tcount").text(response.data.data.t_count);
                $(".icount").text(response.data.data.i_count);
                $(".ccount").text(response.data.data.c_count);
            });
        };
        $scope.getfilterdb = function() {
            fromdate=$(".fromdate").val();
            todate=$(".todate").val();
            ////console.log(fromdate);
            ////console.log(todate);
            $scope.getdashboarddata();
        };
        angular.element(document).ready(function () {
            $timeout(function(){
                $scope.getdashboarddata();
            },1000);
            
        });
    })
    myApp.controller('Dashboard5Ctrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state,$cookies,$uibModal,Idle,$interval,toastr) {
        $scope.template = TemplateService.getHTML("content/dashboard5.html");
        TemplateService.title = "Dashboard"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
		$rootScope.getallsession=false;
		$scope.getallsession1=false;
        $rootScope.getallsessionid=false;
        $rootScope.nearme = function() {
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    
                  mysrclat = position.coords.latitude;
                  mysrclong = position.coords.longitude;
                //   console.log("current-lat",mysrclat);
                //   console.log("Long",mysrclong);
                  var formData = {
                    latitude:mysrclat,
                    longitude: mysrclong
                    };
                    apiService.gps_location(formData).then(function (callback){

                        // console.log("gps-api",callback["data"]["Result"]);

                        valueMap = "The Branch nearest to you is shown in the map below";
                        // $rootScope.pushSystemMsg(0, valueMap);
                        // $rootScope.chatlist.push({id:"id",msg:valueMap,position:"right",curTime: $rootScope.getDatetime()});

                        $.ajax({
                            url: "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDy_367PJeu1ykECzPAc7fZNPLF5bOTSlU&latlng="+callback["data"]["Result"]["latitude"]+","+callback["data"]["Result"]["longitude"]+"&sensor=true",
                            dataType: "json",
                            async: true,
                            cache: false,
                            timeout: 3000,
                            type: "GET",
                            success: function (data) {
                                
                                if(data.status == "OK"){
                                    if(data.results.length>0){
                                        $rootScope.showMap = true;
                                        var mymsgmap = { lat:callback["data"]["Result"]["latitude"],long:callback["data"]["Result"]["longitude"],address:"Address: "+callback["data"]["Result"]["address"] ,type:"SYS_MAP" };
                                        if(callback["data"]["Result"]["Text"])
                                            mymsgmap.Text = callback["data"]["Result"]["Text"];
                                        $rootScope.pushSystemMsg(0, mymsgmap);
                                        $.jStorage.set("lat",callback["data"]["Result"]["latitude"]);
                                        $.jStorage.set("long",callback["data"]["Result"]["longitude"]);
                                        $.jStorage.set("address",callback["data"]["Result"]["address"]);
                                        
                                    }
                                }
                            },
                        });

                    });
                   // Use either $scope.$apply() or $scope.evalAsync not both for same result
                    //$scope.$apply()  
                    /*$scope.$apply(function() {
                        $rootScope.lat = mysrclat;
                        $rootScope.lan = mysrclong;
                    })*/
                    //$scope.$evalAsync()
                });
            }
        };
        $rootScope.getadd = function() {
            if(!($.jStorage.get("curaddress")) )
            {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position){
                        $scope.$apply(function(){
                            $scope.position = position;
                            
                            $.jStorage.set("position",position);
                            $.jStorage.set("lat",position.coords.latitude);
                            $.jStorage.set("long",position.coords.longitude);
                            $rootScope.lat = position.coords.latitude;
                            $rootScope.lan = position.coords.longitude;
                            $.ajax({
                                url: "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDy_367PJeu1ykECzPAc7fZNPLF5bOTSlU&latlng="+position.coords.latitude+","+position.coords.longitude+"&sensor=true",
                                dataType: "json",
                                async: true,
                                cache: false,
                                timeout: 3000,
                                type: "GET",
                                success: function (data) {
                                    //console.log(data,"live user");
                                    if(data.status == "OK")
                                    {
                                        if(data.results.length>0)
                                        {
                                            $rootScope.curaddress = data.results[0].formatted_address;
                                            $.jStorage.set("curaddress",$rootScope.curaddress);
                                            //console.log($rootScope.curaddress,"live user");
                                        }
                                    }
                                },
                            });
                            //console.log(position);
                        });
                    });
                }
                $rootScope.map="";
                
            }
            else
            {
                
                $rootScope.curaddress =$.jStorage.get("curaddress");
                $scope.position=$.jStorage.get("position");
            }
        };
        $rootScope.initMap=function(lat,long,address,map_index) {
            $timeout(function(){

                // var map;
                // var latlng = new google.maps.LatLng($.jStorage.get('lat'),$.jStorage.get('long'));
                // console.log(latlng);
                
                // map = new google.maps.Map(document.getElementById('map_'+map_index), {
                //     center: latlng,
                //     //center:{lat: $.jStorage.get('lat'), lng: $.jStorage.get('long')},
                //     zoom: 12
                // });

                
                var mapOptions = {
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById('map_'+map_index), mapOptions);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng( lat,long),
                    map: map,
                    title: ''
                });
                var geolocate = new google.maps.LatLng($.jStorage.get('lat'), $.jStorage.get('long'));
                var contentString = '<div id="content"><p>'+address+'</p></div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    map: map,
                });
                google.maps.event.addListener(marker, 'click', function() {
                  infowindow.open(map,marker);
                });

                // To add the marker to the map, call setMap();
                marker.setMap(map);
                // var infowindow = new google.maps.InfoWindow({
                //     map: map,
                //     position: geolocate,
                //     content:
                //         '<h2>Latitude: ' + $.jStorage.get('lat') + '</h2>' +
                //         '<h2>Longitude: ' + $.jStorage.get('long') + '</h2>'
                // });
                
                map.setCenter(geolocate);
            },1000);
        };
		$rootScope.removetab = function(index,parentjourney){
            ////console.log("remove tab",$rootScope.tabvalue.elements);
            var li_i=$('#tab_data ul.nav-tabs li').index($('#tab_data ul.nav-tabs li[data-parentjr="'+parentjourney+'"]'));
            ////console.log(li_i);
            var pulled1 = _.pullAt($rootScope.journeylist, [index]);
            
            var pulled3 = _.pullAt($rootScope.tabvalue.element_values, [index]);
			var pulled2 = _.pullAt($rootScope.tabvalue['elements'], [index]);
            ////console.log($rootScope.journeylist+"-"+index+"-"+parentjourney);
            if($('#tab_data ul.nav-tabs li[data-parentjr="'+parentjourney+'"]').length > 0)
            {
                ////console.log(index,"tabind");
                $("#tab_data .tab-content .tab-pane").removeClass("active");
                $("#tab_data .nav-tabs li").removeClass("active");
                $("#tab_data .nav-tabs li[data-parentjr='"+parentjourney+"']").show();
                $("#tab_data .nav-tabs li:nth-child("+li_i+")").addClass("active");
                $("#tab_data .tab-content .tab-pane:nth-child("+li_i+")").addClass("active");
            }
            else {
                $("#tab_data .nav-tabs li").first().show();
                $("#tab_data .nav-tabs li").first().addClass("active");
                $("#tab_data .tab-content .tab-pane").first().addClass("active");
            }
            
        };
		$timeout(function(){
			
			if(!$.jStorage.get('accesstoken'))
			{
				$timeout(function(){
                    $rootScope.isLoggedIn = false;
					// window.location.href=$rootScope.dmpurl+"/login/user_logout";
				},500);
			}
		},1000);
		$scope.callsession = function () {
			/*apiService.gettoken({
				data:{
					user_id: $rootScope.email,
					api_key:$rootScope.BACKEND_API_KEY
				}
			}).then(function (apiresponse){
				$rootScope.djtoken=apiresponse.data;
				$.jStorage.set('djtoken',apiresponse.data);*/
				////console.log(apiresponse.data,"ttt");
                ////console.log($.jStorage.get('djtoken'),"ttt");
                $rootScope.getadd();
				$timeout(function(){
					apiService.get_session({
						user: $rootScope.empcode
					}).then(function (response) {
                        $rootScope.isLoggedIn = true;
						$rootScope.session_object = response.data.session_object;
						$cookies.put("csrftoken", response.data.csrf_token);
						$cookies.put("session_id", response.data.session_id);
						$.jStorage.set("csrftoken", response.data.csrf_token);
						$.jStorage.set("session_id", response.data.session_id);
						$rootScope.session_id = response.data.session_id;
						$.jStorage.set("conversation_id", response.data.conversation_id);
						$rootScope.conversation_id = response.data.conversation_id;
						$.jStorage.set("context_id", response.data.context_id);
						$rootScope.context_id = response.data.context_id;
						$rootScope.getallsessionid=true;
					});
				},1000);
				
			/*}).catch(function (reason) {
				$scope.callsession();
			});*/

		};
		$scope.sessionend = function() {

            
			$scope.formData = {sessionid:$rootScope.sessionid,user:$rootScope.id};
			//if($rootScope.access_role=='user')
			{
				//var formData = {user:$rootScope.empcode,emp:$rootScope.Employee_ID};
				if($.jStorage.get("accesstoken")) {
					var formData = {data:$.jStorage.get("accesstoken")};
					apiService.userlogout(formData).then(function (callback){
					
					
						$rootScope.tabvalue.elements = [];
						$rootScope.tabvalue.element_values = [];
						$.jStorage.flush();
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
			
            
        };
		$scope.getsessiondata = function() {
			
			var formData = {data:$.jStorage.get("accesstoken")};
			apiService.getsessiondata(formData).then(function (callback2){
				var bytes = CryptoJS.AES.decrypt((callback2.data.data),$rootScope.m_k);
				var callback3 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
				var callback={};
				callback.data={};
				callback.data.data=callback3;
				
				if(callback.data.data) {
                    $rootScope.isLoggedIn = true;
					$rootScope.sessionDetails=callback.data.data;
					$rootScope.BACKEND_API_KEY=callback.data.data.BACKEND_API_KEY;
					$rootScope.FRONTEND_ENC_KEY=callback.data.data.FRONTEND_ENC_KEY;
					$rootScope.B_TOKEN_KEY=callback.data.data.B_TOKEN_KEY;
					// $rootScope.id=callback.data.data._id;
					$rootScope.fname= callback.data.data['username'];
					$rootScope.lname="";
					$rootScope.email= callback.data.data['email'];
					$rootScope.branch= "";
					
					$rootScope.sessionid= callback.data.data.email;
					
					$rootScope.city="";
					$rootScope.role="";
					$rootScope.functions="";
					$rootScope.empcode=callback.data.data['email'];
					$rootScope.Employee_ID="";
					$rootScope.Employee_Name=callback.data.data['username'];
					$rootScope.state="";
					$rootScope.LOB_name="";
					$rootScope.LOB_code="";
					$rootScope.LOC_Code="";
					$rootScope.division="";
					$rootScope.segment="";
					if(callback.data.data.department)
					{	
						$rootScope.department="";
						//$.jStorage.set("department",callback.data.data.department);
					}
					if(callback.data.data.user_type)
					{
						if(callback.data.data.user_type.toLowerCase()=='maker')
						{
							if(callback.data.data.live_chat=='Yes')
							{
								$rootScope.access_role = "maker-livechat";
								$rootScope.live_chat=true;
								//$.jStorage.set("access_role", "maker-livechat");
								//$.jStorage.set("live_chat", true);
							}
							else
							{
								$rootScope.access_role = "maker";
								//$.jStorage.set("access_role", "maker");
							}
						}
						else if(callback.data.data.user_type.toLowerCase()=='checker')
						{
							if(callback.data.data.live_chat=='Yes')
							{
								$rootScope.access_role = "checker-livechat";
								$rootScope.live_chat=true;
								//$.jStorage.set("access_role", "checker-livechat");
								//$.jStorage.set("live_chat", true);
							}
							else
							{
								$rootScope.access_role = "checker";
								//$.jStorage.set("access_role", "checker");
							}
						}
						else
						{
							$rootScope.access_role = "";
							//$.jStorage.set("access_role", callback.data.data.user_type.toLowerCase());
						}
					}
					else
					{
						$rootScope.access_role = "user";
						//$.jStorage.set("access_role", "user");
					}
					$rootScope.getallsession=true;
					$scope.getallsession1=true;
					$scope.callsession();
					
				}
				
				
			}).catch(function (reason) {
                
				if(reason.status==403) {
                    $scope.sessionend();
                    // $rootScope.isLoggedIn = true;
				}
				else
					$scope.getsessiondata();
			});
			
        };
        if($.jStorage.get('accesstoken')) {
            $scope.callsession();
            $rootScope.isLoggedIn = true;
        }
            // $scope.getsessiondata();
        else {
            $rootScope.isLoggedIn = false;
        }
		angular.element(document).ready(function() {
            $rootScope.getadd();
			$(document).on('click', 'a[imgfancybox]', function(e){ 
				filename = $(this).attr("filename");
				var thislink = $(this);
				if(!$(thislink).attr("imgdata")) {
					apiService.getimagedata({filename:filename}).then(function (imagedata){
						if(imagedata.data.data) {
							$(thislink).attr("href",imagedata.data.data.filedataUrl);
							$(thislink).attr("imgdata",1);
							$timeout(function(){
								$(thislink).fancybox({
									openEffect: 'fade',
									closeEffect: 'fade',
									closeBtn: true,
									clickContent:true,
									zoom:true,
									padding: 0,
									helpers: {
										media: {},
										title: {
											type: 'over',
											position: 'bottom'
										},
										//buttons   : {}
									},
									href: imagedata.data.data.filedataUrl
								});
							},1000);
							angular.element($(thislink)).trigger('click');
						}
						else {
							toastr.warning("Image not found.", 'Warning');
						}
					});
				}
			});
		});
		$scope.lastloginsession = function () {
            // if($scope.usocketId && $scope.usocketId!='')
            
            $scope.lastloginpr=$interval(function () {
                if (!$.jStorage.get("usetsession")) {
                    $scope.sessionend();
                } else {
                    var curtime = new Date();
                    var s_time = new Date($.jStorage.get("usetsession"));
                    var diff = (curtime - s_time) / 1000;
                    ////console.log(diff,"time diff");
                    if (diff < 120) {
                        $.jStorage.set("usetsession", new Date());
                        // //console.log(diff,"timeok");
                    } else {
                        ////console.log("logout time < 15sec");
                        $scope.sessionend();
                    }
                    //$rootScope.logoutagent();
                }
            }, 10000);
        };
		$scope.$on("$destroy",function(){
			/*
			if (angular.isDefined($scope.lastloginpr)) {
				$interval.cancel($scope.lastloginpr);
			}*/
			
		});
		//$scope.lastloginsession();
        $rootScope.uipage="dashboard";
        ////console.log($rootScope.uipage);
		$scope.isCollapsed_c = true;
        $scope.isCollapsed_c1 = true;
        $scope.isCollapsed_c2 = true;
		$rootScope.access_role = $rootScope.access_role;
		$scope.tickers = [];
		$scope.notifications = [];
		$scope.postit = [];
		$scope.images = [];
		$scope.unansqueries = [];
		$scope.feedbackq = [];
		$rootScope.context_id = "";
		$rootScope.conversation_id = "";
		$scope.noticount=0;
		$scope.postcount=0;
		$scope.readpostcount=0;
		$scope.readnoticount=0;
		$scope.readunanscount=0;
		$scope.readfeedcount=0;
        $scope.folder_s = "";
		$scope.unansfcount=0;
		$scope.myjourneys = [];
		$scope.journeycount = 0;
		$rootScope.idletime=0;
		$rootScope.idleflag=1;
		$rootScope.idlestart=false;
		$scope.at = $.jStorage.get('accesstoken');
		var promise;
		$scope.promise2={};
		  // stops the interval
        $scope.stopapi = function() {
            $interval.cancel(promise);
        };
		function checkForFalse(obj){
			if(obj.children){
				for(var j=0;j<obj.children.length;j++){
					if(obj.children[j].hide == true){
						checkForFalse(obj.children[j])
					} else if(obj.children[j].hide == false){
						checkForFalse(obj.children[j])
						obj.hide = false
					}
				}
			}
		}

		function makeTrue(obj, str){
			obj.hide = true;
			// //console.log("-----maketrue str", obj);
			if(obj.children) {
				//this function makes every element as Hide=True
				for(var j=0;j<obj.children.length;j++){                        
					makeTrue(obj.children[j], str);
					// //console.log(j);
				//this loop finds all the last children/child and checks if it's document file
				//if = "d f" then hide for parent and child/ren as Hide=False
					if (obj.children[j].name === "Document File" && !obj.children[j].children){
						// obj.children[j].hide = false
						// obj.hide = false
						obj.documenticon = true;
						//console.log("inside---------", str)
						if(str.length>0){
							for(var k=0;k<str.length;k++){
								//console.log("str[k]", str[k], obj.children[j].department)
								if(str[k]===obj.children[j].department){
									obj.children[j].hide = false
									obj.hide = false
								}
							}
						}

					}
				}
			}
			checkForFalse(obj);    
		}
		function getallwidgets()  {
			////console.log($rootScope.sailscsrf);
			if($rootScope.sailscsrf && $rootScope.sailscsrf!='')
			{
				$timeout(function(){
					
				
					apiService.getidletime({}).then(function (data) {
						////console.log(data);
						if(data.data.data)
						{
							$rootScope.idletime=parseInt(data.data.data.time);
							//Idle.setIdle(parseInt(data.data.data.time));
							if($rootScope.idleflag==1 && !$rootScope.idlestart) {
								////console.log("sessting idle");
								Idle.setTimeout(parseInt(data.data.data.time));
								Idle.watch();
								$rootScope.idlestart=false;
							}
						}
					});
					var fd = {user: $rootScope.empcode,today:new Date()};
					var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(fd), $rootScope.FRONTEND_ENC_KEY).toString();
					
					apiService.getunans({
						data:ciphertext
					}).then(function (data) {
						$scope.unansqueries = data.data.data.data;
						
						/*var resciphertext= data.data.data.data;
						//var a = ciphertext.toString().replace(" ", "+");
						//var b=a.replace(" ", "+");
						var bytes = CryptoJS.AES.decrypt((resciphertext),$rootScope.FRONTEND_ENC_KEY);
						// //console.log(ciphertext);
						// //console.log(bytes);
						var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
						$scope.unansqueries=decryptedData;*/
					});
					/*
					apiService.getjourney({
						user: $rootScope.empcode,department:$rootScope.department
					}).then(function (data) {
						////console.log(data);
						$scope.myjourneys=data.data.data.data;
						//$scope.notifications = data.data.data.data;
						$scope.journeycount=data.data.data.data.length;
						//$scope.tickers=data.data.data;
					});*/
					
					apiService.getfeedback({
						data: ciphertext
					}).then(function (data) {
						////console.log(data);
						$scope.feedbackq = data.data.data;
						//$scope.tickers=data.data.data;
					});
					apiService.unansfeedbackcount({
						data: ciphertext
					}).then(function (data) {
						////console.log(data);
						$scope.unansfcount = parseInt(data.data.data.ucount)+parseInt(data.data.data.fcount);
						
					});
					apiService.getticker({today:new Date()}).then(function (data) {
						////console.log(data);
						$scope.tickers = data.data.data;
					});
					// apiService.readnotificationcount({user:$rootScope.email}).then(function (data) {
					//     ////console.log(data);
					//     //$scope.tickers = data.data.data;
					//     $scope.readnoticount = data.data.data.count;
					//     $scope.noticount = $scope.notifications.length-data.data.data.count;
					// });
					// apiService.readpostitcount({user:$rootScope.email}).then(function (data) {
					//     // if(!$scope.$$phase) {
					//     // $scope.$apply(function () {
							
					//         $scope.readpostcount=data.data.data.count;
					//     // });
					//     // }
					//         //$scope.postcount = $scope.postit.length-$scope.readpostcount;
						
					// });
					////console.log(new Date());
					apiService.getnotification({data:ciphertext}).then(function (data) {
						////console.log(data);
						$scope.notifications = data.data.data.data;
						$scope.noticount=data.data.data.data.length-data.data.data.count;
					});
					apiService.getpostit({data:ciphertext}).then(function (data) {
						////console.log(data);
						$scope.postit = data.data.data.data;
						$scope.postcount=data.data.data.data.length-data.data.data.count;
					});
					apiService.getimages({today:new Date()}).then(function (data) {
						////console.log(data);
						$scope.images = data.data.data;
						$timeout(function(){
							$('#myCarouseimages').carousel({
								interval: 3000,
								cycle:true,
								wrap:true,
								pause:'hover'
							});
						},1000);
						
					});
					if($scope.folder_s =='' || $scope.folder_s.length == 0) {
						/*apiService.getfolderstructure({
									
						}).then(function (data) {
							////console.log(data);
							//$scope.folder_s = data.data.data;
							

							$timeout(function() {


								//console.log("----xxxON FOLDER STARTxxxx-----",$rootScope.department);
								var str=$rootScope.department;
								var str_array = str.split(',');
								//console.log("----str-----", str_array);



								var ind=0;
								var abc=data.data.data;
								//console.log("----abc-----", abc);

								


								var temp1;
								_.forEach(data.data.data, function(value) {
									temp1 = JSON.parse(value.topic_data);
									makeTrue(temp1, str_array);                 
								});
								// //console.log("temp1", temp1);

								_.forEach(data.data.data, function(value) {
									abc[ind].topic_data=temp1;
									// //console.log("value.topic_data", value.topic_data);
									// findParent(value.topic_data );
									ind++;
								});
								
								// //console.log("abc",abc)
								
								// $scope.folder_s=abc;
								// //console.log("ret", ret);
								// //console.log($scope.folder_s);
								// var fsdata = JSON.parse(data.data.data.topic_data);
								// //console.log(fsdata);
								//$scope.tickers=data.data.data;
								

								$scope.folder_s=abc;




							}, 1000);
						});*/
					}
					/*
					apiService.readunanscount({user:$rootScope.empcode}).then(function (data) {
						$scope.readunanscount=data.data.data.count;
						// $scope.postcount = parseInt($scope.postit.length)-parseInt($scope.readpostcount);
					});
					apiService.readfeedbackcount({user:$rootScope.empcode}).then(function (data) {
						$scope.readfeedcount=data.data.data.count;
						// $scope.postcount = parseInt($scope.postit.length)-parseInt($scope.readpostcount);
					});*/
				
					$scope.stopapi();
				},0);	
			}
		}
		$scope.startapi = function() {
        // stops any running interval to avoid two intervals running at the same time
            
            $scope.stopapi(); 
        
        // store the interval promise
            //if($rootScope.sailscsrf && $rootScope.sailscsrf!='')
                // promise = $interval(getallwidgets, 1000);
			//else
				////console.log("no csrf");
        };
        $rootScope.$watch('isLoggedIn', function (newvalue,oldvalue) {
			////console.log(oldvalue,"old");
			////console.log(newvalue,"new");
			if(newvalue) {
                $scope.getsessiondata();
            }
        });
        $rootScope.$watch('getallsession', function (newvalue,oldvalue) {
			////console.log(oldvalue,"old");
			////console.log(newvalue,"new");
			if(newvalue) {
				if($rootScope.live_chat)
					$rootScope.live_chat='Yes';
				
				$scope.startapi();
				$interval(function() {
					// getallwidgets();
				},120000);
			}
			/*
			$interval(function(){
				$scope.checkloginstatus();
			},120000);*/
		});
        
		$scope.checkloginstatus = function() {
			apiService.loginstatus({user:$rootScope.id,token:$.jStorage.get('accesstoken')}).then(function (data) {
				if(data.data.data)
				{
					if(data.data.data.valid==0)
					{
						//alert("You are already logged in! You are now signed out");
						//$rootScope.logout();
					}
				}
				//$scope.readfeedcount=data.data.data.count;
				// $scope.postcount = parseInt($scope.postit.length)-parseInt($scope.readpostcount);
			});
		};
		
		
        $timeout(function(){
			
			if($.jStorage.get("logincount")==0 || $.jStorage.get("logincount")==1)
			{
				$timeout(function(){
					angular.element(".helpclick").trigger('click');
					$.jStorage.set("logincount",-1);
				},500);
			}
			$.jStorage.set("afirstreload",false);
			var nl = $.jStorage.get("notloggedin");
		},5000);
          // starting the interval by default
        
		
		$scope.readnotiit = function(id) {
			var fd = {user: $rootScope.empcode,id:id,today:new Date()};
			var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(fd), $rootScope.FRONTEND_ENC_KEY).toString();
			apiService.readnotiit({data:ciphertext}).then(function (data) {
				// apiService.readnotificationcount({user:$rootScope.email}).then(function (data) {
				//     // $scope.readnoticount=data.data.data.count;
				//     // $scope.noticount = $scope.notifications.length-$scope.readnoticount;
				//     $scope.noticount--;
				// });
				apiService.getnotification({data:ciphertext}).then(function (data) {
					////console.log(data);
					//$scope.notifications = data.data.data.data;
					$scope.noticount=data.data.data.data.length-data.data.data.count;
				});
			});
			/*
			apiService.readjourney({user:$rootScope.empcode,id:id}).then(function (data) {
				// apiService.readnotificationcount({user:$rootScope.email}).then(function (data) {
				//     // $scope.readnoticount=data.data.data.count;
				//     // $scope.noticount = $scope.notifications.length-$scope.readnoticount;
				//     $scope.noticount--;
				// });
				apiService.getjourney({user:$rootScope.empcode,department:$rootScope.department}).then(function (data) {
					////console.log(data);
					_.remove($scope.myjourneys,function(jr){
						return jr['_id']==id;
					});
					$scope.journeycount=data.data.data.data.length;
				});
			});*/
		};
		$scope.readpostit = function(id) {
			var fd = {user: $rootScope.empcode,id:id,today:new Date()};
			var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(fd), $rootScope.FRONTEND_ENC_KEY).toString();
			apiService.readpostit({data:ciphertext}).then(function (data) {
				// apiService.readpostitcount({user:$rootScope.email}).then(function (data) {
				//     // $scope.readpostcount=data.data.data.count;
				//     // $scope.postcount = $scope.postit.length-$scope.readpostcount;
				//     $scope.postcount--;
				// });
				apiService.getpostit({data:ciphertext}).then(function (data) {
					////console.log(data);
					// $scope.postit = data.data.data.data;
					$scope.postcount=data.data.data.data.length-data.data.data.count;
				});
			});
		};
        //window.me = {};
        /* Chat start*/
                
        ////console.log($.jStorage.get("notloggedin"));
        $rootScope.docfileindex = [];
        
        $rootScope.disconnect = function() {
            

        };



		$rootScope.getconversationid = function () {
			apiService.get_conversationid({
				user: $rootScope.empcode,conversation_id:$rootScope.conversation_id,context_id:$rootScope.context_id,session_id:$rootScope.session_id
			}).then(function (response) {
				$rootScope.session_object = response.data.session_object;
				$.jStorage.set("conversation_id", response.data.conversation_id);
				$rootScope.conversation_id = response.data.conversation_id;
				$.jStorage.set("context_id", response.data.context_id);
				$rootScope.context_id = response.data.context_id;
			});
		};

		$rootScope.getcontextid = function () {
			apiService.get_contextid({
				session_id: $rootScope.session_id,
				user: $rootScope.empcode,
				context_id: $rootScope.context_id,
				conversation_id: $rootScope.conversation_id
			}).then(function (response) {
				$rootScope.session_object = response.data.session_object;
				$.jStorage.set("context_id", response.data.context_id);
				$rootScope.context_id = response.data.context_id;

			});

		};
		
        $scope.showscript = function(index) {
            ////console.log(index);
            $(".redtext").hide();
            $(".redtext"+index).show();
            $('ul.pagination li').removeClass('active');
            $('ul.pagination li[data-index='+index+']').addClass('active');
        };
        $scope.showscript1 = function(index) {
            $timeout(function(){
                $(".redtext").hide();
                $(".redtext"+index).show();
                $('ul.pagination li').removeClass('active');
                $('ul.pagination li[data-index='+index+']').addClass('active');
            },1000);
            
        };
        
        $scope.unansdata={};
        $rootScope.$unansInstance = {};
        $rootScope.unansCancel = function() {
            ////console.log("dismissing");
            $scope.$unansInstance.dismiss('cancel');
        };
        $(document).on('click', '.dthyperlink2', function(){ 
            $(".fdashboard").hide();
            $rootScope.unansCancel();
        });
		$scope.pushfromunans = function(id,query,ans,type,uformdata){
			$rootScope.pushMsg(id,query,ans);
			$rootScope.unansCancel();
			$scope.unansfcount=$scope.unansfcount-1;
			if(type == 1)
			{
				formData2 = uformdata;
				apiService.readunans(formData2).then(function (data) {
					//$scope.readunanscount = $scope.readunanscount-1;
				});
			}
			else if(type==2)
			{
				formData2 = uformdata;
				apiService.readfeedbackq(formData2).then(function (data) {
					//$scope.readfeedcount = $scope.readfeedcount-1;
				});
			}
		};
        $scope.getunansq = function (query, type, index, old_question,mainquery,id,convid,dthyperlink,interaction_index,eventtr) {
			$scope.unans_q = query;
			$scope.old_q = mainquery;
			////console.log(mainquery);
			////console.log(query);
			var getquery="";
			if(type==1)
			{
				if(query == '')
					getquery = old_question;
				else
					getquery=query;
			}
			else {
				if(query == '')
					getquery = mainquery;
				else
					getquery=query;
			}
			$scope.unanstype=type;
			$scope.unansquery=getquery;
			$scope.$unansInstance = $uibModal.open({
				scope: $scope,
				animation: true,
				size: 'sm',
				templateUrl: 'views/modal/unans.html',
				//controller: 'CommonCtrl'
			});
			formData12 = {user:$rootScope.empcode,convid:convid,id:id,interaction_index:interaction_index,old_question:old_question,mainquery:mainquery};
			$scope.uformdata =formData12;
			$timeout(function () {
				$(eventtr).parents().find("tr").remove();
				angular.element("#unanstable").find("tr[data-index=" + index + "]").remove();
			}, 1000);
			angular.element(document).ready(function () {
			//$timeout(function(){
				//$(eventtr).closest('tr').remove();
				$(document).on('click', 'a.answered', function(e){ 
					$(e).closest('tr').remove();
					$(e).parents('tr').remove();
					// //console.log("removing");
					////console.log(e);
				});
			//},1000);
			});
			$scope.unansfcount=$scope.unansfcount-1;
			
		};
        
        $scope.gotohome = function(){
            //$state.go('home', {}, {reload: false});
        };
        // $timeout(function(){
        //     $rootScope.rotateoutmenu();
        // },500);
    })
    myApp.controller('Dashboard3Ctrl', function ($scope,$rootScope, TemplateService, NavigationService,CsrfTokenService,Menuservice, $timeout,$http,apiService,$state) {
        $scope.template = TemplateService.getHTML("content/dashboard3.html");
        TemplateService.title = "Dashboard"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $rootScope.uipage="dashboard";
        angular.element(document).ready(function () {
            $.jStorage.set('firstreload',false);
        });
        $timeout(function(){
            $rootScope.rotateoutmenu();
        },500);
    })
    .controller('LoginuserCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService,$interval, $timeout, toastr, $http,$state,apiService,$uibModal,$filter,$rootScope,$location,$cookies) {
		/*var username=$location.search().uuid;
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
		//var ciphertext = CryptoJS.AES.encrypt('KXT53758', '123456789');
 
		// Decrypt
		//var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), '123456789');
		//var plaintext = bytes.toString(CryptoJS.enc.Utf8);
		////console.log(ciphertext,"ciphertext");
		////console.log(plaintext,"decrypted");
		//username=Base64.decode(username);
		var CryptoJSAesJson = {
			stringify: function (cipherParams) {
				var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
				if (cipherParams.iv) j.iv = cipherParams.iv.toString();
				if (cipherParams.salt) j.s = cipherParams.salt.toString();
				return JSON.stringify(j);
			},
			parse: function (jsonStr) {
				var j = JSON.parse(jsonStr);
				var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
				if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
				if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
				return cipherParams;
			}
		};*/
		////console.log(username);
		//var decrypted = JSON.parse(CryptoJS.AES.decrypt((username), "58e7054c20", {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
		//var ciphertext = CryptoJS.AES.encrypt(username, '123456789');
 
		// Decrypt
		//var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), '123456789');
		
		
		//username = bytes.toString(CryptoJS.enc.Utf8);
		var username = $cookies.get("uuid");
		$cookies.remove("uuid");
        // $rootScope.usernameSS = username;
		var promise;
		$scope.stopapi = function() {
            $interval.cancel(promise);
        };
		function loginuserac() {
			if($rootScope.sailscsrf && $rootScope.sailscsrf!='') 
			{
				formData = {uuid:username};
				//formData = {};
				apiService.getuserdetail(formData).then(function (callback){
					////console.log(callback.data.data);
					if(callback.data.data) {
						$.jStorage.flush();
						$.jStorage.set("usetsession", new Date());
						$.jStorage.set("accesstoken", callback.data.data.token);
						$.jStorage.set("logincount", callback.data.data.logincount);
						/*$.jStorage.set("id", callback.data.data._id);
						
						$.jStorage.set("fname", callback.data.data['Employee Name']);
						$.jStorage.set("lname","");
						$.jStorage.set("email", callback.data.data['Email Address']);
						$.jStorage.set("branch", callback.data.data.branchname);
						
						$.jStorage.set("sessionid", callback.data.data.sessionid);
						
						$.jStorage.set("city",callback.data.data['PCITY']);
						$.jStorage.set("role",callback.data.data['New Role']);
						$.jStorage.set("function",callback.data.data['Function']);
						$.jStorage.set("empcode",callback.data.data['DOMAIN LOGIN ID']);
						$.jStorage.set("Employee_ID",callback.data.data['Employee ID']);
						$.jStorage.set("Employee_Name",callback.data.data['Employee Name']);
						$.jStorage.set("state",callback.data.data['State']);
						$.jStorage.set("LOB_name",callback.data.data['LOB name']);
						$.jStorage.set("LOB_code",callback.data.data['LOB Code']);
						$.jStorage.set("LOC_Code",callback.data.data['LOC Code']);
						$.jStorage.set("division",callback.data.data['Division']);
						$.jStorage.set("segment",callback.data.data['Business Segment']);*/
						
						if(callback.data.data.department)
						{	
							$.jStorage.set("department",callback.data.data.department);
						}
						if(callback.data.data.user_type)
						{
							if(callback.data.data.user_type.toLowerCase()=='maker')
							{
								if(callback.data.data.live_chat=='Yes')
								{
									$rootScope.access_role = "maker-livechat";
									$.jStorage.set("access_role", "maker-livechat");
									$.jStorage.set("live_chat", true);
								}
								else
								{
									$rootScope.access_role = "maker";
									$.jStorage.set("access_role", "maker");
								}
							}
							else if(callback.data.data.user_type.toLowerCase()=='checker')
							{
								if(callback.data.data.live_chat=='Yes')
								{
									$rootScope.access_role = "checker-livechat";
									$.jStorage.set("access_role", "checker-livechat");
									$.jStorage.set("live_chat", true);
								}
								else
								{
									$rootScope.access_role = "checker";
									$.jStorage.set("access_role", "checker");
								}
							}
							else
							{
								$rootScope.access_role = callback.data.data.user_type.toLowerCase();
								$.jStorage.set("access_role", callback.data.data.user_type.toLowerCase());
							}
						}
						else
						{
							$rootScope.access_role = "user";
							$.jStorage.set("access_role", "user");
						}
						/*
						if($rootScope.access_role == 'admin')
							$state.go("dashboard");
						if($rootScope.access_role == 'sms')
							$state.go("dashboard");
						else if($rootScope.access_role == 'user')
							$state.go("dashboard");
						if($rootScope.access_role == 'maker')
							$state.go("dashboard");
						if($rootScope.access_role == 'checker')
							$state.go("dashboard");
						else if($rootScope.access_role == 'maker-livechat')
							$state.go("dashboard");
						else if($rootScope.access_role == 'checker-livechat')*/
							$state.go("dashboard");
						$scope.stopapi();	
					}
					else {
						$timeout(function(){
                            $rootScope.isLoggedIn = false;
							// window.location.href=$rootScope.dmpurl+"/login/user_logout?log_stat=2";
						},500);
					}
				});
			}
		}
		
		$scope.startapi = function() {
        // stops any running interval to avoid two intervals running at the same time
            
            $scope.stopapi(); 
        
        // store the interval promise
            //if($rootScope.sailscsrf && $rootScope.sailscsrf!='')
                promise = $interval(loginuserac, 1000);
			//else
				////console.log("no csrf");
        };
        if(username != '' || !username) {
			$scope.startapi();
		}
		else {
			$timeout(function(){
                $rootScope.isLoggedIn = false;
				// window.location.href=$rootScope.dmpurl+"/login/user_logout?log_stat=2";
			},500);
		}
		//formData = {uuid:username};
		/*if($rootScope.sailscsrf)
		{
			$scope.loginuserac(formData);
		
		}
		else {
			if($rootScope.sailscsrf)
			{
				$scope.loginuserac(formData);
				$interval.cancel(promise);
			}
			else {
				promise = $interval(function(){
					$scope.loginuserac(formData);
				},1000);
			}
		}*/
		
	})
	.controller('LoginCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout, toastr, $http,$state,apiService,$uibModal,$filter,$rootScope) {
        $scope.template = TemplateService.getHTML("login.html");
        TemplateService.title = "Login"; //This is the Title of the Website
        //$scope.navigation = NavigationService.getNavigation();
        
        CsrfTokenService.getCookie("csrftoken");

        $scope.loginbg = 1;
        $scope.iframeHeight = window.innerHeight;
        $rootScope.uipage="login";
        
        $scope.formSubmitted = false;
        $scope.loginerror=0;
        //$rootScope.notLoggedin = false;
        ////console.log($.jStorage.get("notloggedin"));
        if($.jStorage.get("notloggedin"))
            $rootScope.notLoggedin = true;
        else if($rootScope.access_role=='maker-livechat')
            $state.go("agentdashboard");
        else 
            //$state.go("dashboard");
        $scope.login = function(username,password)
        {
            CsrfTokenService.getCookie("csrftoken").then(function(token) {
                $scope.formData = {username:username,password:(password),csrfmiddlewaretoken:token};
            /*
            apiService.login($scope.formData).then(function (callback){
                ////console.log(callback);
            });*/
            
                apiService.login($scope.formData).then(function (callback){
                    $scope.csrftoken=CsrfTokenService.getCookie("csrftoken");
                    
                    //if(angular.isUndefined(callback.data.error.message))
                    if(callback.data.value)
                    {
                        ////console.log(callback);
                        $.jStorage.flush();
                        $rootScope.access_role = callback.data.data.accessrole;
                        $.jStorage.set("id", callback.data.data._id);
                        $.jStorage.set("fname", callback.data.data.fname);
                        $.jStorage.set("lname", callback.data.data.lname);
                        $.jStorage.set("email", callback.data.data.email);
                        $.jStorage.set("branch", callback.data.data.branch);
                        $.jStorage.set("access_role", callback.data.data.accessrole);
                        $.jStorage.set("sessionid", callback.data.data.sessionid);
                        
                        $scope.sessiondata = {
                            id_string : callback.data.data._id,
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
                        
                        if(callback.data.data.accessrole == 4)
                            $state.go("agentdashboard");
                        else
                        {
                            //io.socket.get('/chat/addconv');
                            
                            $state.go("dashboard");
                        }
                    }
                    else if(callback.data.error.message == -1)
                        $scope.loginerror = -1;
                });
            });
           
        }; 
        $scope.openForgotpassword = function() {
            $scope.$modalInstance = $uibModal.open({
                scope: $scope,
                animation: true,
                size: 'sm',
                templateUrl: 'views/modal/forgotpassword.html',
                //controller: 'CommonCtrl'
            });
        };
        $scope.changePwdcancel = function() {
            ////console.log("dismissing");
            $scope.$modalInstance.dismiss('cancel');
            //$scope.$modalInstance.close();
        };
        $scope.forgotpasswordreq = function(email) {
            str = $filter('date')(new Date(), 'hh:mm:ss a')+email;
            $scope.formData = {email:email,resettoken:(str) };
            apiService.forgotpassword($scope.formData).then(function (callback){
                if(callback.data.value)
                {    
                    $scope.forgotpasswordSuccess=1;
                    $timeout(function () {
                        $scope.$modalInstance.dismiss('cancel');
                        $scope.forgotpasswordSuccess=0;
                    },1000);
                }
                else if (callback.data.error.message==-1)
                    $scope.forgotpassworderror =-1;
            })
        };
    })
	.controller('ForgotPasswordCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout, toastr, $http,$state,apiService,$stateParams,$interval) {
        $scope.template = TemplateService.getHTML("forgotpassword.html");
        TemplateService.title = "Forgot Password"; //This is the Title of the Website
        //$scope.navigation = NavigationService.getNavigation();
        
        //CsrfTokenService.getCookie("csrftoken");
        $scope.uipage="forgotpassword";
        $scope.userid=$stateParams.id;
        $scope.loginbg = 1;
        ////console.log($stateParams);
        $scope.expired = false;
        
        $scope.iframeHeight = window.innerHeight;
        
        $scope.loginerror=0;
        $scope.countdown = {};
        $scope.isvalidpasswordresetreq = function()
        {
            $scope.formData = { resettoken:$stateParams.id };
            apiService.isvalidpasswordresetreq($scope.formData).then(function (callback){
                if(!callback.data.value)
                {
                    $scope.loginerror = -1;
                    $timeout(function(){
                        $state.go("login");
                    },1000);
                }
                else
                {
                    $scope.refreshTimer(callback.data.data.expirydate);
                }
            });   
        };
        

        $scope.isvalidpasswordresetreq();
        $scope.refreshTimer = function(expiryTime) 
        {
            
            expiryTime = new Date(expiryTime);
            t = expiryTime.getTime();
            var tempTime = moment.duration(t);
            var y = tempTime.hours() +":"+ tempTime.minutes();
            
            expiryDate = moment(expiryTime).format("YYYY-MM-DD");
            expiryTime = new Date(expiryDate+" "+y);
            $scope.rightNow = new Date();
            $scope.diffTime = expiryTime - $scope.rightNow;
            var duration = moment.duration($scope.diffTime, 'milliseconds');
            
            $interval(function() {

                duration = moment.duration(duration - 1000, 'milliseconds');
                
                if (duration._milliseconds > 0) {

                    $scope.expired = false;
                } else {

                    $scope.expired = true;
                }
                $scope.countdown.months = duration.months();
                $scope.countdown.days = duration.days();
                $scope.countdown.hours = duration.hours();
                $scope.countdown.minutes = duration.minutes();
                $scope.countdown.seconds = duration.seconds();
                
            }, 1000);
        };
        $scope.changepassword = function(password)
        {
            
            $scope.formData = {resettoken:$scope.userid,password:(password)};
            
            
            apiService.changepassword2($scope.formData).then(function (callback){
                if(!callback.data.value)
                    $scope.loginsuccesserror = -1;
                else
                {
                    $scope.changepasswordSuccess = 1;
                    $timeout(function(){
                        $.jStorage.flush();
                        $state.go("login");
                    },1000);
                }
            });
            
        }; 
        
    })
	.controller('LogoutuserCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout,$uibModal, toastr, $http,$state,apiService,$cookies,$rootScope) {
        var date = new Date();
        $scope.FromDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
		$rootScope.branchdata =$rootScope.LOC_Code;
		$rootScope.roledata =$rootScope.role;
		$scope.department =$rootScope.department;
        $rootScope.userlogout = function() {

            
			$scope.formData = {sessionid:$rootScope.sessionid,user:$rootScope.id};
			apiService.logout($scope.formData).then(function (callback){
				
				
				$rootScope.tabvalue.elements = [];
				$rootScope.tabvalue.element_values = [];
				$.jStorage.flush();
				//$state.go("login");
				$timeout(function(){
                    $rootScope.isLoggedIn = false;
					// window.location.href=$rootScope.dmpurl+"/login/user_logout?log_stat=2";
				},500);
				
			});
            
            
        };
		$rootScope.userlogout();
	})
	.controller('LogoutCtrl', function ($scope, TemplateService, NavigationService,CsrfTokenService, $timeout,$uibModal, toastr, $http,$state,apiService,$cookies,$rootScope) {
        var date = new Date();
        $scope.FromDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
		$rootScope.branchdata =$rootScope.LOC_Code;
		$rootScope.roledata =$rootScope.role;
		$scope.department =$rootScope.department;
        $rootScope.userlogout2 = function() {

            
			$scope.formData = {sessionid:$rootScope.sessionid,user:$rootScope.id};
			apiService.logout($scope.formData).then(function (callback){
				
				
				$rootScope.tabvalue.elements = [];
				$rootScope.tabvalue.element_values = [];
				$.jStorage.flush();
				//$state.go("login");
				$timeout(function(){
                    $rootScope.isLoggedIn = false;
					// window.location.href=$rootScope.dmpurl+"/login/user_logout?log_stat=1";
				},500);
				
			});
            
            
        };
		$rootScope.userlogout2();
	})
    .controller('CommonCtrl', function ($scope, TemplateService,livechatapi, NavigationService,CsrfTokenService, $timeout,$uibModal, toastr, $http,$state,apiService,$cookies,$rootScope) {
        var date = new Date();
        $scope.FromDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
		
		// $scope.getsessiondata = function() {
			
		// 	var formData = {data:$.jStorage.get("accesstoken")};
		// 	apiService.getsessiondata(formData).then(function (callback2){
				
		// 		var bytes = CryptoJS.AES.decrypt((callback2.data.data),$rootScope.m_k);
		// 		var callback3 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		// 		var callback={};
		// 		callback.data={};
		// 		callback.data.data=callback3;
				
		// 		if(callback.data.data) {
		// 			$rootScope.fname= callback.data.data['Employee Name'];
		// 			$rootScope.lname="";
		// 			$rootScope.branch= callback.data.data.branchname;
					
		// 			$scope.fullname=$rootScope.fname;
		// 			$rootScope.city=callback.data.data['PCITY'];
		// 			$rootScope.role=callback.data.data['New Role'];
		// 			$rootScope.empcode=callback.data.data['DOMAIN LOGIN ID'];
		// 			$rootScope.Employee_ID=callback.data.data['Employee ID'];
		// 			$rootScope.Employee_Name=callback.data.data['Employee Name'];
		// 			if(callback.data.data.department)
		// 			{	
		// 				$rootScope.department=callback.data.data.department;
		// 				//$.jStorage.set("department",callback.data.data.department);
		// 			}
		// 			if(callback.data.data.user_type)
		// 			{
		// 				if(callback.data.data.user_type.toLowerCase()=='maker')
		// 				{
		// 					if(callback.data.data.live_chat=='Yes')
		// 					{
		// 						$rootScope.access_role = "maker-livechat";
		// 						$rootScope.live_chat=true;
		// 						//$.jStorage.set("access_role", "maker-livechat");
		// 						//$.jStorage.set("live_chat", true);
		// 					}
		// 					else
		// 					{
		// 						$rootScope.access_role = "maker";
		// 						//$.jStorage.set("access_role", "maker");
		// 					}
		// 				}
		// 				else if(callback.data.data.user_type.toLowerCase()=='checker')
		// 				{
		// 					if(callback.data.data.live_chat=='Yes')
		// 					{
		// 						$rootScope.access_role = "checker-livechat";
		// 						$rootScope.live_chat=true;
		// 						//$.jStorage.set("access_role", "checker-livechat");
		// 						//$.jStorage.set("live_chat", true);
		// 					}
		// 					else
		// 					{
		// 						$rootScope.access_role = "checker";
		// 						//$.jStorage.set("access_role", "checker");
		// 					}
		// 				}
		// 				else
		// 				{
		// 					$rootScope.access_role = callback.data.data.user_type.toLowerCase();
		// 					//$.jStorage.set("access_role", callback.data.data.user_type.toLowerCase());
		// 				}
		// 			}
		// 			else
		// 			{
		// 				$rootScope.access_role = "user";
		// 				//$.jStorage.set("access_role", "user");
		// 			}
		// 			$rootScope.branchdata =$rootScope.branch;
		// 			$rootScope.roledata =$rootScope.role;
		// 			$scope.department =$rootScope.department;
		// 		}
		// 	});
			
		// };
		// $scope.getsessiondata();

        // $rootScope.logoutLiveAgent = function(){
        //     // if($rootScope.agentconnected){
        //         livechatapi.agentLogout({
        //             'domain_login_id': $rootScope.empcode
        //         }, function (data) {
        //             //console.log("agent logout", data)
        //         })
        //     // }
        // }

        // $rootScope.logout = function() {
        //     //console.log("LOGOUT !!!!!!!!!!!!!!", $rootScope.agentconnected)

        //     if($rootScope.liveChatHistory && $rootScope.private_live_socket){
        //         for (var i = 0; i < $rootScope.liveChatHistory.length; i++) {
        //             $rootScope.private_live_socket.emit('end_user_message', {

        //                 agent_empcode: $rootScope.empcode,
        //                 date: new Date(),
        //                 from_empcode: $rootScope.empcode,
        //                 message: "ending chat------from logout ctrl",
        //                 to_empcode: $rootScope.liveChatHistory[i].user,
        //                 type: "end_chat",
        //                 user_empcode: $rootScope.liveChatHistory[i].user,
        //                 user_details: {}
        //             });
        //         }
                
        //     }
            
        //     if($rootScope.agentconnected){             
        //         livechatapi.userlogOut(
        //             {
        //                 'user_empcode': $rootScope.empcode,
        //                 'domain_login_id':$rootScope.connectedAgentName
        //             },
        //             function(data){
        //                 $rootScope.agentconnected = false;
        //                 //console.log("live user logout ",data);
        //             }
        //         )                
        //     }

        //     livechatapi.agentLogout({
        //         'domain_login_id': $rootScope.empcode
        //     }, function (data) {
        //         //console.log("agent logout", data)
        //     })

        //     if($rootScope.access_role=='user')
        //     {
        //         //var formData = {user:$rootScope.empcode,emp:$rootScope.Employee_ID};
        //         if($.jStorage.get("accesstoken")) {
		// 			var formData = {data:$.jStorage.get("accesstoken")};
		// 			apiService.userlogout(formData).then(function (callback){
					
					
		// 				$rootScope.tabvalue.elements = [];
		// 				$rootScope.tabvalue.element_values = [];
		// 				$.jStorage.flush();
						
		// 				//$state.go("login");
						
						
		// 			});
		// 		}
		// 		else {
		// 			$timeout(function(){
        //                 $rootScope.isLoggedIn = false;
		// 				// window.location.href=$rootScope.dmpurl+"/login/user_logout";
		// 			},500);
		// 		}
        //     }
        //     CsrfTokenService.getCookie("csrftoken").then(function(token) {
        //         $scope.formData = {sessionid:$rootScope.sessionid,user:$rootScope.id,csrfmiddlewaretoken:token};
        //         apiService.logout($scope.formData).then(function (callback){
                    
                    
        //             $rootScope.tabvalue.elements = [];
        //             $rootScope.tabvalue.element_values = [];
        //             $.jStorage.flush();
                    
        //             //$state.go("login");
        //             $timeout(function(){
        //                 $rootScope.isLoggedIn = false;
        //                 // if($rootScope.access_role=='user')
        //                 //     window.location.href=$rootScope.dmpurl+"/login/user_logout";
        //                 // else
        //                 //     window.location.href=$rootScope.dmpurl+"/login/user_logout?log_stat=1";
        //             },500);
                    
        //         });
            
        //     });


        // };
		
		
			
        // $scope.$modalInstance = {};
        // $scope.openChangePwd = function() {
        //     $scope.$modalInstance = $uibModal.open({
        //         scope: $scope,
        //         animation: true,
        //         //size: 'sm',
        //         templateUrl: 'views/modal/changepassword.html',
        //         //controller: 'CommonCtrl'
        //     });
        // };
        // $scope.changePwdcancel = function() {
        //     ////console.log("dismissing");
        //     $scope.$modalInstance.dismiss('cancel');
        //     //$scope.$modalInstance.close();
        // };
        // $scope.passworderror=0
        // $scope.changepasswordSuccess=0;
          
        // $scope.changepassword = function(currentpassword,newpassword,newpassword2) {
        //      ////console.log(newpassword);
        //     userid = $rootScope.id;
        //     $scope.token="";
        //     CsrfTokenService.getCookie("csrftoken").then(function(done) {
        //         $scope.token=done;
        //         $scope.formData = {userid:userid,oldpassword:(currentpassword),newpassword:(newpassword),csrfmiddlewaretoken:$scope.token };
        //         ////console.log($scope.formData);
        //         apiService.changepassword($scope.formData).then(function (callback){
        //             if(callback.data.value)
        //             {    
        //                 $scope.changepasswordSuccess=1;
        //                 $timeout(function () {
        //                     $scope.$modalInstance.dismiss('cancel');
        //                     $scope.changepasswordSuccess=0;
        //                 },500);
        //             }
        //             else if (callback.data.error.message==-1)
        //                 $scope.passworderror =-1;
        //         })    
        //     });  
        // };
        
        // $timeout(function () {
        
        //     $('span.thumbsup').click(function (event) {
        //         $(this).css("color", "#ed232b");
        //         $('.thumbsdown').css("color", "#444");
        //     });
        //     $('span.thumbsdown').click(function (event) {
        //         $(this).css("color", "#ed232b");
        //         $('.thumbsup').css("color", "#444");
        //     });
        // },200); 
    })
    .controller('LoginDetCtrl', function ($scope,$rootScope, TemplateService, NavigationService, $timeout, toastr, $http,$state,apiService) {
        $scope.fullname = "";
        $scope.branch = "";
        if($rootScope.id == null || $rootScope.id == "" || $rootScope.id==0)
        {
            $.jStorage.set("notloggedin",true);
            $rootScope.notLoggedin = true;
            //$state.go("login");
        }    
        else
        {
            $scope.fullname = $rootScope.fname+" "+$rootScope.lname;
            $scope.branch = $rootScope.branch;
            $.jStorage.set("notloggedin",false);
            $rootScope.notLoggedin = false;
        }
        
    })
    .controller('ChangePasswordCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http,$state,apiService) {
        
        
    })
    
    .controller('FormCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
        $scope.template = TemplateService.getHTML("content/form.html");
        TemplateService.title = "Form"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $scope.formSubmitted = false;
        // $scope.data = {
        //     name: "Chintan",
        //     "age": 20,
        //     "email": "chinyan@wohlig.com",
        //     "query": "query"
        // };
        $scope.submitForm = function (data) {
            ////console.log("This is it");
            return new Promise(function (callback) {
                $timeout(function () {
                    callback();
                }, 5000);
            });
        };
    })

    .filter('highlight', function($sce) {
        return function(text, phrase) {
            if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
            '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    })
    .controller('ViewmatrixCtrl', function ($scope,$rootScope, $uibModalInstance, items) {
        $scope.items = items;
		
	})
	.controller('ViewcontentCtrl', function ($scope,$rootScope, $uibModalInstance, items) {
        $scope.items = items;
		
		$scope.copydata = function(copydata,id) {
			/*var aux = document.createElement("input");
			aux.setAttribute("value", copydata);
			document.body.appendChild(aux);
			aux.select();
			document.execCommand("copy");

			document.body.removeChild(aux);*/
			tableId = "#table_data"+id+" ng-bind-html";//#bugfix 14-11 copy data
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
	})
    .controller('ViewCtrl', function ($scope,$rootScope, $uibModalInstance, items) {
        $scope.items = items;
        _.each(items.contentobj,function(v,k){
            if(v.type == items.viewdata)
            {
                ////console.log("Exist");
                $scope.displaydata = v.data;
                $scope.displaydata.type = v.type;
            }
        });
        // //console.log(items);
        // //console.log($scope.displaydata);
        if($rootScope.viewdata == 'Address_Change')
        {
            $scope.modaltitle = "Address Change";
        }
        if($rootScope.viewdata == 'Dormant_Activation')
        {
            $scope.modaltitle = "Dormant Activation";
        }
        if($rootScope.viewdata == 'verify_seeding_info')
        {
            $scope.modaltitle = "Verify seeding info";
        }
        if($rootScope.viewdata == 'name_mismatch_table')
        {
            $scope.modaltitle = "Name Mismatch Table";
        }
        
    })
    .controller('View2Ctrl', function ($scope,$rootScope, $uibModalInstance, items) {
        $scope.items = items;
        $scope.data=items.viewdata;
        $scope.img=items.image;
        // _.each(items.contentobj,function(v,k){
        //     if(v.type == items.viewdata)
        //     {
        //         //console.log("Exist");
        //         $scope.displaydata = v.data;
        //         $scope.displaydata.type = v.type;
        //     }
        // });
        // //console.log(items);
        // //console.log($scope.displaydata);
        
            $scope.modaltitle = "Info";
        
        
        
    })
    .controller('SpeechRecognitionController', function ($scope, $rootScope) {

        var vm = this;

        vm.displayTranscript = displayTranscript;
        vm.transcript = '';
        function displayTranscript() {
            vm.transcript = $rootScope.transcript;
            // console.log("transcript",$rootScope.transcript);
            $(".chatinput").val($rootScope.transcript);
            // alert($rootScope.transcript);
              //code for speaker 
               // console.log("getsys -- chatlist aaa",$rootScope.chatlist) ;
               // var lastItem = $rootScope.chatlist.pop();
            if($rootScope.chatlist.length>1){
                    var ch=$rootScope.chatlist[$rootScope.chatlist.length - 1];
             // console.log("getsys -- chatlist last", ch.msg) ;
                if(ch.msg.tiledlist){
                  var zerotiledlist=ch.msg.tiledlist[0];
                    //zerotiledlist[0];
                    var found=false;
                    if(zerotiledlist.DT){
                        var DT=zerotiledlist.DT;
                        console.log("this id DT",DT);
                        for(var i = 0; i <= DT.length-1; i++){
                            var reg2 = new RegExp("^"+$rootScope.transcript+"","i");
                            console.log("DT[i]DT[i]",DT[i]);
                            // var found = $rootScope.transcript.match(reg2);
                            found = reg2.test(DT[i]);
                            if(found)
                            {
                                if(!zerotiledlist.form_name)
                                    zerotiledlist.form_name = "";
                                $rootScope.getDthlinkRes(zerotiledlist.Stage,DT[i],zerotiledlist.form_name);
                                // $rootScope.pushMsg(0,$rootScope.transcript,"");
                                break;
                            }
                            
                            
                        }
                        if(!found) {
                            if($rootScope.transcript=='apply online'){
                               $rootScope.showQuerybtn ();
                            }else if($rootScope.transcript=='bill payment'){
                                 $rootScope.showQuerybtn2();
                            }else if($rootScope.transcript=='bank transfer'){
                                 $scope.showbanktransfer();
                            }else if($rootScope.transcript=='Statement'){
                                $rootScope.getcommonquery();
                            }else{
                                 $rootScope.pushMsg(0,$rootScope.transcript,"");
                            }
                        }
                    }
                    else  {
                        if($rootScope.transcript=='apply online'){
                           $rootScope.showQuerybtn ();
                        }else if($rootScope.transcript=='bill payment'){
                             $rootScope.showQuerybtn2();
                        }else if($rootScope.transcript=='bank transfer'){
                             $scope.showbanktransfer();
                        }else if($rootScope.transcript=='Statement'){
                            $rootScope.getcommonquery();
                        }else{
                             $rootScope.pushMsg(0,$rootScope.transcript,"");
                        }
                    }
                    //console.log("zero element", zerotiledlist[0]);
                }
                else {
                    if($rootScope.transcript=='apply online'){
                       $rootScope.showQuerybtn ();
                    }else if($rootScope.transcript=='bill payment'){
                         $rootScope.showQuerybtn2();
                    }else if($rootScope.transcript=='bank transfer'){
                         $scope.showbanktransfer();
                    }else if($rootScope.transcript=='Statement'){
                        $rootScope.getcommonquery();
                    }else{
                         $rootScope.pushMsg(0,$rootScope.transcript,"");
                    }


                    
                }
            }else{
                if($rootScope.transcript=='apply online'){
                   $rootScope.showQuerybtn ();
                }else if($rootScope.transcript=='bill payment'){
                     $rootScope.showQuerybtn2();
                }else if($rootScope.transcript=='bank transfer'){
                     $scope.showbanktransfer();
                }else if($rootScope.transcript=='Statement'){
                    $rootScope.getcommonquery();
                }else{
                     $rootScope.pushMsg(0,$rootScope.transcript,"");
                }
            }
            $(".chatinput").val("");
      //end of code for speaker
            

            //This is just to refresh the content in the view.
            // if (!$scope.$$phase) {
            //     $scope.$digest();
            //     //console.log("transcript",$rootScope.transcript);
            //     $(".chatinput").val("");
            // }

        }
        $rootScope.startspeech = function() {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            // console.log("new func");
        // recognition.onresult = function(event) 
            { 
                // console.log(event); 
            }
            recognition.start();
          
        };
        /**
         * Handle the received transcript here.
         * The result from the Web Speech Recognition will
         * be set inside a $rootScope variable. You can use it
         * as you want.
         */
        $rootScope.speechStarted = function() {
            console.log("speech Started");
        };
    

    })
    // Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        apiService.getDemo($scope.formData, function (data) {
            ////console.log(data);
        });
    });

    
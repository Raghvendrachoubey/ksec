myApp.factory('Menuservice', function($rootScope,$http, $q, $timeout,apiService,CsrfTokenService,$httpParamSerializer,$cookies) {
    return {
        foo: function() {
            alert("I'm foo!");
        },
        create_tabs : function(nodevalue){
            //console.log(nodevalue);
            CsrfTokenService.getCookie("csrftoken").then(function(token) {
                tabData = {node_value:nodevalue,csrfmiddlewaretoken:$rootScope.getCookie("csrftoken"),user_id:$cookies.get("session_id")};
                $rootScope.tabvalue = [];
                $rootScope.selectTabIndex = 0;
                apiService.gettabdata(tabData).then(function (data){
                    $rootScope.selectTabIndex = 0;
                    $rootScope.tabvalue = data.data.node_data;
                   
                    $timeout(function() {
                        $('#tab_data ul li').first().addClass('active');
                        $('#tab_data .tab-content .tab-pane').first().addClass('active');
                    });
                    return data.data;
                });
            });
            // $timeout(function() {
            //     for(i=0; i<data.data.node_data.elements.length;i++){
                    
            //             $('#tab_data').append('<li role="presentation"><a href="#tab'+i+'" aria-controls="tab'+i+'" role="tab" data-toggle="tab">'+data.data.node_data.elements[i]+'</a></li>');
            //             $('#tab-content').append('<div role="tabpanel" class="tab-pane" id="tab'+i+'"><p class="tab-con">'+data.data.node_data.element_values[i]+'</p></div>');
                    
            //     }
            // },200);
        }
    };
});
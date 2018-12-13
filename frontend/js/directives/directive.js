myApp.directive('img', function ($compile, $parse) {
        return {
            restrict: 'E',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                if (!attrs.noloading) {
                    $element.after("<img src='img/loading.gif' class='loading' />");
                    var $loading = $element.next(".loading");
                    $element.load(function () {
                        $loading.remove();
                        $(this).addClass("doneLoading");
                    });
                } else {
                    $($element).addClass("doneLoading");
                }
            }
        };
    })

    .directive('hideOnScroll', function ($document) {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                var $element = $(element);
                var lastScrollTop = 0;
                $(window).scroll(function (event) {
                    var st = $(this).scrollTop();
                    if (st > lastScrollTop) {
                        $(element).addClass('nav-up');
                    } else {
                        $(element).removeClass('nav-up');
                    }
                    lastScrollTop = st;
                });
            }
        };
    })
    .directive('langCase1', function ($compile, $parse) {
        return {
            restrict: 'A',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                if (!attrs.noloading) {
                    $element.after("<img src='img/loading.gif' class='loading' />");
                    var $loading = $element.next(".loading");
                    $element.load(function () {
                        $loading.remove();
                        $(this).addClass("doneLoading");
                    });
                } else {
                    $($element).addClass("doneLoading");
                }
            }
        };
    })
    .directive('compTranslate', function ($compile, apiService,$sce) {
        return {
            restrict: 'A',
            scope: true,
            priority: 0,
            compile: function (element, attrs) {
                var originalText = element.text();
                //var originalTooltip = attrs['tooltip'];
                //console.log(originalText);
                return {
                    pre: function (scope, element, attrs) {
                        scope.originalText = originalText;
                        //scope.originalTooltip = originalTooltip;
                    
                        
                        var translationChangeOccurred = function () {
                            attrs.$observe('compTranslate', function(value) {
                                var languageid = $.jStorage.get("language");
                                var formData = { "text": value,"language":languageid };
                                //console.log(formData);
                                //element.text(value);
                                //element.html(apiService.translate(formdata));
                                if(languageid == "en")
                                {
                                    
                                    hcont=$.parseHTML(value);
                                    element.html(hcont);
                                    $( "ul.chat li:last-child" ).removeClass('langcase');
                                }
                                else 
                                {
                                    apiService.translate(formData).then( function (response) {
                                        // html =$sce.trustAsHtml(response.data.data);
                                        // bindhtml = "<span ng-bind-html='"+html+"'>{{"+html+"}}<span>";
                                        //console.log(response.data.data);
                                        element.html(response.data.data);
                                        $( "ul.chat li:last-child" ).removeClass('langcase');
                                    });
                                }
                                    // if (scope.originalTooltip) {
                                //     attrs.$set('tooltip', translationService.translate(scope.originalTooltip));
                                // }
                                $compile(element.contents())(scope);
                                
                            });
                        };
                        //translation changes by default while linking!
                        translationChangeOccurred();
            
                        scope.$on('$translationLanguageChanged', translationChangeOccurred);
                    },
                    post: function () {
                    }
                };
            }
        };
    })
    .directive('filterTranslate', function ($compile, apiService,$sce) {
        return {
            restrict: 'A',
            scope: true,
            priority: 0,
            compile: function (element, attrs) {
                var originalText = element.text();
                //var originalTooltip = attrs['tooltip'];
                //console.log(originalText);
                return {
                    pre: function (scope, element, attrs) {
                        scope.originalText = originalText;
                        //scope.originalTooltip = originalTooltip;
                    
                        var translationChangeOccurred = function () {
                            attrs.$observe('filterTranslate', function(value) {
                                var languageid = $.jStorage.get("language");
                                value = value.replace(new RegExp('('+$(".chatinput").val()+')', 'gi'),
                                    '<span class="highlighted"> $& </span>');
                                var formData = { "text": value,"language":languageid };
                                //console.log(element);
                                //element.text(value);
                                //element.html(apiService.translate(formdata));
                                
                                //console.log(value);
                                if(languageid == "en")
                                {
                                    hcont=$.parseHTML(value);
                                    element.html(hcont);
                                    $( "ul.chat li:last-child" ).removeClass('langcase');
                                }
                                else 
                                {
                                    apiService.translate(formData).then( function (response) {
                                        // html =$sce.trustAsHtml(response.data.data);
                                        // bindhtml = "<span ng-bind-html='"+html+"'>{{"+html+"}}<span>";
                                        //console.log(response.data.data);
                                        texttoreplace = response.data.data;
                                        texttoreplace=texttoreplace.replace('<span class = \"highlighted\">', '<span class = "highlighted">'); 
                                        texttoreplace=texttoreplace.replace('</ span>', '</span>'); 
                                        element.html(texttoreplace);
                                        $( "ul.chat li:last-child" ).removeClass('langcase');
                                    });
                                }
                                    // if (scope.originalTooltip) {
                                //     attrs.$set('tooltip', translationService.translate(scope.originalTooltip));
                                // }
                                $compile(element.contents())(scope);
                                
                            });
                        };
                        //translation changes by default while linking!
                        translationChangeOccurred();
            
                        scope.$on('$translationLanguageChanged', translationChangeOccurred);
                    },
                    post: function () {
                    }
                };
            }
        };
    })
    .directive('compTranslater', function ($compile, apiService,$sce) {
        return {
            restrict: 'EA',
            scope: true,
            priority: 0,
            compile: function (element, attrs) {
                var originalText = element.text();
                //var originalTooltip = attrs['tooltip'];
                //console.log(originalText);
                return {
                    pre: function (scope, element, attrs) {
                        scope.originalText = originalText;
                        //scope.originalTooltip = originalTooltip;
                    
                        var hcont = "";
                        var translationChangeOccurred = function () {
                            attrs.$observe('compTranslater', function(value) {
                                var languageid = $.jStorage.get("language");
                                contents = attrs.content;  
                                contents=contents.replace('↵',' <br> ');  
                                //contents=contents.replace(" ",' <br> '); 
                                contents = contents.replace("\n","<br>");     
                                contents = contents.replace(new RegExp("../static/data_excel/", 'g'), adminurl2+'static/data_excel/');     
                                var formData = { "text": contents,"language":languageid };
                                //element.text(value);
                                //element.html(apiService.translate(formdata));
                                if(languageid == "en")
                                {
                                    hcont=$.parseHTML(contents);
                                    element.html(hcont);
                                    $( "ul.chat li:last-child" ).removeClass('langcase');
                                }
                                else 
                                {
                                    apiService.translate(formData).then( function (response) {
                                        // html =$sce.trustAsHtml(response.data.data);
                                        // bindhtml = "<span ng-bind-html='"+html+"'>{{"+html+"}}<span>";
                                        //hcont = $sce.trustAsHtml(response.data.data);
                                        hcont=$.parseHTML(response.data.data);
                                        
                                        //hcont= $compile(hcont)(scope);
                                        element.html(hcont);
                                        $( "ul.chat li:last-child" ).removeClass('langcase');
                                    });
                                // if (scope.originalTooltip) {
                                //     attrs.$set('tooltip', translationService.translate(scope.originalTooltip));
                                // }
                                }
                                $compile(element.contents())(scope);
                                
                            });
                            // scope.$watch(
                            //     function(scope) {
                            //         return scope.$eval(attrs.compile);
                            //         //$compile(element.contents())(scope);
                            //     },
                            //     function(value) {
                            //         // when the 'compile' expression changes
                            //         // assign it into the current DOM
                            //         element.html(hcont);

                            //         // compile the new DOM and link it to the current
                            //         // scope.
                            //         // NOTE: we only compile .childNodes so that
                            //         // we don't get into infinite loop compiling ourselves
                            //         $compile(element.contents())(scope);
                            //     }                                    
                            // );
                        };
                        //translation changes by default while linking!
                        translationChangeOccurred();
            
                        scope.$on('$translationLanguageChanged', translationChangeOccurred);
                    },
                    post: function () {
                    }
                };
            }
        };
    })
	/*
	.directive('fancyboxable', function ($document,$compile,$timeout) {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                var $element = $(element);
                var target;
                if (attr.rel) {
                    target = $("[rel='" + attr.rel + "']");
                } else {
                    target = element;
                }
				//var linkFn = $compile(target);
            //var content = linkFn(scope);
            //element.append(content);
			$timeout(function(){
                $("[rel='" + attr.rel + "']").fancyboxPlus({
                    openEffect: 'fade',
                    closeEffect: 'fade',
                    closeBtn: true,
                    padding: 0,
                    helpers: {
                        media: {}
                    },
					overlayColor:'#000',
					'autoDimensions'	: true,
                    titlePosition:'inside',
					'height': 'auto',
                });
			},500);
            }
        };
    })*/
	
    .directive('fancybox', function ($document) {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                var $element = $(element);
                var target;
                if (attr.rel) {
                    target = $("[rel='" + attr.rel + "']");
                } else {
                    target = element;
                }

                target.fancybox({
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
					afterShow :function() {
						 $('.fancybox-button--zoom').click();
					  }
                });
            }
        };
    })
	.directive('newfancybox', function ($document) {
        return {
            restrict: 'EA',
            replace: false,
            link: function (scope, element, attr) {
                var $element = $(element);
                var target;
                if (attr.rel) {
                    target = $("[rel='" + attr.rel + "']");
                } else {
                    target = element;
                }

                target.fancybox({
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
					//fitToView: true,
					/*beforeShow: function () {
						this.width = 800;
						this.height = 600;
						$(".fancybox-slide").css({
							"width": 800,
							"height": 600
						});

					},
					afterShow :function() {
						 $('.fancybox-button--zoom').click();
					  }*/
                });
            }
        };
    })

    .directive('autoHeight', function ($compile, $parse) {
        return {
            restrict: 'EA',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                var windowHeight = $(window).height();
                $element.css("min-height", windowHeight);
            }
        };
    })
    .directive('chatbotHeight', function ($compile, $parse) {
        return {
            restrict: 'EA',
            replace: false,
            link: function ($scope, element, attrs) {
                var $element = $(element);
                var windowHeight = $(window).height();
                var chatbotH = windowHeight - 53;
                //$element.css("min-height", chatbotH);
                $element.height(chatbotH);
                // var w = angular.element($window);
                // w.bind('chatbotHeight', function () {
                //     scope.$apply();
                // });
            }
        };
    })


    .directive('replace', function () {
        return {
            require: 'ngModel',
            scope: {
                regex: '@replace',
                with: '@with'
            },
            link: function (scope, element, attrs, model) {
                model.$parsers.push(function (val) {
                    if (!val) {
                        return;
                    }
                    var regex = new RegExp(scope.regex);
                    var replaced = val.replace(regex, scope.with);
                    if (replaced !== val) {
                        model.$setViewValue(replaced);
                        model.$render();
                    }
                    return replaced;
                });
            }
        };
    })
    
    .directive('validPasswordC', function() {
        return {
            require: 'ngModel',
            scope: {

              reference: '=validPasswordC'

            },
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue, $scope) {

                    var noMatch = viewValue != scope.reference
                    ctrl.$setValidity('noMatch', !noMatch);
                    return (noMatch)?noMatch:!noMatch;
                });

                scope.$watch("reference", function(value) {;
                    ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

                });
            }
        }
    })
    .directive('parseUrl', function () {
        //var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
        var urlPattern ="/^[a-zA-Z0-9]*$/";
        return {
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            scope: {
                props: '=parseUrl',
                ngModel: '=ngModel'
            },
            link: function compile(scope, element, attrs, controller) {
                scope.$watch('ngModel', function (value) {
                    var html = value.replace(urlPattern, '<a target="' + scope.props.target + '" href="$&">$&</a>') + " | " + scope.props.otherProp;
                    element.html(html);
                });
            }
        };
    })
    .directive('noSpecialChar', function() {
        return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
            if (inputValue == null)
                return ''
            cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
            if (cleanInputValue != inputValue) {
                modelCtrl.$setViewValue(cleanInputValue);
                modelCtrl.$render();
            }
            return cleanInputValue;
            });
        }
        }
    })
	.directive('restrictInput', function() {
	  return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attr, ctrl) {
		  ctrl.$parsers.unshift(function(viewValue) {
			var options = scope.$eval(attr.restrictInput);
			if (!options.regex && options.type) {
			  switch (options.type) {
				case 'digitsOnly': options.regex = '^[0-9]*$'; break;
				case 'lettersOnly': options.regex = '^[a-zA-Z]*$'; break;
				case 'lowercaseLettersOnly': options.regex = '^[a-z]*$'; break;
				case 'uppercaseLettersOnly': options.regex = '^[A-Z]*$'; break;
				case 'lettersAndDigitsOnly': options.regex = '^[a-zA-Z0-9]*$'; break;
				case 'validPhoneCharsOnly': options.regex = '^[a-zA-Z0-9 (),/.?_%!-]*$'; break;
				default: options.regex = '';
			  }
			}
			var reg = new RegExp(options.regex);
			if (reg.test(viewValue)) { //if valid view value, return it
			  return viewValue;
			} else { //if not valid view value, use the model value (or empty string if that's also invalid)
			  var overrideValue = (reg.test(ctrl.$modelValue) ? ctrl.$modelValue : '');
			  element.val(overrideValue);
			  return overrideValue;
			}
		  });
		}
	  };
	})
    myApp.directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {
                        $event: event
                    });
                });
            });
        };
    })
    
;
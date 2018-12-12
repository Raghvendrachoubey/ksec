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
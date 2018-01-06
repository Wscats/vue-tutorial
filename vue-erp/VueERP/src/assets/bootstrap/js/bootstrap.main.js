// global variables
var isIE8 = false;
var isIE9 = false;
var $windowWidth;
var $windowHeight;
var $pageArea;
// Debounce Function
(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    // smartresize
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

})(jQuery, 'clipresize');

//Main Function
var Main = function () {
    //function to detect explorer browser and its version
    var runInit = function () {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var ieversion = new Number(RegExp.$1);
            if (ieversion == 8) {
                isIE8 = true;
            } else if (ieversion == 9) {
                isIE9 = true;
            }
        }
    };
    //function to adjust the template elements based on the window size
    var runElementsPosition = function () {
        $windowWidth = $(window).width();
        $windowHeight = $(window).height();
        $pageArea = $windowHeight - $('body > .navbar').outerHeight() - $('body > .footer').outerHeight();
        $('.sidebar-search input').removeAttr('style').removeClass('open');
        runContainerHeight();

    };
    //function to adapt the Main Content height to the Main Navigation height
    var runContainerHeight = function () {
        mainContainer = $('.main-content > .container');
        mainNavigation = $('.main-navigation');
        if ($pageArea < 760) {
            $pageArea = 760;
        }
        if (mainContainer.outerHeight() < mainNavigation.outerHeight() && mainNavigation.outerHeight() > $pageArea) {
            mainContainer.css('min-height', mainNavigation.outerHeight());
        } else {
            mainContainer.css('min-height', $pageArea);
        };
        if ($windowWidth < 768) {
            mainNavigation.css('min-height', $windowHeight - $('body > .navbar').outerHeight());
        }
    };
    //function to activate the ToDo list, if present
    var runToDoAction = function () {
        if ($(".todo-actions").length) {
            $(".todo-actions").click(function () {
                if ($(this).find("i").hasClass("fa-square-o") || $(this).find("i").hasClass("icon-check-empty")) {
                    if ($(this).find("i").hasClass("fa")) {
                        $(this).find("i").removeClass("fa-square-o").addClass("fa-check-square-o");
                    } else {
                        $(this).find("i").removeClass("icon-check-empty").addClass("fa fa-check-square-o");
                    };
                    $(this).parent().find("span").css({
                        opacity: .25
                    });
                    $(this).parent().find(".desc").css("text-decoration", "line-through");
                } else {
                    $(this).find("i").removeClass("fa-check-square-o").addClass("fa-square-o");
                    $(this).parent().find("span").css({
                        opacity: 1
                    });
                    $(this).parent().find(".desc").css("text-decoration", "none");
                }
                return !1;
            });
        }
    };
    //function to activate the Tooltips, if present
    var runTooltips = function () {
        if ($(".tooltips").length) {
            $('.tooltips').tooltip();
        }
    };
    //function to activate the Popovers, if present
    var runPopovers = function () {
        if ($(".popovers").length) {
            $('.popovers').popover();
        }
    };
    //function to allow a button or a link to open a tab
    var runShowTab = function () {
        if ($(".show-tab").length) {
            $('.show-tab').bind('click', function (e) {
                e.preventDefault();
                var tabToShow = $(this).attr("href");
                if ($(tabToShow).length) {
                    $('a[href="' + tabToShow + '"]').tab('show');
                }
            });
        };
        if (getParameterByName('tabId').length) {
            $('a[href="#' + getParameterByName('tabId') + '"]').tab('show');
        }
    };
    var runPanelScroll = function () {
        if ($(".panel-scroll").length) {
            $('.panel-scroll').perfectScrollbar({
                wheelSpeed: 50,
                minScrollbarLength: 20,
                suppressScrollX: true
            });
        }
    };
    //function to extend the default settings of the Accordion
    var runAccordionFeatures = function () {
        if ($('.accordion').length) {
            $('.accordion .panel-collapse').each(function () {
                if (!$(this).hasClass('in')) {
                    $(this).prev('.panel-heading').find('.accordion-toggle').addClass('collapsed');
                }
            });
        }
        $(".accordion").collapse().height('auto');
        var lastClicked;

        $('.accordion .accordion-toggle').bind('click', function () {
            currentTab = $(this);
            $('html,body').animate({
                scrollTop: currentTab.offset().top - 100
            }, 1000);
        });
    };
    //function to reduce the size of the Main Menu
    var runNavigationToggler = function () {
        $('.navigation-toggler').bind('click', function () {
            if (!$('body').hasClass('navigation-small')) {
                $('body').addClass('navigation-small');
            } else {
                $('body').removeClass('navigation-small');
            };
        });
    };
    //function to activate the panel tools
    var runModuleTools = function () {
        $('.panel-tools .panel-expand').bind('click', function (e) {
            $('.panel-tools a').not(this).hide();
            $('body').append('<div class="full-white-backdrop"></div>');
            $('.main-container').removeAttr('style');
            backdrop = $('.full-white-backdrop');
            wbox = $(this).parents('.panel');
            wbox.removeAttr('style');
            if (wbox.hasClass('panel-full-screen')) {
                backdrop.fadeIn(200, function () {
                    $('.panel-tools a').show();
                    wbox.removeClass('panel-full-screen');
                    backdrop.fadeOut(200, function () {
                        backdrop.remove();
                    });
                });
            } else {
                $('body').append('<div class="full-white-backdrop"></div>');
                backdrop.fadeIn(200, function () {
                    $('.main-container').css({
                        'max-height': $(window).outerHeight() - $('header').outerHeight() - $('.footer').outerHeight() - 100,
                        'overflow': 'hidden'
                    });
                    backdrop.fadeOut(200);
                    backdrop.remove();
                    wbox.addClass('panel-full-screen').css({
                        'max-height': $(window).height(),
                        'overflow': 'auto'
                    });
                });
            }
        });
        $('.panel-tools .panel-close').bind('click', function (e) {
            $(this).parents(".panel").remove();
            e.preventDefault();
        });
        $('.panel-tools .panel-refresh').bind('click', function (e) {
            var el = $(this).parents(".panel");
            el.block({
                overlayCSS: {
                    backgroundColor: '#fff'
                },
                message: '<img src="assets/images/loading.gif" /> Just a moment...',
                css: {
                    border: 'none',
                    color: '#333',
                    background: 'none'
                }
            });
            window.setTimeout(function () {
                el.unblock();
            }, 1000);
            e.preventDefault();
        });
        $('.panel-tools .panel-collapse').bind('click', function (e) {
            e.preventDefault();
            var el = jQuery(this).parent().closest(".panel").children(".panel-body");
            if ($(this).hasClass("collapses")) {
                $(this).addClass("expand").removeClass("collapses");
                el.slideUp(200);
            } else {
                $(this).addClass("collapses").removeClass("expand");
                el.slideDown(200);
            }
        });
    };
    //function to activate the 3rd and 4th level menus
    var runNavigationMenu = function () {
        $('.main-navigation-menu li.active').addClass('open');
        $('.main-navigation-menu > li a').bind('click', function () {
            if ($(this).parent().children('ul').hasClass('sub-menu') && ((!$('body').hasClass('navigation-small') || $windowWidth < 767) || !$(this).parent().parent().hasClass('main-navigation-menu'))) {
                if (!$(this).parent().hasClass('open')) {
                    $(this).parent().addClass('open');
                    $(this).parent().parent().children('li.open').not($(this).parent()).not($('.main-navigation-menu > li.active')).removeClass('open').children('ul').slideUp(200);
                    $(this).parent().children('ul').slideDown(200, function () {
                        runContainerHeight();
                    });
                } else {
                    if (!$(this).parent().hasClass('active')) {
                        $(this).parent().parent().children('li.open').not($('.main-navigation-menu > li.active')).removeClass('open').children('ul').slideUp(200, function () {
                            runContainerHeight();
                        });
                    } else {
                        $(this).parent().parent().children('li.open').removeClass('open').children('ul').slideUp(200, function () {
                            runContainerHeight();
                        });
                    }
                }
            }
        });
    };
    //function to activate the Go-Top button
    var runGoTop = function () {
        $('.go-top').bind('click', function (e) {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            e.preventDefault();
        });
    };
    //function to avoid closing the dropdown on click
    var runDropdownEnduring = function () {
        if ($('.dropdown-menu.dropdown-enduring').length) {
            $('.dropdown-menu.dropdown-enduring').click(function (event) {
                event.stopPropagation();
            });
        }
    };
    //function to return the querystring parameter with a given name.
    var getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    //function to activate the iCheck Plugin
    var runCustomCheck = function () {
        if ($('input[type="checkbox"]').length || $('input[type="radio"]').length) {
            $('input[type="checkbox"].grey, input[type="radio"].grey').iCheck({
                checkboxClass: 'icheckbox_minimal-grey',
                radioClass: 'iradio_minimal-grey',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].red, input[type="radio"].red').iCheck({
                checkboxClass: 'icheckbox_minimal-red',
                radioClass: 'iradio_minimal-red',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].green, input[type="radio"].green').iCheck({
                checkboxClass: 'icheckbox_minimal-green',
                radioClass: 'iradio_minimal-green',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].teal, input[type="radio"].teal').iCheck({
                checkboxClass: 'icheckbox_minimal-aero',
                radioClass: 'iradio_minimal-aero',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].orange, input[type="radio"].orange').iCheck({
                checkboxClass: 'icheckbox_minimal-orange',
                radioClass: 'iradio_minimal-orange',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].purple, input[type="radio"].purple').iCheck({
                checkboxClass: 'icheckbox_minimal-purple',
                radioClass: 'iradio_minimal-purple',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].yellow, input[type="radio"].yellow').iCheck({
                checkboxClass: 'icheckbox_minimal-yellow',
                radioClass: 'iradio_minimal-yellow',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].square-black, input[type="radio"].square-black').iCheck({
                checkboxClass: 'icheckbox_square',
                radioClass: 'iradio_square',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].square-grey, input[type="radio"].square-grey').iCheck({
                checkboxClass: 'icheckbox_square-grey',
                radioClass: 'iradio_square-grey',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].square-red, input[type="radio"].square-red').iCheck({
                checkboxClass: 'icheckbox_square-red',
                radioClass: 'iradio_square-red',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].square-green, input[type="radio"].square-green').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].square-teal, input[type="radio"].square-teal').iCheck({
                checkboxClass: 'icheckbox_square-aero',
                radioClass: 'iradio_square-aero',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].square-orange, input[type="radio"].square-orange').iCheck({
                checkboxClass: 'icheckbox_square-orange',
                radioClass: 'iradio_square-orange',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].square-purple, input[type="radio"].square-purple').iCheck({
                checkboxClass: 'icheckbox_square-purple',
                radioClass: 'iradio_square-purple',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].square-yellow, input[type="radio"].square-yellow').iCheck({
                checkboxClass: 'icheckbox_square-yellow',
                radioClass: 'iradio_square-yellow',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].flat-black, input[type="radio"].flat-black').iCheck({
                checkboxClass: 'icheckbox_flat',
                radioClass: 'iradio_flat',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].flat-grey, input[type="radio"].flat-grey').iCheck({
                checkboxClass: 'icheckbox_flat-grey',
                radioClass: 'iradio_flat-grey',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
                checkboxClass: 'icheckbox_flat-red',
                radioClass: 'iradio_flat-red',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].flat-green, input[type="radio"].flat-green').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].flat-teal, input[type="radio"].flat-teal').iCheck({
                checkboxClass: 'icheckbox_flat-aero',
                radioClass: 'iradio_flat-aero',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].flat-orange, input[type="radio"].flat-orange').iCheck({
                checkboxClass: 'icheckbox_flat-orange',
                radioClass: 'iradio_flat-orange',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].flat-purple, input[type="radio"].flat-purple').iCheck({
                checkboxClass: 'icheckbox_flat-purple',
                radioClass: 'iradio_flat-purple',
                increaseArea: '10%' // optional
            });
            $('input[type="checkbox"].flat-yellow, input[type="radio"].flat-yellow').iCheck({
                checkboxClass: 'icheckbox_flat-yellow',
                radioClass: 'iradio_flat-yellow',
                increaseArea: '10%' // optional
            });
        };
    };
    //Search Input function
    var runSearchInput = function () {
        var search_input = $('.sidebar-search input');
        var search_button = $('.sidebar-search button');
        var search_form = $('.sidebar-search');
        search_input.attr('data-default', $(search_input).outerWidth()).focus(function () {
            $(this).animate({
                width: 200
            }, 200);
        }).blur(function () {
            if ($(this).val() == "") {
                if ($(this).hasClass('open')) {
                    $(this).animate({
                        width: 0,
                        opacity: 0
                    }, 200, function () {
                        $(this).hide();
                    });
                } else {
                    $(this).animate({
                        width: $(this).attr('data-default')
                    }, 200);
                }
            }
        });
        search_button.bind('click', function () {
            if ($(search_input).is(':hidden')) {
                $(search_input).addClass('open').css({
                    width: 0,
                    opacity: 0
                }).show().animate({
                    width: 200,
                    opacity: 1
                }, 200).focus();
            } else if ($(search_input).hasClass('open') && $(search_input).val() == '') {
                $(search_input).removeClass('open').animate({
                    width: 0,
                    opacity: 0
                }, 200, function () {
                    $(this).hide();
                });
            } else if ($(search_input).val() != '') {
                return;
            } else
                $(search_input).focus();
            return false;
        });
    };
    //Set of functions for Style Selector
    var runStyleSelector = function () {
        $('.style-toggle').bind('click', function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open').addClass('close');
                $('#style_selector_container').hide();
            } else {
                $(this).removeClass('close').addClass('open');
                $('#style_selector_container').show();
            }
        });
        setColorScheme();
        setLayoutStyle();
        setHeaderStyle();
        setFooterStyle();
        setBoxedBackgrounds();
    };
    //$('.drop-down-wrapper').perfectScrollbar({
    //    wheelSpeed: 50,
    //    minScrollbarLength: 20,
    //    suppressScrollX: true
    //});
    $('.navbar-tools .dropdown').on('shown.bs.dropdown', function () {
        $(this).find('.drop-down-wrapper').scrollTop(0).perfectScrollbar('update');
    });
    var setColorScheme = function () {
        $('.icons-color a').bind('click', function () {
            $('.icons-color img').each(function () {
                $(this).removeClass('active');
            });
            $(this).find('img').addClass('active');
            if ($('#skin_color').attr("rel") == "stylesheet/less") {
                $('#skin_color').next('style').remove();
                $('#skin_color').attr("rel", "stylesheet");

            }
            $('#skin_color').attr("href", "assets/css/theme_" + $(this).attr('id') + ".css");

        });
    };
    var setBoxedBackgrounds = function () {
        $('.boxed-patterns a').bind('click', function () {
            if ($('body').hasClass('layout-boxed')) {
                var classes = $('body').attr("class").split(" ").filter(function (item) {
                    return item.indexOf("bg_style_") === -1 ? item : "";
                });
                $('body').attr("class", classes.join(" "));
                $('.boxed-patterns img').each(function () {
                    $(this).removeClass('active');
                });
                $(this).find('img').addClass('active');
                $('body').addClass($(this).attr('id'));
            } else {
                alert('Select boxed layout');
            }
        });
    };
    var setLayoutStyle = function () {
        $('select[name="layout"]').change(function () {
            if ($('select[name="layout"] option:selected').val() == 'boxed')
                $('body').addClass('layout-boxed');
            else
                $('body').removeClass('layout-boxed');
        });
    };
    var setHeaderStyle = function () {
        $('select[name="header"]').change(function () {
            if ($('select[name="header"] option:selected').val() == 'default')
                $('body').addClass('header-default');
            else
                $('body').removeClass('header-default');
        });
    };
    var setFooterStyle = function () {
        $('select[name="footer"]').change(function () {
            if ($('select[name="footer"] option:selected').val() == 'fixed')
                $('body').addClass('footer-fixed');
            else
                $('body').removeClass('footer-fixed');
        });
    };
    var runColorPalette = function () {
        if ($('.colorpalette').length) {
            $('.colorpalette').colorPalette().on('selectColor', function (e) {
                $(this).closest('ul').prev('a').children('i').css('background-color', e.color).end().closest('div').prev('input').val(e.color);
                runActivateLess();
            });
        };
    };

    //function to activate Less style
    var runActivateLess = function () {
        $('		.icons-color img').removeClass('active');
        if ($('#skin_color').attr("rel") == "stylesheet") {
            $('#skin_color').attr("rel", "stylesheet/less").attr("href", "assets/less/styles.less");
            less.sheets.push($('link#skin_color')[0]);
            less.refresh();
        };
        less.modifyVars({
            '@base': $('.color-base').val(),
            '@text': $('.color-text').val(),
            '@badge': $('.color-badge').val()
        });
    };

    //Window Resize Function
    var runWIndowResize = function (func, threshold, execAsap) {
        //wait until the user is done resizing the window, then execute
        $(window).clipresize(function () {
            runElementsPosition();
        });
    };
    //function to save user settings
    var runSaveSetting = function () {
        $('.save_style').bind('click', function () {
            var clipSetting = new Object;
            if ($('body').hasClass('rtl')) {
                clipSetting.rtl = true;
            } else {
                clipSetting.rtl = false;
            };
            if ($('body').hasClass('layout-boxed')) {
                clipSetting.layoutBoxed = true;
                $("body[class]").filter(function () {
                    var classNames = this.className.split(/\s+/);
                    for (var i = 0; i < classNames.length; ++i) {
                        if (classNames[i].substr(0, 9) === "bg_style_") {
                            clipSetting.bgStyle = classNames[i];
                        }
                    }

                });
            } else {
                clipSetting.layoutBoxed = false;
            };
            if ($('body').hasClass('header-default')) {
                clipSetting.headerDefault = true;
            } else {
                clipSetting.headerDefault = false;
            };
            if ($('body').hasClass('footer-fixed')) {
                clipSetting.footerDefault = false;
            } else {
                clipSetting.footerDefault = true;
            };
            if ($('#skin_color').attr('rel') == 'stylesheet') {
                clipSetting.useLess = false;
            } else if ($('#skin_color').attr('rel') == 'stylesheet/less') {
                clipSetting.useLess = true;
                clipSetting.baseColor = $('.color-base').val();
                clipSetting.textColor = $('.color-text').val();
                clipSetting.badgeColor = $('.color-badge').val();
            };
            clipSetting.skinClass = $('#skin_color').attr('href');

            $.cookie("clip-setting", JSON.stringify(clipSetting));

            var el = $('#style_selector_container');
            el.block({
                overlayCSS: {
                    backgroundColor: '#fff'
                },
                message: '<img src="assets/images/loading.gif" /> Just a moment...',
                css: {
                    border: 'none',
                    color: '#333',
                    background: 'none'
                }
            });
            window.setTimeout(function () {
                el.unblock();
            }, 1000);
        });
    };
    //function to load user settings
    var runCustomSetting = function () {
        if ($.cookie("clip-setting")) {
            var loadSetting = jQuery.parseJSON($.cookie("clip-setting"));
            if (loadSetting.layoutBoxed) {

                $('body').addClass('layout-boxed');
                $('#style_selector select[name="layout"]').find('option[value="boxed"]').attr('selected', 'true');
            };
            if (loadSetting.headerDefault) {
                $('body').addClass('header-default');
                $('#style_selector select[name="header"]').find('option[value="default"]').attr('selected', 'true');
            };
            if (!loadSetting.footerDefault) {
                $('body').addClass('footer-fixed');
                $('#style_selector select[name="footer"]').find('option[value="fixed"]').attr('selected', 'true');
            };
            if ($('#style_selector').length) {
                if (loadSetting.useLess) {

                    $('.color-base').val(loadSetting.baseColor).next('.dropdown').find('i').css('background-color', loadSetting.baseColor);
                    $('.color-text').val(loadSetting.textColor).next('.dropdown').find('i').css('background-color', loadSetting.textColor);
                    $('.color-badge').val(loadSetting.badgeColor).next('.dropdown').find('i').css('background-color', loadSetting.badgeColor);
                    runActivateLess();
                } else {
                    $('.color-base').val('#FFFFFF').next('.dropdown').find('i').css('background-color', '#FFFFFF');
                    $('.color-text').val('#555555').next('.dropdown').find('i').css('background-color', '#555555');
                    $('.color-badge').val('#007AFF').next('.dropdown').find('i').css('background-color', '#007AFF');
                    $('#skin_color').attr('href', loadSetting.skinClass);
                };
            };
            $('body').addClass(loadSetting.bgStyle);
        } else {
            runDefaultSetting();
        };
    };
    //function to clear user settings
    var runClearSetting = function () {
        $('.clear_style').bind('click', function () {
            $.removeCookie("clip-setting");
            $('body').removeClass("layout-boxed header-default footer-fixed");
            $('body')[0].className = $('body')[0].className.replace(/\bbg_style_.*?\b/g, '');
            if ($('#skin_color').attr("rel") == "stylesheet/less") {
                $('#skin_color').next('style').remove();
                $('#skin_color').attr("rel", "stylesheet");

            }

            $('.icons-color img').first().trigger('click');
            runDefaultSetting();
        });
    };
    //function to restore user settings
    var runDefaultSetting = function () {
        $('#style_selector select[name="layout"]').val('default');
        $('#style_selector select[name="header"]').val('fixed');
        $('#style_selector select[name="footer"]').val('default');
        $('		.boxed-patterns img').removeClass('active');
        $('.color-base').val('#FFFFFF').next('.dropdown').find('i').css('background-color', '#FFFFFF');
        $('.color-text').val('#555555').next('.dropdown').find('i').css('background-color', '#555555');
        $('.color-badge').val('#007AFF').next('.dropdown').find('i').css('background-color', '#007AFF');
    };
    return {
        //main function to initiate template pages
        init: function () {
            runWIndowResize();
            runInit();
            runStyleSelector();
            runSearchInput();
            runElementsPosition();
            runToDoAction();
            runNavigationToggler();
            runNavigationMenu();
            runGoTop();
            runModuleTools();
            runDropdownEnduring();
            runTooltips();
            runPopovers();
            runPanelScroll();
            runShowTab();
            runAccordionFeatures();
            runCustomCheck();
            runColorPalette();
            runSaveSetting();
            runCustomSetting();
            runClearSetting();
        }
    };
}();
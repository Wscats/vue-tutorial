/***================================
+ 适用于移动端的 bs 架构的滑动事件
+ by dk.lan 
+ e.g: $('').touchwipe({})
===================================*/
(function ($) {
    $.fn.touchwipe = function (settings) {
        var config = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function () { console.log("left"); },
            wipeRight: function () { console.log("right"); },
            wipeTop: function () { console.log("top"); },
            wipeBottom: function () { console.log("bottom"); },
            preventDefaultEvents: true
        };
        if (settings) $.extend(config, settings);

        this.each(function () {
            var startX;
            var startY;
            var isMoving = false;
            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);
                startX = null;
                startY = null;
                isMoving = false;
            }
            function onTouchMove(e) {
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var dx = startX - x;
                    var y = e.touches[0].pageY;
                    var dy = startY - y;
                    var isScrolling = Math.abs(dx) < Math.abs(dy);
                    if (!isScrolling) {
                        e.preventDefault();
                    }
                    if (Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft(e, startX);
                        }
                        else {
                            config.wipeRight(e, startX);
                        }
                    } else if (Math.abs(dy) >= config.min_move_y) {
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeBottom(e, startY);
                        }
                        else {
                            config.wipeTop(e, startY);
                        }
                    }
                }
            }
            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener('touchmove', onTouchMove, false);
                }
            }
            this.addEventListener('touchstart', onTouchStart, false);
        });
        return this;
    };

})(jQuery);
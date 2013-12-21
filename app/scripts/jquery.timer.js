/**
 * jquery.timer.js
 *
 * Copyright (c) 2011 Jason Chavannes <jason.chavannes@gmail.com>
 *
 * http://jchavannes.com/jquery-timer
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

;(function($) {
	$.timer = function(func, time, autostart) {	
	 	this.set = function(func, time, autostart) {
	 		this.init = true;
	 	 	if(typeof func == 'object') {
		 	 	var paramList = ['autostart', 'time'];
	 	 	 	for(var arg in paramList) {if(func[paramList[arg]] != undefined) {eval(paramList[arg] + " = func[paramList[arg]]");}};
 	 			func = func.action;
	 	 	}
	 	 	if(typeof func == 'function') {this.action = func;}
		 	if(!isNaN(time)) {this.intervalTime = time;}
		 	if(autostart && !this.isActive) {
			 	this.isActive = true;
			 	this.setTimer();
		 	}
		 	return this;
	 	};
	 	this.once = function(time) {
			var timer = this;
	 	 	if(isNaN(time)) {time = 0;}
			window.setTimeout(function() {timer.action();}, time);
	 		return this;
	 	};
		this.play = function(reset) {
			if(!this.isActive) {
				if(reset) {this.setTimer();}
				else {this.setTimer(this.remaining);}
				this.isActive = true;
			}
			return this;
		};
		this.pause = function() {
			if(this.isActive) {
				this.isActive = false;
				this.remaining -= new Date() - this.last;
				this.clearTimer();
			}
			return this;
		};
		this.stop = function() {
			this.isActive = false;
			this.remaining = this.intervalTime;
			this.clearTimer();
			return this;
		};
		this.toggle = function(reset) {
			if(this.isActive) {this.pause();}
			else if(reset) {this.play(true);}
			else {this.play();}
			return this;
		};
		this.reset = function() {
			this.isActive = false;
			this.play(true);
			return this;
		};
		this.clearTimer = function() {
			window.clearTimeout(this.timeoutObject);
		};
	 	this.setTimer = function(time) {
			var timer = this;
	 	 	if(typeof this.action != 'function') {return;}
	 	 	if(isNaN(time)) {time = this.intervalTime;}
		 	this.remaining = time;
	 	 	this.last = new Date();
			this.clearTimer();
			this.timeoutObject = window.setTimeout(function() {timer.go();}, time);
		};
	 	this.go = function() {
	 		if(this.isActive) {
	 			this.action();
	 			this.setTimer();
	 		}
	 	};
	 	
	 	if(this.init) {
	 		return new $.timer(func, time, autostart);
	 	} else {
			this.set(func, time, autostart);
	 		return this;
	 	}
	};
})(jQuery);

(function($){
        $.fn.wiggle = function(method, options) {
                options = $.extend({
                        wiggleDegrees: ['2','4','2','0','-2','-4','-2','0'],
                        delay: 35,
                        limit: null,
                        randomStart: true,
                        onWiggle: function(object) {},
                        onWiggleStart: function(object) {},
                        onWiggleStop: function(object) {}
                }, options);

                var methods = {
                        wiggle: function(object, step){
                                if(step === undefined) {
                                        step = options.randomStart ? Math.floor(Math.random()*options.wiggleDegrees.length) : 0;
                                }

                                if(!$(object).hasClass('wiggling')) {
                                        $(object).addClass('wiggling');
                                }

                                var degree = options.wiggleDegrees[step];
                                $(object).css({
                                        '-webkit-transform': 'rotate('+degree+'deg)',
                                        '-moz-transform': 'rotate('+degree+'deg)',
                                        '-o-transform': 'rotate('+degree+'deg)',
                                        '-sand-transform': 'rotate('+degree+'deg)',
                                        '-ms-transform': 'rotate('+degree+'deg)',
                                        'transform': 'rotate('+degree+'deg)'
                                });

                                if(step == (options.wiggleDegrees.length - 1)) {
                                        step = 0;
                                        if($(object).data('wiggles') === undefined) {
                                                $(object).data('wiggles', 1);
                                        } else {
                                                $(object).data('wiggles', $(object).data('wiggles') + 1);
                                        }
                                        options.onWiggle(object);
                                }

                                if(options.limit && $(object).data('wiggles') == options.limit) {
                                        return methods.stop(object);
                                }

                                object.timeout = setTimeout(function(){
                                        methods.wiggle(object, step+1);
                                }, options.delay);
                        },
                        stop: function(object) {
                                $(object).data('wiggles', 0);
                                $(object).css({
                                        '-webkit-transform': 'rotate(0deg)',
                                        '-moz-transform': 'rotate(0deg)',
                                        '-o-transform': 'rotate(0deg)',
                                        '-sand-transform': 'rotate(0deg)',
                                        '-ms-transform': 'rotate(0deg)',
                                        'transform': 'rotate(0deg)'
                                });

                                if($(object).hasClass('wiggling')) {
                                        $(object).removeClass('wiggling');
                                }

                                clearTimeout(object.timeout);

                                object.timeout = null;

                                options.onWiggleStop(object);
                        },
                        isWiggling: function(object) {
                                return !object.timeout ? false : true;
                        }
                };

                if(method == 'isWiggling' && this.length == 1) {
                        return methods.isWiggling(this[0]);
                }

                this.each(function() {
                        if((method == 'start' || method === undefined) && !this.timeout) {
                                methods.wiggle(this);
                                options.onWiggleStart(this);
                        } else if (method == 'stop') {
                                methods.stop(this);
                        }
                });

                return this;
        }
})(jQuery);
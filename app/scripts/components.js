/*
  common method: succ, R, ext, toRGBA, setCookie, getCookie
  Author: Jim Yuan
*/

+function($){"use strict";
  $.succ = function (t) { // $.succ("f") => "g"
    if ($.isNumeric(t)) { return t - 0 + 1; }
    else {
      t = t + "";
      return t.slice(0, t.length - 1) +
      String.fromCharCode(t.charCodeAt(t.length - 1) + 1);
    }
  };
  
  $.R = function (start, end) { // $.R("a", "d") => ["a", "b", "c", "d"]
    var edge = arguments[2] || false;
    var v = start;
    var a = [];
    var flag = function (value) {
      if (value < start) { return false; }
      if (edge) { return value < end; }
      return value <= end;
    };
    while (flag(v)) {
      a.push(v); v = this.succ(v);
    }
    return a;
  };
  
  $.ext=function(arr, n){ // $.ext([1,2,3], 4) => [1,2,3,1]
    var l=arr.length;
    if(!$.isArray(arr)) {return [];}
    var arr2=arr;
    for(var i=0; i<Math.floor(n/l); i++){
      arr2=$.merge(arr2,arr);
    }
    arr2.length=n;
    return arr2;
  };

  $.chaos=function(a){
    var b=[];
    var c=a.length;
    $.each(a, function(i){
      var f=Math.floor(Math.random()*(c-i));
      b[i]=a[f];
      a[f]=a[c-1-i];
    });
    return b;
  };

  $.toRGBA=function(a){
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = a.toLowerCase();
    var alpha = arguments[1] || 1
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + ", "+alpha+")";
    } 
    else {
      return sColor;
    }
  };

  $._getCookieVal=function(b){
    var a = document.cookie.indexOf(";", b);
    if (a == -1) {
      a = document.cookie.length
    }
    return unescape(document.cookie.substring(b, a))
  };

  $.setCookie=function(a, b, c){
    if (c) {
      document.cookie = a + "=" + escape(b) + ";expires=" + c.toGMTString();
    } 
    else {
      document.cookie = a + "=" + escape(b);
    }
  };

  $.getCookie=function(d){
    if (d == "path" || d == "expires" || d == "domain" || d == "version") {
      d = "badCookieName"
    }
    var b = d + "=";
    var f = b.length;
    var a = document.cookie.length;
    var e = 0;
    while (e < a) {
      var c = e + f;
      if (document.cookie.substring(e, c) == b) {
        return this._getCookieVal(c)
      }
      e = document.cookie.indexOf(" ", e) + 1;
      if (e === 0) {
        break;
      }
    }
    return null;
  };
}(window.jQuery);
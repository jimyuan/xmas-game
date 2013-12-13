+function ($) { "use strict";
  var J = {
    timeStamp : 0,
    count:0,
    currTime:3*1000,
    incrementTime:70,
    mianScene:$(".main-scene"),
    beforeScene:$(".before-scene"),
    stopwatch:$("#timeCount span"),
    timerBar:$("#timeCount").children(":last-child").children(":first-child"),
    timerBar2:$("#timeCount").children(":last-child").children(":last-child"),
    timerBarPer:$("#timeCount").width(),
    currBarWidth:0,
    speedStyle:["WalkStop","WalkSlow","WalkFast","RunSlow","RunFast"],
    //游戏场景
    _m : {
      speed:function(n){// speed level 
        var level=[100,150,600,1000];
        return level.concat(n).sort(function(x, y){return y - x;}).indexOf(n);
      },
      scrollBg:function (speed) {
        J.mianScene.css("background-position", "+="+speed*50);
        J.beforeScene.css("background-position", "+="+speed*250);
      }
    },
    //马动画
    _horse:{
      _run:function (speed) {
        J.mianScene.children(":last-child").attr("id","warphorse"+J.speedStyle[speed]);
        J.mianScene.on("webkitTransitionEnd", function(){
          $(this).children(":last-child").attr("id","warphorse"+J.speedStyle[0]);
        });
      }
    },
    //开始游戏
    _gameStart:function(e){
      J._timer.init();
     // J.timer.set({time:1000,autostart:true});
      J.timeStamp=e.timeStamp;
      $(document).bind("keyup",'space',J._keyUphandler);
      $(this).fadeOut();
    },
    //鼠标松开事件
    _keyUphandler:function(e){
      J.count++;
      //点击次数
      $("#count span").text(J.count);
      var step = e.timeStamp - J.timeStamp;
      var speed= J._m.speed(step);
      J._m.scrollBg(speed);
      J._horse._run(speed);
      J.timeStamp = e.timeStamp;
    },
    //游戏结束
    _gameOver:function () {
      //game over
      J._timer.stop();
      J.stopwatch.text("00:00");
      console.log("游戏结束");
      $(document).unbind("keyup","space");
    },
    //计时器
    _timer:{
      timer:0,
      updateTimer:function () {
        if(J.currTime < 0) {
           J._gameOver();
        } else {
          J.stopwatch.text(formatTime(J.currTime));
          J.currTime -= J.incrementTime/10;
          var flag = J.timerBarPer/430;
          J.currBarWidth +=flag;
          J.timerBar.width(J.currBarWidth);
          J.timerBar2.css("left", J.currBarWidth);
          console.log(J.currBarWidth);
          // .right = J.currBarWidth;
        }
      },
      init:function () {
        this.timer = $.timer(J._timer.updateTimer,J.incrementTime,true);
      },
      stop:function () {
        this.timer.stop();
      }
    }
  };

  function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return pad(sec, 2) + ":" + hundredths;
  }

  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
  }

  J.move=function(){
    $(document).on("keypress", function(e){e.preventDefault();})
    $("i.fa-play-circle-o").on("click" ,J._gameStart);
   }();

   J.door=function(){
    $(".door").height($(document).height()).width($(window).width())
    .on("click", function(){
      $(this).addClass("zoomOut");
    });
   }();
}(jQuery);
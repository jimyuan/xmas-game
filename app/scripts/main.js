+function ($) { "use strict";
  var J = {
    timeStamp : 0,
    count:0,
    currTime:60,
    _m : {
      speed:function(n){// speed level 
        var level=[100,150,600,2000];
        return level.concat(n).sort(function(x, y){return y - x;}).indexOf(n);
      }
    }
  };

  J.move=function(){
    $(document).on("keypress", function(e){e.preventDefault();});
    $("i.fa-play-circle-o").on("click" , function(e){
    var timeInt = window.setInterval(function(){
    autotime();
    if(J.currTime == 0){
      //game over
    } 
    $("#timeCount span").text(J.currTime);},1000);
      J.timeStamp=e.timeStamp;
      var speedStyle=["WalkStop","WalkSlow","WalkFast","RunSlow","RunFast"];
      $(document).on("keyup", function(e){
        if(e.which===32){
          J.count++;
          //点击次数
          $("#count span").text(J.count);
          var step = e.timeStamp - J.timeStamp;
          var speed= J._m.speed(step);
          $(".main-scene").css("background-position", "+="+speed*250)
          .children(":first-child").attr("id","warphorse"+speedStyle[speed]);
          $(".main-scene").on("webkitTransitionEnd", function(){
            $(this).children(":first-child").attr("id","warphorse"+speedStyle[0]);
          });
          console.log(J.count);
          J.timeStamp = e.timeStamp;
        }
      });
      $(this).fadeOut();
    });
   }();

   /**
   倒计时
   */
  function autotime(){
    J.currTime --;
    $("#timeCount span").text(J.currTime); 
  }


   /*
    切换头像
   */
}(jQuery);
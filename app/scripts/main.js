+function ($) { "use strict";
  var J = {
    timeStamp : 0,
    _m : {
      speed:function(n){// speed level 
        var level=[200,400,600];
        return level.concat(n).sort(function(x, y){return y - x;}).indexOf(n);
      }
    }
  };

  J.move=function(){
    $(document).on("keypress", function(e){e.preventDefault();});
    $("i.fa-play-circle-o").on("click" , function(e){
      J.timeStamp=e.timeStamp;
      var speedStyle=["WalkSlow","WalkFast","RunSlow","RunFast"];
      $(document).on("keyup", function(e){
        if(e.which===32){
          var step = e.timeStamp - J.timeStamp;
          var speed= J._m.speed(step);
          $(".main-scene").css("background-position", "+="+speed*20)
          .children(":first-child").attr("id","warphorse"+speedStyle[speed]);
          $(".main-scene").on("webkitTransitionEnd", function(){
            $(this).children(":first-child").attr("id","warphorse"+speedStyle[0]);
          });
          console.log(step);
          J.timeStamp = e.timeStamp;
        }
      });
      $(this).fadeOut();
    });
   }();

   /*
    切换头像
   */
   
}(jQuery);
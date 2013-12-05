+function ($) { "use strict";
  var J = {
    timeStamp : 0,
    _m : {
      speed:function(n){// speed level 
        var level=[0,100,110,120,130,140,150,300,500,700,800];
        return level.concat(n).sort(function(x, y){return y - x;}).indexOf(n);
      }
    }
  };

  J.move=function(){
    $(document).on("keypress", function(e){e.preventDefault();});
    $("i.fa-play-circle-o").on("click" , function(e){
      J.timeStamp=e.timeStamp;
      $(document).on("keyup", function(e){
        if(e.which===32){
          var step = e.timeStamp - J.timeStamp;
          var speed= J._m.speed(step);
          $(".main-scene").css("background-position", "+="+speed*20);
          console.log(step);
          J.timeStamp = e.timeStamp;
        }
      });
      $(this).fadeOut();
    });
   }();
}(jQuery);
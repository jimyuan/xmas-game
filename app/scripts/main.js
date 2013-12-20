+function ($) { "use strict";
  var J = {
    timeStamp:0,
    count:0,
    currTime:3*1000,
    incrementTime:70,
    mianScene:$(".main-scene"),
    beforeScene:$(".before-scene"),
    stopwatch:$("#timeCount span"),
    timerBar:$(".bar").children(":first-child"),
    timerBar2:$(".bar").children(":last-child"),
    timerBarPer:$("#timeCount").width(),
    currBarWidth:0,
    speedStyle:["WalkStop","WalkSlow","WalkFast","RunSlow","RunFast"],
    currPage:1,
    pagesize:20,
    weiboListData:[],
    horseHead:"../images/head.jpg",
    _self:"",
    weiuuid:"",
    horseName:"",
    rankingData:[],
    rating:["拍马屁实习生","初级马屁精","资深马屁精","马屁精指导","马屁王"],
    sendWeiboImage:"",
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
      window.setTimeout(function(){
        $("#enddiv").addClass("brandgo").animate({
        top: "-1000px", left: "-1000px"});
      },1000);
      J._timer.init();
      J.timeStamp=e.timeStamp;
      $(document).bind("keyup",J._keyUphandler);
      J._street();
    },
    //鼠标松开事件
    _keyUphandler:function(e){
      if(e.which === 32) {
        J.count++;
        //点击次数
        $("#count span").text(J.count);
        var step = e.timeStamp - J.timeStamp;
        var speed= J._m.speed(step);
        J._m.scrollBg(speed);
        J._horse._run(speed);
        J.timeStamp = e.timeStamp;
      }
    },
    //游戏结束
    _gameOver:function () {
      //game over
      $(document).unbind("keyup",J._keyUphandler);
      J.stopwatch.text("00:00");
      console.log("游戏结束");
      show('scroe','scroe',J._openScroeWindow,true);
    },
    //计时器
    _timer:{
      timer:0,
      updateTimer:function () {
        if(J.currTime < 0) {
           J._timer.stop();
           J._gameOver();
        } else {
          J.stopwatch.text(formatTime(J.currTime));
          J.currTime -= J.incrementTime/10;
          var flag = J.timerBarPer/430;
          J.currBarWidth +=flag;
          J.timerBar.width(J.currBarWidth);
          J.timerBar2.css("left", J.currBarWidth);
        }
      },
      init:function () {
        this.timer = $.timer(J._timer.updateTimer,J.incrementTime,true);
      },
      stop:function () {
        this.timer.stop();
      }
    },
    //获取好友信息
    _getFriendList:function () {
      $.getJSON("http://www.wangfan.com/2014/friends.ashx?callback=?", function (json) {
        J.weiboListData = json.jsonResponse;
        weiboList(J.currPage,J.pagesize);
        $("#leftbtn").on("click",leftClick);
        $("#rightbtn").on("click",rightClick);
      });
    },
    _sendWeibo:function () {
      $('#weibosendimage').css("backgroundImage","url(http://www.wangfan.com/2014/"+J.sendWeiboImage+")");
      $("#sendWeibobtn").on("click",function (){
        console.log($(".weibosendcontent").val(),J.weibosendimage);
         $.post("http://www.wangfan.com/2014/share.ashx", {content:$(".weibosendcontent").val(),pic:J.sendWeiboImage},
         function(data){
            if(data.result ==="success") {
              $('#oppbox').remove();
            }
         },"jsonp");
      });
    },
    _setMastSize:function(){
      $(".fullscreen").width($(document).width()).height($(document).height());
    },

    showWeiboList:function(_own) {
      J._self = _own;
      $("i.fa-play-circle-o").fadeOut();
      if(J._self === undefined) {
        $('#mainHead').children(":last-child").css("backgroundImage","url("+J.horseHead+")");
      } else {
         $('#mainHead').children(":last-child").css("backgroundImage","url("+J._self+")");
      }
      show('weibofd_list','weibofdlist',J._getFriendList,true);
    },
    _changeHorseHead:function(hhead) {
      J.horseHead = hhead;
      $('#warphorseWalkStop').children(':last-child').css('backgroundImage','url('+hhead+')');
    },

    _changeScroeHead:function() {
      if(J._self === undefined) {
        $("#scroe_head_left").css("backgroundImage","url('../images/head.jpg')");
      } else {
        $("#scroe_head_left").css("backgroundImage","url("+J._self+")");
      }
      $("#score_count span").text(J.count);
      $('#scroe_rating').text(setRating());
      $("#scroe_open_ranking").on("click",function (e){
        J._openRankingWindow();
      });
      $("#weiboBtn").on("click",function () {
        J.openSendWeiboWindow();
      });
    },
    _openScroeWindow:function () {
      J._changeScroeHead();
      $.post("http://www.wangfan.com/2014/pai.ashx",{score:J.count,uid:J.weiuuid,avatar:J.horseHead,name:J.horseName},function(data){
        if(data.result === "success") {
          $('#score_ranking span').text(data.jsonResponse.sort);
          J.sendWeiboImage = data.jsonResponse.avatar;
        }
      },"jsonp");
    },
    _openRankingWindow:function () {
      show('ranking','ranking',J.initRankingData,true);
    },
    openSendWeiboWindow:function () {
      show('weibofd_send','weiboSend',J._sendWeibo,true);
    },
    //首页排行榜
    indexRanking:function () {
      $.get("http://www.wangfan.com/2014/sort.ashx",'',function(data){
        if(data.result == "success") {
          J.rankingData = data.jsonResponse;
          var rankhtml="";
          $('#mainranking ul').html("");
          for(var i=0; i < 5; i++) {
            rankhtml += "<li><b>"+(i+1)+"</b><b>"+data.jsonResponse[0].pai[i].name+"</b></li>";
          }
          $('#mainranking ul').html(rankhtml);
        }
      },"jsonp");
    },
    initRankingData:function() {
      var rankpaihtml="";
      $('#ranking_pai ul').html("");
      var rankbeipaihtml="";
      $('#ranking_beipai ul').html("");
      for(var i=0; i < 5; i++) {
        rankpaihtml +="<li><div><b>NO."+(i+1)+"</b><br><b>"+J.rankingData[0].pai[i].score+"次</b></div><div><b class='ranking_head_img' style='background:url("+J.rankingData[0].pai[i].avatar+") no-repeat center center; background-size:100% auto;'></b><b class='ranking_u_name'>"+J.rankingData[0].pai[i].name+"</b></div></li>";
        rankbeipaihtml +="<li><div><b>NO."+(i+1)+"</b><br><b>"+J.rankingData[0].beipai[i].score+"次</b></div><div><b class='ranking_head_img' style='background:url("+J.rankingData[0].beipai[i].avatar+") no-repeat center center;  background-size:100% auto;'></b><b class='ranking_u_name'>"+J.rankingData[0].beipai[i].name+"</b></div></li>"
      }
      $('#ranking_pai ul').html(rankpaihtml);
      $('#ranking_beipai ul').html(rankbeipaihtml);
    },
    _street:function(){ //路人场景
      var sp=["wrapcar_1","wrapcar_2","wrapcar_3","wrapbicycle_1","wrapbicycle_2","wrapbicycle_3"];
      var rdm=0, c={};
      sp=$.ext(sp, 10);
      $($.chaos(sp)).each(function(x,y){
        $("#mini-wrap").append('<div class="mini-animate" id="'+y+'"><div/><div/></div>');
      });
      $("#mini-wrap .mini-animate").each(function(){
        rdm=Math.random();
        if(rdm>0.5){
          c={
            "bottom":(Math.floor(Math.random()*10))+"px",
            "z-index":100
          }
        }
        else{
          c={
            "bottom ":(Math.floor(20+Math.random()*10))+"px",
            "z-index":80,
          }
        }
        $(this).css(c).css("left",(Math.floor(9300*Math.random()))+"px");
      });
      // $("#mini-wrap").animate({"left":$(window).width()+"px"}, 30);
      $("#mini-wrap").css("left", $(window).width()+"px");
    }
  };
  function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return pad(sec, 2) + ":" + hundredths;
  }

  function weiboList(currPage,pageSize) {
    var weiboListHtml = '';
    $("#weiboList ul").html("");
    var weiboSize;
    if(J.weiboListData.length < currPage*20) {
      weiboSize = J.weiboListData.length;
    } else {
      weiboSize = currPage*20;
    }
    for(var i=(currPage-1)*20; i < weiboSize; i++) {
      weiboListHtml +="<li data-uid='"+J.weiboListData[i].uid+"'><div class='box'><a style='background:url("+J.weiboListData[i].avatar+") no-repeat scroll center center #DDA994; background-size:100% auto;'><span class='ka'>"+unescape(J.weiboListData[i].name)+"</span></a></div></li>";
    }
    $("#weiboList ul").html(weiboListHtml);
    selectFriendList();
  }

  function selectFriendList() {
    $("#weiboList li").bind('click',function(){
      var imgsrc = $(this).find('a').css('backgroundImage').split('url(')[1].split(')')[0];
      var imgname = $(this).find('span').text();
      J.weiuuid = parseInt($(this).attr("data-uid"));
      J.horseName = imgname;
      $('#listHead').wiggle('start');
      $('#listHead .box a span.ka').text("确定");
      $('#listHead .box a').css("background-image","url("+imgsrc+")");
      $('#listHead .box a').css("background-size","100% auto");
      $('#listHead').on('click',function (e) {
        weiboListhide(e,imgsrc);
      });

    })
  }

  function weiboListhide(e,imgsrc) {
     $('#oppbox').removeClass("zoomIn").addClass("zoomOut");
     J._gameStart(e);
     J._changeHorseHead(imgsrc);
  }
  function show(_htmlname,divname,functionName,isfun) {
    if($('#oppbox').length !== 0) {
      if($("#oppbox").is(":animated")){   
      } 
      else {
        $('#oppbox').addClass("zoomOut");
        $('#oppbox').remove();
        $('body').append('<div id="oppbox"></div>');
        $('#oppbox').addClass("zoomIn");
        $('#oppbox').load(_htmlname+'.html #'+divname,function(){
          if(isfun){
           functionName();
          }
        });
      }
    } 
    else {
      $('body').append('<div id="oppbox"></div>');
      $('#oppbox').addClass("zoomIn");
      $('#oppbox').load(_htmlname+'.html #'+divname,function(){
        if(isfun){
           functionName();
        }
      });
    }
  }

  function showWebiLogin() {
     $.get("http://www.wangfan.com/2014/islogin.ashx",'',function(data){
        if(data.result == "success") {
          showWeiboList(data.jsonResponse);
        } else {
          $("i.fa-play-circle-o").on("click" ,function (e) {
            window.open('http://www.wangfan.com/2014/login.aspx','newwindow','height=240,width=480,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
          });
        }
      },"jsonp");
  }

  function setRating() {
    var flag = "";
    if(J.count > 600) {
      flag = J.rating[4];
    } else if(J.count < 600 && J.count >= 500) {
      flag = J.rating[3];
    } else if(J.count < 500 && J.count >= 300) {
      flag = J.rating[2];
    } else if(J.count < 300 && J.count >= 200) {
      flag = J.rating[1];
    } else {
      flag = J.rating[0];
    }
    return flag;
  }
  function leftClick() {
    if(J.currPage === 1) {

    } else {
      J.currPage --;
      weiboList(J.currPage,J.pagesize);
    }
  }

  function rightClick() {
    if(J.currPage > (J.weiboListData.length/20)) {

    } else {
      J.currPage++
      weiboList(J.currPage,J.pagesize);
    }
  }
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
  }
  J.send = function () {
    $("#sendWeibobtn").on("click",J._sendWeibo);
  }();
  J.move=function(){
    $(document).on("keypress", function(e){e.preventDefault();});
  }();
  // J.door=function(){
  //   $(".door").on("click", function(){
  //     $(".door").html("");
  //     showWebiLogin();
  //     J.indexRanking();
  //     $(this).addClass("zoomOut");
  //   });
  // }();
  var img=["num-0.png","num-1.png","num-2.png","num-3.png","num-4.png","num-5.png","num-6.png","num-7.png","num-8.png","num-9.png","loading-circle.png", "background-before.png","background.png","body_bg.jpg","body-bg-before.jpg","green_bg.png","hill_1.png","hill_2.png", "horse-fast.png","horse-slow.png","horse-walk-fast.png","horse-walk-slow.png","horse-walk-stop.png","monster-green.png", "ranking_beipai.png","ranking_bg.png","ranking_pai.png","ranking_title.png","scroe_title.png","succesMark.png","weibolist_title.png","write_bg.png"];
  var cImg=[];
  var numImagesLoaded = 0;
  function incrementAndCheckLoading(){
    showPercent(numImagesLoaded);
    numImagesLoaded=numImagesLoaded+1;
    if(numImagesLoaded === img.length){
      $("#percent1").css("background-image","url(images/num-9.png)");
      $("#percent0").css("background-image","url(images/num-8.png)");
      console.log("All are done!");
      $(".door").html("");
      showWebiLogin();
      J.indexRanking();
      $(".door").addClass("zoomOut");
    }
  }
  function showPercent(num){
    var percent=Math.floor(num/img.length*100);
    if(percent<10){ 
      $("#percent1").css("background-image","url(images/num-0.png)");
      $("#percent0").css("background-image","url(images/num-"+percent+".png)");
    }
    else{
      $("#percent1").css("background-image","url(images/num-"+Math.floor(percent/10)+".png)");
      $("#percent0").css("background-image","url(images/num-"+(percent-Math.floor(percent/10)*10)+".png)");
    }
  }

  $(img).each(function(x, y){
    cImg[x]=new Image();
    cImg[x].src="images/"+y;
    cImg[x].onload = incrementAndCheckLoading;
  });

  
  // document.getElementById("enddiv").addEventListener("webkitAnimationEnd", function(){console.log("transition done")});
  
  window.showWeiboList=J.showWeiboList;
}(jQuery);
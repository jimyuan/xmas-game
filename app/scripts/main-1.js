+function ($) { "use strict";
  var J = {
    timeStamp:0,
    count:0,
    totalTime:3*1000,
    currTime:0,
    incrementTime:70,
    mainScene:$(".main-scene"),
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
    weiboBio:[],
    preLoad:["num-0.png","num-1.png","num-2.png","num-3.png","num-4.png","num-5.png","num-6.png","num-7.png","num-8.png","num-9.png","loading-circle.png", "background-before.png","background.png","body_bg.jpg","green_bg.png","hill_1.png","hill_2.png", "horse-fast.png","horse-slow.png","horse-walk-fast.png","horse-walk-slow.png","horse-walk-stop.png","monster-green.png", "ranking_beipai.png","ranking_bg.png","ranking_pai.png","ranking_title.png","scroe_title.png","succesMark.png","weibolist_title.png","write_bg.png","bicycle_1.png","bicycle_2.png","bicycle_3.png","car_1.png","car_2.png","car_3.png"],
    _timer:{
      timer:0,
      updateTimer:function () {
        if(J.currTime < 0) {
           J._timer.stop();
           Mainscene.createNew().gameOver();
        } else {
          J.stopwatch.text(J._timer.formatTime(J.currTime));
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
      },
      formatTime:function(time) {
        var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = this.pad(time - (sec * 100) - (min * 6000), 2);
        return this.pad(sec, 2) + ":" + hundredths;
      },
      pad:function(number, length) {
        var str = '' + number;
        while (str.length < length) {str = '0' + str;}
        return str;
      }
    }
  };

  var Common={ //通用方法
    createNew: function(){
      var common={};
      common.transformSence=function(o){//主场景转场
        var $o=$(o);
        $("div.fullscreen").addClass("sceneTrans");
        $o.removeClass("sceneTrans");
        return $o;
      };
      common.size=function(o, w, h){ //维度定义
        var $o=o, width=w, height=h||w;
        $o.width(width).height(height);
        return $o;
      };
      common.show=function(content, _htmlname, divname, functionName, isfun){
        if(content.not(":animated")){
          content.load(_htmlname+'.html #'+divname,function(){
            if(isfun){
             functionName();
            }
          });
        }
      };
      return common;
    }
  }
    
  var Loading={
    createNew: function(){
      var loading={};
      loading.begin=function(){
        //调取Loading场景
        Common.createNew().transformSence("#Loading");
        loading.picPreLoad();
      };
      loading.picPreLoad=function(){
        var img=J.preLoad, cImg=[], numImagesLoaded=0

        var incrementAndCheckLoading=function(){
          showPercent(numImagesLoaded);
          numImagesLoaded=numImagesLoaded+1;
          if(numImagesLoaded === img.length){
            $("#percent1").css("background-image","url(images/num-9.png)");
            $("#percent0").css("background-image","url(images/num-9.png)");
            Gameover.createNew().indexRanking();
            //转移到下一场景
            Intro.createNew().begin();
          }
        };
        var showPercent=function(num){
          var percent=Math.floor(num/img.length*100);
          if(percent<10){ 
            $("#percent1").css("background-image","url(images/num-0.png)");
            $("#percent0").css("background-image","url(images/num-"+percent+".png)");
          }
          else{
            $("#percent1").css("background-image","url(images/num-"+Math.floor(percent/10)+".png)");
            $("#percent0").css("background-image","url(images/num-"+(percent-Math.floor(percent/10)*10)+".png)");
          }
        };

        $(img).each(function(x, y){
          cImg[x]=new Image();
          cImg[x].src="images/"+y;
          cImg[x].onload = incrementAndCheckLoading;
        });
      }
      return loading;
    }
  };

  var Intro={
    createNew:function(){
      var intro={};
      intro.begin=function(){
        Common.createNew().transformSence("#Intro");
        Weibo.createNew().begin();
      };

      return intro;
    }
  };

  var Weibo={
    createNew:function(){
      var weibo={};
      weibo.begin=function(){
        Common.createNew().transformSence("#Weibo");
        showWeiboList();
      };
      var showWebiLogin=function(){
        $.get("http://www.wangfan.com/2014/islogin.ashx",'',function(data){
          if(data.result == "success") {
            showWeiboList(data.jsonResponse);
          } 
          else {
            $("#weiboBtn").on("click" ,function (e){
              window.open('http://www.wangfan.com/2014/login.aspx','newwindow','height=240,width=480,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
            });
          }
        },"jsonp");
      };

      var showWeiboList=function(_own) {
        J._self = _own;
        var show=Common.createNew().show;

        $("#weiboBtn").fadeOut();
        if(J._self === undefined) {
          $('#mainHead').children(":last-child").css("backgroundImage","url("+J.horseHead+")");
        } else {
           $('#mainHead').children(":last-child").css("backgroundImage","url("+J._self+")");
        }
        show($("#Weibo"),'weibofd_list','weibofdlist',getFriendList,true);
      };

      var getFriendList=function () {
        $.getJSON("http://www.wangfan.com/2014/friends.ashx?callback=?", function (json) {
          J.weiboListData = json.jsonResponse;
          weiboList(J.currPage,J.pagesize);
          $("#leftbtn").on("click",leftClick);
          $("#rightbtn").on("click",rightClick);
        });
      };

      var weiboList=function (currPage,pageSize) {
        var weiboListHtml = '';
        var biourl;
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
      };

      var selectFriendList=function() {
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
            // weiboListhide(e,imgsrc);
            J.horseHead=imgsrc;
            $('#warphorseWalkStop').children(':last-child').css('backgroundImage','url('+J.horseHead+')');
            Mainscene.createNew().begin(e);
          });
        })
      };

      var leftClick=function() {
        if(J.currPage === 1) {

        } 
        else {
          J.currPage --;
          weiboList(J.currPage,J.pagesize);
        }
      }

      var rightClick=function() {
        if(J.currPage > (J.weiboListData.length/20)) {

        } 
        else {
          J.currPage++
          weiboList(J.currPage,J.pagesize);
        }
      }

      return weibo;
    }
  };

  var Oauthor={
    createNew:function(){
      var oauthor={}, c1=Common.createNew();
      oauthor.begin=function(){
        c1.transformSence("#Oauthor");
        $("#Mainscene").removeClass("sceneTrans");
        seeTips();
        showWebiLogin();
      };
      var seeTips=function(){
        $("#Oauthor div:first-child").css("top", 0).nextAll().css("bottom", 0);
      }
      var showWebiLogin=function(){
        $.get("http://www.wangfan.com/2014/islogin.ashx",'',function(data){
          if(data.result == "success") {
            Weibo.createNew().begin();
          } 
          else {
            $("#Oauthor div:last-child").on("click" ,function (e){
              window.open('http://www.wangfan.com/2014/login.aspx','newwindow','height=240,width=480,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
            });
          }
        },"jsonp");
      };
      return oauthor;
    }
  }

  var Mainscene={
    createNew:function(){
      var mainscene={};
      mainscene.begin=function(){
        Common.createNew().transformSence("#Mainscene");
        changeHorseHead(J.horseHead);
        if(arguments[0]){
          gameStart(arguments[0]);
        }
        paiSound();
      };

      var paiSound=function(){
        var snd=document.getElementById("pai-sound")
        $(document).on("keydown.playsound", function(){
          snd.play();
          $("#fireworks").show();
        }).on("keyup.playsound", function(){
          snd.currentTime=0;
          $("#fireworks").hide();
        });
      }

      var speed=function(n){// speed level 
        var level=[100,150,600,1000];
        return level.concat(n).sort(function(x, y){return y - x;}).indexOf(n);
      }

      var scrollBg=function (speed) {
        var streetStep=(9600+$(window).width())/350;

        J.mainScene.css("background-position", "+="+speed*50);
        J.beforeScene.css("background-position", "+="+speed*250);
        if(speed===0){
          $("#mini-wrap").css("left", "-="+streetStep+"px");
        }
        else{
          $("#mini-wrap").css("left", "+="+streetStep+"px");
        }
      }

      var run=function (speed) {
        J.mainScene.children(":last-child").attr("id","warphorse"+J.speedStyle[speed]);
        J.mainScene.on("webkitTransitionEnd", function(){
          $(this).children(":last-child").attr("id","warphorse"+J.speedStyle[0]);
        });
      }

      var changeHorseHead=function(hhead) {
        // J.horseHead = hhead;
        $('#warphorseWalkStop').children(':last-child').css('backgroundImage','url('+hhead+')');
      };

      var gameStart=function(e){
        window.setTimeout(function(){
          $("#enddiv").addClass("brandgo").animate({
          top: "-1000px", left: "-1000px"});
        },1000);
        J.currTime = J.totalTime;
        J.currBarWidth = 0;
        J._timer.init();
        J.timeStamp=e.timeStamp;
        $(document).on("keyup.startGame",keyUphandler);
        street();
      };

      mainscene.gameOver=function () {
        //game over
        $(document).off(".startGame");
        $(document).off(".playsound");
        J.stopwatch.text("00:00");
        J.currentTime=3*1000;
        console.log("游戏结束");
        Gameover.createNew().begin();
      }

      var keyUphandler=function(e){
        if(e.which === 32) {
          J.count++;
          //点击次数
          $("#count span").text(J.count);
          var step = e.timeStamp - J.timeStamp;
          var s= speed(step);
          scrollBg(s);
          run(s);
          J.timeStamp = e.timeStamp;
        }
      };

      var street=function(){ //路人场景
        var sp=["wrapcar_1","wrapcar_2","wrapcar_3","wrapbicycle_1","wrapbicycle_2","wrapbicycle_3"];
        var rdm=0, c={};
        var people=10;

        var bio=$.chaos($.R(1,25));
        bio.length=people;
        sp=$.ext(sp, people);

        $($.chaos(sp)).each(function(x,y){
          $("#mini-wrap").append('<div class="mini-animate" id="'+y+'"><div/><div/></div>');
        });

        $("#mini-wrap .mini-animate").each(function(i){
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
          $(this).css(c).css("left",(Math.floor(9600*Math.random()))+"px");
          // $(this).children(":last-child").css("backgroundImage",bio[i]);
          $(this).children(":last-child").append('<img src="images/userhead/'+bio[i]+'.png">');
        });
        // $("#mini-wrap").css("left", $(window).width()+"px");
      };
      return mainscene;
    }
  };

  var Gameover={
    createNew:function(){
      var gameover={};
      var show=Common.createNew().show;

      gameover.begin=function(){
        Common.createNew().transformSence("#Gameover");
        scroe();
      };
      gameover.indexRanking=function () {
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
      };

      var scroe=function(){//游戏成绩
        show($("#Gameover"),'scroe','scroe',openScroeWindow,true);
      };
      var openScroeWindow=function(){
        changeScroeHead();
        $.post("http://www.wangfan.com/2014/pai.ashx",{score:J.count,uid:J.weiuuid,avatar:J.horseHead,name:J.horseName}, function(data){
          if(data.result === "success") {
            $('#score_ranking span').text(data.jsonResponse.sort);
            J.sendWeiboImage = data.jsonResponse.avatar;
          }
        },"jsonp")
      };
      var changeScroeHead=function() {
        if(J._self === undefined) {
          $("#scroe_head_left").css("backgroundImage","url('../images/head.jpg')");
        } 
        else {
          $("#scroe_head_left").css("backgroundImage","url("+J._self+")");
        }
        $("#score_count span").text(J.count);
        $('#scroe_rating').text(setRating());

        $("#scroe_open_ranking").on("click", Ranking.createNew().begin);
        $("#scroe_play_again").on("click", Loading.createNew().begin);
        $("#weiboBtn").on("click",ShareWB.createNew().begin);
      };

      var setRating=function(){
        var flag = "";
        if(J.count > 600) {
          flag = J.rating[4];
        } 
        else if(J.count < 600 && J.count >= 500) {
          flag = J.rating[3];
        } 
        else if(J.count < 500 && J.count >= 300) {
          flag = J.rating[2];
        } 
        else if(J.count < 300 && J.count >= 200) {
          flag = J.rating[1];
        } 
        else {
          flag = J.rating[0];
        }
        return flag;
      };

      return gameover;
    }
  };

  var Ranking={
    createNew:function(){
      var ranking={}, c1=Common.createNew();
      ranking.begin=function(){
        Common.createNew().transformSence("#Ranking");
        openRankingWindow();
      }
      var openRankingWindow=function () {//游戏排行榜
        c1.show($("#Ranking"),'ranking','ranking',initRankingData,true);
      };
      var initRankingData=function() {
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
      };
      return ranking;
    }
  }

  var ShareWB={
    createNew:function(){
      var sharewb={}, c1=Common.createNew();
      sharewb.begin=function(){
        Common.createNew().transformSence("#ShareWB");
        openSendWeiboWindow();
      }

      var openSendWeiboWindow=function () {//发送微博
        c1.show($("#ShareWB"),'weibofd_send','weiboSend',sendWeibo,true);
      };
      var sendWeibo=function () {
        $('#weibosendimage').css("backgroundImage","url(http://www.wangfan.com/2014/"+J.sendWeiboImage+")");
        $("#sendWeibobtn").on("click",function (){
          // console.log($(".weibosendcontent").val(),J.weibosendimage);
          $.post("http://www.wangfan.com/2014/share.ashx", 
          {content:$(".weibosendcontent").val(),pic:J.sendWeiboImage},
          function(data){
            if(data.result ==="success") {
              $('#ShareWB').html("");
            }
          },"jsonp");
        });
      };
      return sharewb;
    }
  }

  var Init=function(){
      Common.createNew().size($("body"), $(window).width(), $(window).height());
      Loading.createNew().begin();
  }; 
  //初始化函数
  Init();
  // window.J=J;
}(window.jQuery);
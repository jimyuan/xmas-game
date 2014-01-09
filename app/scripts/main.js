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
    carSpeed:10,
    runRightFun:"",
    runLeftFun:"",
    addCarFun:"",
    headArray:[],
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

        var loader = new createjs.LoadQueue(false);
        //调取Loading场景
         var manifest = [
          {src:'images/num-0.png', id:'num-0'},
          {src:'images/num-1.png', id:'num-1'},
          {src:'images/num-2.png', id:'num-2'},
          {src:'images/num-3.png', id:'num-3'},
          {src:'images/num-4.png', id:'num-4'},
          {src:'images/num-5.png', id:'num-5'},
          {src:'images/num-6.png', id:'num-6'},
          {src:'images/num-7.png', id:'num-7'},
          {src:'images/num-8.png', id:'num-8'},
          {src:'images/num-9.png', id:'num-9'},
          {src:'images/loading-circle.png', id:'loading-circle'}
        ];

        Common.createNew().transformSence("#Loading");
        loader.addEventListener("complete", function (evt){
          Loading.createNew().loaderinit();
            //Gameover.createNew().indexRanking();
           //转移到下一场景
           // Intro.createNew().begin();
        });
        loader.addEventListener("fileload", function (evt) {
          if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
        });
        loader.addEventListener("progress",function (evt) {});
        loader.loadManifest(manifest);
      };
      loading.loaderinit = function() {
        var loader = new createjs.LoadQueue(false);
        //调取Loading场景
         var manifest = [
          {src:'images/click-space-0.png', id:'click-space-0'},
          {src:'images/click-space-1.png', id:'click-space-1'},
          {src:'images/head_1.png', id:'head_1'},
          {src:'images/click-space-2.png', id:'click-space-2'},
          {src:'images/cloud.png', id:'cloud'},
          {src:'images/fireworks.png', id:'fireworks'},
          {src:'images/gametitle.png', id:'gametitle'},
          {src:'images/green_bg.png', id:'green_bg'},
          {src:'images/head.jpeg', id:'head'},
          {src:'images/head.jpg', id:'head'},
          {src:"images/cha1.png", id:"cha1"},
          {src:"images/cha2.png", id:"cha2"},
          {src:"images/cha3.png", id:"cha3"},
          {src:"images/copy1.png", id:"copy1"},
          {src:"images/ma.png", id:"ma"},
          {src:"images/p.png", id:"p"},
          {src:"images/pai.png", id:"pai"},
          {src:"images/paipngcopy.png", id:"paipngcopy"},
          {src:"images/paipngcopy2.png", id:"paipngcopy2"},
          {src:"images/paipngcopy3.png", id:"paipngcopy3"},
          {src:"images/qi1.png", id:"qi1"},
          {src:"images/qi1pngcopy.png", id:"qi1pngcopy"},
          {src:"images/qi2.png", id:"qi2"},
          {src:"images/qi2pngcopy.png", id:"qi2pngcopy"},
          {src:"images/rbg.jpg", id:"rbg"},
          {src:"images/tree1.png", id:"tree1"},
          {src:"images/tree2.png", id:"tree2"},
          {src:"images/tree3.png", id:"tree3"},
          {src:"images/tree4.png", id:"tree4"},
          {src:"images/yi1.png", id:"yi1"},
          {src:"images/yun1.png", id:"yun1"},
          {src:"images/yun2.png", id:"yun2"},
          {src:'images/1.png', id:'1'},
          {src:'images/2.png', id:'2'},
          {src:'images/3.png', id:'3'},
          {src:'images/4.png', id:'4'},
          {src:'images/5.png', id:'5'},
          {src:'images/6.png', id:'6'},
          {src:'images/7.png', id:'7'},
          {src:'images/8.png', id:'8'},
          {src:'images/9.png', id:'9'},
          {src:'images/10.png', id:'10'},
          {src:'images/11.png', id:'11'},
          {src:'images/12.png', id:'12'},
          {src:'images/13.png', id:'13'},
          {src:'images/14.png', id:'14'},
          {src:'images/15.png', id:'15'},
          {src:'images/16.png', id:'16'},
          {src:'images/17.png', id:'17'},
          {src:'images/18.png', id:'18'},
          {src:'images/19.png', id:'19'},
          {src:'images/20.png', id:'20'},
          {src:'images/21.png', id:'21'},
          {src:'images/22.png', id:'22'},
          {src:'images/23.png', id:'23'},
          {src:'images/24.png', id:'24'},
          {src:'images/25.png', id:'25'},
          {src:'images/26.png', id:'26'},
          {src:'images/27.png', id:'27'},
          {src:'images/28.png', id:'28'},
          {src:'images/hill_1.png', id:'hill_1'},
          {src:'images/hill_2.png', id:'hill_2'},
          {src:'images/ranking_beipai.png', id:'ranking_beipai'},
          {src:'images/background-before.png', id:'background-before'},
          {src:'images/horse-fast.png', id:'horse-fast'},
          {src:'images/ranking_bg.png', id:'ranking_bg'},
          {src:'images/background.png', id:'background'},
          {src:'images/horse-slow.png', id:'horse-slow'},
          {src:'images/ranking_pai.png', id:'ranking_pai'},
          {src:'images/bicycle_1.png', id:'bicycle_1'},
          {src:'images/horse-walk-fast.png', id:'horse-walk-fast'},
          {src:'images/ranking_title.png', id:'ranking_title'},
          {src:'images/bicycle_2.png', id:'bicycle_2'},
          {src:'images/horse-walk-slow.png', id:'horse-walk-slow'},
          {src:'images/scroe_title.png', id:'scroe_title'},
          {src:'images/bicycle_3.png', id:'bicycle_3'},
          {src:'images/horse-walk-stop.png', id:'horse-walk-stop'},
          {src:'images/succesMark.png', id:'succesMark'},
          {src:'images/body-bg-before.jpg', id:'body-bg-before'},
          {src:'images/body_bg.jpg', id:'body_bg'},
          {src:'images/left_btn.png', id:'left_btn'},
          {src:'images/weibo.png', id:'weibo'},
          {src:'images/car_1.png', id:'car_1'},
          {src:'images/weibolist_title.png', id:'weibolist_title'},
          {src:'images/car_2.png', id:'car_2'},
          {src:'images/monster-green.png', id:'monster-green'},
          {src:'images/weixin.png', id:'weixin'},
          {src:'images/car_3.png', id:'car_3'},
          {src:'images/monster-yellow.png', id:'monster-yellow'},
          {src:'images/write_bg.png', id:'write_bg'},
          {src:'images/hand.png', id:'hand'}
        ];
        loader.addEventListener("complete", function (evt){
            Gameover.createNew().indexRanking();
           //转移到下一场景
           Intro.createNew().begin();
        });
        loader.addEventListener("fileload", function (evt) {
          if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
        });
        loader.addEventListener("progress",function (evt) {
          var percent=Math.floor(evt.loaded*100);
          if(percent == 100) percent = 99;
          $("#percent1").css("background-image","url(images/num-"+Math.floor(percent/10)+".png)");
          $("#percent0").css("background-image","url(images/num-"+(percent-Math.floor(percent/10)*10)+".png)");
        });
        loader.loadManifest(manifest);

      }
      return loading;
    }
  };

  var Intro={
    canvas:"", 
    stage:"",
    exportRoot:"",
    init:function() {
        Intro.canvas = document.getElementById("canvas");
         Intro.exportRoot = new lib.intro_htm_bg2l();

        Intro.stage = new createjs.Stage(Intro.canvas);
        Intro.stage.addChild(Intro.exportRoot);
        Intro.stage.update();

        createjs.Ticker.setFPS(24);
        createjs.Ticker.addEventListener("tick", Intro.stage);
        setTimeout(Oauthor.createNew().begin,5000);
      },
    createNew:function(){
      var intro={};
      intro.begin=function(){
        Common.createNew().transformSence("#Intro");
        Intro.init();
      };

      return intro;
    }
  };

  var Weibo={
    createNew:function(){
      var weibo={};
      weibo.begin=function(){
        Common.createNew().transformSence("#Weibo");
       this.showWeiboList(arguments[0]["jsonResponse"]);
      };
      
      weibo.showWeiboList=function(_own) {
        J._self = _own;
        var show=Common.createNew().show;
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
            Weibo.createNew().begin(data);
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
        $(document).on("keydown.playsound", function(e){
          if(e.which===32) {
            snd.play();
            $("#fireworks").show();
            var fireworksW = 294;
            var fireworksH =  222;
            var randomData= Math.random();
            $("#fireworks").css({"width":fireworksW*randomData,"height":fireworksH*randomData});
            $("#hand-pai").show();
          }
        }).on("keyup.playsound", function(e){
          if(e.which===32){
            snd.currentTime=0;
            $("#fireworks").hide();
             $("#hand-pai").hide();
          }
        });
      }

      var speed=function(n){// speed level 
        var level=[100,150,600,1000];
        return level.concat(n).sort(function(x, y){return y - x;}).indexOf(n);
      }

      var scrollBg=function (speed) {

        J.mainScene.css("background-position", "+="+speed*50);
        J.beforeScene.css("background-position", "+="+speed*250);
        $("#mini-wrap").children().animate({"marginLeft":"+=200px"},.05);
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
        $("#mini-wrap").css("left",0);
        J.currBarWidth = 0;
        J.count =0;
        street();
        J._timer.init();
        J.timeStamp=e.timeStamp;
        $(document).off(".keyUpstartGame");
        $(document).off(".keyDwonstartGame");
        $(document).on("keydown.keyDwonstartGame",keyDownhandler);
      };

      mainscene.gameOver=function () {
        //game over
        $(document).off(".keyUpstartGame");
        $(document).off(".keyDwonstartGame");
        $(document).off(".playsound");
        J.stopwatch.text("00:00");
        console.log("游戏结束");
        clearInterval(J.addCarFun);
        $("#mini-wrap").empty();
        Gameover.createNew().begin();
        clearInterval(J.runLeftFun);
      }
      var keyDownhandler=function (e) {
        if(e.which === 32) {
          $(document).on("keyup.keyUpstartGame",keyUphandler);
          $(document).off(".keyDwonstartGame");
        }
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
          $(document).on("keydown.keyDwonstartGame",keyDownhandler);
          $(document).off(".keyUpstartGame");
        }
      };

      var street=function(){ //路人场景
        var flag = 0;
        for(var i=1 ; i < 29; i++) {
          J.headArray.push(i);
        }

        addCar(flag);
        flag++;
        J.addCarFun = setInterval(function (){
          addCar(flag);
          flag++;
        },4000);
      };

      var addCar = function (carNum) {
        //随机获取车子
        var sp=["wrapcar_1","wrapcar_2","wrapcar_3","wrapbicycle_1","wrapbicycle_2","wrapbicycle_3","wrapMonsterYellow","warphorseMonsterGreen"];
        var n=Math.floor(Math.random()*sp.length+1)-1;        
        var headIndex = Math.floor(Math.random()*J.headArray.length+1)-1;

        $("#mini-wrap").append('<div class="s'+carNum+'" id="'+sp[n]+'"><div/><div/></div>');
        $(".s"+carNum).children(":last-child").css({"backgroundImage":"url('../images/"+J.headArray[headIndex]+".png')","backgroundRepeat":"no-repeat","backgroundSize":"100%"});
        if(carNum%2 === 0) {
          $(".s"+carNum).css({"z-index":100,"left":-400,"bottom":(Math.floor(Math.random()*10))+"px"});
        } else {
           $(".s"+carNum).css({"z-index":80,"left":-400,"bottom":(Math.floor(200+Math.random()*10))+"px"});
        }
        J.headArray.splice(headIndex,1);
        var timerArray = [1.5,2,2.5,3,3.5,4,4.5,5];
        var timerNum = Math.floor(Math.random()*timerArray.length+1)-1;
        J.runLeftFun=setInterval(function (){
          $(".s"+carNum).css("left","-="+timerArray[timerNum]+"px");
        },20);
      }
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
        if(J.count > 400) {
          flag = J.rating[4];
        } 
        else if(J.count < 400 && J.count >= 300) {
          flag = J.rating[3];
        } 
        else if(J.count < 300 && J.count >= 200) {
          flag = J.rating[2];
        } 
        else if(J.count < 200 && J.count >= 100) {
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

  var closeWeiboWindow= function (obj) {
    Weibo.createNew().begin(obj);
  }
  //初始化函数
  Init();
  window.showWeiboList=closeWeiboWindow;
}(window.jQuery);
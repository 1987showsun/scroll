/*var scrollBlock       = '';
var trolley           = '';
var hoverBlock        = '';
var moveBlock         = '';
var nowIndex          = 0;
var blockLength       = 0;
var testHoverBlock_h  = [];
var testMoveBlock_h   = [];
var testScrollBlock_h = [];
var testMoveBlock_h   = [];
var testHoverBlock_h  = [];
var testTrolley_h     = [];
var testMove          = [0,0,0,0,0,0];
var testmoveSum       = [0,0,0,0,0,0];
var testSum           = [];

$(function(){
  $wheelAction.declare();
  $(window).resize(function(event) {
    $wheelAction.set();
    $wheelAction.mousewheel();
  });
});

$wheelAction = {
  declare : function(){
    hoverBlock    = $($sunScrollSetAPI.hoverBlock);
    moveBlock     = $($sunScrollSetAPI.moveBlock);
    scrollBlock_  = 'sunScrollBlock';
    trolleyBlock_ = 'sunTrolley';
    blockLength   = hoverBlock.length;
    $wheelAction.addClass();
  },

  addClass : function(){
    moveBlock.after('<section class="'+scrollBlock_+'"><section class="top"></section><section class="bottom"></section><section class="'+trolleyBlock_+'"><span class="in"></span></section></section>');
    scrollBlock  = $('.'+scrollBlock_);
    trolley      = $('.'+trolleyBlock_);
    $wheelAction.set();
    $wheelAction.mousewheel();
  },

  set : function(){
    for( i=0 ; i<blockLength ; i++ ){
      testHoverBlock_h[i]  = hoverBlock.eq(i).height();
      testMoveBlock_h[i]   = hoverBlock.eq(i).find(moveBlock).height();
      testScrollBlock_h[i] = hoverBlock.eq(i).find(scrollBlock).height();
      testTrolley_h[i]     = hoverBlock.eq(i).find(trolley).height();

      hoverBlock.eq(i).find(trolley).css({
        height : testScrollBlock_h[i]*(testHoverBlock_h[i]/testMoveBlock_h[i]),
      });
    }
  },

  mousewheel : function(){
    var startX,startY;
    var moveX,moveY;

    for( i=0 ; i<blockLength ; i++ ){
      testHoverBlock_h[i]        = hoverBlock.eq(i).height();
      testMoveBlock_h[i]         = hoverBlock.eq(i).find(moveBlock).height();
      testTrolley_h[i]           = hoverBlock.eq(i).find(trolley).height();

      nowIndex = i;

      $wheelAction.result();
    }

    $(hoverBlock).off();
    $(hoverBlock).on({
      mouseover : function(e){
        nowIndex = $(this).index();
        if( testMoveBlock_h[nowIndex]>testHoverBlock_h[nowIndex] ){
          $(this).find(scrollBlock).stop(true,false).fadeIn(150);
        }
      },
      mousewheel : function(e) {
        nowIndex = $(this).index();
        testMove[nowIndex] = e.originalEvent.wheelDelta;
        if( testMoveBlock_h[nowIndex]>testHoverBlock_h[nowIndex] ){
          $(this).find(scrollBlock).show();
        }
        if( testMove[nowIndex]==0 ){
          $(this).find(scrollBlock).delay(2000).fadeOut(100);
        }
        $wheelAction.result();
      },
      mouseout : function(e){
        $(this).find(scrollBlock).hide();
      },
      touchstart : function(e){
        startX = e.originalEvent.touches[0].pageX;
        startY = e.originalEvent.touches[0].pageY;

        nowIndex = $(this).index();
        if( testMoveBlock_h[nowIndex]>testHoverBlock_h[nowIndex] ){
          $(this).find(scrollBlock).fadeIn(150);
        }
      },
      touchmove : function(e){
        nowIndex = $(this).index();
        moveX = e.originalEvent.touches[0].pageX;
        moveY = e.originalEvent.touches[0].pageY;
        testMove[nowIndex] = -(startY-moveY)/10;
        $wheelAction.result();
      },
      touchend : function(e){
        $(this).find(scrollBlock).hide();
      },
    });
  },

  result : function(){
    moveBlockOffset    = moveBlock.eq(nowIndex).offset().top;
    if( testMoveBlock_h[nowIndex]>=testHoverBlock_h[nowIndex] ){

      testmoveSum[nowIndex]     = testmoveSum[nowIndex] + testMove[nowIndex];
      moveTrolley               = -testmoveSum[nowIndex]*(testHoverBlock_h[nowIndex]/testMoveBlock_h[nowIndex]);

      if( testmoveSum[nowIndex]>0 ){
        testmoveSum[nowIndex]     = 0;
        moveTrolley               = 0;
      }else if(testmoveSum[nowIndex]<= -(testMoveBlock_h[nowIndex]-testHoverBlock_h[nowIndex])){
        testmoveSum[nowIndex]     = -(testMoveBlock_h[nowIndex]-testHoverBlock_h[nowIndex]);
        moveTrolley               = -testmoveSum[nowIndex]*(testHoverBlock_h[nowIndex]/testMoveBlock_h[nowIndex]);
      }
      hoverBlock.eq(nowIndex).stop(false,true).find(moveBlock).css({
        top : testmoveSum[nowIndex],
      });
      hoverBlock.eq(nowIndex).find(trolley).css({
        top : moveTrolley,
      });
      return false;
    }
  }
}*/


sunScroll = {
  $block        : '',
  $blockArry    : [],
  $wrap         : '',
  $move         : '',
  $scrollBar    : {
    $block        : '',
    $in           : '',
    _permanent    : true,
    _time         : '',
    _sleepTime    : 400,
    _sleepTimeArry: [],
  },
  _APISum       : 0,
  _toBottom     : false,
  _toBottomArry : [],
  _blockLength  : 0,

  initial : function(scrollAPI){


    sunScroll.$block    = $(scrollAPI.$block);

    if( scrollAPI._toBottom!=undefined )   sunScroll._toBottom  = scrollAPI._toBottom;
    else  sunScroll._toBottom = false ;

    if( scrollAPI.$scrollBar._sleepTime!=undefined )   sunScroll.$scrollBar._sleepTime = scrollAPI.$scrollBar._sleepTime;
    else  sunScroll.$scrollBar._sleepTime = 400;

    sunScroll.$blockArry[sunScroll._APISum]                 = scrollAPI.$block;
    sunScroll._toBottomArry[sunScroll._APISum]              = sunScroll._toBottom;
    sunScroll.$scrollBar._sleepTimeArry[sunScroll._APISum]  = sunScroll.$scrollBar._sleepTime;
    sunScroll._APISum++;

    sunScroll.add();
  },

  add : function(){

    sunScroll._blockLength = sunScroll.$block.length;

    for(i=0 ; i<sunScroll._blockLength ; i++){
      sunScroll.$block.eq(i).find('>').wrapAll('<div class="wrap"><div class="move"></div></div>');
      sunScroll.$block.eq(i).find('>').append('<div class="scrollBar"><div class="block"><div class="in"></div></div></div>');
    }

    //宣告
    sunScroll.$wrap             = sunScroll.$block.find('>.wrap');
    sunScroll.$move             = sunScroll.$wrap.find('>.move');
    sunScroll.$scrollBar.$block = sunScroll.$wrap.find('>.scrollBar');
    sunScroll.$scrollBar.$in    = sunScroll.$scrollBar.$block.find('>.block');

    sunScroll.$scrollBar.$block.hide();

    $(window).resize(function(event) {
      sunScroll.reSize();
    });

    sunScroll.toBootom();
    sunScroll.scrollBar();
    sunScroll.action();
  },

  reSize : function(status){
    var _wrapH,_moveH,_moveTop;
    for( q=0 ; q<sunScroll._APISum ; q++ ){
      for( z=0 ; z<$(sunScroll.$blockArry[q]).length ; z++ ){
        getHeight(q,z);
        if( _moveH>_wrapH ){
          //$(sunScroll.$blockArry[q]).eq(z).find('>.wrap>.scrollBar').show();
          if( status==undefined ){
            if( _moveTop<=-(_moveH-_wrapH) ){
              $(sunScroll.$blockArry[q]).eq(z).find('>.wrap>.move').css({
                top     : -(_moveH-_wrapH),
              });
            }

            $(sunScroll.$blockArry[q]).eq(z).find('>.wrap>.scrollBar>.block').css({
              height  : _wrapH/(_moveH/_wrapH),
              top     : -((_moveTop/_moveH)*100)+'%',
            });
          }else if(status=='add'){
            if( sunScroll._toBottomArry[q]==true ){
              if( _moveTop<=-(_moveH-(_wrapH+100)) ){
                getHeight(q,z);
                $(sunScroll.$blockArry[q]).eq(z).find('>.wrap>.move').css({
                  top     : -(_moveH-_wrapH),
                });
              }

              getHeight(q,z);

              $(sunScroll.$blockArry[q]).eq(z).find('>.wrap>.scrollBar>.block').css({
                height  : _wrapH/(_moveH/_wrapH),
                top     : -((_moveTop/_moveH)*100)+'%',
              });
            }
          }
        }else{
          $(sunScroll.$blockArry[q]).eq(z).find('>.wrap>.scrollBar').hide();
        }
      }
    }

    function getHeight(q,z,e){
      _wrapH      = $(sunScroll.$blockArry[q]).eq(z).find('>.wrap').height();
      _moveH      = $(sunScroll.$blockArry[q]).eq(z).find('>.wrap>.move').height();
      _moveTop    = $(sunScroll.$blockArry[q]).eq(z).find('>.wrap>.move').offset().top;
      return _wrapH,_moveH,_moveTop;
    }
  },

  //至底
  toBootom : function(){
    var _wrapH,_moveH;
    for(q=0 ; q<sunScroll._blockLength ; q++){
      _wrapH      = sunScroll.$block.eq(q).find('>.wrap').height();
      _moveH      = sunScroll.$block.eq(q).find('>.wrap>.move').height();
      if( _moveH>_wrapH ){
        if(sunScroll._toBottom){
          sunScroll.$block.eq(q).find('>.wrap>.move').css({
            top : (_wrapH - _moveH),
          })
        }
      }
    }
  },

  //拉桿
  scrollBar : function(){
    var _wrapH,_moveH,_moveTop;
    for(i=0 ; i<sunScroll._blockLength ; i++){
      _wrapH      = sunScroll.$block.eq(i).find('>.wrap').height();
      _moveH      = sunScroll.$block.eq(i).find('>.wrap>.move').height();
      _moveTop    = sunScroll.$block.eq(i).find('>.wrap>.move').offset().top;
      if( _moveH>_wrapH ){
        sunScroll.$block.eq(i).find('>.wrap>.scrollBar>.block').css({
          height : _wrapH/(_moveH/_wrapH),
          top    : -((_moveTop/_moveH)*100)+'%',
        });
      }
    }
  },

  action : function(){

    var _switch         = false;
    var _hoverInd       = 0;
    var _wheel          = 0;
    var _wrapH          = 0;
    var _moveH          = 0;
    var _moveTop        = 0;
    var _startX,_startY = 0;
    var _moveY,_moveX   = 0;
    var _hideSlseep     = 0;
    var _actionMove;

    sunScroll.$block.off();
    sunScroll.$block.on({

      mouseover : function(e){
        _actionMove   = $(this);
        var overClass = _actionMove.attr('class').split(' ');
        var overId    = _actionMove.attr('id');

        if( overId!=undefined && overId!='' ){
          overClass.push(overId);
        }
        clearTimeout(sunScroll.$scrollBar._time);
        getHeight(_actionMove);

        for( q=0 ; q<sunScroll._APISum ; q++ ){
          $(sunScroll.$blockArry[q]).find('>.wrap>.scrollBar').hide();
          if( _moveH>_wrapH ){
            for( i=0 ; i<overClass.length ; i++ ){
              switch( overClass[i]){
                case sunScroll.$blockArry[q].replace(/[&\|\\\*^%$#@.\-]/g,"") :
                  _hideSlseep = sunScroll.$scrollBar._sleepTimeArry[q];
                  break;
              }
            }
            $(this).find('>.wrap>.scrollBar').show();
          }
        }
      },

      mousewheel  : function(e){
        _actionMove = $(this);
        getHeight(_actionMove);
        if( _moveH>_wrapH ){
          _wheel    = - e.originalEvent.wheelDelta;
          _moveTop  = _moveTop - _wheel;

          if( _moveTop>0 ){
            _moveTop = 0;
          }else if( _moveTop<-(_moveH - _wrapH) ){
            _moveTop = -(_moveH - _wrapH);
          }
          move();
          e.preventDefault();
        }
      },

      mouseleave : function(e) {
        clearTimeout(sunScroll.$scrollBar._time);
        sunScroll.$scrollBar._time = setTimeout(function(){
          for( q=0 ; q<sunScroll._APISum ; q++ ){
            $(sunScroll.$blockArry[q]).find('>.wrap>.scrollBar').fadeOut(400);
          }
        },_hideSlseep);
      },

      touchstart  : function(e){
        _actionMove = $(this);
        var overClass = _actionMove.attr('class').split(' ');
        var overId    = _actionMove.attr('id');

        if( overId!=undefined && overId!='' ){
          overClass.push(overId);
        }
        clearTimeout(sunScroll.$scrollBar._time);
        getHeight(_actionMove);
        _startX     = e.originalEvent.touches[0].pageX;
        _startY     = e.originalEvent.touches[0].pageY;
        for( q=0 ; q<sunScroll._APISum ; q++ ){
          $(sunScroll.$blockArry[q]).find('>.wrap>.scrollBar').hide();
          if( _moveH>_wrapH ){
            for( i=0 ; i<overClass.length ; i++ ){
              switch( overClass[i]){
                case sunScroll.$blockArry[q].replace(/[&\|\\\*^%$#@.\-]/g,"") :
                  _hideSlseep = sunScroll.$scrollBar._sleepTimeArry[q];
                  break;
              }
            }
            $(this).find('>.wrap>.scrollBar').show();
          }
        }
      },
      touchmove   : function(e){
        _moveX      = e.originalEvent.touches[0].pageX;
        _moveY      = e.originalEvent.touches[0].pageY;

        if( _moveH>_wrapH ){
          _wheel    = (_startY-_moveY);
          _moveTop  = _moveTop - _wheel;

          if( _moveTop>0 ){
            _moveTop = 0;
          }else if( _moveTop<-(_moveH - _wrapH) ){
            _moveTop = -(_moveH - _wrapH);
          }
          move();
          e.preventDefault();
        }
      },
      touchend : function(e){
        clearTimeout(sunScroll.$scrollBar._time);
        sunScroll.$scrollBar._time = setTimeout(function(){
          for( q=0 ; q<sunScroll._APISum ; q++ ){
            $(sunScroll.$blockArry[q]).find('>.wrap>.scrollBar').fadeOut(400);
          }
        },_hideSlseep);
      }
    });

    function getHeight(_actionMove){
      _wrapH      = _actionMove.find('>.wrap').height();
      _moveH      = _actionMove.find('>.wrap>.move').height();
      _moveTop    = _actionMove.find('>.wrap>.move').offset().top;
      return _wrapH,_moveH,_moveTop;
    }

    function move(){
      _actionMove.find('>.wrap>.move').css({
        top   : _moveTop,
      }).end().find('>.wrap>.scrollBar>.block').css({
        height : _wrapH/(_moveH/_wrapH),
        top    : -((_moveTop/_moveH)*100)+'%',
      });
    }
  },
}

$(document).ready(function () {
    var _cnt = $('#container .section');
    var _navBtn = $('#indicator ul li');
    var tgIdx = 0; //로딩시 보여지는 섹션 인덱스 번호
    var cntPosY; // 섹션의 오프셋 탑 저장할 배열
    var total = _cnt.length;
    //console.log(total); //5

    var timerScroll = 0;
    var timerResize = 0;
    var timerWheel = 0;

    // 인디케이터 첫번째 li.on추가
    _navBtn.eq(0).addClass('on');
    //_navBtn.eq(tgIdx).css({left:0, top:50});

    //resize이벤트 
    $(window).on('resize', function () {
        cntPosY = new Array(total);
        /* 
        cntPosY[0] = _cnt.eq(0).offset().top;
        cntPosY[1] = _cnt.eq(1).offset().top;
        cntPosY[2] = _cnt.eq(2).offset().top;
        cntPosY[3] = _cnt.eq(3).offset().top;
        cntPosY[4] = _cnt.eq(4).offset().top; */

        for (var i = 0; i < total; i++) {
            cntPosY[i] = _cnt.eq(i).offset().top;
        }
        // 스크롤바가 문서의 가장 마지막에 위치하는 경우 = 문서높이 - 윈도우의 높이
        cntPosY.push($(document).height() - $(window).height());

        // 창크기의 변화가 생길때 활성화된 섹션이 보여질수 있도록 animate() ->click이벤트 후 확인해 보기
        $('html, body').stop().animate({scrollTop: cntPosY[tgIdx]}, 1000);
    });
    $(window).trigger('resize');
    //scroll 이벤트
    $(window).on('scroll', function () {
        clearTimeout(timerScroll);

        timerScroll = setTimeout(function () {
            var scrollY = $(this).scrollTop();
            _navBtn.each(function (idx) {
                if (scrollY >= cntPosY[idx]) {
                    $(this).addClass('on').siblings().removeClass('on');
                    tgIdx = idx;
                    //a11y();
                }
            });
            //console.log(tgIdx);
        }, 20);
    });
    //click 이벤트
    _navBtn.children().on('click',function () {
        //애니메이트 진행중-강제종료
        if ($('html,body').is(':animated')) return false;
        // li.on제어
        $(this).parent().addClass('on').siblings().removeClass('on');
        //원하는 본문으로 이동
        tgIdx = $(this).parent().index();
        $('html, body').stop().animate({scrollTop: cntPosY[tgIdx]}, 400, a11y);
        //console.log(tgIdx);
    });
    // keydown 방향키
    $(document).on('keydown', function (e) {
        //애니메이트 진행중-강제종료
        if ($('html, body').is(':animated')) return false;
        var key = e.keyCode;
        var _tg = e.target;
        //console.log(key); //상단 38 하단 40 엔터 13 스페이스 32
        
        if(key === 40 && tgIdx < total) tgIdx++;
        else if (key === 38 && tgIdx > 0) tgIdx--;
        else if ((key === 13 || key === 32) && _tg.hasClass('nav_btn')) tgIdx = _tg.parent().index();

        $('html, body').stop().animate({scrollTop: cntPosY[tgIdx]},400, a11y);
        //console.log(tgIdx);
    });
    //마우스 휠 이벤트
    _cnt.on('mousewheel DOMMouseScroll', function (e) {
        clearTimeout(timerWheel);

        timerWheel = setTimeout(function () {
            //애니메이트 진행중-강제종료
            if ($('html, body').is(':animated')) return false;
            //delta 값 구하기
            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
            //console.log(delta);

            //마우스 휠을 내리거나 올릴때 tgidx값 업데이트
            if (delta < 0 && tgIdx < total) tgIdx++;
            else if (delta > 0 && tgIdx > 0) tgIdx--;
            //인디케이터 애니메이트되면 자동으로 스크롤이벤트
            $('html, body').stop().animate({scrollTop: cntPosY[tgIdx]},400, a11y);
        }, 150);
    });
    //접근성 추가제어
    function a11y() {
        //현재 보여지는 본문
        _cnt.eq(tgIdx).removeAttr('aria-hidden inert').find('a, button').removeAttr('tabIndex');
        //나머지 본문제어
        _cnt.eq(tgIdx).siblings().attr({'aria-hidden':true, inert:''}).find('a, button').attr('tabIndex', -1);
    }

});
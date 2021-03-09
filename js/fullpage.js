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

    //resize이벤트 
    $(window).on('resize', function () {
        cntposY = new Array(total);
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
            
        });
    });
});
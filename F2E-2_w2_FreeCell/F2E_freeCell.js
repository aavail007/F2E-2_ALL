$(function () {
    $("#playTimeBtn").click(function () {
        MyCounter();
        $(".playButton").addClass("hide");
        $(".pauseButton").removeClass("hide");
        $("#circle").addClass("time_ing").removeClass("time_play");
    });
    $("#pauseTimeBtn").click(function () {
        stopCountDown();
        $(".playButton").removeClass("hide");
        $(".pauseButton").addClass("hide");
        $("#circle").addClass("time_play").removeClass("time_ing");
    });

    $("#addTodoBtn").click(function () {
        getTodoValue();
    });

    $("#restartBtn").click(function () {
        stopCountDown();
        time = 25 * 60 * 1000;
        $("#countdownID").text("25:00");
        $(".playButton").removeClass("hide");
        $(".pauseButton").addClass("hide");
        $("#circle").addClass("time_play").removeClass("time_ing");
    });

});
// =========================
var time = 25 * 60 * 1000; //倒數25分鐘
var countdownNum = '25:00';
var setTimeoutFun;
var todoListArray = [];

function MyCounter() {
    if (time <= 0) {
        //倒數完成
        countdownNum = '05:00';
    } else if (time > (60 * 1000)) {
        if ((time % (60 * 1000)) / 1000 < 10) {
            countdownNum = (parseInt((time / 1000) / 60) + ":0" + (time % (60 * 1000)) / 1000);
        } else {
            countdownNum = (parseInt((time / 1000) / 60) + ":" + (time % (60 * 1000)) / 1000);
        }
        setTimeoutFun = setTimeout(MyCounter, 1000);
    } else {
        if ((time % (60 * 1000)) / 1000 < 10) {
            countdownNum = ("00:0" + (time % (60 * 1000)) / 1000);
        } else {
            countdownNum = ("00:" + (time % (60 * 1000)) / 1000);
        }
        setTimeoutFun = setTimeout(MyCounter, 1000);
    }
    time -= 1000;
    $("#countdownID").text(countdownNum);


};

function stopCountDown() {
    clearTimeout(setTimeoutFun);
}

function getTodoValue() {
    var todoValue = $("#todoInput").val();
    todoListArray.push(todoValue);
    var todoHtml = '<div class="todo_list_bottom mt-3">\
                        <div class="circle-s"></div>\
                        <div class="todo-word-s">' + todoValue + '</div>\
                        <div class="inline play_icon_sm"><i class="far fa-play-circle"></i></div>\
                    </div>'
    $("#moreBtn").before(todoHtml);

}
$(function () {
    $('#stopModal').modal('show');
    //newGame();

    $("#newGameBtn, #modalStart, #modalRestart").click(function () {
        newGame();
        $('#stopModal').modal('hide');
        clearInterval(mm);
        mm = setInterval("Check_Time()", 1000);
    });

    $("#keepPlaying").click(function () {
        $('#stopModal').modal('hide');
        mm = setInterval("Check_Time()", 1000);
    });

    $("#pause").click(function () {
        clearInterval(mm);
        $("#modalRestart, #keepPlaying").removeClass("hide");
        $("#modalStart").addClass("hide");

    });


});
// =========================
var SetMinute = 0;
var mm;
var movesCount = 0;

function getRandom(minNum, maxNum) { //取得 minNum(最小值) ~ maxNum(最大值) 之間的亂數
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function getRandomArray(minNum, maxNum, n) { //隨機產生不重覆的n個數字
    var rdmArray = [n]; //儲存產生的陣列

    for (var i = 0; i < n; i++) {
        var rdm = 0; //暫存的亂數

        do {
            var exist = false; //此亂數是否已存在
            rdm = getRandom(minNum, maxNum); //取得亂數

            //檢查亂數是否存在於陣列中，若存在則繼續回圈
            if (rdmArray.indexOf(rdm) != -1) {
                exist = true;
            }

        } while (exist); //產生沒出現過的亂數時離開迴圈

        rdmArray[i] = rdm;
    }
    return rdmArray;
}

function dealCard() {
    var cardArray = getRandomArray(1, 52, 52);
    var rowNum = 1;
    var zIndex = 0;
    $(".card_border .poke_card_div").remove();
    $('.card_position').empty();
    for (var i = 0; i < cardArray.length; i++) {
        zIndex = zIndex + 1;
        var cardHtml = '<div class="poke_card_div card_row_' + zIndex + '" id="pokeID' + (i + 1) + '" draggable="true" ondragstart="Drag(event)"><img class="poke_card" src="card_img/Card-' + cardArray[i] + '.png"></div>'
        $("#cardRow" + rowNum).append(cardHtml);
        if (rowNum < 5) {
            if ((i + 1) % 7 === 0) {
                rowNum = rowNum + 1;
                zIndex = 0;
            }
        } else if (rowNum == 5) {
            if ((i + 1) % 7 === 6) {
                rowNum = rowNum + 1;
                zIndex = 0;
            }
        } else if (rowNum == 6) {
            if ((i + 1) % 7 === 5) {
                rowNum = rowNum + 1;
                zIndex = 0;
            }
        } else {
            if ((i + 1) % 7 === 4) {
                rowNum = rowNum + 1;
                zIndex = 0;
            }
        }

    }
    console.log(cardArray);
}

function Check_Time() {
    SetMinute += 1;
    var Check_i = document.getElementById("time");

    var Cal_Hour = Math.floor(SetMinute / 3600);
    var Cal_Minute = Math.floor(Math.floor(SetMinute % 3600) / 60);
    var Cal_Second = SetMinute % 60;
    if (Cal_Hour < 10) {
        Cal_Hour = '0' + Cal_Hour;
    }
    if (Cal_Minute < 10) {
        Cal_Minute = '0' + Cal_Minute;
    }

    if (Cal_Second < 10) {
        Cal_Second = '0' + Cal_Second;
    }

    Check_i.innerHTML = Cal_Hour + ":" + Cal_Minute + ":" + Cal_Second;

}

function newGame() {
    dealCard();
    $("#time").text('00:00:00');
    SetMinute = 0;
}


function AllowDrop(event) {
    event.preventDefault();
}

function Drag(event) {
    event.dataTransfer.setData("text", event.currentTarget.id);
}

function Drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.currentTarget.appendChild(document.getElementById(data));
    movesCount = movesCount + 1;
    $("#movesCount").text(movesCount);
}
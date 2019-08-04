$(function () {
    myaudio = new Audio('music/Mariposa.mp3');

    $(".musicCard, #playLists").click(function () {
        goArtList();
    });
    $("#goHomeBtn").click(function () {
        goHome();
    });

    $(".pause_circle").click(function () {
        var isPlay = $(".pause_circle i").hasClass('fa-play');
        if (isPlay) {
            $(".pause_circle i").removeClass('fas fa-play').addClass('fas fa-pause');
            myaudio.play();
        } else {
            $(".pause_circle i").removeClass('fas fa-pause').addClass('fas fa-play');
            myaudio.pause();
        }

    });

});

// =========================
var myaudio;
var app = new Vue({
    el: '#app',
    data: {
        hello: 'Morning, Chen',
        musTitle1: 'senorita',
        musDetle1: 'This article is about the singer. For his self-titled album, see Shawn Mendes (album). For his self-titled EP, see The Shawn Mendes EP.',
        musTitle2: 'Old Town Road',
        musDetle2: 'It was initially released independently on December 3, 2018, and gained popularity on social video sharing app TikTok.',
        musTitle3: 'Sunflower',
        musDetle3: 'The soundtrack for the 2018 American animated superhero film Spider-Man'
    }
});

function goArtList() {
    $("#index").addClass("hide");
    $("#playTool").removeClass("hide");
    $("#artList").removeClass("hide");
    $(".toolBtn").removeClass("active");
    $("#playLists").addClass("active");
    $("body").attr("style", "background-color:#fff;");
}

function goHome() {
    $("#index").removeClass("hide");
    $("#playTool").addClass("hide");
    $("#artList").addClass("hide");
    $(".toolBtn").removeClass("active");
    $("#goHomeBtn").addClass("active");
    $("body").attr("style", "background-color:#F5CD40;");
}
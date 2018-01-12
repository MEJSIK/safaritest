var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');
var bgvid = document.getElementById('bgvid');
var bgvidtwo = document.getElementById('bgvidtwo');

function initSuccess() {
    DiffCamEngine.start();
}

function initError() {
    alert('Something went wrong.');
}

function capture(payload) {
    score.textContent = payload.score;
    if (payload.score > 300) {
        bgvid.style.display = "block";
        bgvidtwo.style.display = "none";
        bgvidtwo.pause();
        bgvid.play();
    } else {
        bgvid.pause();
        bgvid.style.display = "none";
        bgvidtwo.style.display = "block";
        bgvidtwo.play();
    }

}

DiffCamEngine.init({
    video: video,
    motionCanvas: canvas,
    initSuccessCallback: initSuccess,
    initErrorCallback: initError,
    captureCallback: capture
});

//Progress Bar
bgvid.ontimeupdate = function () {

    var percentage = (bgvid.currentTime / bgvid.duration) * 100;
    $("#custom-seekbar span").css("width", percentage + "%");

    if (percentage >= 10) {
        $("#contest").css("display", "none");
        $(".after").css("display", "block");
        $("body").css("background", "url('bg.jpg') no-repeat 50% 0%");
    }



};

// Rewind Video OPTIONAL
/*
$("#custom-seekbar").on("click", function (e) {
    var offset = $(this).offset();
    var left = (e.pageX - offset.left);
    var totalWidth = $("#custom-seekbar").width();
    var percentage = (left / totalWidth);
    var vidTime = bgvid.duration * percentage;
    bgvid.currentTime = vidTime;
});
*/

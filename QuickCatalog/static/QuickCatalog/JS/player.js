var video = document.querySelector('video');
var canvas;//= document.querySelector('canvas');
var context; //= canvas.getContext('2d');

//暂停播放
function pausePlay() {
    var playIcon = document.getElementById('playIcon');
    var player = videojs("player");
    playIcon.className = "glyphicon glyphicon-play";
    player.pause();
}

$(document).ready(function () {


    $("#nextFrame").click(function () {
        var player = videojs("player");
        var time = player.currentTime();
        player.currentTime(time + 0.04);
        pausePlay();
        var label = document.getElementById("label");
        label.value = time;

    });

    //播放按钮
    $("#playCtr").click(function () {
        var playIcon = document.getElementById('playIcon');
        var player = videojs("player");
        if (playIcon.className == "glyphicon glyphicon-play") {
            playIcon.className = "glyphicon glyphicon-pause";
            player.play();
        }
        else
            pausePlay();
    });

    //停止按钮
    $("#stopCtr").click(function () {
        var playIcon = document.getElementById('playIcon');
        var player = videojs("player");
        playIcon.className = "glyphicon glyphicon-play";
        pausePlay();
        player.currentTime(0);
    });

    $("#normalCtr").click(function () {
        video.playbackRate = 1.0;
    });

    $("#nextFrameCtr").click(function () {
        var player = videojs("player");
        var time = player.currentTime();
        player.currentTime(time + 0.04);
        pausePlay();
        var label = document.getElementById("label");
        label.value = time;
    });

    $("#frontFrameCtr").click(function () {
        var player = videojs("player");
        var time = player.currentTime();
        player.currentTime(time - 0.04);
        pausePlay();
        var label = document.getElementById("label");
        label.value = time;
    });

    //快进，0.5， 1.0， 1.5， 2.0
    $("#fastCtr").click(function () {
        video.playbackRate = video.playbackRate * 2;
    });

    // 截取关键帧
    $("#keyframeCtr").click(function () {
        // Define the size of the rectangle that will be filled (basically the entire element)
        //context.fillRect(0, 0, 150, 150);
        // Grab the image from the video
        context.drawImage(video, 0, 0, 150, 150);


    });

    //点击关键帧
    $("#keyframe").click(function () {
        var player = videojs("player");
        player.currentTime(90.88);
        video.pause();
    });
});

//左下方 tree 脚本
$.extend({
    ResetTree: function () {
        $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
        $('.tree li.parent_li > span').on('click', function (e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                if ($(this).attr('title', 'Expand this branch').find(' > i').hasClass('glyphicon-minus'))
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon glyphicon-plus').removeClass('glyphicon-minus');
            } else {
                children.show('slow');
                if ($(this).attr('title', 'Expand this branch').find(' > i').hasClass('glyphicon-plus'))
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon glyphicon-minus').removeClass('glyphicon-plus');
            }
            e.stopPropagation();
        });
    }
});

$.extend({
   ChangeToCatalogTree: function(){
       $('#CatalogTab a[href="#LayerTreeTab"]').tab('show');
   }
});


// initialize video.js
var player = videojs("player");

//load the marker plugin


/*  // Define some vars required later
 var w, h, ratio;

 // Add a listener to wait for the 'loadedmetadata' state so the video's dimensions can be read
 video.addEventListener('loadedmetadata', function() {
 // Calculate the ratio of the video's width to height
 ratio = video.videoWidth / video.videoHeight;
 // Define the required width as 100 pixels smaller than the actual video's width
 w = video.videoWidth - 100;
 // Calculate the height based on the video's width and the ratio
 h = parseInt(w / ratio, 10);
 // Set the canvas width and height to the values just calculated
 canvas.width = w;
 canvas.height = h;
 }, false); */




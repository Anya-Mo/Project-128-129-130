var song_1="";
var song_2="";
var song_1_status="";
var song_2_status="";
var left_x=0;
var left_y=0;
var right_x=0;
var right_y=0;
var score_left_wrist=0;
var score_right_wrist=0;
function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.position(350,200);
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modeLoaded);
    posenet.on("pose",gotPoses);
}
function draw() {
    image(video,0,0,600,500);
    song_1_status=song_1.isPlaying();
    song_2_status=song_2.isPlaying();
    fill("pink");
    if (score_right_wrist>0.2) {
        circle(right_x,right_y,20);
        song_2.stop();
        if (song_1_status == false) {
            song_1.play();
            document.getElementById("song_name").innerHTML="Playing: Harry Potter Theme Song";
        }
    }
    if (score_left_wrist>0.2) {
        circle(left_x,left_y,20);
        song_1.stop();
        if (song_2_status == false) {
            song_2.play();
            document.getElementById("song_name").innerHTML="Playing: Peter Pan Song";
        }
    }
}
function modeLoaded() {
    console.log("Model Loaded / PoseNet is Intialized");
}
function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        left_x=results[0].pose.leftWrist.x;
        left_y=results[0].pose.leftWrist.y;
        right_x=results[0].pose.rightWrist.x;
        right_y=results[0].pose.rightWrist.y;
        console.log("Left Wrist = "+"X = "+left_x+" Y = "+left_y);
        console.log("Right Wrist = "+"X = "+right_x+" Y = "+right_y);
        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
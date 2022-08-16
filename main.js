song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload(){
    song1 = loadSound("moment.mp3");
    song2 = loadSound("space-chillout.mp3");
}

function setup() {
    canvas = createCanvas (500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('Posenet is initialized');
}
function draw() {
    image(video, 0 ,0 , 500, 400);

    if(scoreLeftWrist > 0.2) {
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        song1.isPlaying();
        song1.stop();
        song1.setVolume(volume);
    }
   if(song1 == false) {
        song1.stop();
        song2.play()
    }
    if (song1 == true) {
        song1.play();
        song2.stop();
    }
}
function play() {
    song1.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY );

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY );
    }
}
song="";
scoreRightWrist= "";
scoreLeftWrist= "";

leftWristX = "";
leftWristY = "";

rightWristX = "";
rightWristY = "";

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.position(525,240); 
    capture = createCapture(VIDEO);
    capture.hide();

    poseNet = ml5.poseNet(capture, modelLoded);
    poseNet.on('pose', gotPoses);
}

function modelLoded() {
    console.log("model loded");
}

function gotPoses(results) {
    if(results.length > 0)
    {
      console.log(results);

      scoreRightWrist = results[0].pose.keypoints[10].score;
      scoreLeftWrist = results[0].pose.keypoints[9].score;
      
      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;

      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;

    }
}

function draw(){
    image(capture,0,0,500,449);

    fill("255,0,0");
    stroke("255,0,0");

    if(scoreRightWrist > 0.2)
    {
        if(rightWristY > 0 && rightWristY < 100)
        {
            document.getElementById("gg").innerHTML= "0.5";
            song.rate(0.5);
        }
        if(rightWristY > 100 && rightWristY < 200)
        {
            document.getElementById("gg").innerHTML= "1.0";
            song.rate(1);
        }
        if(rightWristY > 200 && rightWristY < 300)
        {
            document.getElementById("gg").innerHTML= "1.5";
            song.rate(1.5);
        }
        if(rightWristY > 300 && rightWristY < 400)
        {
            document.getElementById("gg").innerHTML= "2.0";
            song.rate(2);
        }
        if(rightWristY > 400 && rightWristY < 500)
        {
            document.getElementById("gg").innerHTML= "2.5";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2)
    {
    circle(leftwristx,leftwristy,20);
    n_ly=Number(leftwristy);
    f_n_ly=floor(n_ly);
    volume=f_n_ly/500;
    document.getElementById("gg_2").value=volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    
    song.setVolume(1);
    song.rate(1);
}
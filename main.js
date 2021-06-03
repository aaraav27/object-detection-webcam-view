img ="";
status = "";

objects = [];

function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380 , 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status-detecting objects";
}

function modelLoaded(){
    console.log("model "+"is " +"loaded");
    status = true;
    objectDetector.detect(video , gotresult);
}

function gotresult(error , result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}



function draw(){
    image(video, 0, 0, 600, 600);

    if(status != ""){

        r = random(255);
        g= random(255);
        b = random(255);

     for(i = 0;  i< objects.length; i++ ){
        document.getElementById("status").innerHTML = "Objects detected";
        document.getElementById("num_of_objects").innerHTML = "Number of objects" + objects.length;
        fill(r , g , b);
      percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x +50 , objects[i].y + 50);
        noFill();
        stroke(r, g , b);
        rect(objects[i].x - 50 , objects[i].y , objects[i].width - 60, objects[i].height);
    
        
     }
    }

}
function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;

        speed -= acceldata.y / 1000;

        if (speed != 0) {
            //console.log("speed " + speed);
            xPos -= speed * elapsed;
            velocity += 0.004;
            mph = velocity * elapsed / 500;
        }

    }
    lastTime = timeNow;
}


function tick() {
    handleKeys();
    count += 1;
    if (!pause) {
        drawScene();
        animate();
    }
    document.getElementById("score").innerHTML = "Score: " + Math.ceil(zcount);
    requestAnimFrame(tick);
}
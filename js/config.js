var gl;
var shaderProgram;
var texture = [];
var mvMatrix = mat4.create();
mat4.identity(mvMatrix);
var mvMatrixStack = [];
var pMatrix = mat4.create();
var cubeVertexPositionBuffer;
var cubeVertexTextureCoordBuffer;
var cubeVertexIndexBuffer;
var cubeVertexNormalBuffer;
var difficulty = 30;
var currentlyPressedKeys = {};
//Positions
var pitch = 0;
var pitchRate = 0;
var yaw = 0;
var yawRate = .5;
var xPos = 0;
var yPos = 0.4;
var zPos = 0;
var speed = 0;
var velocity = 0.1;
var score = 0;
var pause = true;
var zGreatest = 0;
var rPyramid = 0;
var rCube = 0;
var X = new Array();
var Z = new Array();
var locationX = new Array();
var locationY = new Array();
var wave = 0;
var zcount = 0;
var ambientR = 1.0;
var ambientG = 1.0;
var ambientB = 1.0;
var lightDirectionX = 0.0;
var lightDirectionY = 0.0;
var lightDirectionZ = 0.0;
var directionR = 0.8;
var directionG = 0.8;
var directionB = 0.8;
var zcount = 0;
var zbottom = 0;
var mph = .1;
var filter = 0;
var draw = 1;
var alive = true;
// Used to make us "jog" up and down as we move forward.
var joggingAngle = 0;
var lastTime = 0;
var latitude = 34.068921;
var latincrement = -0.0005;
var longincrement = 0.005;
var longitude = -118.445181;
//var maps = new Array();
var count = 0;
var godmode = false;
var total = 0;
var cubeTrans = new Array();
//start webGL service

function resize() {
    var canvas = document.getElementById("cube-runner");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (window.innerWidth < 1000) {
        document.getElementById("points").style.width = window.innerWidth*0.6;
        document.getElementById("points").style.fontSize = window.innerWidth/40;
    }
}

$(window).resize(function() {
    resize();
});

document.addEventListener('webworksready', function(e)  {
            // run code
    webGLStart();
});

var awake;
function webGLStart() {
    //for (var i = 0; i < 20; i++) {
    //    maps[i] = new Image();
    //    if (i < 10)
    //        maps[i].src = "img/maps/" + "0"  + i + ".png";
    //    else
    //        maps[i].src = "img/maps/" + i + ".png";
    //}

    resize();
    window.onresize = resize;
    var canvas = document.getElementById("cube-runner");
    initGL(canvas);
    initShaders()
    initBuffers();
    initTexture();
    fillXZ();
    gl.clearColor(0.0, 0.0, 0.0, 0.2);
    gl.enable(gl.DEPTH_TEST);
    
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    document.getElementById("play_button").addEventListener('click', function (event) {
            event.preventDefault();
    		bbsensors.listen();
            pushRestart();
            pause = false;
        });
    tick();
    awake = community.preventsleep.setPreventSleep(true);
}

function isPaused() {};

function isDead() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("status").innerHTML = "Game Over</br>Score: " + Math.ceil(zcount);
    document.getElementById("points").style.display = "none";
    document.getElementById("footer").style.display = "block";
    document.getElementById("play_button").innerHTML = "Restart";
    document.getElementById("play_button").addEventListener('click', function (event) {
            event.preventDefault();
                pushRestart();
                pause = false;
                pitch = 0;
                pitchRate = 0;
                yaw = 0;
                yawRate = .5;
                xPos = 0;
                yPos = 0.4;
                zPos = 0;
                velocity = 0.1;
                speed = 0;
                godmode = false;
                planeScale = 0;
                pause = false;
                zGreatest = 0;
                rPyramid = 0;
                rCube = 0;
                X = new Array();
                Z = new Array();
                wave = 0;
                zcount = 0;
                ambientR = 1.0;
                ambientG = 1.0;
                ambientB = 1.0;
                lightDirectionX = 0.0;
                lightDirectionY = 0.0;
                lightDirectionZ = 0.0;
                latitude = 34.068921;
                longitude = -118.445181;
                directionR = 0.8;
                directionG = 0.8;
                directionB = 0.8;
                zcount = 0;
                zbottom = 0;
                mph = .1;
                filter = 0;
                score = 0;
                draw = 1;
                alive = true;
                // Used to make us "jog" up and down as we move forward.
                joggingAngle = 0;
                lastTime = 0;
                fillXZ();
                //pushRestart();
            
        });
};

function inGodMode() {};

function pushRestart() {
    document.getElementById("points").style.display = "block";
    document.getElementById("footer").style.display = "none";
    document.getElementById("menu").style.display = "none";
};
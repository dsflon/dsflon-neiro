var btn,
	volumeBtn,
	loading;

var valArray = new Array(
	[ "CAMERAX", 1000 ],
	[ "CAMERAY", 1000 ],
	[ "CAMERAZ", 800 ],
	[ "RANDOM", 0 ],
	[ "SEPARATION", 50 ],
	[ "AMOUNTX", 30 ],
	[ "AMOUNTY", 30 ],
	[ "OPACITY", 1 ],
	[ "SCALE", 1 ],
	[ "YAXIS", 1 ]
)

var valObj = new Object();
for (var i = 0; i < valArray.length; i++) {
	valObj[ valArray[i][0] ] = valArray[i][1];
}

var userAgent = window.navigator.userAgent.toLowerCase();
var appVersion = window.navigator.appVersion.toLowerCase();

var audioContext,audioBuffer,noteBuffer;
var fileReader   = new FileReader;

/* control */
var startOffset = 0,
	startTime = 0;
var gainNode;
/* control */

/* canvas */
var animationId,
	animationCameraId;
/* canvas */

window.addEventListener("load", function(){
	init();
	threeStart();
});

function init() {

	playBtn = document.getElementById("playBtn");
	stopBtn = document.getElementById("stopBtn");
	userMediaBtn = document.getElementById("userMediaBtn");
	file = document.getElementById("file");
	fileWrap = document.getElementById("fileWrap");
	volumeBtn = document.getElementById("volumeBtn");
	loading = document.getElementById("loading");

	navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	audioContext = new AudioContext();

	if (!navigator.getUserMedia) {
		userMediaBtn.className = "disabled";
	}

	file.addEventListener('change', function(e){
		fileReader.readAsArrayBuffer(e.target.files[0]);
	});

	userMediaBtn.addEventListener("click",function(){
		container.removeChild(container.childNodes.item(0));
		valObj.AMOUNTX = 14, valObj.AMOUNTY = 14, valObj.CAMERAZ = 450, FFT_SIZE = Math.pow(2,12);
		threeStart();
	});

	/*================================================ analyser*/
	analyser = audioContext.createAnalyser();
	analyser.fftSize = FFT_SIZE;
	analyser.smoothingTimeConstant = SMOOTHING;
	/*================================================ analyser*/

}

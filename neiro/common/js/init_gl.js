var btn,
	volumeBtn,
	loading;

var SEPARATION = 50, AMOUNTX = 30, AMOUNTY = 30, CAMERAZ = 900;
var AMOUNTX2, AMOUNTY2, CAMERAZ2;

var userAgent = window.navigator.userAgent.toLowerCase();
var appVersion = window.navigator.appVersion.toLowerCase();

var audioContext,audioBuffer,noteBuffer;
var fileReader   = new FileReader;

/* analyser */
var analyser;
/* analyser */

/* control */
var startOffset = 0,
	startTime = 0;
var gainNode;
/* control */

/* canvas */
var animationId;
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

	// playBtn.addEventListener("click",function(){
	// 	AMOUNTX = 30, AMOUNTY = 30, cameraZ = 900, FFT_SIZE = Math.pow(2,11);
	// 	threeStart();
	// });
	// file.addEventListener("click",function(){
	// 	AMOUNTX = 30, AMOUNTY = 30, cameraZ = 900, FFT_SIZE = Math.pow(2,11);
	// 	threeStart();
	// });
	userMediaBtn.addEventListener("click",function(){
		container.removeChild(container.childNodes.item(0));
		AMOUNTX = 14, AMOUNTY = 14, CAMERAZ = 500, FFT_SIZE = Math.pow(2,12);
		threeStart();
	});

	/*================================================ analyser*/
	analyser = audioContext.createAnalyser();
	analyser.fftSize = FFT_SIZE;
	analyser.smoothingTimeConstant = SMOOTHING;
	/*================================================ analyser*/

}

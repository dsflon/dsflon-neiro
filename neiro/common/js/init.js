var playBtn, stopBtn, file, fileWrap, volumeBtn, loading, userMediaBtn;

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
var WIDTH, HEIGHT;
var canvas,
	canvasContext,
	animationId;
/* canvas */

window.onload = init;
window.onresize = resize;

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
		// alert(e.target.files[0].name);
	});

	/*================================================ analyser*/
	analyser = audioContext.createAnalyser();
	analyser.fftSize = FFT_SIZE;
	analyser.smoothingTimeConstant = SMOOTHING;
	/*================================================ analyser*/

	/*================================================ canvas*/
	WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;
	canvas = document.getElementById('visualizer');
	canvasContext = canvas.getContext('2d');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	/*================================================ canvas*/

}

function resize() {
	WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
}

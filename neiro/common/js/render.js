function render(){
	var freqDomain = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqDomain);

	var timeDomain = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteTimeDomainData(timeDomain);

	var alpha = fraction+0.1;
	if(!fraction){
		var alpha = 0.5;
	}
	canvasContext.globalAlpha = alpha;

	canvasContext.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < analyser.frequencyBinCount; i++) {
		var value = timeDomain[i];
		var percent = value / 256;
		var height = HEIGHT * percent;
		var offset = HEIGHT - height - 1;
		var barWidth = WIDTH/analyser.frequencyBinCount;
		var hue = i / analyser.frequencyBinCount * 360;

		var pie = value;

		canvasContext.fillStyle = 'hsl(' + hue + ', 50%, 50%)';
		canvasContext.beginPath();
		canvasContext.arc(i * barWidth, (offset), value/100, 0, Math.PI*2, false);
		canvasContext.fill();
	}

	for(var i=0; i<analyser.frequencyBinCount; i++){

		var value = freqDomain[i];
		var percent = value / 256;
		var height = HEIGHT * percent;
		var offset = HEIGHT - height - 1;
		var barWidth = WIDTH / analyser.frequencyBinCount;
		var hue = i / analyser.frequencyBinCount * 360;
		var hue2 = offset / HEIGHT * 360;

		canvasContext.fillStyle = 'hsl(' + hue2 + ', 70%, 50%)';

		canvasContext.beginPath();

		if(! userMediaFlag ) {
			var x = i * barWidth*4;
			var y = offset+pie;
			var pie = value/6;
		} else {
			var x = i * barWidth*12;
			var y = offset;
			var pie = value/4;
		}

		canvasContext.arc(x, y, pie, 0, Math.PI*2, false);
		canvasContext.fill();

	}
	animationId = requestAnimationFrame(render);
};

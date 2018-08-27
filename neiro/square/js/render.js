var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var WIDTH, HEIGHT;

function threeStart() {
	initThree();
	initCamera();
	initObject();

	cameraRender();
	render();
}

////////////////////////////////////////////////////////////// init Three
var container, scene, renderer;
var mouseX = 0, mouseY = 0;

function initThree() {

	WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;

	container = document.getElementById( 'render' );

	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setClearColor(0xffffff, 1);
	container.appendChild( renderer.domElement );

	scene = new THREE.Scene();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );
	window.addEventListener( 'resize', onWindowResize, false );

}

////////////////////////////////////////////////////////////// init Camera
var camera;
function initCamera() {
	//カメラを生成
	var fov    = 120;
	var aspect = WIDTH / HEIGHT;
	var near   = 1;
	var far    = 3000;
	camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	//軸オブジェクト位置座標
	camera.position.set( 0, 0, valObj.CAMERAZ );
	//カメラ上ベクトルの設定
	camera.up.set( 0, 0, 0 );
	//カメラの中心位置ベクトルの設定
	camera.lookAt({ x:0, y:500, z:0 });

	// trackball = new THREE.TrackballControls( camera );
	// trackball.rotateSpeed = 1.0;
	// trackball.zoomSpeed = 1.2;
	// trackball.panSpeed = 0.8;
	// trackball.noZoom = false;
	// trackball.noPan = true;
	// trackball.noRotate = true;
	// trackball.staticMoving = true;
	// trackball.dynamicDampingFactor = 0.3;

}

////////////////////////////////////////////////////////////// init Object
var particles, particle, group;
function initObject() {

	group = new THREE.Group();
	particles = new Array();
	var PI2 = Math.PI * 2;

	var i = 0;
	for ( var ix = 0; ix < valObj.AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < valObj.AMOUNTY; iy ++ ) {

			var material = new THREE.SpriteCanvasMaterial( {
				color: 0xe94e2b,
				program: function ( context ) {
					context.globalAlpha = valObj.OPACITY;
					context.beginPath();
					context.arc( 0, 0, 0.3, 0, PI2, true );
					context.fill();
				}

			} );
			particle = particles[ i ++ ] = new THREE.Sprite( material );
			if (Math.random()*valObj.RANDOM > 10){
				particle.position.z = -100000;
			} else {
				particle.position.x = ix * valObj.SEPARATION - ( ( valObj.AMOUNTX * valObj.SEPARATION ) / 2 );
				particle.position.z = iy * valObj.SEPARATION - ( ( valObj.AMOUNTY * valObj.SEPARATION ) / 2 );
			}
			// scene.add( particle );
			group.add( particle );
		}

	}

	scene.add( group );
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}
function onDocumentMouseOut( event ) {
	mouseX = 0;
}

function cameraRender() {

	if(mouseX < 0) {
		var thisMouseX = -( (valObj.CAMERAX/1000) * Math.abs(mouseX) );
	} else {
		var thisMouseX = ( (valObj.CAMERAX/1000) * Math.abs(mouseX) );
	}

	if(mouseY < 0) {//上
		var thisMouseY = (valObj.CAMERAY/1000) * mouseY;
	} else {
		var thisMouseY = 0;
	}

	group.rotation.y += ( thisMouseX - camera.position.x ) * .00002;

	camera.position.y += ( 100 - (thisMouseY*valObj.YAXIS) - camera.position.y ) * .02;
	camera.lookAt( scene.position );

	// trackball.update();
	renderer.render( scene, camera );
	animationCameraId = requestAnimationFrame(cameraRender);
}

function render() {

	var freqDomain = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqDomain);

	var i = 0;
	for ( var ix = 0; ix < valObj.AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < valObj.AMOUNTY; iy ++ ) {

			var val = freqDomain[i];
			particle = particles[ i++ ];
			particle.position.y = (val*valObj.YAXIS);

			particle.scale.x = (val*valObj.SCALE/5)+3;
			particle.scale.y = (val*valObj.SCALE/5)+3;

		}

	}

	// renderer.render( scene, camera );
	animationId = requestAnimationFrame(render);

}

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var WIDTH, HEIGHT;
var texture = new THREE.TextureLoader();

var S = 50, //彩度
	L = 50; //輝度
if(L >= 50) {
	var MAX = 2.55 * (L + (100 - L) * (S / 100));
	var MIN = 2.55 * (L - (100 - L) * (S / 100));
} else {
	var MAX = 2.55 * (L + L * (S / 100));
	var MIN = 2.55 * (L - (100 - L) * (S / 100));
}

function threeStart() {
	initThree();
	initObject();
	initCamera();

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

	renderer = new THREE.WebGLRenderer( {
		antialias:true,
		alpha: true
	} );
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setClearColor(0x000000, 1);
	container.appendChild( renderer.domElement );

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x333333, 0.0005 );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
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

}

////////////////////////////////////////////////////////////// init Object
var particles, particle, group, Points, material;
function initObject() {

	group = new THREE.Group();
	particles = new THREE.Geometry();

	// テクスチャの設定
	var textureImg = texture.load('/neiro/common/images/circle.png');

	// マテリアルの設定
	material = new THREE.PointsMaterial({
		// color: 0xe94e2b,
		size: 15,
		// blending: THREE.AdditiveBlending,
		map: textureImg,
		transparent: true,
		vertexColors: THREE.VertexColors
	});

	var i = 0;
	for ( var ix = 0; ix < valObj.AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < valObj.AMOUNTY; iy ++ ) {

			var style = "hsl(180, 50%, 50%)";
			color = new THREE.Color( style );

			py = 0;
			if (Math.random()*valObj.RANDOM > 10){
				pz = -100000;
			} else {
				px = ix * valObj.SEPARATION - ( ( valObj.AMOUNTX * valObj.SEPARATION ) / 2 );
				pz = iy * valObj.SEPARATION - ( ( valObj.AMOUNTY * valObj.SEPARATION ) / 2 );
			}
			particle = new THREE.Vector3( px, py, pz );

			particles.vertices.push( particle );
			particles.colors.push( color );

			i++;
		}

	}

	Points = new THREE.Points( particles, material );

	// パーティクルの深さを毎フレームソート
	Points.sortParticles = true;

	// scene.add( Points );
	group.add( Points );
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
	camera.position.y += ( 100 - (thisMouseY*valObj.YAXIS/1.5) - camera.position.y ) * .02;
	camera.lookAt( scene.position );

	// renderer.render( scene, camera );
	animationCameraId = requestAnimationFrame(cameraRender);
}


function render() {

	var freqDomain = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqDomain);

	var i = 0;
	for ( var ix = 0; ix < valObj.AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < valObj.AMOUNTY; iy ++ ) {

			var val = freqDomain[ i ];


			var particle = particles.vertices[ i ];
			var colors = particles.colors[ i ];

			var H = (freqDomain[i]/225*360).toFixed(1);
			var num = 60;

			if(H <= num) {

				R = MAX;
				G = (H / 60) * (MAX - MIN) + MIN;
				B = MIN;

			} else if( num < H && H <= num*2 ) {

				R = ((120 - H) / 60) * (MAX - MIN) + MIN;
				G = MAX;
				B = MIN;

			} else if( num*2 < H && H <= num*3 ) {

				R = MIN;
				G = MAX;
				B = ((H - 120) / 60) * (MAX - MIN) + MIN;

			} else if( num*3 < H && H <= num*4 ) {

				R = MIN;
				G = ((240 - H) / 60) * (MAX - MIN) + MIN;
				B = MAX;

			} else if( num*4 < H && H <= num*5 ) {

				R = ((H - 240) / 60) * (MAX - MIN) + MIN;
				G = MAX;
				B = MIN;

			} else if( num*5 < H && H <= num*6 ) {

				R = MAX;
				G = MIN;
				B = ((360 - H) / 60) * (MAX - MIN) + MIN;

			}

			colors.r = ( R/255 ).toFixed(1);
			colors.g = ( G/255 ).toFixed(1);
			colors.b = ( B/255 ).toFixed(1);
			particle.y = val*valObj.YAXIS*1.2;

			i ++;

		}

	}
	Points.geometry.verticesNeedUpdate = true;
	Points.geometry.colorsNeedUpdate = true;

	renderer.render( scene, camera );
	animationId = requestAnimationFrame(render);

}

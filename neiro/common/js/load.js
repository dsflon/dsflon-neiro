(function(){
	for(var i=0; i<arguments.length; i++){
		document.write('<script src="'+arguments[i]+'"></script>');
	}
})(
	"/neiro/common/js/jquery.1.11.1.js",
	"/neiro/common/js/common.js",
	"/neiro/common/js/libs/three.min.js"
);

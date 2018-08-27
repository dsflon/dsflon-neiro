window.addEventListener("load", function(){
	snsBtn();
});

function snsBtn() {

	var thisUrl = location.href;
	var tw = document.getElementById('twLink');
	var fb = document.getElementById('fbLink');
	tw.setAttribute("href", "http://twitter.com/share?url="+thisUrl);
	fb.setAttribute("href", "http://www.facebook.com/share.php?u="+thisUrl);

}

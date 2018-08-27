$(function(){

	var _control = $("#control");
	var thisVal;

	if( _control.length < 1 ){
		return false;
	} else {
		init();
		controlStart();

		var thisSearch = location.hash;
		if(thisSearch){
			$(window).on("load",function(){
				controlSearch();
			});
		}
	}

	function init(){

		$(window).on("load",function(){
			setTimeout(function(){
				_control.addClass("active");
			},100);
			setTimeout(function(){
				_control.removeClass("active");
			},1100);
		});

		$("#controlBtn").on("click", function(){
			_control.toggleClass("active");
		});
		_control.find("button.submit").on("click", function(){
			var val = "";
			for (var i = 0; i < valArray.length; i++) {
				val += valArray[i][0] + "=" + $("#"+valArray[i][0]).val() + "&";
				if( i == valArray.length-1 ) {
					location.href = "#/"+val;
				}
			}
		});
		_control.find("button.reset").on("click", function(){
			for (var i = 0; i < valArray.length; i++) {
				$("#"+valArray[i][0]).siblings("span").html(valArray[i][1]);
				$("#"+valArray[i][0]).val(valArray[i][1]);
				valObj[ valArray[i][0] ] = valArray[i][1];
				if( i == valArray.length - 1 ) {
					threeRender();
				}
			}
			location.href = "#";
		});

		for (var i = 0; i < valArray.length; i++) {
			$("#"+valArray[i][0]).val(valArray[i][1]);
			$("#"+valArray[i][0]).siblings("span").html(valArray[i][1]);
		}
	}

	function controlSearch(){

		for (var i = 0; i < valArray.length; i++) {
			var thisVal = thisSearch.split(valArray[i][0]+"=")[1].split("&")[0];
			$("#"+valArray[i][0]).siblings("span").html(thisVal);
			$("#"+valArray[i][0]).val(thisVal);

			valObj[ valArray[i][0] ] = thisVal;

			if( i == valArray.length-1 ) {
				threeRender();
			}

		}
	}

	function controlStart(){

		$("#control table input").on("change",function(){
			var thisId = $(this).attr("id");
			var rerender = $(this).attr("data-rerender");
			valControl(this);
			valObj[ thisId ] = thisVal;

			if(rerender != "false") {
				threeRender();
			}

		});

	}

	function valControl(thisElm){
		thisVal = $(thisElm).val();
		$(thisElm).siblings("span").html(thisVal);
	}

	function threeRender(){
		cancelAnimationFrame(animationCameraId);
		cancelAnimationFrame(animationId);
		$("#render").children().remove();
		threeStart();
	}

});

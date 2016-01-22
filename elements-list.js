$(document).ready(function(){

	var canvasMinX = $('.canvas').offset().left;
	var canvasMinY = $('.canvas').offset().top;
	var canvasMaxX = $('.canvas').offset().left + $('.canvas').width() - $('.box').width();
	var canvasMaxY = $('.canvas').offset().top + $('.canvas').height() - $('.box').height();

	console.log("X: " + canvasMinX + ' ' + canvasMaxX + " Y: " + canvasMinY + ' ' + canvasMaxY);

	$('.template').draggable({
		helper: "clone",
		drag: checkIfIsInCanvas,
		stop: copyTemplateToCanvas 
	});

	function checkIfIsInCanvas(event, ui){		
		var x = ui.offset.left;
		var y = ui.offset.top;

		console.log("(" + x + ", " + y + ")");

		if(x >= canvasMinX && x <= canvasMaxX && y >= canvasMinY && y <= canvasMaxY ){
			ui.helper.removeClass('redmask');
			ui.helper.addClass('greenmask');
		}
		else{
			ui.helper.removeClass('greenmask');
			ui.helper.addClass('redmask');	
		}
	}

	function copyTemplateToCanvas(event, ui){
		
		if(true){

		}
	}
});
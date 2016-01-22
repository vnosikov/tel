$(document).ready(function(){

	var canvasMinX = $('.canvas').offset().left;
	var canvasMinY = $('.canvas').offset().top;
	var canvasMaxX = $('.canvas').offset().left + $('.canvas').width() - $('.box').width();
	var canvasMaxY = $('.canvas').offset().top + $('.canvas').height() - $('.box').height();

	console.log("X: " + canvasMinX + ' ' + canvasMaxX + " Y: " + canvasMinY + ' ' + canvasMaxY);

	$('.template').draggable({
		helper: "clone",
		drag: colorizeBox,
		stop: copyTemplateToCanvas 
	});

	function colorizeBox(event, ui){		
		//If we are inside the canvas let's paint our element green
		if(checkIfIsInCanvas(ui.offset)){
			ui.helper.removeClass('redmask');
			ui.helper.addClass('greenmask');
		}
		//Otherwise it will be red
		else{
			ui.helper.removeClass('greenmask');
			ui.helper.addClass('redmask');	
		}
	}

	function copyTemplateToCanvas(event, ui){
		if(checkIfIsInCanvas(ui.offset)){
			var newCanvasElement = $("<div class='box element'>");
			var elementText = $("<div class='text'>");
			var html = ui.helper.find('.text').html();

			elementText.html(html);

			newCanvasElement.append(elementText);
			$('.canvas').append(newCanvasElement);

			newCanvasElement.offset(ui.offset);

			//Adding handlers
			createHandlersForElements(newCanvasElement);
		}

		else console.log("Impossible to copy template outside of a canvas");
	}

	function checkIfIsInCanvas(offset){
		var x = offset.left;
		var y = offset.top;

		console.log("(" + x + ", " + y + ")");

		if(x >= canvasMinX && x <= canvasMaxX && y >= canvasMinY && y <= canvasMaxY ){
			return true;
		}
		else return false;
	}
});
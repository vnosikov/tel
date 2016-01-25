$(document).ready(function(){

	var checkIfIsInCanvas = canvas().checkIfIsInCanvas;

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
			//Preparing new element
			var newCanvasElement = $("<div class='box element'>");
			var elementText = $("<div class='text'>");
			var html = ui.helper.find('.text').html();

			elementText.html(html);

			//We need a container with an absolute position, otherwise changing sizes of one's element
			//can lead to changing position of another. So 'outer-box' is a wrapper to avoid this
			var outerBox = $("<div class='outer-box'>");			
			newCanvasElement.append(elementText);
			outerBox.append(newCanvasElement);
			$('.canvas').append(outerBox);

			newCanvasElement.offset(ui.offset);

			//Adding handlers
			createHandlersForElements(newCanvasElement);
		}

		else console.log("Impossible to copy template outside of a canvas");
	}

});
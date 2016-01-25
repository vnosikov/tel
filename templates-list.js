$(document).ready(function(){

	var checkIfIsInCanvas = canvas().checkIfIsInCanvas;
	var copyContent = content().copyContent;

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
			
			//Copying data from template
			var element = copyContent(ui.helper.find('.content'));

			//We need a container with an absolute position, otherwise changing sizes of one's element
			//can lead to changing position of another. This 'outer-box' is a wrapper to avoid this
			var outerBox = $("<div class='outer-box'>");			
			newCanvasElement.append(element);
			outerBox.append(newCanvasElement);
			$('.canvas').append(outerBox);

			newCanvasElement.offset(ui.offset);

			//Adding handlers
			createHandlersForElements(newCanvasElement);
		}

		else console.log("Impossible to copy template outside of a canvas");
	}

});
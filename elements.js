$(document).ready(function(){
	createHandlersForElements($('.element'));	
});

function createHandlersForElements(els){

	checkIfIsInCanvas = canvas().checkIfIsInCanvas;

	els.draggable({
		drag: elementDragHandler,
		revert: elementDropHandler
	});

	els.resizable({
		autoHide:true,
		containment: $('.canvas'),
		resize: textBlockResizeHandler
	});	

	els.find('.content').draggable({
		containment:"parent"
	});

	els.find('.image').resizable({
		autoHide:true,
		containment:"parent"
	});

	els.find('.content').on('dblclick', function(){		
		var handler = getContentClass($(this)).getEditHandler();
		handler.call(this);
	});

	function textBlockResizeHandler(event, ui){
		var innerText = ui.element[0].getElementsByClassName('content')[0];		
		var minWidth = innerText.clientWidth + innerText.offsetLeft;
		var minHeight = innerText.clientHeight + innerText.offsetTop;
		
		if(ui.size.width < minWidth) {
			ui.size.width = minWidth;
		}
		if(ui.size.height < minHeight) {
			ui.size.height = minHeight;
		}
	}

	function elementDragHandler(event, ui){
		if(!checkIfIsInCanvas(ui.offset)){
			$(this).addClass("redmask");
		}
		else{
			$(this).removeClass("redmask");
		}
	}

	function elementDropHandler(){
		if(!checkIfIsInCanvas($(this).offset())){
			if(confirm("Really delete this element?")){
				$(this).remove();
			}
			else{		
				//Smoothly return back
				$(this).removeClass("redmask");
				return true;
			}
		}
		return false;
	}
}

var checkIfIsInCanvas;
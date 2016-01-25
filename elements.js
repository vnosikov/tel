$(document).ready(function(){
	createHandlersForElements($('.element'));
	checkIfIsInCanvas = canvas().checkIfIsInCanvas;
});

function createHandlersForElements(els){
	els.draggable({
		drag: elementDragHandler,
		revert: elementDropHandler
	});

	els.resizable({
		autoHide:true,
		containment: $('.canvas'),
		resize: textBlockResizeHandler
	});	

	els.find('.text').on("dblclick", editBox);

	els.find('.text').draggable({
		containment:"parent"
	});

	els.find('.image').on('dblclick', loadImage);

	function editBox(){

		//Getting text element
		var viewableText = $(this);
		var element = $(this).parent()[0];

		//creating and preparing editable field
		var editableText = $("<textarea />");
		editableText.html(viewableText.html());

		//By definition this == $(this)[0], so in this case it is a label, which we're going to edit
		editableText.css('height', element.clientHeight*0.9);					
		editableText.css('width', element.clientWidth*0.9);	
		editableText.css('resize', 'none');	

		//Replacing text element with editable text area
		viewableText.replaceWith(editableText);
	    editableText.focus();		

	    //Setting reverse replace after editing
	    $(editableText).blur(function() {	    
		    var html = $(this).val();
		    var viewableText = $("<div class='text'>");
		    viewableText.html(html);	    
		    $(this).replaceWith(viewableText);
		    viewableText.on('dblclick', editBox);

		    //resizing parent box if necessary
		    var parent = viewableText.parent();
		    if(viewableText.height()>parent.height()){
		    	parent.height(viewableText.height()/0.9);
		    }
		    if(viewableText.width()>parent.width()){
		    	parent.width(viewableText.width()/0.9);
		    }		    

		    //adding text label drag handler

		    $('.text').draggable({
				containment:"parent"
			});
		});
	}

	function textBlockResizeHandler(event, ui){
		var innerText = ui.element[0].getElementsByClassName('text')[0];		
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

	function loadImage(){
		var image = $(this).find('img');
		var loader = $('#imageLoader');

		loader.on('change', function(ev){
			var f = ev.target.files[0];
	   		var fr = new FileReader();	   		
	    
	    	fr.onload = function(ev2) {
	        	console.dir("File read");
	        	image.attr('src', ev2.target.result);
	    	};
	    
	    	fr.readAsDataURL(f);		
		});
		
		loader[0].click();					
	}
}

var checkIfIsInCancas;
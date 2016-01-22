$(document).ready(function(){
	
	createHandlersForElements($('.element'));

	$('.canvas .text').draggable({
		containment:"parent"
	});

});

function createHandlersForElements(els){
	els.draggable({
		containment:$('.canvas')
	});

	els.resizable({
		autoHide:true,
		resize: textBlockResizeHandler
	});	

	els.on("dblclick", editBox);

	function editBox(){

		//Getting text element
		var viewableText = $(this).find('.text')[0];

		//creating and preparing editable field
		var editableText = $("<textarea />");
		editableText.val(viewableText.textContent);

		//By definition this == $(this)[0], so in this case it is a label, which we're going to edit
		editableText.css('height', this.clientHeight*0.9);					
		editableText.css('width', this.clientWidth*0.9);	
		editableText.css('resize', 'none');	

		//Replacing text element with editable text area
		$(this).find('.text').replaceWith(editableText);
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
}
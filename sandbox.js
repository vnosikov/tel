$(document).ready(function(){
	$('.box').draggable({
		containment:"parent"
	});
	$('.box').resizable({
		autoHide:true,
		minHeight: $('.box').find('.text').height() + $('.box').find('.text').position().top,
		minWidth: $('.box').find('.text').width() + $('.box').find('.text').position().left
	});

	/*$('.text').draggable({
		containment:"parent"
	});*/
	$('.box').on("dblclick", editBox);
});

function editBox(){

	//Getting container
	var $this = $(this)[0];

	//Getting text element
	var viewableText = $(this).find('.text')[0];

	//creating and preparing editable field
	var editableText = $("<textarea />");
	editableText.val(viewableText.textContent);

	editableText.css('height', $this.clientHeight*0.9);
	editableText.css('width', $this.clientWidth*0.9);	
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

	    $('.box').resizable({
			autoHide:true,
			minHeight: $('.box').find('.text').height() + $('.box').find('.text').position().top,
			minWidth: $('.box').find('.text').width() + $('.box').find('.text').position().left
		});
	});
}
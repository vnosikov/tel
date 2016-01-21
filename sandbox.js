$(document).ready(function(){
	$('.box').draggable({
		containment:$('.container')
	});

	$('.box').resizable({
		autoHide:true,
		resize: function(event, ui){
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
	});	

	/*$('.text').draggable({
		containment:"parent"
	});*/

	$('.box').on("dblclick", editBox);

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

		    parent.resizable({
				autoHide:true,
				resize: function(event, ui){
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
			});
		});
	}
});
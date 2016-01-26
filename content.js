function Content(){	
}

Content.prototype.getEditHandler = function(){throw Error("geEditHandler function must be implemented");}
Content.prototype.cloneContent = function(content){throw Error("geEditHandler function must be implemented");}

function TextContent(){}
TextContent.prototype = Object.create(Content.prototype);

TextContent.prototype.getEditHandler = function(){
	return function editBox(){
		//Getting text element
		var viewableText = $(this);
		var element = $(this).parent()[0];

		//creating and preparing editable field
		var editableText = $("<textarea />");
		editableText.html(viewableText.text());

		editableText.css('height', element.clientHeight*0.9);					
		editableText.css('width', element.clientWidth*0.9);	
		editableText.css('resize', 'none');	

		//Replacing text element with editable text area
		viewableText.replaceWith(editableText);
	    editableText.focus();		

	    //Setting reverse replace after editing
	    $(editableText).blur(function() {	    
		    var html = $(this).val();
		    var viewableText = $("<div class='content text'>");
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
}

TextContent.prototype.cloneContent = function(content){
	var element = $("<div class='content text'>");
	var html = content.text();
	element.html(html);			

	return element;
}


function ImageContent(){}
ImageContent.prototype = Object.create(Content.prototype);

ImageContent.prototype.getEditHandler = function(){
	return function(){
		var image = $(this).find('img');
		//This is a hidden input field that we use for loading images
		//Check html file for details
		var loader = $('#imageLoader');

		loader.on('change', function(ev){
			var f = ev.target.files[0];
	   		var fr = new FileReader();	   		
	    
	    	fr.onload = function(ev2) {
	    		///Adding loaded image to a corresponding field	        	
	        	image.attr('src', ev2.target.result);	        	
	    	};

	    	fr.onloadend = function(){
	    		//Removing all the listeners reagrdless of loading success
	    		fr.onload = null;
	    		fr.onloadend = null;
	        	loader.off();
	    	}
	    
	    	fr.readAsDataURL(f);		
		});
		//Imitating input button click - as far as I understand, that's the only way to load something
		loader[0].click();					
	}
}

ImageContent.prototype.cloneContent = function(content){
	var element = $("<div class='content image'>");
	var img = $("<img src='/'>");
	img.attr('src', content.find('img').attr('src'));
	element.append(img);
	return element;
}

function getContentClass(element){
	var supportedTypes = ["text", "image"];
	var classNames = element.attr("class").split(' ');
	for(var i=0; i<classNames.length; i++){		
		switch(classNames[i]){
			case "text":
				return new TextContent();
				break;
			case "image":
				return new ImageContent();
				break;
			default:
				//continue seatch
				break;
		}
	}	
	throw Error("Element's classes do not correspond to any supported ContentClass");
}
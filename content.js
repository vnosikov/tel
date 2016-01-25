function content(){

	var supportedTypes = ["text", "image"];

	return{
		getEditHandler: function(classNames, context){
			for(var i=0; i<classNames.length; i++){
				if(supportedTypes.indexOf(classNames[i]) != -1){
					var handler = getEditHandlerForType(classNames[i]);
					//We have to save our context
					handler.call(context);
					break;
				}
			}
		},

		copyContent: function(content){
			var classNames = content.attr("class").split(' ');
			for(var i=0; i<classNames.length; i++){
				if(supportedTypes.indexOf(classNames[i]) != -1){
					var element = $("<div class='content " + classNames[i] + "'>");
					copyContentToNewElement(classNames[i], content, element);
					return element;
					break;
				}
			}
		}

	};


	function getEditHandlerForType(type){
		switch(type){
			case "text":
				return editBox;
				break;
			case "image":
				return loadImage;
				break;
			default:
				throw Error("No handler for content named: " + type);
				break;
		}
	}

	function copyContentToNewElement(type, oldElem, newElem){
		switch(type){
			case "text":
				var html = oldElem.html();
				newElem.html(html);				
				break;
			case "image":
				var img = $("<img src='/'>");
				newElem.append(img);
				break;
			default:
				throw Error("No handler for content named: " + type);
				break;
		}
	}

	function editBox(){	
		//Getting text element
		var viewableText = $(this);
		var element = $(this).parent()[0];

		//creating and preparing editable field
		var editableText = $("<textarea />");
		editableText.html(viewableText.html());

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
	};

	function loadImage(){
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
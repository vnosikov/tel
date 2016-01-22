$(document).ready(function(){
	$('.template').draggable({
		helper: "clone",
		stop: copyTemplateToCanvas 
	});

	function copyTemplateToCanvas(){
		console.log('ll');
	}
});
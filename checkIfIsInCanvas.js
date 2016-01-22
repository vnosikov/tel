function canvas(){

	var canvasMinX = $('.canvas').offset().left;
	var canvasMinY = $('.canvas').offset().top;
	var canvasMaxX = $('.canvas').offset().left + $('.canvas').width() - $('.box').width();
	var canvasMaxY = $('.canvas').offset().top + $('.canvas').height() - $('.box').height();

	console.log("X: " + canvasMinX + ' ' + canvasMaxX + " Y: " + canvasMinY + ' ' + canvasMaxY);

	return {
		checkIfIsInCanvas: function(offset){
			var x = offset.left;
			var y = offset.top;

			console.log("(" + x + ", " + y + ")");

			if(x >= canvasMinX && x <= canvasMaxX && y >= canvasMinY && y <= canvasMaxY ){
				return true;
			}
			else return false;
		}
	};
}
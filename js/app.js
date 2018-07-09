paper.install(window);

var colorChooser = document.createElement("input");
colorChooser.type = "color";
colorChooser.value = "black";

var options = {
	strokeWidth:3,
	step:1
};
var canvas = document.getElementById('mainCanvas');
paper.setup(canvas);
var path;
var blocks = [];
var colors = ["red","green","blue"];
for(var i = 0; i < 24 ; i++){
    blocks[i] = new Path.Rectangle([i * 50 + 10,200],[30,30]);
    blocks[i].strokeColor = colors[ i % 3]; 
    blocks[i].strokeWidth = 2;

    blocks[i+24] = new Path.Rectangle([i * 50 + 10,60],[30,30]);
    blocks[i+24].strokeColor = colors[ i % 3]; 
    blocks[i+24].strokeWidth = 2;
}

var text = new PointText(new Point(450, 150));
text.fillColor = "gray";
text.content = "Hello , This Is Paper.js World!";
text.fontSize = "24";

var textUnderLine = new Path([450,160],[780,160]);
textUnderLine.strokeColor = "black";
textUnderLine.strokeWidth = 2;

var textBase = new PointText(new Point(450,370));
textBase.fillColor = "gray";
textBase.content = "http://paperjs.org/examples/path-simplification/";
text.fontSize = "24";

var shotkey = {
	route:function(key,modifiers){
		if(key == "l" && modifiers.control == true){
			project.clear();	
			return true;
		}
		if(key == "=" && modifiers.control == true){
			options.strokeWidth += options.step;
			return true;	
		}
		if(key == "-" && modifiers.control == true){
			options.strokeWidth -= options.step;
			if(options.strokeWidth == 0){
				options.strokeWidth = 1;
			}
			return true;	
		}

		if(key == "c"){
			colorChooser.click();
			return true;	
		}
	}	
};

view.draw();
view.onFrame = function(event){
    for(var i = 0; i < 48; i++){
        if(i%2) {
            blocks[i].rotate(-1);
        } else{
            blocks[i].rotate(1);
        }
    }


}

var hitOptions = {
	segments: true,
	stroke: true,
	fill: true,
	tolerance: 5
};

/// view.onMouseDown = function(event){
/// 	var hitResult = project.hitTest(event.point,hitOptions);
/// 	if(hitResult){
/// 		location.href = hitResult.item.content;
/// 	}
/// }

view.onMouseDown = function (event) {
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}

	// Create a new path and set its stroke color to black:
	path = new Path({
		segments: [event.point],
		strokeColor: colorChooser.value,
		// Select the path, so we can see its segment points:
		fullySelected:false,
		strokeWidth:options.strokeWidth
	});
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
view.onMouseDrag = function (event) {
	path.add(event.point);
	//textItem.content = 'Segment count: ' + path.segments.length;
}

view.onMouseUp = function (event) {
	var segmentCount = path.segments.length;
	// When the mouse is released, simplify it:
	path.simplify(10);
	// Select the path, so we can see its segments:
	//path.fullySelected = true;

	//var newSegmentCount = path.segments.length;
	//var difference = segmentCount - newSegmentCount;
	//var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
	//textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
}

view.onKeyDown = function(event) {
	var key = event.key;
	var modifiers = event.modifiers;
	if(shotkey.route(key,modifiers)){
		console.log(options);
        return false;
	}
}

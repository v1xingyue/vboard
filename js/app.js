paper.install(window);

var canvas = document.getElementById('mainCanvas');
paper.setup(canvas);


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

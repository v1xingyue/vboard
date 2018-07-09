var canvas = document.getElementById('myCanvas');
paper.setup(canvas);
var path = new paper.Path();
path.strokeColor = 'red';
var start = new paper.Point(100, 100);
path.moveTo(start);
path.lineTo(start.add([ 200, -50 ]));
paper.view.draw();


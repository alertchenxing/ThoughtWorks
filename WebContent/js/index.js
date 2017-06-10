/**
 * 
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048game',{
	fontSize:50
});
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 4;

app.stage.addChild(basicText);

var grid = [];
for(var i = 0; i < 4; i ++){
	grid[i] = [0,0,0,0];
}

for(var i = 0; i < 4; i++){
	for(var j = 0; j < 4; j++){
		var graphics = new PIXI.Graphics();
		graphics.beginFill(0xFF700B, 1);
		graphics.drawRect(app.renderer.width / 8 + j * 55, app.renderer.height / 8 * 3 + i * 55, 50, 50);
		app.stage.addChild(graphics);
	}
}

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
//设置游戏界面数据结构为二维数组，默认值为0
var grid = [];
for(var i = 0; i < 4; i ++){
	grid[i] = [0,0,0,0];
}
//画4*4方格
for(var i = 0; i < 4; i++){
	for(var j = 0; j < 4; j++){
		var graphics = new PIXI.Graphics();
		graphics.beginFill(0xFFCC99, 1);
		graphics.drawRect(app.renderer.width / 8 + j * 77, app.renderer.height / 8 * 3 + i * 77, 75, 75);
		app.stage.addChild(graphics);
	}
}
//生成随机数
function generateRandomNumber(){
	return Math.floor(Math.random() * 4);
}
//生成随机的x,y坐标
var x = generateRandomNumber();
var y = generateRandomNumber();
//画出随机生成坐标上的方块
var graphics = new PIXI.Graphics();
graphics.beginFill(0xFFCC66, 1);
graphics.drawRect(app.renderer.width / 8 + y * 77, app.renderer.height / 8 * 3 + x * 77, 75, 75);
app.stage.addChild(graphics);
//画出随机生成坐标上的数字
var basicText = new PIXI.Text('2',{
	fontSize:50
});
basicText.anchor.set(0.5);
basicText.x = 75/2 + app.renderer.width / 8 + y * 77;
basicText.y = 75/2 + app.renderer.height / 8 * 3 + x * 77;

app.stage.addChild(basicText);

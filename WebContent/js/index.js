/**
 * 
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);
//游戏标题
var basicText = new PIXI.Text('2048game',{
	fontSize:50
});
//锚点设置在中间,方便定位
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 4;

app.stage.addChild(basicText);
//设置游戏界面数据结构为二维数组，默认值为0
var grid = [];
for(var i = 0; i < 4; i ++){
	grid[i] = [0,0,0,0];
}
//生成随机的x,y坐标
var x = generateRandomNumber();
var y = generateRandomNumber();
grid[x][y] = 2;
//画4*4方格
for(var i = 0; i < 4; i++){
	for(var j = 0; j < 4; j++){
		drawCells(i, j);
	}
}
//生成随机数
function generateRandomNumber(){
	return Math.floor(Math.random() * 4);
}

//绘画游戏窗体
function drawCells(x, y){
	var color = 0xFFCC66;
	if(grid[x][y] === 2){
		color = 0xFF9933;
	}
	//画出坐标上的方块
	var graphics = new PIXI.Graphics();
	graphics.beginFill(color, 1);
	graphics.drawRect(app.renderer.width / 8 + y * 77, app.renderer.height / 8 * 3 + x * 77, 75, 75);
	app.stage.addChild(graphics);
	if(grid[x][y] != 0){
		//画出坐标上的数字
		var basicText = new PIXI.Text(grid[x][y],{
			fontSize:50
		});
		basicText.anchor.set(0.5);
		basicText.x = 75/2 + app.renderer.width / 8 + y * 77;
		basicText.y = 75/2 + app.renderer.height / 8 * 3 + x * 77;

		app.stage.addChild(basicText);
	}
}
//添加键盘监听事件
document.addEventListener('keydown',function(event){
	if(event.code === 'ArrowLeft'){
		console.log(event);
	}
	
});

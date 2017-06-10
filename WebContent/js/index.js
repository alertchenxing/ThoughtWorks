/**
 * 
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

var maxCount = 16;//游戏最多方格数
var currentCount = 0;//当前方格数
var score = 0;//游戏计分
//游戏标题
var basicText = new PIXI.Text('2048',{
	fontSize:50
});
//锚点设置在中间,方便定位
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 8;
app.stage.addChild(basicText);
var scoreText = new PIXI.Text('Score:'+score,{
	fontSize:50
});
scoreText.anchor.set(0.5);
scoreText.x = app.renderer.width / 2;
scoreText.y = app.renderer.height / 4;
app.stage.addChild(scoreText);
//设置游戏界面数据结构为二维数组，默认值为0
var grid = [];
for(var i = 0; i < 4; i ++){
	grid[i] = [0,0,0,0];
}
//生成随机的x,y坐标
function addRandomCell(){
	if (currentCount === maxCount) return;
	var x = generateRandomNumber();
	var y = generateRandomNumber();
	while(grid[x][y] !== 0){//这个方块不为0不能不能再在此处生成随机数
		x = generateRandomNumber();
		y = generateRandomNumber();
	}
	var twoOrfour = Math.random();
	if(twoOrfour < 0.5){
		grid[x][y] = 2;
	}else{
		grid[x][y] = 4;
	}
	currentCount++;
}
//画4*4方格
function flushUI(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			drawCells(i, j);
		}
	}
	scoreText.text = 'Score: ' + score;
}
addRandomCell();
addRandomCell();
flushUI();
//生成随机数
function generateRandomNumber(){
	return Math.floor(Math.random() * 4);
}
//通过不同的值获取不同的颜色
function getColorByNumber(number){
	var colorValue = {
			0:0xFFCC66,
			2:0xFFCC33,
			4:0xFFCC00,
			8:0xFF9966,
			16:0xFF9933,
			32:0xFF9900,
			64:0xFF6633,
			128:0xFF6600,
			256:0xFF5500,
			512:0xFF4400,
			1024:0xFF3300,
			2048:0xFF2200
	}
	return colorValue[number];
}
//绘画游戏窗体
function drawCells(x, y){
	var color = getColorByNumber(grid[x][y]);
	
	//画出坐标上的方块
	var graphics = new PIXI.Graphics();
	graphics.beginFill(color, 1);
	graphics.drawRoundedRect(app.renderer.width / 8 + y * 77, app.renderer.height / 8 * 3 + x * 77, 75, 75,3);
	app.stage.addChild(graphics);
	if(grid[x][y] != 0){
		//画出坐标上的数字
		var number = new PIXI.Text(grid[x][y],{
			fontSize:50
		});
		number.anchor.set(0.5);
		number.x = 75/2 + app.renderer.width / 8 + y * 77;
		number.y = 75/2 + app.renderer.height / 8 * 3 + x * 77;

		app.stage.addChild(number);
	}
}
function onToRightEventHander(){
	var isChanged = moveCellToRight();
	if(isChanged){
		addRandomCell();
	}
	flushUI();
}
function onToLeftEventHander(){
	rotateArray(2);
	var isChanged = moveCellToRight();
	rotateArray(2);
	if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
}
function onToUpEventHander(){
	 rotateArray(1);
	 var isChanged = moveCellToRight();
	 rotateArray(3);
	 if (isChanged) {
		 addRandomCell();
	 }
	 flushUI();
	 if (checkGameOver()) {
		 alert('Game over.');
	 }
}
function onToDownEventHander(){
	rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.');
    }
}
//添加键盘监听事件
document.addEventListener('keydown',function(event){
	if(event.code === 'ArrowRight' || event.key === 'ArrowRight'){
		onToRightEventHander();
	}
	if(event.code === 'ArrowLeft' || event.key === 'ArrowLeft'){
		onToLeftEventHander();
	}
	if(event.code === 'ArrowUp' || event.key === 'ArrowUp'){
		onToUpEventHander();
	}
	if(event.code === 'ArrowDown' || event.key === 'ArrowDown'){
		onToDownEventHander();
	}
	
});
//移动端使用
var hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});
hammertime.on('swiperight', function() {
    onToRightEventHander();
});
hammertime.on('swipeup', function () {
    onToUpEventHander();
});
hammertime.on('swipeleft', function () {
    onToLeftEventHander();
});
hammertime.on('swipedown', function () {
    onToDownEventHander();
});
//完成向右移动并合并方块
function moveCellToRight(){
	 var isChanged = false;
	for(var rowIndex = 0; rowIndex < 4; rowIndex++){
		for(var columnIndex = 2; columnIndex >= 0; columnIndex--){//重倒数第二行开始判断,因为最后一个不管是不是零都不需要移动
			if(grid[rowIndex][columnIndex] === 0) continue;//如果这个方格为0则跳出循环，继续判断下一个方格
			//获取最后一个不为0的方格列下标
			var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
			if(theEmptyCellIndex !== -1){//如果返回了为0方格的列值,交换当前方格和最后一个为0方格的值,实现移动
				grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;
                isChanged = true;
			}
			//不能移动之后向后合并相邻并且相同的方块
			var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;
            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
            	grid[rowIndex][currentIndex+ 1] += grid[rowIndex][currentIndex];
            	grid[rowIndex][currentIndex] = 0;
            	score += grid[rowIndex][currentIndex + 1];
            	isChanged = true;
            	currentCount--;
            }
		}
	}
	return isChanged;
}
//找到每一行从右到左第一个为零的方格，并返回列下标
function findTheFirstRightCell(rowIndex, columnIndex){
	for(var i = 3; i > columnIndex; i--){
		if(grid[rowIndex][i] === 0){
			return i;
		}
	}
	return -1;
}
//数组顺时针旋转九十度多次
function rotateArray(rotateCount){
	for(var i = 0; i < rotateCount; i++){
		grid = rotateArrayTORightOnce(grid);
	}
}
//数组顺时针旋转九十度一次
function rotateArrayTORightOnce(array){
	return array.map(function (row, rowIndex){
        return row.map(function (item, columnIndex) {
            return array[3 - columnIndex][rowIndex];
        })
    })
}
//验证游戏是否结束
function checkGameOver() {
    if (currentCount !== maxCount) return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i-1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i+1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }

    return true;
}
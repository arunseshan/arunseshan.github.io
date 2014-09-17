// setting up basics
var context = document.getElementById('canvas').getContext('2d');
var width = 500, height = 400, speed = 10;
var keys = [];
var score = 0;

// Registering a key to the key array
window.addEventListener('keydown', function(e){
	keys[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function(e){
	delete keys[e.keyCode];
}, false);

function moveRegister(n){
	keys[n] = true;
}

function moveDeRegister(o){
	delete keys[o];
}

/*#### SETTING UP INDIVIDUALS ####*/
var player = {
	x : 10,
	y : 10,
	width : 20,
	height : 20
};

var cube = {
	x : Math.random() * (width - 20),
	y : Math.random() * (height - 20),
	width : 20,
	height : 20
};
/*#### SETTING UP INDIVIDUALS ####*/

// the game loop
function game(){
	update();
	render();
}

// the update function
function update(){
	if(keys[38] || keys['up']) player.y-=speed;
	if(keys[40] || keys['down']) player.y+=speed; 
	if(keys[37] || keys['left']) player.x-=speed; 
	if(keys[39] || keys['right']) player.x+=speed; 

	if (player.x < 0) player.x = 0;
	if (player.y < 0) player.y = 0;
	if (player.x >= width - player.width) player.x = width - player.width;
	if (player.y >= height - player.height) player.y = height - player.height;

	if (collision(player, cube)) processCollision();
}

function processCollision(){
	score++;
	//player.width += 10;
	cube.x = Math.random() * (width - 20);
	cube.y = Math.random() * (height - 20);

}

// function that draws stuff to the screen
function render(){
	context.clearRect(0, 0, width, height);
	context.fillStyle = 'blue';
	context.fillRect(player.x, player.y, player.width, player.height);
	context.fillStyle = 'red';
	context.fillRect(cube.x, cube.y, cube.width, cube.height);
	context.fillStyle = 'black';
	context.font = "bold 30px arial";
	context.fillText(score, 30, 30);
}

function collision(first, second){
	return !(first.x > second.x + second.width || 
		first.x + first.width < second.x || 
		first.y > second.y + second.height ||
		first.y + first.height < second.y);
}

// in-built function that sets time intervals for
// each refresh
setInterval(function(){
	game();
}, 1000/60);


/**
 * 
 */

var Main = {};

Main.asteroids = new Array();
Main.bullets = new Array();
Main.ship = new Ship();
Main.c;
Main.ctx;
Main.flag = new Array(false,false,false,false,0);
Main.alive = true;
Main.score = 0;

Main.init = function () {

	c = document.getElementById("canvas");
	Main.ctx = c.getContext("2d");
	Main.ctx.strokeStyle="#FFFFFF";

	window.addEventListener("keydown", Main.doMouseDown, false);
	window.addEventListener("keyup", Main.doMouseUp, false); //TODO: change to canvas

	window.requestAnimationFrame(Main.doFrameEvents);
};

Main.doMouseDown = function (event) {
	switch (event.keyCode) {
	case 38: Main.flag[0] = true; break; //Up
	case 37: Main.flag[1] = true; break; //Left
	case 39: Main.flag[2] = true; break; //Right
	case 32: Main.flag[3] = true; break; //Space
	}
}

Main.doMouseUp = function (event) { //TODO: rename
	switch (event.keyCode) {
	case 38: Main.flag[0] = false; break; //Up
	case 37: Main.flag[1] = false; break; //Left
	case 39: Main.flag[2] = false; break; //Right
	case 32: Main.flag[3] = false; break; //Space
	}
}

Main.doFrameEvents = function () { //TODO: name it better
	Main.newLevel();
	Main.move();
	Main.checkCollisions();
	Main.animate();

	window.requestAnimationFrame(Main.doFrameEvents);
}

Main.newLevel = function () {
	if (Main.asteroids.length == 0) {
		Main.asteroids = new Array(
				new Asteroid(50,50,2,Math.random() * Math.PI * 2),
				new Asteroid(50,250,2,Math.random() * Math.PI * 2),
				new Asteroid(50,450,2,Math.random() * Math.PI * 2),
				new Asteroid(50,50,2,Math.random() * Math.PI * 2),
				new Asteroid(250,50,2,Math.random() * Math.PI * 2),
				new Asteroid(450,50,2,Math.random() * Math.PI * 2)
		);
	}
	//TODO: this.
}

Main.checkCollisions = function () {
	for (var i=0;i<Main.asteroids.length;i++) {
		for (var ii=0;ii<Main.bullets.length;ii++) {
			if (Main.asteroids[i].isCollision(Main.bullets[ii].x,Main.bullets[ii].y)) {
				Main.score += (3 - Main.asteroids[i].size) * 250;
				if (Main.asteroids[i].size > 0) {
					angle = Math.random() * Math.PI * 2;
					Main.asteroids.push(new Asteroid(Main.asteroids[i].x,Main.asteroids[i].y,Main.asteroids[i].size-1,angle));
					Main.asteroids.push(new Asteroid(Main.asteroids[i].x,Main.asteroids[i].y,Main.asteroids[i].size-1,angle + Math.PI / 2));
				}
				Main.asteroids.splice(i,1);
				Main.bullets.splice(ii,1);
				break;
			}
		}
	}
	for (var i=0;i<Main.asteroids.length;i++) {
		if (Main.ship.isCollision(Main.asteroids[i].x,Main.asteroids[i].y,Main.asteroids[i].radius)) {
		//if (Main.asteroids[i].isCollision(Main.ship.x,Main.ship.y)) {
			if (Main.asteroids[i].size > 0) {
				angle = Math.random() * Math.PI * 2;
				Main.asteroids.push(new Asteroid(Main.asteroids[i].x,Main.asteroids[i].y,Main.asteroids[i].size-1,angle));
				Main.asteroids.push(new Asteroid(Main.asteroids[i].x,Main.asteroids[i].y,Main.asteroids[i].size-1,angle + Math.PI / 2));
			}
			Main.asteroids.splice(i,1);
			Main.alive = false;
			Main.ship.hide();
		}
		
	}
}

Main.move = function () {
	if (Main.alive) {
		if (Main.flag[4] == 15 || Main.flag[4] == 0)
			Main.flag[4] = 0;
		else
			Main.flag[4]++;

		if (Main.flag[0]) Main.ship.accelerate();
		if (Main.flag[1]) Main.ship.turn(false);
		if (Main.flag[2]) Main.ship.turn(true);
		if (Main.flag[3] && Main.flag[4]==0) {
			Main.bullets.push(new Bullet(Main.ship.x + 15 * Math.cos(Main.ship.angle),Main.ship.y + 15 * Math.sin(Main.ship.angle),Main.ship.angle));
			Main.flag[4] = 1;
		}
	}

	for (var i=0;i<Main.asteroids.length;i++)
		Main.asteroids[i].move();

	for (var i=0;i<Main.bullets.length;i++) {
		Main.bullets[i].move();
		if (Main.bullets[i].flag) {Main.bullets.splice(i,1);}
	}
}

Main.animate = function () {
	Main.ctx.clearRect(0, 0, c.width, c.height);

	if (Main.alive) Main.ship.moveAndDraw(Main.ctx);

	for (var i=0;i<Main.asteroids.length;i++)
		Main.asteroids[i].draw(Main.ctx);

	for (var i=0;i<Main.bullets.length;i++) {
		Main.bullets[i].draw(Main.ctx);
		if (Main.bullets[i].flag) {Main.bullets.splice(i,1);}
	}
	
	Main.ctx.font = "30px Lucida Console";
	var count = 10 - Math.log10(Main.score+1);
	var s = "";
	for (var i=0;i<count;i++) s+="0";
	Main.ctx.strokeText(s+Main.score,0,50);
	
}

window.onload = Main.init;
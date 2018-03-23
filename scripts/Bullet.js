var Bullet = function (x,y,angle) {
	BULLET_SPEED = 7;
	
	this.x = x;
	this.y = y;
	this.dx = Math.cos(angle)*BULLET_SPEED;
	this.dy = Math.sin(angle)*BULLET_SPEED;
	this.distance = 0;
	this.flag = false;
}

Bullet.prototype.move = function () {
	this.distance++;
	
	if (this.distance > 100) this.flag = true;
	
	this.x += this.dx;
	this.y += this.dy;
	
	this.x = (this.x + 800 ) % 800;
	this.y = (this.y + 600 ) % 600;
}

Bullet.prototype.draw = function (ctx) {
	//TODO: if close to the edge, draw two ships
	
	ctx.beginPath(); //Centre
	ctx.arc(this.x,this.y,1,0,2*Math.PI);
	ctx.stroke();
}
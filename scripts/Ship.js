var Ship = function () {
	this.x = 400;
	this.y = 300;
	this.dx = 0;
	this.dy = 0;
	this.angle = 0;
	
	this.tri = [[0,0],[0,0],[0,0]];
	
	this.MAX_SPEED = 4.5;
	this.ACCEL = .08;
	this.TURN_SPEED = .06;
	this.SHIP_WIDTH = 4 * Math.PI / 5;
	
	this.tri[0] = [this.x + 15 * Math.cos(this.angle),this.y + 15 * Math.sin(this.angle)];
	this.tri[1] = [this.x + 10 * Math.cos(this.angle + this.SHIP_WIDTH), this.y + 10 * Math.sin(this.angle + this.SHIP_WIDTH)];
	this.tri[2] = [this.x + 10 * Math.cos(this.angle - this.SHIP_WIDTH), this.y + 10 * Math.sin(this.angle - this.SHIP_WIDTH)];
};


Ship.prototype.moveAndDraw = function (ctx) {
	this.x += this.dx;
	this.y += this.dy;
	
	this.x = (this.x + 800 ) % 800;
	this.y = (this.y + 600 ) % 600;
	
	//TODO: add fire!
	
	this.tri[0] = [this.x + 15 * Math.cos(this.angle),this.y + 15 * Math.sin(this.angle)];
	this.tri[1] = [this.x + 10 * Math.cos(this.angle + this.SHIP_WIDTH), this.y + 10 * Math.sin(this.angle + this.SHIP_WIDTH)];
	this.tri[2] = [this.x + 10 * Math.cos(this.angle - this.SHIP_WIDTH), this.y + 10 * Math.sin(this.angle - this.SHIP_WIDTH)];

	ctx.beginPath(); //Centre
	//ctx.arc(this.x,this.y,1,0,2*Math.PI);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(this.x + 15 * Math.cos(this.angle + this.SHIP_WIDTH), this.y + 15 * Math.sin(this.angle + this.SHIP_WIDTH));
	
	ctx.lineTo(this.tri[0][0], this.tri[0][1]);
	
	ctx.lineTo(this.x + 15 * Math.cos(this.angle - this.SHIP_WIDTH), this.y + 15 * Math.sin(this.angle - this.SHIP_WIDTH));
	ctx.moveTo(this.tri[1][0],this.tri[1][1]);
	ctx.lineTo(this.tri[2][0],this.tri[2][1]);
	ctx.stroke();
};

Ship.prototype.turn = function(direction) {
	if (direction)
		this.angle += this.TURN_SPEED;
	else
		this.angle -= this.TURN_SPEED;
};

Ship.prototype.accelerate = function () {
	this.dx += this.ACCEL * Math.cos(this.angle);
	this.dy += this.ACCEL * Math.sin(this.angle);
	
	speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
	if (speed > this.MAX_SPEED) {
		this.dx *= this.MAX_SPEED / speed;
		this.dy *= this.MAX_SPEED / speed;
	}
};

Ship.prototype.isCollision = function (x,y,r) {
	var flag = false;
	
	for (var i=0;i<3;i++) {
		var m = (this.tri[i][1] - this.tri[(i+1)%3][1])/(this.tri[i][0] - this.tri[(i+1)%3][0]);
		var c = (m * this.tri[i][0]) - this.tri[i][1];
		
		var xproj = ((x+m*y)+m*c)/(m*m+1);
		var yproj = (m*(x+m*y)-c)/(m*m+1);
		
		var d = Math.pow(y - m * x + c,2) / (m*m + 1); //distance squared
		if  (d < (r * r) &&
			((xproj > this.tri[i][0] && xproj < this.tri[(i+1)%3][0]) || (xproj < this.tri[i][0] && xproj > this.tri[(i+1)%3][0])) && 
			((yproj > this.tri[i][1] && yproj < this.tri[(i+1)%3][1]) || (yproj < this.tri[i][1] && yproj > this.tri[(i+1)%3][1]))) {
				flag = true;
				break;
		}
		if (Math.pow(x - this.tri[i][0],2) + Math.pow(y - this.tri[i][1],2) < r * r) {
			flag = true;
			break;			
		}
	}
	return flag;
};

Ship.prototype.hide = function () {
	this.x = -100;
	this.y = -100;
	this.dx = 0;
	this.dy = 0;
}

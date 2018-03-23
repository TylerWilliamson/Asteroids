var Asteroid = function(x, y, size, angle) {
	AST_SPEED = 1 + Math.random() * .7;
	this.SIZES = [7,13,26];

	this.type = Math.floor(Math.random()*2);
	this.size = size;
	this.x = x;
	this.y = y;
	this.dx = AST_SPEED * Math.cos(angle);
	this.dy = AST_SPEED * Math.sin(angle);
	this.radius = this.SIZES[size];
}

Asteroid.prototype.draw = function(ctx) {
	//TODO: if close to the edge, draw two asteroids

	
	ctx.beginPath();
	//ctx.arc(this.x,this.y,this.SIZES[this.size],0,2 * Math.PI,true);

	arr = [[[-6,-1],[-1,-6],[3,-6],[6,-1],[6,2],[3,6],[0,6],[0,2],[-3,6],[-6,3],[-3,0],[-6,-1]],
	       [[-6,-3],[-3,-6],[-1,-5],[1,-5],[3,-6],[5,-3],[3,-1],[5,1],[5,3],[2,6],[-1,4],[-2,4],[-3,5],[-4,5],[-6,3],[-6,2],[-5,1],[-5,-1],[-6,-2],[-6,-3]]];
	//TODO: 3rd, fix 2nd
	flag = 0;
	for (i=0;i<arr[this.type].length;i++) {
		if (flag == 0) {
			flag = 1;
			ctx.moveTo(this.x + arr[this.type][i][0] * Math.pow(2,this.size), this.y + arr[this.type][i][1] * Math.pow(2,this.size))
		} else {
			ctx.lineTo(this.x + arr[this.type][i][0] * Math.pow(2,this.size), this.y + arr[this.type][i][1] * Math.pow(2,this.size))
		}
	}
	
	/*ctx.moveTo(this.x - 6 * this.size, this.y - 1 * this.size);
	ctx.lineTo(this.x - 1 * this.size, this.y - 6 * this.size);
	ctx.lineTo(this.x + 3 * this.size, this.y - 6 * this.size);
	ctx.lineTo(this.x + 6 * this.size, this.y - 1 * this.size);
	ctx.lineTo(this.x + 6 * this.size, this.y + 2 * this.size);
	ctx.lineTo(this.x + 3 * this.size, this.y + 6 * this.size);
	ctx.lineTo(this.x + 0 * this.size, this.y + 6 * this.size);
	ctx.lineTo(this.x + 0 * this.size, this.y + 2 * this.size);
	ctx.lineTo(this.x - 3 * this.size, this.y + 6 * this.size);
	ctx.lineTo(this.x - 6 * this.size, this.y + 3 * this.size);
	ctx.lineTo(this.x - 3 * this.size, this.y + 0 * this.size);
	ctx.lineTo(this.x - 6 * this.size, this.y - 1 * this.size); //TODO: Arrays + loop*/
	
	ctx.stroke();
}
Asteroid.prototype.move = function() {
	this.x += this.dx;
	this.y += this.dy;
	
	this.x = (this.x + 800) % 800;
	this.y = (this.y + 600) % 600;
}

Asteroid.prototype.isCollision = function(x,y) {
	return (Math.abs(this.x - x) < this.SIZES[this.size]
			&& Math.abs(this.y - y) < this.SIZES[this.size]);
}
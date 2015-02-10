var enemy = function(canvas){
	var self = this;

	this.x = 0;
	this.y = 0;
	this.width = 10;
	this.height = 10;
	this.velocityH = 2;
	this.velocityV = 2;

	this.move = function(){
		this.x += this.velocityH;
		this.y += this.velocityV;
		if(this.x >= canvas.element.width - self.width || this.x <= 0) this.velocityH = this.velocityH * -1;
		if(this.y >= canvas.element.height - self.height || this.y <= 0) this.velocityV = this.velocityV * -1;
		this.collisionDetect();
	}

	this.collisionDetect = function(){
		for(var i=0; i<canvas.enemys.length; i++){
			if(this !== canvas.enemys[i]){
				var rect1 = this;
				var rect2 = canvas.enemys[i];
				if (rect1.x < rect2.x + rect2.width &&
		   			rect1.x + rect1.width > rect2.x &&
		   			rect1.y < rect2.y + rect2.height &&
		   			rect1.height + rect1.y > rect2.y) {
					this.velocityH = this.velocityH * -1;
				}
				if(rect1.y < rect2.y + rect2.height &&
		   			rect1.height + rect1.y > rect2.y){
					this.velocityY = this.velocityY * -1;
				}
			}
			
		}
	}

	this.render = function(){
		canvas.context.save();
		canvas.context.fillStyle = 'red';
		canvas.context.fillRect(self.x,self.y,self.width,self.height);
		canvas.context.restore();
	}

	this.loop = function(){
		this.move();
		this.render();
	}

}

var stage = function(element){
	this.self = this;
	this.element = document.getElementById(element);
	this.context = this.element.getContext('2d');
	this.background = 'white';
	
	this.enemys = [];

	this.setBackground = function(color){
		this.context.save();
		this.context.fillStyle = color;
		this.context.fillRect(0,0,this.element.width, this.element.height);
		this.context.restore();
	}
}

stage.prototype.startGame = function(){
	var self = this;
	setInterval(function(){
		self.loop(self);
	}, 30);
}

stage.prototype.newEnemy = function(){
	this.enemys.push(new enemy(this))
}

stage.prototype.loop = function(self){
	self.setBackground(this.background);
	for(var i=0; i < self.enemys.length; i++){
		this.enemys[i].loop();
	}
}
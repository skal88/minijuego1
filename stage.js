var stage = function(element){
	this.self = this;
	this.element = document.getElementById(element);
	this.context = this.element.getContext('2d');
	this.background = 'white';
	
	this.enemys = [];
	this.points = 0;

	this.setBackground = function(color){
		this.context.save();
		this.context.fillStyle = color;
		this.context.fillRect(0,0,this.element.width, this.element.height);
		this.context.restore();
	}

	this.destroyEnemy = function( x, y){
		for(var i=0; i<this.enemys.length; i++){
			var enemy = this.enemys[i];
			if(x >= enemy.x && x <= enemy.x + enemy.width && y >= enemy.y && y <= enemy.y + enemy.height){
				this.enemys.splice(i,1);
				this.points++;
			}
		}
	}

	this.setPoints = function(color){
		var text = "Puntos: " + this.points;
		this.context.save();
		this.context.fillStyle = color;
		this.context.font="14px Aral";
		this.context.textAlign="end";
		this.context.fillText(text, this.element.width, this.element.height);
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
	self.setPoints("black");
}
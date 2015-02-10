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
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
	}

	this.collisionDetect = function(){
		var velocityAH = this.velocityH; // Capturamos la velocidad antes de calcular los choques
		var velocityAY = this.velocityY;

		for(var i=0; i<canvas.enemys.length; i++){
			if(this !== canvas.enemys[i]){  // Si el objeto seleccionado no es el objeto mismo
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
			} else{ //Si es el objeto mismo aprobechamos para comprobar si choca con la pared
				if(this.x >= canvas.element.width - self.width || this.x <= 0) this.velocityH = this.velocityH * -1;
				if(this.y >= canvas.element.height - self.height || this.y <= 0) this.velocityV = this.velocityV * -1;
			}
		}

		// if(velocityAH !== this.velocityH || velocityAY !== this.velocityY) this.collision = true; // Ha habido un choque
	}

	this.render = function(){
		canvas.context.save();
		canvas.context.fillStyle = 'red';
		canvas.context.fillRect(self.x,self.y,self.width,self.height);
		canvas.context.restore();
	}

	this.loop = function(){
		this.move();
		this.collisionDetect();
		if(this.collision){
			console.log("colision");
		}
		this.render();
	}

}
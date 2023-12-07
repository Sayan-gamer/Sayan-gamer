window.addEventListener('load', function () {
	//canvus setup
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	canvas.height = 500;
	canvas.width = 1000;
	let canvas_x = 0 ;
	let canvas_y = 0 ;
	

	canvas.addEventListener('touchmove',(e) => {touchstart(e)},false) ;

	//canvas.ontouchstart = touchstart ;

	function touchstart(event){
		console.log(event) ;
		//event.preventDefault() ;
		canvas_x = event.touches.x ;
		canvas_y = event.touches.y ;
		console.log(" pos (x,y) ("+canvas_x+","+canvas_y+")") ;
		if(canvas_x<250&&canvas_y>250){
			this.game.keys.push('ArrowDown') ;
		}else if(canvas_x>250&&canvas_y>250){
			this.game.keys.push('ArrowUp') ;
		}
	}

	class InputHandler {
		constructor(game) {
			this.game = game;
			/*window.addEventListener('click',e => {
				console.log(e.target) ;
				//event.preventDefault() ;
				//canvas_x = e.touches.x ;
				//canvas_y = e.touches.y ;
				console.log(" pos (x,y) ("+canvas_x+","+canvas_y+")") ;
				if(canvas_x<250&&canvas_y>250){
					//this.game.keys.push('ArrowDown') ;
				}else if(canvas_x>250&&canvas_y>250){
					//this.game.keys.push('ArrowUp') ;
				}
		},false) ;//*/
		/*canvas.addEventListener('click',e => {
			//console.log(e.pageX) ;
			e.preventDefault() ;
			//console.log(e.changedTouches) ;
			//event.preventDefault() ;
			canvas_x = e.pageX;
			canvas_y = e.pageY ;
			console.log(" pos (x,y) ("+canvas_x+","+canvas_y+")") ;
			if(canvas_x<250&&canvas_y>250){
				if(this.game.keys.indexOf('ArrowDown') > -1){
					this.game.keys.splice(this.game.keys.indexOf(('ArrowDown')),1) ;
				}else{
					if(this.game.keys.indexOf('ArrowUp') > -1){
						this.game.keys.splice(this.game.keys.indexOf(('ArrowUp')),1) ;
					}
				this.game.keys.push('ArrowDown') ;
				}
			}else if(canvas_x>250&&canvas_y>250){
				if(this.game.keys.indexOf('ArrowUp') > -1){
					this.game.keys.splice(this.game.keys.indexOf(('ArrowUp')),1) ;
				}else{
					if(this.game.keys.indexOf('ArrowDown') > -1){
						this.game.keys.splice(this.game.keys.indexOf(('ArrowDown')),1) ;
					}
				this.game.keys.push('ArrowUp') ;
				}
			}else if(canvas_x>250&&canvas_y<250){
				this.game.player.shootTop() ;
			}
	},false) ;//*/
	window.addEventListener('dblclick',e => {
		//console.log(e.pageX) ;
		e.preventDefault() ;
		if(canvas_x>250&&canvas_y<250){
			this.game.player.change_shooting_mode() ;
		}
	}) ;
	canvas.addEventListener('dblclick',e => {
		//console.log(e.pageX) ;
		e.preventDefault() ;
		if(canvas_x>250&&canvas_y<250){
			this.game.player.shootTop() ;
		}
	}) ;
	canvas.addEventListener('mouseup',e => {
		//console.log(e.pageX) ;
		e.preventDefault() ;
		//console.log(e.changedTouches) ;
		//event.preventDefault() ;
		canvas_x = e.pageX;
		canvas_y = e.pageY ;
		console.log(" pos (x,y) ("+canvas_x+","+canvas_y+")") ;
		if(canvas_x<250&&canvas_y>250){
			if(this.game.keys.indexOf('ArrowDown') > -1){
				this.game.keys.splice(this.game.keys.indexOf(('ArrowDown')),1) ;
			}else{
				if(this.game.keys.indexOf('ArrowUp') > -1){
					this.game.keys.splice(this.game.keys.indexOf(('ArrowUp')),1) ;
				}
			this.game.keys.push('ArrowDown') ;
			}
		}else if(canvas_x>250&&canvas_y>250){
			if(this.game.keys.indexOf('ArrowUp') > -1){
				this.game.keys.splice(this.game.keys.indexOf(('ArrowUp')),1) ;
			}else{
				if(this.game.keys.indexOf('ArrowDown') > -1){
					this.game.keys.splice(this.game.keys.indexOf(('ArrowDown')),1) ;
				}
			this.game.keys.push('ArrowUp') ;
			}
		}else if(canvas_x>250&&canvas_y<250){
			this.game.player.change_shooting_mode() ;
		}
},false) ;
			window.addEventListener('keydown', e => {
				console.log(e.key);
				if(((e.key === 'ArrowDown')||(e.key === 'ArrowUp')) && this.game.keys.indexOf(e.key) < 0){
					this.game.keys.push(e.key) ;
				}
				if (e.key === ' ' ){
					this.game.player.shootTop() ;
				}else if (e.key === 'd' ){
					this.game.debug = !this.game.debug ;
				}else if(e.key === 's'){
			this.game.player.change_shooting_mode() ;
				}

				//console.log(this.game.keys);
			}) ;

			window.addEventListener('keyup', e => {
					//console.log(e.key);
					if(this.game.keys.indexOf(e.key) > -1){
						this.game.keys.splice(this.game.keys.indexOf(e.key),1) ;
					}

				//console.log(this.game.keys);
			});

		}
	}

	class Projectile {
		constructor(game,x,y,type){
			this.width = 30 ;
			this.height = 20 ;
			this.x = x ;
			this.y = y-this.height/2 ;
			this.speedx = 4 ;
			this.speedy = 6 ;
			this.type = type ; 
			this.markedForDeletion = false ;
			this.image = document.getElementById('fire') ;
			this.imageFire_w = 300 ;
			this.imageFire_h = 250 ;
			this.frameX_f = 0 ;
			this.frameX_max_f = 8 ;
		}
		update(){
			if(this.frameX_f<this.frameX_max_f-0.2){
				this.frameX_f += 0.2 ;
			}else{
				this.frameX_f = 0 ;
			}
			if(this.type==1){
				this.x += this.speedx ;
				this.y -= this.speedy*(this.x-10)/100-3*(this.x-10)*(this.x-10)/10000 ;
			}else if(this.type==2){
				this.x += this.speedx ;
				this.y -= 1 ;
			}else if(this.type==3){
				this.x += this.speedx ;
				this.y += 1 ;
			}else{
			this.x += this.speedx ;
			}
			if((this.x > canvas.width*.9)||(this.y > canvas.height*.9)) this.markedForDeletion = true ;

		}
		draw(context){
			//context.fillStyle = 'yellow' ;
			//context.fillRect(this.x,this.y,this.width,this.height) ;
			//context.drawImage(this.image,this.x,this.y,this.width,this.height)
			context.drawImage(this.image,Math.floor(this.frameX_f)*this.imageFire_w,0,this.imageFire_w,this.imageFire_h,this.x,this.y,this.width,this.height) ;
		}
	}


	class Particle {

	}

	class Player {
		constructor(game) {
			this.game = game;
			this.width = 225;
			this.height = 75;
			this.x = 10;
			this.y = 100;
			this.maxy = canvas.height-this.height;
			this.miny = 50; //UI maxy
			this.maxSpeed = 3 ;
			this.speedY = -1 ;
			this.projectiles = [] ;
			this.image = document.getElementById('player') ;
			this.FrameX_p = 0 ;
			this.FrameY_p = 0 ;
			this.image_w = 1500 ;
			this.image_h = 500 ;
			this.fire_height = 0.72 ;
			this.maxFrame = 8 ;
			this.powerUp = false ;
			this.powerUpTimer = 0 ;
			this.powerUpLimit = 5000 ;
		}

		update() {
			if (this.game.keys.includes('ArrowUp') && this.y>this.miny) this.speedY = -this.maxSpeed ;
			else if (this.game.keys.includes('ArrowDown') && this.y<this.maxy) this.speedY = this.maxSpeed ;
			else this.speedY = 0  ;

			this.y += this.speedY;

			this.projectiles.forEach(projectile => {
				projectile.update() ;
			}) ;

			if(this.FrameX_p < this.maxFrame-.2){
				this.FrameX_p +=0.2 ;
			}else{
				this.FrameX_p = 0 ;
			}
			//console.log("frame "+this.FrameX_p);
			this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion) ;
			// For POWER UPP
			if(this.powerUp){
				if(this.powerUpLimit<this.powerUpTimer){
					this.powerUp = false;
					this.powerUpTimer = 0 ;
					this.FrameY = 0 ;
				}else{
					this.powerUpTimer += 16 ;
					this.FrameY = 1 ;
					if(this.game.ammo < this.game.maxAmmo){
					this.game.ammo += 0.1 ;
					}
				}
			}
			
		}

		draw(context) {
			if(this.game.debug){
			context.strokeRect(this.x, this.y, this.width, this.height);
			}
			context.drawImage(this.image,Math.floor(this.FrameX_p)*this.image_w,0,this.image_w,this.image_h,this.x,this.y,this.width,this.height) ;
			this.projectiles.forEach(projectile => {
				projectile.draw(context) ;
			}) ;
		}

		shootTop(){
			if(this.game.ammo > 0){
			this.projectiles.push(new Projectile(this.game,this.x+this.width,this.y+this.height*this.fire_height,0)) ;
			this.game.ammo-- ;	
			if(this.powerUp){
				this.shoot_2_extra() ;
			}
		}
			//console.log(this.projectiles)
		}
		change_shooting_mode(){
			this.game.auto_shoot = true ;
			this.game.shooting_speed += 2 ;
			if(this.game.shooting_speed >= this.game.shooting_speed_max){
			this.game.shooting_speed = 0 ;
			}
			console.log("shoot ps = "+this.game.shooting_speed) ;
		}

		shoot_2_extra(){
				this.projectiles.push(new Projectile(this.game,this.x+this.width,this.y+this.height*this.fire_height,3)) ;
				this.projectiles.push(new Projectile(this.game,this.x+this.width,this.y+this.height*this.fire_height,2)) ;
		}

		enterPowerUP(){
			this.powerUpTimer = 0 ;
			this. powerUp = true ;
			if((this.game.ammo + this.game.maxAmmo/4)<this.game.maxAmmo){
			this.game.ammo += this.game.maxAmmo/4;
			}

			if((this.game.ammo)>this.game.maxAmmo){
				this.game.ammo = this.game.maxAmmo;
			}
		}

	}

	class Enemy {
		constructor(game){
			this.game = game ;
			this.width = 50 ;
			this.height = 80 ;
			this.x = this.game.width ;
			this.speedx = Math.random() *-1.5-.5 ;
			this.markedForDeletion = false ;
			this.frameX_e = 0 ;
			this.frameY_e = 0 ;
			this.maxFrame_e = 1 ;
		}
		update(){
			if(this.frameX_e<this.maxFrame_e-0.2){
				this.frameX_e += 0.2 ;
			}else{
				this.frameX_e = 0 ;
			}
			this.x += this.speedx-this.game.gamespeed ;
			if(this.x+this.width < 0) this.markedForDeletion = true ;
		}
		draw(context) {
			if(this.game.debug){
				context.strokeRect(this.x, this.y, this.width, this.height);
			}
			//context.drawImage(this.image,this.x,this.y,this.width,this.height) ;
			context.drawImage(this.image,Math.floor(this.frameX_e)*this.image_w,0,this.image_w,this.image_h,this.x,this.y,this.width,this.height) ;
			if(this.game.debug){
				context.fillStyle = 'yellow' ;
				context.font = '20px Helvetica' ;
				context.fillText(this.lives,this.x,this.y+20) ;
			}
		}

	}
	class enemy1 extends Enemy {//automatic class from enemy parent class
		constructor(game){//overrite the main ;
			super(game) ; //combine with main ;
			this.y = Math.random() *(this.game.height*.9-this.height-70)+70 ;
			this.image = document.getElementById("alien") ;
			this.frameY = Math.floor(Math.random()*3) ;  
			this.lives =  10 ;
			this.score = this.lives ;
			this.type = "normal" ;  
			this.maxFrame_e = 8 ;
			this.image_w = 650 ;
			this.image_h = 300 ;	
			this.width = this.image_w*.25 ;
			this.height = this.image_h*.25 ;
		}
	}
	class enemy2 extends Enemy {//automatic class from enemy parent class
		constructor(game){//overrite the main ;
			super(game) ; //combine with main ;
			this.width = 198*.7 ;
			this.height = 200*.7 ;
			this.y = Math.random() *(this.game.height*.9-this.height-70)+70 ;
			this.image = document.getElementById("red_moon") ;
			this.frameY = Math.floor(Math.random()*3) ;  
			this.lives = 5;
			this.score = this.lives ;
			this.type = "normal" ;  
			this.maxFrame_e = 1 ;
			this.image_w = 198 ;
			this.image_h = 200 ;
		}
	}
	class enemy3 extends Enemy {//automatic class from enemy parent class
		constructor(game){//overrite the main ;
			super(game) ; //combine with main ;
			this.width = 198*.3 ;
			this.height = 200*.3 ;
			this.y = Math.random() *(this.game.height*.9-this.height-70)+70 ;
			this.image = document.getElementById("green_moon") ;
			this.frameY = Math.floor(Math.random()*3) ;
			this.lives =  3 ;
			this.score = 7 ;
			this.type = "healer" ; 
			this.maxFrame_e = 1 ;
			this.image_w = 198 ;
			this.image_h = 200 ; 
		}
	}

	class Layer {
		constructor(game,image,speedModifier,width){
			this.game = game;
			this.image = image ;
			this.speedModifier = speedModifier ;
			this.width = width ;
			this.height = 500 ;
			this.x = 0 ;
			this.y = 0 ;
		}
		update(){
			if(this.x <= -this.width){ this.x = 0 ;
			}else {
				this.x -= this.game.gamespeed*this.speedModifier ;
			}
			//console.log('layer update: '+this.x) ;
		}
		draw(context){
			context.drawImage(this.image,this.x,this.y) ;
			if(this.x <= -this.width+this.game.width){
			context.drawImage(this.image,this.x+this.width,this.y) ;
			}
		}

	}

	class Background {
		constructor(game){
			this.game = game ;
			this.image1 = document.getElementById("layer_back1") ;
			this.layer1 = new Layer(this.game,this.image1,2,5236) ;
			this.layers = [this.layer1] ;
		}
		update(){
			this.layers.forEach(layer=>{
				layer.update() ;
			})
		}
		draw(context){
			this.layers.forEach(layer=>{
				layer.draw(context) ;
			})
		} 


	}

	class UI {
		constructor(game){
			this.game = game ;
			this.fontSize = 25 ;
			this.fontFamily = 'Helvetica' ;
			this.color = 'blue' ;
		}
		draw(context){
			context.save() ;
			context.shadowOffsetX = 2 ;
			context.shadowOffsetY = 2 ;
			context.shadowColor = 'blue' ;
			context.fillStyle = 'lightblue' ; // score
			context.font = '15px Helvetica' ; // score
			context.fillText("Score: "+this.game.score,20,20) ;
			context.fillText('Timer: '+(this.game.gameTime*0.001).toFixed(1),120,20) ;//game time
			context.fillText("Bullet Per Sec: "+this.game.shooting_speed,220,20) ;
			if(this.game.shooting_speed===0){
				context.fillText("auto-off",350,20) ;
			}else{
				context.fillText("auto-on",350,20) ;
			}

			/*context.shadowOffsetX = 0 ;
			context.shadowOffsetY = 0 ;
			context.shadowColor = 'black' ;
			context.fillStyle = 'green' ; 
			context.fillText("total no of bullets: "+len(this.game.projectiles.keys),400,10) ;
			context.fillText("total no of enemies: "+this.game.enemies,400,30) ;//*/
			context.fillStyle = 'yellow' ; // ammo
			if(this.game.player.powerUp){
				context.fillStyle = 'teal' ;
			}
			//for(let i=0;i<this.game.ammo;i++){// AMMO
				context.fillRect(20,25,5*this.game.ammo,10) ;
			//}
			if(this.game.health<50&&this.game.health>25){
				context.fillStyle = 'orange' ;
			}else if(this.game.health<25){
				context.fillStyle = 'red' ;
			}else{
			context.fillStyle = 'lightgreen' ; 
			}
			if(this.game.health>0){
			context.fillRect(20,40,5*this.game.health,10) ; /// HEALTH
			}

			if(this.game.gameOver){
				context.fillStyle = 'yellow' ; 
				context.textAlign = 'center' ;
				let message1 ;
				let message2 ;
				if(this.game.score >= this.game.winningScore){
					message1 = 'You Win, Hoorah!';
					message2 = 'well... done, Thank you!' ;
				}else{
					if(this.game.score>0.005*this.game.timeLimit){
						message2 = 'Super!! score of '+this.game.score ;
					}else if(this.game.score>0.0025*this.game.timeLimit){
						message2 = 'Great! score of '+this.game.score ;
					}else if(this.game.score>0.001*this.game.timeLimit){
						message2 = 'Good score of '+this.game.score ;
					}else{
					message2 = 'Better Luck Next Time!' ;
					}
					message1 = 'GAME OVER!!!!';
				}
				context.font = '50px '+this.fontFamily ;
				context.fillText(message1,this.game.width*.5,this.game.height*.5) ;
				context.font = '25px '+this.fontFamily ;
				context.fillText(message2,this.game.width*.5,this.game.height*.5+50) ;
			
			}
			context.restore() ;
		}

	}

	class Game {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			this.player = new Player(this);
			this.input = new InputHandler(this);
			this.ui = new UI(this) ;
			this.keys = [] ;
			this.enemies = [] ;
			this.enemyTimer = 0;
			this.EnemyInerval = 500 ;
			this.ammo = 20 ;
			this.maxAmmo = 150 ;
			this.ammoTimer = 0 ;
			this.ammoInterval = 500 ;
			this.gameOver = false ;
			this.score = 0 ;
			this.health = 100 ;
			this.winningScore = 1000 ;
			this.gameTime = 0 ;
			this.timeLimit = 50000 ;
			this.gamespeed = 1 ;
			this.background = new Background(this) ;
			this.auto_shoot = true ;
			this.shooting_speed = 0 ;
			this.shooting_speed_max = 11 ;
			this.shooting_timer = 0 ;
			this.debug = false ;
		}

		update(delt) {
			if(!this.gameOver) this.gameTime += 16 ;
			if(this.health<=0) this.gameOver = true ;
			if(this.gameTime>this.timeLimit) this.gameOver = true ;
			if(this.ammoTimer > this.ammoInterval){
				if(this.ammo < this.maxAmmo){
					this.ammo ++ ;
					//console.log(this.ammo) ;
					this.ammoTimer = 10 ;
				}
			}else {
				//TODO dont know why ???
				//this.ammoTimer += delt/1.0 ;
				this.ammoTimer += 16 ;
			} 
			if(this.auto_shoot){
				if(this.shooting_timer > 1000/this.shooting_speed){
					this.player.shootTop() ;
					this.shooting_timer = 0 ;
				}else {
					this.shooting_timer += 16 ;
				}
			}
			this.background.update() ;
			this.player.update();
			this.enemies.forEach(enemy => {
				enemy.update() ; 
				if (this.checkCollision(this.player,enemy)){
					enemy.markedForDeletion = true ;
					if(enemy.type === "healer"){
						this.player.enterPowerUP();
						
						if(!this.gameOver){
							this.health += enemy.score ;

						if(this.health>100){
							this.health = 100 ;
						}
						}
					}else{
						if(!this.gameOver){
						this.score -= enemy.score*.5 ;
						this.health -= enemy.lives*.5 ;
						}
					}
				}
				this.player.projectiles.forEach(projectile => {
					if(this.checkCollision(enemy,projectile)){
						enemy.lives-- ;
						projectile.markedForDeletion = true ;
						if(enemy.lives < 1){
							enemy.markedForDeletion = true ;
							if(!this.gameOver){
								this.score += enemy.score ;
							}
							if(this.score >= this.winningScore){
								this.gameOver = true ;
							}
						}
					}
				});
			});
			this.enemies =this.enemies.filter(enemy => !enemy.markedForDeletion) ;
			if(this.enemyTimer>this.EnemyInerval){
				if(!this.gameOver){
					this.addEnemy() ;
					this.enemyTimer = 0 ;
					//console.log(this.enemies) ;
				}
			}else{
				this.enemyTimer += 16 ;
			}
		}

		draw(context) {
			this.background.draw(context) ;
			this.player.draw(context);
			this.enemies.forEach(enemy => {
				enemy.draw(context) ; 
			});
			this.ui.draw(context) ;
		}
		addEnemy(){
			const randomize = Math.random() ;
			if(randomize<.50){
			this.enemies.push(new enemy1(this)) ;
			}else if(randomize>.50 && randomize<.90){
				this.enemies.push(new enemy2(this)) ;
			}else{
			this.enemies.push(new enemy3(this)) ;
			}
		}
		checkCollision(rect1,rect2){
			return( rect1.x < rect2.x+rect2.width &&
				rect1.x+rect1.width > rect2.x &&
				rect1.y < rect2.y+rect2.height &&
				rect1.y+rect1.height > rect2.y
				)
		}
	}

	const game = new Game(canvas.width, canvas.height);
	let timestamp1 = 0;

	function animate(timestamp2) {
		const Delt = timestamp2-timestamp1 ;
		timestamp1 = timestamp2 ;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.update(Delt);
		//console.log(delT) ;
		game.draw(ctx);
		requestAnimationFrame(animate);
	}
	animate();
});

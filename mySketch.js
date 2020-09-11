let lasers = []; //array of lasers
let numLasers = 50; //# of lasers allowed
let randomNum = [1, 2 , 3, 4]; //array of random numbers (1-4)

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	
	//Setting up the lasers at a random point on any edge 
	for (let i=0; i<numLasers; i++) {
		let temp = random(randomNum); 
		let x, y, xDir, yDir;		
		
		switch(temp) {
			case 1: //top 
				x = random(windowWidth);
				y = 0;
				xDir = 0;
				yDir = 1; //going down
				break;
			case 2: //left 
				x = 0;
				y = random(windowHeight);
				xDir = 1; //going right
				yDir = 0;
				break;
			case 3: //bottom 
				x = random(windowWidth);
				y = windowHeight;
				xDir = 0;
				yDir = -1; //going up
				break;
			case 4: //right 
				x = windowWidth;
				y = random(windowHeight);
				xDir = -1; //going left
				yDir = 0;
				break;				
		}
		
		lasers[i] = new Laser(x, y, xDir, yDir);
	}
}

function draw() {
	
	//Drawing the lasers 
	for (let i=0; i<numLasers; i++) {
		lasers[i].show();
		lasers[i].updateEndPoints();
		lasers[i].checkDistance();
		lasers[i].checkBounds();
	}
}

class Laser {
	constructor(X, Y, xD, yD) {
		this.X = X;
		this.Y = Y;
		this.distance = random(windowHeight/6, windowHeight/3);
		this.dirX = xD;
		this.dirY = yD;
		this.EndX = this.X;
		this.EndY = this.Y;
		this.col = color(random(255), random(255), random(255));
	}
	
	show() {
		stroke(this.col);
		line(this.X, this.Y, this.EndX, this.EndY);
	}
	
	updateEndPoints() {
		this.EndX += this.dirX;
		this.EndY += this.dirY;
	}
	
	checkDistance() {
		let d = dist(this.X, this.Y, this.EndX, this.EndY); 
		if (d > this.distance) {
			this.X = this.EndX; 
			this.Y = this.EndY;
			this.updateDirections();
		}
	}
	
	checkBounds() {
		//Keeping it within the window
		if (this.EndX<0 || this.EndX>windowWidth) {  
			
			this.X = this.EndX; 
			this.Y = this.EndY;
			this.dirY = 0;
			
			//Sending it in the opposite direction
			if (this.EndX<0) { //left
				this.dirX = 1;
			} else if (this.EndX>windowWidth) { //right
				this.dirX = -1;
			}
		}
		
		if (this.EndY<0 || this.EndY>windowHeight) { 
			
			this.X = this.EndX; 
			this.Y = this.EndY;
			this.dirX = 0;
			
			//Sending it in the opposite direction
			if (this.EndY<0) { //top
				this.dirY = 1;
			} else if (this.EndY>windowHeight) { //bottom
				this.dirY = -1;
			}
		}
	} //end checkBounds
	
	updateDirections() {
		let randomNum2 = [1, 2 , 3, 4];
		let temp2 = random(randomNum2); 
		
		switch(temp2) {
			case 1:
				this.dirX = 0;
				this.dirY = 1; //going down
				break;
			case 2:
				this.dirX = 1; //going right
				this.dirY = 0;
				break;
			case 3:
				this.dirX = 0;
				this.dirY = -1; //going up
				break;
			case 4:
				this.dirX = -1; //going left
				this.dirY = 0;
				break;				
		}
	} //end updateDirections
}

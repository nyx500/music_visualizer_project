//displays and handles clicks on the playback button.
function PlaybackButton(){
	
	this.x = 60;
	this.y = 20;
	this.width = 20;
	this.height = 20;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function(){
		if(this.playing){
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{	
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);

		}
	};

	//checks for clicks on the button, starts or pauses playabck
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
		{
			if (sound.isPlaying()) {
    			sound.pause();
				// noLoop() tip to pause animation received from https://www.youtube.com/watch?v=uk96O7N1Yo0
				noLoop();
  			} else {
    			sound.loop();
				loop();
  			}
  			this.playing = !this.playing;
		}
	};

}
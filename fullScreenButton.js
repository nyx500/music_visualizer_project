//displays and handles clicks on the playback button.
function FullScreenButton(){
	
	this.x = 20;
	this.y = 20;
	this.width = 25;
	this.height = 25;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function(){
        fill(255, 0, 0);
        rect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
        if (!fullscreen())
        {   
            image(fullScreenImage, this.x, this.y, this.width, this.height);
        }
        else
        {
            image(exitFullScreenImage, this.x, this.y, this.width, this.height);
        }
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
            let fs = fullscreen();
            fullscreen(!fs);
			fullscreenMode = !fullscreenMode;
		}
	};

}
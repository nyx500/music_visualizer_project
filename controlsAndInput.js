//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	// fullscreen button
	this.fullScreenButton = new FullScreenButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		this.fullScreenButton.hitCheck();
		this.playbackButton.hitCheck();
	};

	this.guiOpen = true;

	// checks if space code pressed and toggles the visualizations settings gui
	this.keyPressed = function(){
		if (keyCode == 32)
		{	
			if (this.guiOpen)
			{
				gui.hide();
			}
			else
			{
				gui.show();
			}
			
			this.guiOpen = !this.guiOpen;
		}
	}

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//playback button 
		this.playbackButton.draw();
		// fullscreen button
		this.fullScreenButton.draw();
		pop();

	};
}



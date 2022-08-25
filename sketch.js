function preload(){
	sound = loadSound('/assets/tellItToMyHeart.mp3');
	// Globals for setting the fullscreen/exit fullscreen icons are defined
	fullScreenImage = loadImage('assets/fullScreen.png');
	exitFullScreenImage = loadImage('assets/exitFullScreen.png');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	// Loads background images for Starfield and Raindrops visualizations
	galaxyBgImg = loadImage('assets/galaxy.jpg');	
	nyc = loadImage('assets/nyc.jpg');

	// Loads controls
	controls = new ControlsAndInput();

	// Instantiates a new fft object
	fourier = new p5.FFT();

	// Create a new visualisation container
	vis = new Visualisations();

	// Add all the visualizations
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	vis.add(new RidgePlots());
	vis.add(new Mountains());
	vis.add(new Flowers());
	vis.add(new Piano());
	vis.add(new Star());
	vis.add(new Circle());
	vis.add(new Starfield());
	vis.add(new Raindrops());
	vis.add(new Tree());
	vis.add(new Hearts());
	vis.add(new PastelRoom());
	vis.add(new Butterfly());
	
	// Makes an array of visuals to choose from in GUI
	for (var i = 0; i < vis.visuals.length; i++)
	{	
		let name = vis.visuals[i].name;
		let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
		pickVisual.push(capitalizedName);
	}
	guiChooseVisual = createGui('Choose a Visual...');
	guiChooseVisual.setPosition(100, 20);
	guiChooseVisual.addGlobals(
		'pickVisual',
	);

	vis.selectVisual(pickVisual.toLowerCase());
}

function draw(){
	colorMode(RGB);
	toggleGuis();
	vis.selectVisual(pickVisual.toLowerCase());
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

// CONTROLS AND INPUTS FUNCTIONS
function mouseClicked(){
	controls.mousePressed();
}
function keyPressed()
{
	controls.keyPressed();
}


// RESIZE CANVAS IF WINDOW RESIZED
// CALL ONRESIZE() FUNCTION IF NEED TO RESIZE VISUALIZATION, e.g. center starfield
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

// Displays or hides individual visualization GUIs based on keyboard input in Controls and Inputs
// Some visualizations have their own GUIs that enable the user to change parameters of the functions
// in a visualization, e.g. the beat threshold or color
function toggleGuis()
{	
	// Current visualization does not have a personalized GUI: do this
	if (vis.selectedVisual.gui == null)
	{	
		// Hide all other GUIs from the other visualizations
		for (var i = 0; i < vis.visuals.length; i++)
		{
			if (vis.visuals[i].gui != null)
			{
				vis.visuals[i].hideGui();
			}
		}
	}
	// Current visualization does have a specified GUI for user input: do this
	else
	{	
		// Iterates over all the visualizaions and if a visualization has a GUI
		// but is not the CURRENT visualization, then hide this GUI
		for (var i = 0; i < vis.visuals.length; i++)
		{
			if (vis.visuals[i].gui != null)
			{	
				// Hide GUIs of other visualizations
				if (vis.visuals[i] != vis.selectedVisual)
				{	
					vis.visuals[i].hideGui();
				}
			}
			else
			{	
				// For the *current* visualization's GUI...
				/* Shows the GUI if the visGuiShowing Global is TRUE (set by keyboard press space)
				in controls and inputs */
				if (visGuiShowing)
				{	
					vis.selectedVisual.showGui();
				}
				/*Hides the GUI if visuGuiShowing Global is FALSE (also controlled by space key)*/
				else
				{
					vis.selectedVisual.hideGui();
				}
			}
		}
	}
}
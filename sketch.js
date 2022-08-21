//global for background galaxy image;
var galaxyBgImg;
// global for nyc image
/*https://www.goodfon.com/download/4k-hd-background-metropolis-skyline-architecture-tower-skysc/1920x1080/
*/
var nyc;
//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
// checks if mode is fullscreen
var fullscreenMode = false;
// chooseVisual gui
var guiChooseVisual;
// General Gui text heading
var generalText = 'Show/hide using space bar!'
var visGuiShowing = true;
var pickVisual;


var fullScreenImage;


function preload(){
	sound = loadSound('assets/moonlightShadow.mp3');
	fullScreenImage = loadImage('assets/fullScreen.png');
	exitFullScreenImage = loadImage('assets/exitFullScreen.png');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);

	galaxyBgImg = loadImage('assets/galaxy.jpg');	
	nyc = loadImage('assets/nyc.jpg');

	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
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
	
	
	// create array of visuals names to put in GUI
	pickVisual = [];
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

function mouseClicked(){
	controls.mousePressed();
}
function keyPressed()
{
	controls.keyPressed();
}


//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

// Displays or hides GUIs for user input for all visualizations that have one
function toggleGuis()
{	
	// Current visualization does not have a GUI
	if (vis.selectedVisual.gui == null)
	{	
		// Hide all other GUIs for other visualizations
		for (var i = 0; i < vis.visuals.length; i++)
		{
			if (vis.visuals[i].gui != null)
			{
				vis.visuals[i].hideGui();
			}
		}
	}
	// Current visualization has a GUI
	else
	{	
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
				// Checks if "visGuiShowing" global is set to true
				/* "visuGuiShowing" is toggled true/false in controlsAndInput
					by pressing the Space key
				*/
				if (visGuiShowing)
				{	
					vis.selectedVisual.showGui();
				}
				else
				{
					vis.selectedVisual.hideGui();
				}
			}
		}
	}
}
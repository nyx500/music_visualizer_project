//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
// visuals details gui
var gui;
// chooseVisual gui
var guiChooseVisual;

var pickVisual;

// can adjust number of flowers in corresponding visualization
var numFlowers;
var numFlowersMin;
var numFlowersMax;
var numFlowersStep;

// adjust petal number
var numberOfPetals;
var numberOfPetalsMin;
var numberOfPetalsMax;
var numberOfPetalsStep;

// adjust piano threshold
var pianoEnergyLimit;
var pianoEnergyLimitMin;
var pianoEnergyLimitMax;
var pianoEnergyLimitStep;

// adjust smoothness of FFT analyze
var smoothingFactor;
var smoothingFactorMin;
var smoothingFactorgMax;
var smoothingFactorStep;

var pianoColor1;
var pianoColor2;

var bins;

var spinSpeed;

var fullScreenImage;


function preload(){
	sound = loadSound('assets/logical.mp3');
	fullScreenImage = loadImage('assets/fullScreen.png');
	exitFullScreenImage = loadImage('assets/exitFullScreen.png');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
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
	
	
	// create array of visuals names to put in GUI
	pickVisual = [];
	for (var i = 0; i < vis.visuals.length; i++)
	{	
		let name = vis.visuals[i].name;
		let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
		pickVisual.push(capitalizedName);
	}

	numFlowers = 8;
	numFlowersMin = 1;
	numFlowersMax = 16;
	numFlowersStep = 1;

	numberOfPetals = 8;
	numberOfPetalsMin = 4;
	numberOfPetalsMax = 12;
	numberOfPetalsStep = 2;

	pianoEnergyLimit = 150;
	pianoEnergyLimitMin = 100;
	pianoEnergyLimitMax = 240;
	pianoEnergyLimitStep = 5;

	smoothingFactor = 0.8;
	smoothingFactorMin = 0.1;
	smoothingFactorMax = 0.95;
	smoothingFactorStep = 0.05;

	bins = [1024, 512, 256, 128, 64];


	pianoColor1 = [
					'red', 'aqua', 'blueviolet',
					'darkblue', 'gold', 'lightpink',
					'plum','orange', 'lightgray'
				];
	pianoColor2 = [
					'crimson', 'mediumorchid', 'mediumaquamarine',
					'yellow', 'lightgreen', 'lightslategrey', 'steelblue',
					'saddlebrown', 'turquoise', 'violet'
				]


    spinSpeed = [1, 2, 3, 4];

	guiChooseVisual = createGui('Choose a Visual...');
	guiChooseVisual.setPosition(100, 20);
	guiChooseVisual.addGlobals(
		'pickVisual',
	);

	gui = createGui('Audio Visualizer - Press the space key to show/hide this menu!');
	gui.setPosition(width * 0.8, 30);
	gui.addGlobals( 
					'smoothingFactor',
					'bins',
					'numFlowers',
					'numberOfPetals',
					'pianoEnergyLimit',
					'pianoColor1',
					'pianoColor2',
					'spinSpeed'
				  );
	
	

	vis.selectVisual(pickVisual.toLowerCase());

}

function draw(){
	colorMode(RGB);
	background(0);
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

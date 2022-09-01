

function preload() {
	// Load in list of file paths to songs the user should be able to select
	var songFileNames = ['assets/stomper_reggae_bit.mp3', 'assets/believerDragons.mp3',
	'assets/prayerInC.mp3', 'assets/logical.MP3','assets/tellItToMyHeart.mp3'];

	// Load the songs into global 'tracks' array
	for (let i = 0; i < songFileNames.length; i++)
	{
		let song = loadSound(songFileNames[i]);
		tracks.push(song);
	}

	// Create names of songs with an index number that the user can choose in the GUI
	pickSong = ['1: Stomper Reggae Bit', '2: Believer - Imagine Dragons', 
	'3: Prayer in C - Lilly Wood and the Prick', '4: The Logical Song - Supertramp', 
	'5: Tell it to My Heart - Taylor Dayne'];

	// Set default
	sound = tracks[0];

	// Globals for setting the fullscreen/exit fullscreen icons are defined
	fullScreenImage = loadImage('assets/fullScreen.png');
	exitFullScreenImage = loadImage('assets/exitFullScreen.png');

	// Attribution: uploading custom fonts in p5.js
	// https://p5js.org/reference/#/p5/textFont
	retroFont = loadFont('Fonts/outrunFuture.otf');
	normalFont = loadFont('Fonts/ChakraPetch-Regular.ttf');
}

function setup() {
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
	for (var i = 0; i < vis.visuals.length; i++) {
		let name = vis.visuals[i].name;
		let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
		pickVisual.push(capitalizedName);
	}
	guiChooseVisual = createGui('Choose a Visual...');
	guiChooseVisual.setPosition(100, 20);
	// Allows user to select visuals and songs
	guiChooseVisual.addGlobals(
		'pickVisual',
		'pickSong'
	);

	vis.selectVisual(pickVisual.toLowerCase());
	
}


function draw() {
	// Attribution: https://www.tutorialspoint.com/how-to-convert-a-string-into-integer-in-javascript#:~:text=To%20convert%20a%20string%20to,be%20returned%20as%20the%20output.
	// How to create an integer from a string
	// Get the index of the selected song from the pickSong array (selected from in the GUI)
	// Index is -1 because for user-friendliness, the displayed song indices begin with 1 in the GUI
	songIndex = parseInt(pickSong[0] - 1);
	// If the currently selected sound by the user is not the stored track,....
	if (sound != tracks[songIndex])
	{	
		// Then stop the track from playing
		sound.stop();
		// When sound stops, draw the 'Play' instead of the 'Pause' playback button
		controls.playbackButton.playing = false;
		// Load the newly selected song into 'sound'
		sound = tracks[songIndex];
	}

	colorMode(RGB);
	toggleGuis();
	vis.selectVisual(pickVisual.toLowerCase());
	// Draws the selected visualisation only if sound is playing
	if (sound.isPlaying())
	{
		vis.selectedVisual.draw();
	}
	// If visualization is paused, display black screen with this bright pink message
	else
	{
		fill('deeppink');
		textSize(80);
		textFont(retroFont);
		text('Retro Music Player', width / 5, height / 2);
		textFont(normalFont);
		textSize(40);
		text('Please select song and press play!', width * 0.3, height * 0.75);
	}
	// Draws the play and pause controls on top left corner of page
	controls.draw();
}

// CONTROLS AND INPUTS FUNCTIONS
function mouseClicked() {
	controls.mousePressed();
}
function keyPressed() {
	controls.keyPressed();
}


// RESIZE CANVAS IF WINDOW RESIZED
// CALL ONRESIZE() FUNCTION IF NEED TO RESIZE VISUALIZATION, e.g. center starfield
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (
		vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}

// Displays or hides individual visualization GUIs based on keyboard input in Controls and Inputs
// Some visualizations have their own GUIs that enable the user to change parameters of the functions
// in a visualization, e.g. the beat threshold or color
function toggleGuis() {
	// Current visualization does not have a personalized GUI: do this
	if (vis.selectedVisual.gui == null) {
		// Hide all other GUIs from the other visualizations
		for (var i = 0; i < vis.visuals.length; i++) {
			if (vis.visuals[i].gui != null) {
				vis.visuals[i].hideGui();
			}
		}
	}
	// Current visualization does have a specified GUI for user input: do this
	else {
		// Iterates over all the visualizaions and if a visualization has a GUI
		// but is not the CURRENT visualization, then hide this GUI
		for (var i = 0; i < vis.visuals.length; i++) {
			if (vis.visuals[i].gui != null) {
				// Hide GUIs of other visualizations
				if (vis.visuals[i] != vis.selectedVisual) {
					vis.visuals[i].hideGui();
				}
			}
			else {
				// For the *current* visualization's GUI...
				/* Shows the GUI if the visGuiShowing Global is TRUE (set by keyboard press space)
				in controls and inputs */
				if (visGuiShowing) {
					vis.selectedVisual.showGui();
				}
				/*Hides the GUI if visuGuiShowing Global is FALSE (also controlled by space key)*/
				else {
					vis.selectedVisual.hideGui();
				}
			}
		}
	}
}
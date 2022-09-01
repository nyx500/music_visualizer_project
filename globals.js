// DECLARES GLOBALS USED THROUGHOUT THE APPLICATION
// List of songs
var pickSong = [];
var tracks = [];
var songIndex;
let retroFont;
let normalFont;
//global for background galaxy image in starfield visualization
var galaxyBgImg;
// global for nyc image in rain visualization
/*Attribution: https://www.goodfon.com/download/4k-hd-background-metropolis-skyline-architecture-tower-skysc/1920x1080/
*/
var nyc;

//global for controls and input 
var controls = null;
//store visualisations in this vis container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform object
var fourier;
// checks if mode is fullscreen (Boolean)
var fullscreenMode = false;

// chooseVisual gui to select a visual
var guiChooseVisual;

// General Gui text heading for specific visualization guis
var generalText = 'Show/hide using space bar'

// when visualization loads, show specific gui
var visGuiShowing = true;

// Will store an array of all the visuals to choose from in the main GUI
var pickVisual = [];

// icon to make the visualization full screen
var fullScreenImage;

// GLOBAL FOR RIDGEPLOTS
var ridgeBins = [1024, 512, 256, 128, 64];

// GLOBAL FOR MOUNTAINS
var mountainsBins = [1024, 512, 256, 128, 64];

// GLOBALS FOR FLOWERS VISUALIZATION GUI
// Adjusts number of flowers shown
var numFlowers = 8;
var numFlowersMin = 4;
var numFlowersMax = 16;
var numFlowersStep = 1;
// Adjusts petal number for each flower
var numberOfPetals = 8;
var numberOfPetalsMin = 4;
var numberOfPetalsMax = 12;
var numberOfPetalsStep = 2;

// GLOBALS FOR PIANO VISUALIZATION GUI
// Adjusts piano threshold
var pianoThreshold = 201;;
var pianoThresholdMin = 170;
var pianoThresholdMax = 250;
var pianoThresholdStep = 1;

var pianoBins;
pianoBins = [1024, 512, 256, 128, 64];

var pianoColor1 = [
    'lightgray','red', 'aqua', 'blueviolet',
    'darkblue', 'gold', 'lightpink',
    'plum','orange', 
];
var pianoColor2 = [
    'darkslategray', 'crimson', 'mediumorchid', 'mediumaquamarine',
    'yellow', 'lightgreen', 'lightslategrey', 'steelblue',
    'saddlebrown', 'turquoise', 'violet'
]

var pianoSmoothingFactor = 0.3;
var pianoSmoothingFactorMin = 0.1;
var pianoSmoothingFactorMax = 1;
var pianoSmoothingFactorStep = 0.05;

// GLOBALS FOR 'STAR' AND 'CIRCLE' VISUALIZATIONS
var spinSpeed;
spinSpeed = [1, 2, 3, 4];

var smoothingFactor = 0.2;
var smoothingFactorMin = 0.0;
var smoothingFactorMax = 0.8;
var smoothingFactorStep = 0.01;

// GLOBALS FOR 'STARFIELD' VISUALIZATION
// adjust petal number
var starfieldBeatThreshold = 1.165;
var starfieldBeatThresholdMin = 1.015;
var starfieldBeatThresholdMax = 1.2;
var starfieldBeatThresholdStep = 0.001;

// GLOBALS FOR 'TREE' VISUALIZATION
var treeBeatThreshold = 1.05;
var treeBeatThresholdMin = 1.015;
var treeBeatThresholdMax = 1.115;
var treeBeatThresholdStep = 0.001;

// GLOBALS FOR 'BUTTERFLY' VISUALIZATION
var flapSpeed = 0.3;
var flapSpeedMin = 0.2;
var flapSpeedMax = 0.9;
var flapSpeedStep = 0.05;

// GLOBALS FOR PASTEL ROOM ROTATION ANGLE
var rotationAngle = 0.02;
var rotationAngleMin = 0.01;
var rotationAngleMax = 0.03;
var rotationAngleStep = 0.005;

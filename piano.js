// adjust piano threshold
var pianoSensitivityLimit;
var pianoSensitivityLimitMin;
var pianoSensitivityLimitMax;
var pianoSensitivityLimitStep;

pianoSensitivityLimit = 201;
pianoSensitivityLimitMin = 170;
pianoSensitivityLimitMax = 250;
pianoSensitivityLimitStep = 1;


var bins;
bins = [1024, 512, 256, 128, 64];

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


// maps fourier.analyze() frequency amplitude values to notes on a piano
function Piano(){
    this.name = "piano";
    this.octaves;
    var mapped_array;

    this.gui = createGui('Piano Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals('pianoSensitivityLimit',
                        'bins',
                        'pianoColor1',
                        'pianoColor2');

    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }

    /*  an array of seven objects storing the frequencies of all the notes a piano, 
    divided into objects storing the frequencies for every note in each octave*/
    this.frequenciesOfOctaves = [
        {
            tones:[32.703, 36.708, 41.203, 43.654, 48.99, 55, 61.735],
            semitones:[34.648, 38.891, 46.249, 51.913, 58.27]
        },
        {
            tones:
            [65.406, 73.416, 82.407, 87.307, 97.999, 110, 128.47],
            semitones:
            [69.296, 77.782, 92.499, 103.83, 116.54]
        },
        {
            tones: [130.81, 146.83, 164.81, 174.61, 196, 220, 246.94],
            semitones: [138.59, 155.56, 185, 207.65, 233.08]
        },
        {
            tones: [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88],
            semitones: [227.18, 311.13, 369.99, 415.3, 466.16]
        },
        {
            tones: [523.75, 587.33, 659.25, 698.46, 783.99, 880, 987.77],
            semitones: [554.37, 622.25, 739.99, 830.61, 932.33]
        },
        {
            tones:[1046.5, 1174.7, 1318.5, 1396.9, 1568, 1760, 1979.5],
            semitones: [1108.7, 1244.5, 1480, 1661.2, 1864.7]
        },
        {
            tones: [2093, 2349, 2637, 2793.8, 3136, 3520, 3951.1],
            semitones: [2217.5, 2489, 2960, 3322.4, 3729.3]
        }
    ]
    
    /* function which returns an array of objects for the keys in each of the 7 octaves
    each key is an object with its properties being its drawing coordinates, color, type of sound,
    and piano frequency */
    this.makeOctave = function(x, y, key_width, key_height, freq_array){
        
        let octave = [];

        // white keys
        for (var i = 0; i < 7; i++)
        {
            octave.push({
            type: 'tone',
            color: 'white',
            number: i + 1,
            x: x + (key_width * (i)),
            y: y,
            width: key_width,
            height: key_height,
            frequency: freq_array.tones[i]
        })
        }

        // first two semitones in an octave
        for (var i = 0; i < 2; i++)
        {
            octave.push(
                {
                    type: 'semitone',
                    color: 'black',
                    number: i + 1,
                    x: ((x + (key_width * (i + 1))) - key_width / 2),
                    y: y,
                    width: key_width * 0.9,
                    height: key_height * 0.55,
                    frequency: freq_array.semitones[i]
                }
            )
        }
        // last two semitones in an octave
        for (var i = 3; i < 6; i++)
        {
            octave.push(
                {
                    type: 'semitone',
                    color: 'black',
                    number: i - 1,
                    x: ((x + (key_width * (i + 1))) - key_width / 2),
                    y: y,
                    width: key_width * 0.9,
                    height: key_height * 0.55,
                    frequency: freq_array.semitones[i - 1]
                }
            )
        }

        return octave;
    }

    // returns an array of all seven octaves (made up of object keys) in the piano
    // calls the makeOctave function for each of the 7 octaves needed
    this.makeOctaves = function()
    {
        var octaves = [];

        for (var i = 0; i < 7; i++)
        {
            octaves.push(this.makeOctave(
                ((width / 55) * 7) * i + width * 0.06, 
                height * 0.25,
                ((width - 20) / 55),
                height * 0.5,
                this.frequenciesOfOctaves[i]
            ));
        }

        return octaves;
    }
    
    /* 'bins' is a global variable changed via the GUI that determines how many frequencies
    the fourier.analyze() function will return - too many bins means too many fourier.analyze()
    frequencies will be mapped to the piano notes, so the notes highlighted will not change
    frequently enough */
    /* uses JS ES6 .map array method to give each frequency in the fourier.analyze() array
    a corresponding frequency on the piano */
    this.mapFourierToPiano = function()
    {
        mapped_array = fourier.analyze(bins).map((element, index) =>
            element = {
                frequency: map(index, 0, fourier.analyze(bins).length, 32.703, 3951.1),
                energy: element
            }
        )
        return mapped_array;
    }

    /*draws the piano using the coordinates stored in each key object in
    the octave array */
    this.drawPiano = function()
    {   
        
        background(0);
        for (var i = 0; i < this.octaves.length; i++)
        {
            for (var j = 0; j < this.octaves[i].length; j++)
            {
                fill(this.octaves[i][j].color);
                rect(
                    this.octaves[i][j].x, 
                    this.octaves[i][j].y, 
                    this.octaves[i][j].width,
                    this.octaves[i][j].height);
            }
        }
        
        stroke(0);
        strokeWeight(1);
    }

    // if a frequency is played loud enough, then the piano key corresponding to it changes color
    this.changeKeyColor = function(color1, color2)
    {
        for (var i = 0; i < mapped_array.length; i++)
        {
            /* the global variable pianoSensitivityLimit sets how loud frequency has to
             be for each note to be highlighted */
            if (mapped_array[i].energy > pianoSensitivityLimit)
            {   
                for (var j = 0; j < this.octaves.length; j++)
                {
                    for (var k = 0; k < this.octaves[j].length; k++)
                    {   
                        /* changes the color of a key if its corresponding frequency
                        in mapped_array is louder than the pianoSensitivityLimit value */
                        if (Math.abs(mapped_array[i].frequency - this.octaves[j][k].frequency) <= 1)
                        {   
                            if (this.octaves[j][k].color == "white")
                            {
                                this.octaves[j][k].color = color1;
                            }
                            else if (this.octaves[j][k].color == "black")
                            {
                                this.octaves[j][k].color = color2;
                            }

                        }
                    }   
                }
            }
        }
    }


    this.draw = function()
    {   
        // gets octaves array by calling makeOctaves()
        this.octaves = this.makeOctaves();

        /* 'smoothingFactor' is aa changeable variable (via GUI) determining
         the level of smoothing between samples*/
        fourier.smooth(smoothingFactor);

        let mapped_array = this.mapFourierToPiano();

        // colors can be chosen from GUI interface
        this.changeKeyColor(pianoColor1, pianoColor2);

        this.drawPiano();
    }
}
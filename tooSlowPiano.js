
// // TRIED THIS BUT THE PIANO WAS TOO SLOW TO RESPOND --> DON'T HAVE ANY IDEA HOW TO FIX THIS

// function Octave(x, y, key_width, key_height, freq_array) {
//     this.x = x;
//     this.y = y;
//     this.key_width = key_width;
//     this.key_height = key_height;
//     this.freq_array = freq_array;
//     this.keys = [];

//     // White keys
//     for (var i = 0; i < 7; i++)
//     {   
//         let key = new Key(
//             'tone',
//             'white',
//             i+1,
//             this.x + (this.key_width * (i)),
//             this.y,
//             this.key_width,
//             this.key_height,
//             this.freq_array.tones[i]
//             )
//         this.keys.push(key)
//     }

//     for (var i = 0; i < 2; i++)
//     {   
//         let key = new Key(
//             'semitone',
//             'black',
//             i + 1,
//             ((this.x + (this.key_width * (i + 1))) - this.key_width / 2),
//             this.y,
//             this.key_width * 0.9,
//             this.key_height * 0.55,
//             this.freq_array.semitones[i]
//         )
//         this.keys.push(key);
//     }

    
//     // Last two semitones in an octave
//     for (var i = 3; i < 6; i++)
//     {   
//         let key = new Key(
//             'semitone',
//             'black',
//             i - 1,
//             ((this.x + (this.key_width * (i + 1))) - this.key_width / 2),
//             this.y,
//             this.key_width * 0.9,
//             this.key_height * 0.55,
//             this.freq_array.semitones[i - 1]

//         )

//         this.keys.push(key);
//     }

//     this.draw = function(){
//         for (var i = 0; i < this.keys.length; i++)
//         {   
//             this.keys[i].draw();
//         }
//         stroke(0);
//         strokeWeight(1);
//     }

// }

// function Key(type, color, index, x, y, width, height, frequency)
// {
//     this.type = type;
//     this.color = color;
//     this.index = index;
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.frequency = frequency;

//     this.draw = function()
//     {
//         fill(this.color);
//         rect(
//             this.x,
//             this.y,
//             this.width,
//             this.height
//         );
//     }
// }


// // Piano maps fourier.analyze() frequency-groups amplitude values to notes on a piano
// function Piano(){
//     this.name = "piano";
//     this.octaves;
//     var mappedFreqsArray;

//     // GUI for Piano --> contains globals for amplitude threshold, number freq bins, color of keys
//     this.gui = createGui('Piano Visualization: ' + generalText);
//     this.gui.setPosition(width * 0.8, 30);
//     this.gui.addGlobals('pianoThreshold',
//                         'pianoSmoothingFactor',
//                         'pianoBins',
//                         'pianoColor1',
//                         'pianoColor2');

//     this.hideGui = function()
//     {   
//         this.gui.hide();
//     }

//     this.showGui = function()
//     {   
//         this.gui.show();
//     }

//     /*  An array of seven objects storing the frequencies of all the notes a piano, 
//     divided into objects storing the frequencies for every note in each octave*/
//     this.pianoFrequencies = [
//         {
//             tones:[32.703, 36.708, 41.203, 43.654, 48.99, 55, 61.735],
//             semitones:[34.648, 38.891, 46.249, 51.913, 58.27]
//         },
//         {
//             tones:
//             [65.406, 73.416, 82.407, 87.307, 97.999, 110, 128.47],
//             semitones:
//             [69.296, 77.782, 92.499, 103.83, 116.54]
//         },
//         {
//             tones: [130.81, 146.83, 164.81, 174.61, 196, 220, 246.94],
//             semitones: [138.59, 155.56, 185, 207.65, 233.08]
//         },
//         {
//             tones: [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88],
//             semitones: [227.18, 311.13, 369.99, 415.3, 466.16]
//         },
//         {
//             tones: [523.75, 587.33, 659.25, 698.46, 783.99, 880, 987.77],
//             semitones: [554.37, 622.25, 739.99, 830.61, 932.33]
//         },
//         {
//             tones:[1046.5, 1174.7, 1318.5, 1396.9, 1568, 1760, 1979.5],
//             semitones: [1108.7, 1244.5, 1480, 1661.2, 1864.7]
//         },
//         {
//             tones: [2093, 2349, 2637, 2793.8, 3136, 3520, 3951.1],
//             semitones: [2217.5, 2489, 2960, 3322.4, 3729.3]
//         }
//     ]
    
//     /* Function which returns an array of objects for the keys in each of the 7 octaves.
//     Each key is an object with its properties being its x-y coords, black or white color, type of sound,
//     and the frequency of this key on the piano */
//     // this.makeOctave = function(x, y, key_width, key_height, freq_array){
        
//     //     let octave = [];

//     //     // White keys
//     //     for (var i = 0; i < 7; i++)
//     //     {
//     //         octave.push({
//     //         type: 'tone',
//     //         color: 'white',
//     //         number: i + 1,
//     //         x: x + (key_width * (i)),
//     //         y: y,
//     //         width: key_width,
//     //         height: key_height,
//     //         frequency: freq_array.tones[i]
//     //     })
//     //     }

//     //     // First two semitones in an octave
//     //     for (var i = 0; i < 2; i++)
//     //     {
//     //         octave.push(
//     //             {
//     //                 type: 'semitone',
//     //                 color: 'black',
//     //                 number: i + 1,
//     //                 x: ((x + (key_width * (i + 1))) - key_width / 2),
//     //                 y: y,
//     //                 width: key_width * 0.9,
//     //                 height: key_height * 0.55,
//     //                 frequency: freq_array.semitones[i]
//     //             }
//     //         )
//     //     }

//     //     // Last two semitones in an octave
//     //     for (var i = 3; i < 6; i++)
//     //     {
//     //         octave.push(
//     //             {
//     //                 type: 'semitone',
//     //                 color: 'black',
//     //                 number: i - 1,
//     //                 x: ((x + (key_width * (i + 1))) - key_width / 2),
//     //                 y: y,
//     //                 width: key_width * 0.9,
//     //                 height: key_height * 0.55,
//     //                 frequency: freq_array.semitones[i - 1]
//     //             }
//     //         )
//     //     }
//     //     return octave;
//     // }

//     // Returns an array of all seven octaves (made up of object keys) in the piano
//     // Calls the makeOctave function to return each of the 7 octaves of key-objects in a piano
//     this.makeOctaves = function()
//     {
//         var octaves = [];

//         for (var i = 0; i < 7; i++)
//         {
//             let octave = new Octave(
//                 // x-coordinate
//                 ((width / 55) * 7) * i + (width * 0.06),
//                 // y-coordinate
//                 height * 0.25,
//                 // key's width
//                 ((width - 20) / 55),
//                 // key's height
//                 height * 0.5,
//                 // corresponding frequency array
//                 this.pianoFrequencies[i]
//             )
//             octaves.push(octave);
//             // octaves.push(
//             //     this.makeOctave(
//             //     // x-coordinate
//             //     ((width / 55) * 7) * i + (width * 0.06), 
//             //     // y-coordinate
//             //     height * 0.25,
//             //     //key's width
//             //     ((width - 20) / 55),
//             //     // key's height
//             //     height * 0.5,
//             //     // corresponding frequency array
//             //     this.pianoFrequencies[i]
//             //     )
//             // );
//         }

//         return octaves;
//     }

//     this.octaves = this.makeOctaves();
    
//     /* 'pianoBins' is a global variable changed via the GUI that determines how many frequencies
//     the fourier.analyze() function will return. Too many pianoBins means too many fourier.analyze()
//     frequencies will be mapped to the piano notes, so the notes highlighted will not change
//     frequently enough */
//     this.mapFourierToPiano = function()
//     {   
        
//         /* Uses JS ES6 .map array method to give each frequency in the fourier.analyze() array
//         a corresponding frequency on the piano */
//         mappedFreqsArray = fourier.analyze(pianoBins).map((element, index) =>
//             element = {
//                 frequency: map(index, 0, fourier.analyze(pianoBins).length, 32.703, 3951.1),
//                 energy: element
//             }
//         )
//         return mappedFreqsArray;
//     }

//     /* Draws the piano using the coordinates stored in each key object in
//     the octave array */
//     this.drawPiano = function()
//     {  
//         for (var i = 0; i < this.octaves.length; i++)
//         {   
//             this.octaves[i].draw();
//         }
//         // // Per octave
//         // for (var i = 0; i < this.octaves.length; i++)
//         // {   
//         //     // Per key
//         //     for (var j = 0; j < this.octaves[i].length; j++)
//         //     {   
//         //         // Fills the key with the color stored in the object and draws it
//         //         fill(this.octaves[i][j].color);
//         //         rect(
//         //             this.octaves[i][j].x, 
//         //             this.octaves[i][j].y, 
//         //             this.octaves[i][j].width,
//         //             this.octaves[i][j].height);
//         //     }
//         // }
        
//         // stroke(0);
//         // strokeWeight(1);
//     }

//     // If a frequency is played loud enough, then the piano key corresponding to it changes color
//     // This shows the key is being 'pressed'
//     this.changeKeyColor = function(color1, color2)
//     {
//         for (var i = 0; i < mappedFreqsArray.length; i++)
//         {
//             /* The global variable pianoThreshold sets how loud frequency has to
//              be for each note to be selected/change color */
//             if (mappedFreqsArray[i].energy > pianoThreshold)
//             {   
//                 // Selects the correct octave
//                 for (var j = 0; j < this.octaves.length; j++)
//                 {   
//                     // Selects a key in that octave
//                     for (var k = 0; k < this.octaves[j].keys.length; k++)
//                     {   
//                         /* Changes the color of a key if its corresponding frequency
//                         in mappedFreqsArray is louder than the pianoThreshold value */
//                         if (Math.abs(mappedFreqsArray[i].frequency - this.octaves[j].keys[k].frequency) <= 1)
//                         {   
//                             if (this.octaves[j].keys[k].color == "white")
//                             {   
//                                 this.octaves[j].keys[k].color = color1;
//                             }
//                             else if (this.octaves[j].keys[k].color == "black")
//                             {
//                                 this.octaves[j].keys[k].color = color2;
//                             }

//                         }
//                     }   
//                 }
//             }
//         }
//     }


//     this.draw = function()
//     {   
//         /* 'smoothingFactor' is aa changeable variable (via GUI) determining
//          the level of smoothing between samples*/
//         fourier.smooth(pianoSmoothingFactor);

//         let mappedFreqsArray = this.mapFourierToPiano();

//         // colors can be chosen from GUI interface
//         this.changeKeyColor(pianoColor1, pianoColor2);

//         this.drawPiano();
//     }
// }
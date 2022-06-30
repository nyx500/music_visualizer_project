/* 1. draw the lines without any output
	- work out where on the screen to draw the PLOT
	- work out the SCALE (visual properties)
	- draw lines that move up the screen in regular intervals
		--> put the lines into a 2-d array
		--> the outer elements represent a line
		--> inner arrays represent the points
		--> create a 2d array of lines and add one to the array every x frames
		--> each frame clear the screen and decrease the y-coordinate of each line
		--> if line is above top-of-screen (smaller than 0 y-coordinate), then remove it from the array
2. add the music output
*/

function RidgePlots() {
	//vis name
	this.name = "ridgeplots";
    // private variables because only need to be accessed in this constructor function
    var output = [];
    // the left edge of the plot
    var startX = width / 5;
    // where we are going to finish the plot (at the top)
    var endY = height / 5;
    // where the plot/lines start (at the bottom of the page)
    var startY = height - endY;
    // how wide the plot is going to be
    var spectrumWidth = width * 0.8;
    // how fast lines move up
    var speed = 0.9;

    var addWave = function() {
        
        var w = fourier.waveform(bins);
        var output_wave = [];
        var smallScale = 3;
        var bigScale = 100;

        for(var i = 0; i < w.length; i++)
        {   
            
            // takes every 20th element of the waveform array
            if (i % 20 == 0)
            {   
                // maps all the values from the waveform array to the x-position on the line
                var x = map(i, 0, 1024, startX, spectrumWidth);

                if (i < 1024 * 0.25 || i > 1024 * 0.75)
                {   
                    var y = map(w[i], -1, 1, -smallScale, smallScale);

                    output_wave.push({
                        x: x,
                        y: startY + y
                    });
                }
                else
                {
                    var y = map(w[i], -1, 1, -bigScale, bigScale);

                    output_wave.push({
                        x: x,
                        y: startY + y
                    });
                }
            }
        }
        output.push(output_wave);
    }

	//draw the ridge plots to the screen
	this.draw = function() {

        // Adds a wave every 30 frames
        if (frameCount % 10 == 0)
        {
            addWave();
	    }

        
        strokeWeight(2);
        noFill();


        for(var i = output.length - 1; i >= 0; i--)
        {   
           let o = output[i];
           
           /* Implements fade-waterfall effect (my adaptation of the original code)
            - lines in the middle of the screen are a brighter blue and
           look like they are dripping*/
           if(i < output.length/2)
           {
              var blue = map(i, 0, output.length/2, 100, 255);
              var green = map(i, 0, output.length/2, 0, 150);
              var red = map(i, 0, output.length/2, 0, 150);
           }
           else
           {
               var blue = map(i, output.length - 1, output.length/2,  100, 255);
               var green = map(i, output.length - 1, output.length/2,  0, 150);
               var red = map(i, output.length - 1, output.length/2,  0, 150);
           }
           
           
           stroke(red, green, blue);
           
           beginShape();
           for (var j = 0; j < o.length; j++)
           {    

            // Vibrates the lines in the middle where the have the most distortion due to frequency amplitude
            var change_in_Y = Math.abs(o[0].y - o[j].y);
                var vibrate = map(change_in_Y, 0, 100, 0, 5);
                if (sound.isPlaying())
                {
                    if (o[j].x > startX * 1.25 && o[j].x < (startX + spectrumWidth) * 0.75)
                    {
                        if (Math.random() > 0.5)
                        {
                            o[j].y += vibrate;
                        }
                        else
                        {
                            o[j].y -= vibrate;
                        }
                    } 
                }
                
               
            
            curveVertex(o[j].x, o[j].y);

            // freezes the visualization if sound is paused
            if (sound.isPlaying())
            {
                o[j].y -= speed;
            }
           }
           endShape();

           if (o[0].y < endY)
           {
            output.splice(i, 1);
           }

        }
    }
}
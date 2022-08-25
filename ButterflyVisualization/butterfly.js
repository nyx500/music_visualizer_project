// Attribution: https://www.youtube.com/watch?v=O_0fRV4MTZo&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=10
// Attribution: https://en.wikipedia.org/wiki/Rose_(mathematics)
// I did this vis because I wanted to explore noise() function in more detail and there were some good videos about it
// Vary shape of wing with noise()
// Second dimension of noise() is yoff, change over time/frame count


function Butterfly()
{   
    frameRate(60);
    this.name = "butterfly";
    // GUI --> choose the speed of the wings flapping
    this.gui = createGui('Butterfly Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals('flapSpeed');

    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }

    // Sets the noise/time (increments with every draw frame) to 0
    this.yoff = 0;
    var beatDetector = new BassBeatDetector();
    // Determines the resolution of the butterfly wing
    // The more points drawn in PI, the sharper the resolution
    // Therefore smaller angle is, the sharper the resolution
    // Dividing PI by a large number will lead to a smaller increment angle
    var angle = PI / 300;
    // Butterfly wing part colors
    this.colors = ['indigo', 'purple', 'blue', 'green', 'yellow', 'orange', 'red'];
    // Determines how jagged the butterfly wing shape is
    var noiseIncrement = 0.02;

    // Makes an array of wing outlines
    this.makeWingOutlines = function()
    {   
        var arrayOfWingOutlines = [];
        // The range of the size of the wings (then mapped to with noise()) as a function of screen size
        // These divisors are going to divide the width of the screen into smaller sections
        var widthDivisorLow = 3;
        var widthDivisorHigh = 5;

        // Creates wing outlines corresponding to the colors in the colors array
        for (var i = 0; i < this.colors.length; i++)
        {
            var wingOutline = new WingOutline(
                                this.colors[i],
                                angle,
                                noiseIncrement,
                                width/widthDivisorHigh,
                                width/widthDivisorLow
                            );
            
            // For the second color (purple), make the size a bit smaller because we want lots of indigo
            if (i == 1)
            {
                widthDivisorHigh = widthDivisorLow + 1;
                widthDivisorLow += 1;
            } 
            else
            {
                widthDivisorHigh = widthDivisorLow + 2;
                widthDivisorLow += 2;
            }

            arrayOfWingOutlines.push(wingOutline);
        }
        return arrayOfWingOutlines;
    }
    
    // Makes wing outlines
    this.wingOutlines = this.makeWingOutlines();
    // Signals that wings are loaded
    this.loadedWings = false;

     // Draws central brown body of butterfly
    this.drawBody = function()
     {
         // Draws body of butterfly
         strokeWeight(12);
         stroke(92, 64, 51);
         strokeCap(ROUND);
         line(width / 2, (height * 3/4), width / 2, (height / 4));
 
         // Draws antenna
         line(width / 2, (height / 4), width * 0.45, (height / 10));
         line(width / 2, (height / 4), width * 0.55, (height / 10));
 
         // Draws eyes
         fill(255);
         noStroke();
         ellipse((width * 0.45), height/10, 20, 20);
         ellipse((width * 0.55), height/10, 20, 20);
         
         // If beat, move the butterfly's eyes
         if (beatDetector.detectBeat())
         {
             fill(0);
             ellipse((width * 0.45 + 3), height/10, 8, 8);
             ellipse((width * 0.55 + 3), height/10, 8, 8);
         }
         else
         { 
             fill(0);
             ellipse((width * 0.45), height/10, 8, 8);
             ellipse((width * 0.55), height/10, 8, 8);
         }
     }
    
    // Flips this.loadedWings flag to true
    this.changeLoaded = function()
    {
        this.loadedWings = true;
    }
     

    // Draws wing outlines of butterfly
    // Calls changeLoaded when wings are drawn
    this.drawWingOutlines = function(callback)
    {   
        // Wing outlines take yoff argument: a y-offset that maps the wing position to frame number
        // This is what allows the wings to flap if there is a beat
        for (var i = 0; i <this.wingOutlines.length; i++)
        {   
            this.wingOutlines[i].draw(this.yoff);
        }  
        callback();
    }


    
    this.draw = function()
    {  
        // I tried to use a callback function for the body to be drawn only after the wings are drawn
        // However, this doesn't work and I don't know why
        // The body is still being drawn first, and this is very confusing, but I am near the deadline
        // and still do not understand why the callback doesn't work!
        this.drawWingOutlines(this.changeLoaded);
        if (this.changeLoaded)
        {
            this.drawBody();
        }

        // This y-offset value controls how fast the butterfly beats its wings
        // It took me quite a long time to work out how to implement this
        // so that the butterfly beat its wings only when there is a beat 
        // as this was not explained in the tutorial video
        if (beatDetector.detectBeat())
        {
            this.yoff += flapSpeed;
        }
    }
}
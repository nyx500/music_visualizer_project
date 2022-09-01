// Circle with different color mini-circles mapping to different frequencies in FFT object
function Circle() {

    this.name = 'circle';
    this.spectrum = fourier.analyze();
    var prog = 0;
    
    // Creates a GUI for spin speed and smoothness of fourier transform
    this.gui = createGui('Circle Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals('smoothingFactor', 'spinSpeed');

    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }

    // Will be used to draw a circle for each different frequency section
    this.drawCircle = function(lowerFreqLimit, upperFreqLimit, lowerRadius, upperRadius,
        colorValue, ellipseWidth)
    {   
        // Iterate over the fourier.analyze() spectrum for the desired frequency values
        // Iterates over the lower half of frequencies for an inner circle
        for (
                let i = (this.spectrum.length) * lowerFreqLimit;
                i < (this.spectrum.length) * upperFreqLimit / 2;
                i++
            )
        {   
            // The radius of circle must be between these lower and upper values, so let's use map()
            let radius = map(this.spectrum[i], 0, 255, lowerRadius, upperRadius);

            // Angle mapped from length of each proportion of the fourier.analyze() spectrum
            // How to wrap wave around circle
            // Attribution:  https://www.youtube.com/watch?v=uk96O7N1Yo0
            let angle_1 = map(i, 0, this.spectrum.length / 8, 0, PI);
            strokeWeight(2);
            strokeCap(PROJECT);
            
            // For each circle layer, do something different with the colors
            if (colorValue == 'violet')
            { 
                noFill();
                stroke('violet');
            }
            else if (colorValue == 'darkorchid')
            {   
                fill('darkorchid');
                stroke('darkmagenta');
            }
            else if (colorValue == 'purple')
            {   
                noStroke();
                fill('purple');
            }
            else
            {   
                stroke('blueviolet');
                fill('indigo');
            }
            push();
            rotate(angle_1 + prog);
            ellipse(0, (-radius / 2), ellipseWidth, radius);
            pop();
        }

        // Do something else for the outer half of an inner circle
        for (let i = (this.spectrum.length) * upperFreqLimit / 2; i < this.spectrum.length * upperFreqLimit;
        i++)
        {
            let radius = map(this.spectrum[i], 0, 255, lowerRadius, upperRadius);
            // Angle mapped from length of each proportion of the fourier.analyze() spectrum
            let angle_2 = (-1) * map(i, 0, this.spectrum.length / 8, PI, 2 * PI);
            // Maps the  red color of each ellipse making up the circle depending on the frequency's amplitude
            let red = map(this.spectrum[i], 0, 255, 100, 255);
            // Maps the blue color of each ellipse making up the circle depending on the frequency's amplitude
            let blue = map(this.spectrum[i], 0, 255, 100, 255);
            strokeWeight(1.5);
            strokeCap(SQUARE);
            
            if (colorValue == 'violet')
            { 
                noFill('violet');
                stroke(red - 20, 30, blue - 20);
            }
            else if (colorValue == 'darkorchid')
            {   
                fill(red, 50, blue);
                stroke('darkorchid');
            }
            else if (colorValue == 'purple')
            {
                fill(color, 0, color);
                noStroke();
            }
            else
            {   
                fill(red / 2, 0, blue - 50);
            }

                push();
                rotate(angle_2 + prog);
                ellipse(0, (-radius / 2), ellipseWidth, radius);
                pop();
        }
    }

    this.draw = function(){
        fourier.smooth(smoothingFactor);
        this.spectrum = fourier.analyze();

        push();

        translate(width / 2, height / 2);
        
        // Draws a circle for each quarter of fourier.analyze();
        this.drawCircle(0.75, 1, height * 0.45, height * 0.7,'indigo', 10);
        this.drawCircle(0.5, 0.75, height * 0.35, height * 0.45,'purple', 9);
        this.drawCircle(0.25, 0.5, height * 0.25, height * 0.35,'darkorchid', 7);
        this.drawCircle(0, 0.25, height * 0.1, height * 0.25,'violet', 5);

        pop();

        // Increases the position of each ellipse by an angle each frame
        prog += (spinSpeed * PI) / 180;
    }
}
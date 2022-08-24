/* Creates a set of shifting mountains for each quarter of frequencies in the fourier.analyze() object
 - Uses the knowledge about noise() learnt in the lecture video and adapts it to make gradient colors
 on the mountains */

function Mountains()
{
    this.name = "mountains";

    // GUI --> choose num of freq bins
    this.gui = createGui('Mountains Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals('mountainsBins');

    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }
    
    this.prog = 0;
    // Private variables - only needed inside the function
    // Four groups of frequencies to divide up FFT spectrum
    // Lowest frequency bins will be stored here
    var lowest;
    // Second lowest frequency bins
    var mid_low;
    // Second highest frequency bins
    var mid_high;
    // Highest frequency bins
    var high;

    this.draw = function(){

        strokeWeight(2);
        noFill();

        fourier.smooth(smoothingFactor);
        fourier.analyze(mountainsBins);

        // Splits the fourier.analyze() array into four groups
        lowest = fourier.getEnergy(1, fourier.analyze(mountainsBins).length / 4);
        mid_low = fourier.getEnergy(fourier.analyze(mountainsBins).length / 4, fourier.analyze(mountainsBins).length / 2);
        mid_high = fourier.getEnergy(fourier.analyze(mountainsBins).length / 2, fourier.analyze(mountainsBins).length * 3 / 4);
        high = fourier.getEnergy(fourier.analyze(mountainsBins).length * 3 / 4, fourier.analyze(mountainsBins).length - 1);

        // If a high frequency is over 160 amplitude, cause background to 'flash' purple (lightning effect)
        if (fourier.getEnergy(900, 1024) > 160)
        {
            background(153,50,204);
        }
        else
        {
            background(0);
        }

        stroke(255);

        for (var i = 0; i < width; i++)
        {   
            // Draws lines to create top-mountains (highest frequencies), using noise() to color in rainbow
            let r = map(noise(i * 0.008 + this.prog, high * 0.008), 0, 1, 0, height * 0.9);
            let high_mapped = map(high, 0, 255, 0, 300);
            let red = map(noise(i * 0.04 + this.prog), 0, 1, 0, 255);
            let green = map(noise(i * 0.05 + this.prog), 0, 1, 0, 255);
            let blue = map(noise(i * 0.06 + this.prog), 0, 1, 0, 255);
            stroke(red, green, blue);
            line(i, (height - r) - high_mapped, i, height); 
            
            /* Draws lines for second-highest (/frequencies) mountains,
             using noise() to color in shades of blue */
            let q = map(noise(i * 0.007 + this.prog, mid_high * 0.007), 0, 1, 0, height * 0.7);
            let mid_high_mapped = map(mid_high, 0, 255, 0, 200);
            blue = map(noise(i * 0.05 + this.prog), 0, 1, 0, 255);
            stroke(0, 0, blue);
            line(i, (height - q) - mid_high_mapped, i, height);

            /* Draws lines for second-lowest (second lowest frequencies) mountains,
             using noise() to color in shades of green */
            let p = map(noise(i * 0.006 + this.prog, mid_low * 0.006), 0, 1, 0, height * 0.5);
            let mid_low_mapped = map(mid_low, 0, 255, 0, 200);
            green = map(noise(i * 0.02 + this.prog), 0, 1, 0, 200);
            stroke(0, green, 0);
            line(i, (height - p) - mid_low_mapped, i, height);

            /* Draws lines for lowest (lowest frequencies) mountains,
            using noise() to color in shades of red */
            let o = map(noise(i * 0.005 + this.prog, lowest * 0.005), 0, 1, 0, height * 0.3);
            let lowest_mapped = map(lowest, 0, 255, 0, 200);
            red = map(noise(i * 0.05 + this.prog), 0, 1, 0, 255);
            stroke(red, 0, 0);
            line(i, (height - o) - lowest_mapped, i, height);


        }
        
        // Makes the mountains move across the screen
        this.prog += 0.01;
    }


}
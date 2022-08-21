
var spinSpeed;
spinSpeed = [1, 2, 3, 4];


// draws a star with each 'arm' representing one of 5 frequency bins
// each arm is a different color in order to distinguish the frequency bins
function Star() {

    this.name = 'star';
    this.gui = createGui('Star Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals('spinSpeed');

    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }

    this.spectrum = fourier.analyze();
    this.prog = 0;
    this.amp = new p5.Amplitude();
    this.binArray;


    // populates the bins array each time fourier.analyze() is called
    // returns array of frequency bins
    this.fillBins = function()
    {
        let arr = [];
        let bass = {
            energy: fourier.getEnergy("bass"),
            color: "darkred"
        };
        arr.push(bass);
        let lowMid = {
            energy: fourier.getEnergy("lowMid"),
            color: "darkorange"
        };
        arr.push(lowMid);
        let mid = {
            energy: fourier.getEnergy("mid"),
            color: "yellow"
        };
        arr.push(mid);
        let highMid = {
            energy: fourier.getEnergy("highMid"),
            color: "chartreuse"
        };
        arr.push(highMid);
        let treble = {
            energy: fourier.getEnergy("treble"),
            color: "deepskyblue"
        };
        arr.push(treble);

        return arr;
    }

    this.draw = function(){

        
        background(0);
        fourier.smooth(smoothingFactor);
        fourier.analyze();

        this.binArray = this.fillBins();

        push();
        // makes center of circle the center of the canvas
        translate(width / 2, height / 2);
        /* - this code is from https://www.youtube.com/watch?v=2O3nm0Nvbi4 about 13 minutes into video.
            - adapted it to make a star with triangles.
           - this.prog increases the angle every time so it spins */
        for (let i = 0; i < this.binArray.length; i++)
        {   
            // size of star's radius depends on the bin's energy
            let radius;
            radius  = map(this.binArray[i].energy, 0, 255, height / 3, height / 1.5);

            let angle = map(i, 0, this.binArray.length, 0, (TWO_PI));

            fill(this.binArray[i].color);
            noStroke();

            // each arm of the star rotated around *TWO_PI / number of bins*
            push();
            rotate(angle + this.prog);
            triangle(-80, 0, 80, 0, 0, radius);
            pop();

            // black center ellipse of star represents amplitude
            let ellipse_size = map(this.amp.getLevel(), 0, 1, 160, 180);
            fill(0, 0, 0);
            ellipse(0, 0, ellipse_size);
        };

        pop();

        this.prog += (spinSpeed * PI) / 180;
    }
}
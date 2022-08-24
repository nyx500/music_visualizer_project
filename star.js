// Draws a star with each 'arm' representing one of 5 frequency bins
// Each arm is a different color in order to distinguish the frequency bins
function Star() {

    this.name = 'star';
    this.gui = createGui('Star Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals('spinSpeed', 'smoothingFactor');

    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }

    var prog = 0;
    var amp = new p5.Amplitude();
    var binArray;


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

        fourier.smooth(smoothingFactor);
        fourier.analyze();

        binArray = this.fillBins();

        push();
        // Makes center of circle the center of the canvas
        translate(width / 2, height / 2);
        /* - This code is from https://www.youtube.com/watch?v=2O3nm0Nvbi4 about 13 minutes into video.
            - Adapted it to make a star with triangles.
           - 'prog' increases the angle every time so it spins */
        for (let i = 0; i < binArray.length; i++)
        {   
            // The size of star's radius depends on the bin's energy
            let radius;
            radius  = map(binArray[i].energy, 0, 255, height / 3, height / 1.3);

            let angle = map(i, 0, binArray.length, 0, (TWO_PI));

            fill(binArray[i].color);
            noStroke();

            // Each 'arm' of the star rotated around *TWO_PI / number of bins*
            push();
            rotate(angle + prog);
            triangle(-80, 0, 80, 0, 0, radius);
            pop();

            // Black center ellipse of star represents amplitude
            let ellipse_size = map(amp.getLevel(), 0, 1, 160, 180);
            fill(0, 0, 0);
            ellipse(0, 0, ellipse_size);
        };

        pop();

        prog += (spinSpeed * PI) / 180;
    }
}
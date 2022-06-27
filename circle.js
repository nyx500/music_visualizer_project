function Circle() {

    this.name = 'circle';
    this.spectrum = fourier.analyze();
    this.prog = 0;

    // draws a circle for different frequency section
    this.drawCircle = function(lowerFreqLimit, upperFreqLimit, lowerRadius, upperRadius,
        colorValue, ellipseWidth)
    {   

        for (
                let i = (this.spectrum.length) * lowerFreqLimit;
                i < (this.spectrum.length) * upperFreqLimit / 2;
                i++
            )
        {   
            // radius of circle must be between lower and upper values
            let radius = map(this.spectrum[i], 0, 255, lowerRadius, upperRadius);
            // angle mapped from length of each proportion of the fourier.analyze() spectrum
            // How to wrap wave around circle: https://www.youtube.com/watch?v=uk96O7N1Yo0
            let angle_1 = map(
                            i,
                            0,
                            this.spectrum.length / 8,
                            0,
                            PI
                        );
            // maps the color of each line/ellipse making up the circle depending on the frequency's amplitude
            let color = map(this.spectrum[i], 0, 255, 100, 255);
            strokeWeight(1.5);
            strokeCap(SQUARE);
            
            if (colorValue == 'red')
            { 
                noFill();
                stroke(color, 0, 0);
            }
            else if (colorValue == 'green')
            {   
                fill(0, color, 0);
                stroke('darkgreen');
            }
            else if (colorValue == 'yellow')
            {
                fill(color, color, 0);
                noStroke();
            }
            else
            {
                stroke(10, 10, Math.floor(Math.random() * 256) + 1);
                strokeCap(PROJECT);
                strokeWeight(18);
            }

            // draws a tiny ellipse for the first three quarters of frequency array and lines for the last one
            if (colorValue == 'red' || colorValue == 'green' || colorValue == 'yellow')
            {
                push();
                rotate(angle_1 + this.prog);
                ellipse(0, (-radius / 2), ellipseWidth, radius);
                pop();
            }
            else
            {
                line(0, 0, cos(angle_1 + this.prog) * radius, sin(angle_1 + this.prog) * radius);
            }
        }

        for (let i = (this.spectrum.length) * upperFreqLimit / 2; i < this.spectrum.length * upperFreqLimit;
        i++)
        {
            let radius = map(this.spectrum[i], 0, 255, lowerRadius, upperRadius);
            // angle mapped from length of each proportion of the fourier.analyze() spectrum
            let angle_2 = (-1) * map(
                i,
                0,
                this.spectrum.length / 8,
                PI,
                2*PI
            );
            // maps the color of each line/ellipse making up the circle depending on the frequency's amplitude
            let color = map(this.spectrum[i], 0, 255, 100, 255);
            strokeWeight(1.5);
            strokeCap(SQUARE);
            
            if (colorValue == 'red')
            { 
                noFill();
                stroke(color, 0, 0);
            }
            else if (colorValue == 'green')
            {   
                fill(0, color, 0);
                stroke('darkgreen');
            }
            else if (colorValue == 'yellow')
            {
                fill(color, color, 0);
                noStroke();
            }
            else
            {
                stroke(10, 10, Math.floor(Math.random() * 256) + 1);
                strokeCap(PROJECT);
                strokeWeight(18);
            }

            // draws a tiny ellipse for the first three quarters of frequency array and lines for the last one
            if (colorValue == 'red' || colorValue == 'green' || colorValue == 'yellow')
            {
                push();
                rotate(angle_2 + this.prog);
                ellipse(0, (-radius / 2), ellipseWidth, radius);
                pop();
            }
            else
            {
                line(0, 0, cos(angle_2 + this.prog) * radius, sin(angle_2 + this.prog) * radius);
            }
        }
    }

    this.draw = function(){

        fourier.smooth(smoothingFactor);
        this.spectrum = fourier.analyze();

        push();

        translate(width / 2, height / 2);
        
        // draws a circle for each quarter of fourier.analyze();
        this.drawCircle(0.75, 1, 300, 340,'blue', null);
        this.drawCircle(0.5, 0.75, 250, 320,'green', 9);
        this.drawCircle(0.25, 0.5, 150, 250,'yellow', 7);
        this.drawCircle(0, 0.25, 50, 150,'red', 5);

        pop();

        this.prog += (spinSpeed * PI) / 180;
    }
}
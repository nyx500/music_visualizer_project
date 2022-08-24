
function WingOutline(color, ad, noiseIncrement, minWidth, maxWidth)
{   
    this.color = color;
    this.angleDivisor = ad;
    this.noiseIncrement = noiseIncrement;
    this.minWidth = minWidth;
    this.maxWidth = maxWidth;
    this.beatDetector = new BassBeatDetector();
    

    this.draw = function(yoff)
    {   
        var xoff = 0;
        noStroke();
        
        // Radius increases in size if there is a beat
        var radiusFactor = 1;

        fill(this.color);
        // Put a pink filter over the butterfly if a beat is detected
        if (this.beatDetector.detectBeat())
        {   
            radiusFactor = 1.2;
            fill(255, 105, 180, 25);
        }

        push();
        translate(width / 2, height / 2);
        rotate(PI / 2);

        beginShape();
        // Draws the butterfly from -90 degrees to 270 degrees, which is a circle of 360 degrees
        for (let angle = -PI / 2; angle <= (3*PI / 2); angle += this.angleDivisor)
        {    
            // 2D noise --> dependent on the xoffset (increases/decreases) with each vertex
            // and yoffset --> changes depending on the frame in the Butterfly parent
            // object's draw() loop, and if this changes the wings will flap
            // Returns a value between 0 and 1
            var n = noise(xoff, yoff);
            
            // Formulae taken from: https://en.wikipedia.org/wiki/Rose_(mathematics)
            // Attribution: https://www.youtube.com/watch?v=O_0fRV4MTZo&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=10
            var radius = sin(2 * angle) * map(n, 0, 1, minWidth, maxWidth);
            var x = radius * radiusFactor * cos(angle);
            var y = sin(yoff) * radius * radiusFactor * sin(angle);

            // AS angle approaches PI/2 clockwise increase xoff (this rotates the shape, so it's symmetrical)
            if (angle < PI / 2)
            {
                xoff += noiseIncrement;
            }
            // When angle exceeds PI / 2 decrease xoff to rotate the shape
            // Subtracting the same amount from the offset makes the shape go backwards
            {
                xoff -= noiseIncrement;
            }
            vertex(x, y);
        }
        endShape();

        pop();

    }
}

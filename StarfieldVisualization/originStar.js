/*Attribution: adapted code from https://p5js.org/examples/form-star.html */
class OriginStar{
    constructor(numPoints)
    {   
        // Position of central star
        this.x_pos = width / 2;
        this.y_pos = height / 2;

        // Number of points around the star
        this.numPoints = numPoints;
        // Number of angles to rotate by to draw the points of the star
        this.angle = TWO_PI / numPoints;
        this.angles = [];

        // Array of angles around the central star
        for (var i = 0; i < TWO_PI; i += this.angle)
        {
            this.angles.push(i + this.angle);
        }
        
        // The middle of the star
        this.littleRadius = 10;
        // The spokes of the star
        this.bigRadius = 50;
        // Color in HSB values
        this.color = color(255, 0, 255);
    }

    // Draws the central (origin) star
    draw()
    {   
        fill(this.color);
        noStroke();
        
        beginShape()
        for (let a = 0; a < this.angles.length; a++)
        {       
                // Draws the middle circle in the star
                let smallCirclePointX = this.x_pos + cos(this.angles[a]) * this.littleRadius;
                let smallCirclePointY = this.y_pos + sin(this.angles[a]) * this.littleRadius;
                vertex(smallCirclePointX, smallCirclePointY);

                // Draws the external spokes of the star
                let bigCirclePointX = this.x_pos + cos(this.angles[a]) * this.bigRadius;
                let bigCirclePointY = this.y_pos + sin(this.angles[a]) * this.bigRadius;
                vertex(bigCirclePointX, bigCirclePointY);
        }
        endShape();
    }
}

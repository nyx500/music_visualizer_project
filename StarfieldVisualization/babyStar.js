// Constructor for each tiny star
class BabyStar{
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        var angles = [];

        // Creates an array of angles between 0 and two PI (radians)
        for (var i = 0; i < TWO_PI; i += 0.1)
        {
            angles.push(i);
        }
        
        // Create a variety of different angles around a circle the tiny stars are shooting out at
        var velocity_x = cos(angles[Math.floor(Math.random() * angles.length)])
            * 5;

        var velocity_y = sin(angles[Math.floor(Math.random() * angles.length)])
            * 5;
        
        // Not private --> needs to be accessed by 'Starfield' visualization!
        this.velocity = createVector(velocity_x, velocity_y);
       
        // Ensures that there is no starting velocity whose magnitude is less than 1
        while (this.velocity.mag() < 1)
        {
            this.velocity.mult(1.5);
        }

        this.magnitude = this.velocity.mag();
        this.acceleration = 1.03;
        this.size = 5;
        this.color = color(50, 0, 100);
        // Use the brightness instead of color as stars are in monochrome
        this.brightness = brightness(this.color);
    }
    // translate so stars emanate from middle of the screen
    draw()
    {   
        push();
        translate(width/2, height/2);
        noStroke();
        fill(brightness(this.brightness));
        ellipse(this.pos.x, this.pos.y, this.size);
        pop();
    }
}
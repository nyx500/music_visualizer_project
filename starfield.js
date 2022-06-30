class BabyStar{
    // constructor method to add properties using 'this'
    constructor()
    {
        this.pos = createVector(0, 0);
        this.angles = [];

        for (var i = 0; i < TWO_PI; i += 0.1)
        {
            this.angles.push(i);
        }

        // the velocity will be the random angle generated from 0 to 2 PI Radians with increments of 0.01
        this.velocity_x = cos(this.angles[Math.floor(Math.random() * this.angles.length)]) * 1;
        this.velocity_y = sin(this.angles[Math.floor(Math.random() * this.angles.length)]) * 1
        this.velocity = createVector(this.velocity_x, this.velocity_y);
        this.acceleration = 1.2;
        this.size = 5;
    }
    draw()
    {
        // fill in later
    }
    update()
    {
        // fill in later
    }
}

function Starfield()
{
    this.name = 'starfield';
    this.stars = [];
    this.makeStars = function(){
        for (var i = 0; i < 200; i++)
        {
            this.stars.push(new BabyStar);
        }
    }
    this.draw = function() {
        this.makeStars();
        for (var i = 0; i < 10; i++)
        {
            console.log('stars 0 to 9');
            console.log(this.stars[i]); 
        }
    }

}
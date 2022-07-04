class BabyStar{
    // constructor method to add properties using 'this'
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.angles = [];

        for (var i = 0; i < TWO_PI; i += 0.1)
        {
            this.angles.push(i);
        }
        
        this.velocity_x = cos(this.angles[Math.floor(Math.random() * this.angles.length)]);
        this.velocity_y = sin(this.angles[Math.floor(Math.random() * this.angles.length)]);
        this.velocity = createVector(this.velocity_x, this.velocity_y);

        this.multiplier = (Math.random() * 2) + 1.1;

        // generates a -1 or a 1 randomly (for different directions of the vector);
        this.randomPolarity;

        if (Math.random() > 0.5)
        {
            this.randomPolarity = 1;
        }
        else
        {
            this.randomPolarity = -1;
        }

        this.multiplier = this.multiplier * this.randomPolarity;

        this.velocity = this.velocity.mult(this.multiplier);
        this.acceleration = 1.005;
        this.size = 5;
        this.color = color(50, 0, 120);
        this.brightness = brightness(this.color);
    }
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

function Starfield()
{   
    colorMode(HSB, 255);
    this.name = 'starfield';
    this.stars = [];
    this.updateStars = function()
    {
        for (var i =  this.stars.length - 1; i >= 0; i--)
        {   

            if (
                this.stars[i].pos.x < - width / 2 
                ||
                this.stars[i].pos.x > width / 2
                ||
                this.stars[i].pos.y < - height / 2
                ||
                this.stars[i].pos.y > height/2
            )
            {
                this.stars.splice(i, 1);
                this.stars.push(new BabyStar(0, 0, null));
            }

            this.stars[i].pos.x += this.stars[i].velocity.x;
            this.stars[i].pos.y += this.stars[i].velocity.y;
            
            if (frameCount % 10 == 0)
            {
                this.stars[i].velocity = this.stars[i].velocity.mult(this.stars[i].acceleration); 
            }
            this.stars[i].size *= 1.0015;
            this.stars[i].brightness = constrain(this.stars[i].brightness * 1.01, 120, 255);
        }
    }
    this.makeStars = function(){

        for (var i = 0; i < 200; i++)
        {  
            this.stars.push(new BabyStar(0, 0));
        }
        for (var i = 0; i < 300; i++)
        {
            this.updateStars();
        }
        return this.stars;
    }

    this.stars = this.makeStars();

    this.draw = function() {
        
        if (sound.isPlaying())
        {
            this.updateStars();
        }

        for (var i = 0; i < this.stars.length; i++)
        {
            this.stars[i].draw();
        }
    }

}
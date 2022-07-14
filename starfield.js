/* What to do today: cap the size so stars don't get too huge when they come close using constrain
- alter the brightness so it's more noticeable - get the beat - watch beat analyzer video - program 
stars to the beat to accelerate more than once if beat happens */
class BabyStar{
    // constructor method to add properties using 'this'
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.angles = [];

        // create an array of angles between 0 and two PI (radians)
        for (var i = 0; i < TWO_PI; i += 0.1)
        {
            this.angles.push(i);
        }
        
        // create a variety of different angles around a circle the stars are shooting out at
        this.velocity_x = cos(this.angles[Math.floor(Math.random() * this.angles.length)])
            * 5;

        this.velocity_y = sin(this.angles[Math.floor(Math.random() * this.angles.length)])
            * 5;
        
        this.velocity = createVector(this.velocity_x, this.velocity_y);
       
        // Ensures that there is no starting velocity whose magnitude is less than 1
        while (this.velocity.mag() < 1)
        {
            this.velocity.mult(1.5);
        }

        this.magnitude = this.velocity.mag();
        this.acceleration = 1.015;
        this.size = 5;
        this.color = color(50, 0, 100);
        // use the brightness instead of color as stars are in monochrome
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

function Starfield()
{   
    colorMode(HSB, 255);
    this.name = 'starfield';
    this.stars = [];
    this.beatDetector = new BeatDetector();

    this.updateStars = function()
    {   
        // backwards iteration due to 'splice' method being used!
        for (var i =  this.stars.length - 1; i >= 0; i--)
        {   
            // if star reaches edge of screen, remove it from the array and add a new star
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

            // updates the position of each star each frame
            this.stars[i].pos.x += this.stars[i].velocity.x;
            this.stars[i].pos.y += this.stars[i].velocity.y;
            
            // increase stars' velocity every 10 frames
            if (frameCount % 10 == 0)
            {
                this.stars[i].velocity = this.stars[i].velocity.mult(this.stars[i].acceleration); 
            }
            
            // create an array of all current magnitudes of the stars we have right now
            let mags = this.stars.map(star => 
                {
                    return star.magnitude;
                })
            /* maps the size_increment to the magnitude of each star's velocity, so slow stars do
                not get really huge. Use the max magnitude number to map the velocity to the size increase */
            let size_increment = map(this.stars[i].magnitude, 0, max(mags), 1.0005, 1.012);
            this.stars[i].size *= size_increment;

            /* Do the same kind of mapping for the brightness of the stars as they come closer */
            let brightness_increment = map(this.stars[i].magnitude, 0, max(mags), 0.01, 4);
            this.stars[i].brightness += brightness_increment;
        }
    }
    this.makeStars = function(){

        // populate the stars array with BabyStar objects
        for (var i = 0; i < 200; i++)
        {  
            this.stars.push(new BabyStar(0, 0));
        }
        // pre-populate the screen with stars in position already when the vis is clicked on, ready to draw
        for (var i = 0; i < 200; i++)
        {
            this.updateStars();
        }
        return this.stars;
    }

    this.stars = this.makeStars();

    this.draw = function() {
        
        /*
            Attribution for background galaxy image:
            'https://www.freepik.com/vectors/galaxy-universe'
        */

        background(galaxyBgImg);
        // put a semi-transparent black rectangle to cover the background to make it darker
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);

        if (sound.isPlaying())
        {
            this.updateStars();
        }

        for (var i = 0; i < this.stars.length; i++)
        {
            this.stars[i].draw();

            // if a peak/beat is detected, then flash the screen black and back to stars again
            // also increase the velocity of each star three times
            if(this.beatDetector.detectBeat())
            {   
                fill(0, 0, 0, 255);
                rect(0, 0, width, height);

                for (var j = 0; j < this.stars.length; j++)
                {
                    this.stars[j].velocity = this.stars[j].velocity.mult(this.stars[j].acceleration);
                }
            }
            ;
        }
    }

}
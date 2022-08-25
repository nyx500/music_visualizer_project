/* Tutorial for making a raindrop shape attribution: 
https://editor.p5js.org/samchasan/sketches/SJfzWJviW
 */
function Raindrops()
{   
    this.name = "raindrops";
    this.gui = null;
    this.drops =[];
    this.advancedBeatDetector = new AdvancedBeatDetector();
    // Creates a new frequency plot object (a bit like the spectrum)
    this.plot = new FreqPlot();

    // Creates an array of raindrops
    this.createDrops = function(numDrops)
    {   
        var drops = []

        for (var i = 0; i < numDrops; i++)
        {   
            
            // Add randomness to spread of raindrops --> not usually evenly-spaced
            // in nature on a window screen!
            var x_pos = 5 + i * (Math.random() * 20 + width/numDrops);
            // Gives raindrops ifferent heights because rain doesn't just come from one level
            // all at once
            var y_pos = Math.random() * -400;
            var droplet = new Droplet(x_pos, y_pos);
            drops.push(droplet);
        }
        return drops;
    }

    this.droplets = this.createDrops(50);

    this.draw = function()
    {   
        background(nyc);
        // Puts a grey translucent rectange over the background image for 'fog' effect
        fill(50, 50, 50, 220);
        rect(0, 0, width, height);
        // Stores whether the draw frame has recorded a beat or not
        var isBeat = this.advancedBeatDetector.detectBeat(1.165);

        background(80, 80, 80, 100);
        if (sound.isPlaying())
        {
        // No outline
        noStroke();

        // Draws each raindrop
        for (var i = 0; i < this.droplets.length; i++)
        {   
            // For ease of reference, to not type this.drops every time when accessing object properties
            var droplet = this.droplets[i];

            beginShape();
            fill(255, 255, 255, droplet.opacity);
            triangle(
                droplet.x_pos - droplet.size/2,
                droplet.y_pos,
                droplet.x_pos + droplet.size/2,
                droplet.y_pos,
                droplet.x_pos,
                droplet.y_pos - droplet.size * 1.2
            )
            /*Attribution: https://www.youtube.com/watch?v=IWLpIJMVRtg */
             arc(
                droplet.x_pos,
                droplet.y_pos - 0.05,
                droplet.size,
                droplet.size,
                0,
                PI
             )
             endShape();

            // Every certain number (randomized) frames droplet reverses x-direction
            if (frameCount % droplet.dirChange == 0)
            {   
                droplet.x_wiggleValue *= -1;
            }

            // If there is a beat, increment speed of raindrop falling
            if (isBeat)
            {
                droplet.y_pos += droplet.speed + 4;
            }
            else
            {   
                droplet.y_pos += droplet.speed;
            }

            // Add the x-offset wiggle value to the droplet's x-position
            droplet.x_pos += droplet.x_wiggleValue;
            
            // Remove the raindrop if it has gone off the screen
            if (droplet.y_pos > height + 100)
            {
                this.drops.splice(i, 1);
            }

            // Fade the raindrops as they fall down the screen
            droplet.opacity -= 1;
            // Make sure the opacity does not fall below 50, so they fade but they do not disappear
            droplet.opacity = constrain(droplet.opacity, 50, 255);

        }

        // Every 100 frames (will be about 1.4 seconds) create 40 new droplets
        if (frameCount% 100 == 0)
        {
            var droplets = this.createDrops(40);
            for (var i = 0; i < droplets.length; i++)
            {
                this.droplets.push(droplets[i]);
            }
        }

        this.plot.draw();


    }  
    }
}   
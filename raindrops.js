/* Tutorial for making a raindrop shape attribution: 
https://editor.p5js.org/samchasan/sketches/SJfzWJviW
 */
function Raindrops()
{
    this.name = "raindrops";
    this.gui = null;
    this.drops =[];
    this.advancedBeatDetector = new AdvancedBeatDetector(1.165);
    this.plot = new FreqPlot();

    this.createDrop = function(x, y, size)
    {
        var drop = {
            x_pos: x,
            y_pos: y,
            size: Math.round(Math.random() * 20 + 20),
            opacity: 255,
            speed: Math.random() + 2,
            x_wiggleValue: Math.random() * 0.4 - 0.2,
            dirChange:  Math.random() * 50 + 100
        }
        return drop;
    } 
    
    this.createDrops = function(numDrops)
    {   
        var drops = []
        for (var i = 0; i < numDrops; i++)
        {   
            // add randomness to spread of raindrops --> not usually evenly-spaced
            // in nature!
            var x_pos = 5 + i * (Math.random() * 20 + width/numDrops);
            // different heights because rain doesn't just come from one level
            // all at once
            var y_pos = Math.random() * -400;
            var size = Math.random() * 40 + 10;
            drops.push(this.createDrop(x_pos, y_pos, size));
        }
        return drops;
    }

    this.drops = this.createDrops(50);

    this.draw = function()
    {   
        background(nyc);
        fill(50, 50, 50, 220);
        rect(0, 0, width, height);
        var isBeat = this.advancedBeatDetector.detectBeat();

        background(80, 80, 80, 100);
        if (sound.isPlaying())
        {
        noStroke();

        for (var i = 0; i < this.drops.length; i++)
        {   
            var droplet = this.drops[i];

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
            //  ellipse(
            //     droplet.x_pos,
            //     droplet.y_pos,
            //     droplet.size,
            //     droplet.size
            //  )
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

            // every certain number (randomized) frames change x-direction
            if (frameCount % droplet.dirChange == 0)
            {   
                droplet.x_wiggleValue *= -1;
            }

            if (isBeat)
            {
                droplet.y_pos += droplet.speed + 4;
            }
            else
            {   
                droplet.y_pos += droplet.speed;
            }

            
            droplet.x_pos += droplet.x_wiggleValue;
        
            if (droplet.y_pos > height + 100)
            {
                this.drops.splice(i, 1);
            }

            droplet.opacity -= 1;
            droplet.opacity = constrain(droplet.opacity, 50, 255);

        }

        if (frameCount% 100 == 0)
        {
            var drops = this.createDrops(40);
            for (var i = 0; i < drops.length; i++)
            {
                this.drops.push(drops[i]);
            }
        }

        this.plot.draw();


    }  
    }
}
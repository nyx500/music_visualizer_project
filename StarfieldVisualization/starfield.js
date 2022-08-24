/* TODO: cap the size so stars don't get too huge when they come close using constrain
- Must alter the brightness so it's more noticeable - get the beat - watch beat analyzer video - program 
stars to the beat to accelerate more than once if beat happens --> DONE */

function Starfield()
{   
    // Changes color mode from RGB, so brightness can be increased
    colorMode(HSB, 255);
    this.name = 'starfield';
    this.gui = createGui('Starfield Visualization: ' + generalText);
    this.gui.setPosition(width * 0.8, 30);
    this.gui.addGlobals(
        'starfieldBeatThreshold');
      
    this.hideGui = function()
    {   
        this.gui.hide();
    }

    this.showGui = function()
    {   
        this.gui.show();
    }

    // Will store an array of BabyStar() objects
    this.stars = [];
    this.advancedBeatDetector = new AdvancedBeatDetector();
    // Central or 'origin' star
    this.originStar = new OriginStar(50);
    this.countFramesForThisVisualization = 0;

    // Ensures that the central star is in the middle of the page when fullscreen
    this.onResize = function()
    {   
        this.originStar.x_pos = width / 2;
        this.originStar.y_pos = height / 2;
    }


    this.updateStars = function()
    {   
        // Backwards iteration due to 'splice' method being used!
        for (var i =  this.stars.length - 1; i >= 0; i--)
        {   
            // If star reaches edge of screen, remove it from the array and add a new star
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

            // Updates the position of each star every time draw() is called
            this.stars[i].pos.x += this.stars[i].velocity.x;
            this.stars[i].pos.y += this.stars[i].velocity.y;
            
            // Increase stars' velocity every 10 frames
            if (frameCount % 10 == 0)
            {
                this.stars[i].velocity = this.stars[i].velocity.mult(this.stars[i].acceleration); 
            }
            
            // Creates an array of all current magnitudes of the stars we have right now
            let mags = this.stars.map(star => 
                {
                    return star.magnitude;
                })

            /* Maps the size_increment to the magnitude of each star's velocity, so slow stars do
                not get really huge! This was challenging.
                Uses the max magnitude number to map the velocity to the size increase 
            */
            let size_increment = map(this.stars[i].magnitude, 0, max(mags), 1.0005, 1.012);
            this.stars[i].size *= size_increment;

            /* Do the same kind of mapping for the brightness of the stars as they come closer */
            let brightness_increment = map(this.stars[i].magnitude, 0, max(mags), 0.01, 4);
            this.stars[i].brightness += brightness_increment;
        }
    }

    // Makes an array of BabyStars
    this.makeStars = function(){

        // Populate the stars array with BabyStar objects
        for (var i = 0; i < 200; i++)
        {  
            this.stars.push(new BabyStar(0, 0));
        }
        // Pre-populate the screen with stars in position already when the vis is clicked on
        for (var i = 0; i < 200; i++)
        {
            this.updateStars();
        }

          return this.stars;
        
    }

    this.stars = this.makeStars();

    this.draw = function() {

        // See how many frames have gone by to wait for accurate beat detection
        this.countFramesForThisVisualization++;
        
        /*
            Attribution for background galaxy image:
            'https://www.freepik.com/vectors/galaxy-universe'
        */

        // Planets and constellations background image
        background(galaxyBgImg);

        // Run only if sound is playing
        if (sound.isPlaying())
        {
            this.updateStars();
        }

        // Determines if a beat has been detected and stores the value
        var isBeat = this.advancedBeatDetector.detectBeat(starfieldBeatThreshold);

        /* Only start representing beat after 1.3 seconds --> the beat detector needs time
            to be reliable and to properly calculate enough variance
        */
        if (this.countFramesForThisVisualization >= this.advancedBeatDetector.frameRate * 1.3)
        {
            if(isBeat)
            {   
                // If beat, accelerate all the BabyStar animations
                for (var i = 0; i < this.stars.length; i++)
                {
                    this.stars[i].velocity = this.stars[i].velocity.mult(this.stars[i].acceleration);   
                }
                // Increase opacity if beat
                fill(0, 0, 0, 200);
                // Flash the big star
                this.originStar.bigRadius = 150;

            }
            else
            {   
                // Decrease opacity if beat
                fill(0, 0, 0, 100);
                // The big star is smaller when no beat is detected
                this.originStar.bigRadius = 50;
            }
            
            // Cover the background, so that it is darker
            rect(0, 0, width, height);
        }
        

        // Draws the stars
        for (var i = 0; i < this.stars.length; i++)
        {
            this.stars[i].draw();
        }

        this.originStar.draw();

     }

}
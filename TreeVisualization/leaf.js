//Coding Challenge #15: Object Oriented Fractal Trees
//Attribution: "Coding Challenge #15: Object Oriented Fractal Trees" https://www.youtube.com/watch?v=fcdNSZ9IzJM

function Leaf(begin)
{   
    // Vector where leaf begins
    this.begin = begin;
    // Color variables
    this.red =  Math.random() * 50;
    this.green = Math.random() * 50 + 100;
    this.blue = Math.random() * 50;
    this.alpha = 200;
    // Angle of leaf sticking out from tree
    this.angle = Math.random() * PI/2 + -PI/4;
    // Random size between 5 and 15
    this.size = (Math.random() * 10 + 5);

    // Records if leaf is lightened
    this.isLightened = false;

    // Records if leaf has had a fruit added
    this.hasFruit = false;

    // Records if time for leaf to change color for autumn
    this.isTurning = false;

    // Records if leaf has changed color already
    this.autumn = false;

    // Tells leaf to fall
    this.isFalling = false;
    // If true, leaf has fallen to the ground
    this.fallen = false;

    // Amount the leaf should shake from right and left when beat is detected
    this.xSway = Math.random() * 2;

    // Records how far leaf has fallen --> when it should change direction (spiral effect)
    this.fallCounter = 0;

    this.draw = function()
    {   
        fill(this.red, this.green, this.blue, this.alpha);
        noStroke();
        // Translates the coordinates from the origin to the middle of the leaf
        // so that the leaf can be rotated around itself
        push();
        translate(this.begin.x, this.begin.y);
        rotate(this.angle);
        ellipse(0, 0, this.size, this.size * 2.2);
        pop();
    }

    // Adds a fruit to the leaf
    this.addFruit = function()
    {   
        let fruitPos = createVector(this.begin.x, this.begin.y);
        this.hasFruit = true;
        var fruit = new Fruit(fruitPos);
        return fruit;
    }

    // Shakes the leaf a random amount (called on beat detected)
    this.jitter = function()
    {
        var jitterAmountY = Math.random() * 2 - 1;
        this.begin.y = this.begin.y + jitterAmountY;
        jitterAmountX = Math.random() * 4 - 2;
        this.begin.x = this.begin.x + jitterAmountX;
    }


    // Changes the leaf's color (called when the season is autumn)
    this.fadeForAutumn = function(color)
    {   
        if (this.isTurning)
        {   
            // orange
            if (color == 0)
            {   
                this.red = 255;
                this.green = 140;
                this.blue = 0;
            }
            //red
            else if (color == 1)
            {   
                this.red = 255;
                this.green = 0;
                this.blue = 0;
            }
            // yellow
            else
            {   
                this.red = 255;
                this.green = 255;
                this.blue = 0;
            }
            this.autumn = true;
            this.isTurning = false;
        }      
    }

    // If there is beat, increase the y-position of the leaf
    this.fall = function(isBeat)
    {   
        if (this.isFalling && !this.fallen)
        {   
            if (this.fallCounter % 40 == 0)
            {
                this.xSway *= -1;
            }

            if (this.begin.y < height)
            {   
                this.begin.x += this.xSway;

                if (isBeat)
                {
                    this.begin.y += 8;
                    this.begin.x += this.xSway * 2;
                }
                else
                {  
                    this.begin.y += Math.random();
                }
            }
            // If the y-position reaches the height, check leaf is fallen
            else
            {
                this.fallen = true;
            }
            
            this.fallCounter++;
        }
    }

    // Fade the leaf by reducing the alpha component once the leaf has fallen
    this.fade = function()
        {
            if (this.fallen)
            {
                this.alpha = max(this.alpha - 1, 0);
            }
        }
}